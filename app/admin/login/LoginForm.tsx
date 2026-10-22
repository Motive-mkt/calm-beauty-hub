"use client";

import { useActionState } from "react";
import { login } from "../actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="adm-form">
      <label className="adm-field">
        <span>Password</span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
          autoFocus
          aria-describedby={state?.error ? "login-error" : undefined}
        />
      </label>
      {state?.error ? (
        <p id="login-error" role="alert" className="adm-alert adm-alert--error">
          {state.error}
        </p>
      ) : null}
      <button type="submit" className="btn btn--rose btn--block" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
