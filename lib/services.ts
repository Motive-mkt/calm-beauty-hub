// Services and prices (KES), taken from the salon's own handwritten price list.

export type ServiceItem = { name: string; price: string; note?: string };
export type ServiceGroup = { title: string; items: ServiceItem[] };

export const services: ServiceGroup[] = [
  {
    title: "Nails",
    items: [
      { name: "Plain gel", price: "500" },
      { name: "Tips and gel", price: "700" },
      { name: "French tips", price: "1,000" },
      { name: "Builder gel", price: "800" },
      { name: "Builder gel with French", price: "1,100" },
    ],
  },
  {
    title: "Feet",
    items: [
      { name: "Pedicure", price: "800" },
      { name: "Pedigel", price: "1,000" },
      { name: "Toe gel", price: "400" },
      { name: "Toe gel with French", price: "500" },
    ],
  },
  {
    title: "Grooming",
    items: [
      { name: "Shaving", price: "300" },
      { name: "Dyeing", price: "300" },
    ],
  },
  {
    title: "Face and brows",
    items: [
      { name: "Facial scrubbing", price: "500" },
      { name: "Facial steaming", price: "1,500" },
      { name: "Eyelashes", price: "800" },
      { name: "Eyebrow shaping", price: "100" },
    ],
  },
  {
    title: "Massage",
    items: [
      { name: "Full body massage", price: "3,000" },
      { name: "Half body massage", price: "2,000" },
    ],
  },
];
