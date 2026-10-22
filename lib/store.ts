import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { get, put, BlobPreconditionFailedError } from "@vercel/blob";
import type { Client } from "./loyalty";

export type Data = { clients: Client[] };

const BLOB_PATH = "calm-beauty-hub/clients.json";
const LOCAL_FILE = path.join(process.cwd(), ".data", "clients.json");
const empty = (): Data => ({ clients: [] });

const useBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export class StorageNotConfigured extends Error {
  constructor() {
    super("Storage is not connected. Connect a Vercel Blob store to this project.");
  }
}

type Snapshot = { data: Data; etag?: string };

async function load(): Promise<Snapshot> {
  if (useBlob()) {
    const res = await get(BLOB_PATH, { access: "private", useCache: false });
    if (!res || res.statusCode !== 200) return { data: empty() };
    const data = (await new Response(res.stream).json()) as Data;
    return { data: { clients: data.clients ?? [] }, etag: res.blob.etag };
  }
  if (process.env.VERCEL) throw new StorageNotConfigured();
  try {
    return { data: JSON.parse(await fs.readFile(LOCAL_FILE, "utf8")) as Data };
  } catch {
    return { data: empty() };
  }
}

async function save(data: Data, etag?: string) {
  const body = JSON.stringify(data, null, 2);
  if (useBlob()) {
    await put(BLOB_PATH, body, {
      access: "private",
      allowOverwrite: true,
      addRandomSuffix: false,
      contentType: "application/json",
      ...(etag ? { ifMatch: etag } : {}),
    });
    return;
  }
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, body);
}

export async function readClients(): Promise<Client[]> {
  return (await load()).data.clients;
}

// Read-modify-write with an ETag check so two quick edits never overwrite each other.
export async function mutate<T>(fn: (data: Data) => T): Promise<T> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const { data, etag } = await load();
    const result = fn(data);
    try {
      await save(data, etag);
      return result;
    } catch (err) {
      if (err instanceof BlobPreconditionFailedError) continue;
      throw err;
    }
  }
  throw new Error("Could not save changes because the data changed at the same time. Try again.");
}
