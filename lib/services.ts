// PLACEHOLDER menu and prices (KES). Replace with the salon's real list.

export type ServiceItem = { name: string; price: string; note?: string };
export type ServiceGroup = { title: string; items: ServiceItem[] };

export const services: Record<"women" | "men", ServiceGroup[]> = {
  women: [
    {
      title: "Hair",
      items: [
        { name: "Wash and blow-dry", price: "600" },
        { name: "Silk press", price: "2,500" },
        { name: "Braids and twists", price: "from 1,500" },
        { name: "Deep conditioning treatment", price: "1,500" },
        { name: "Relaxer touch-up", price: "2,000" },
      ],
    },
    {
      title: "Nails",
      items: [
        { name: "Classic manicure", price: "800" },
        { name: "Classic pedicure", price: "1,000" },
        { name: "Gel polish", price: "1,200" },
        { name: "Acrylic full set", price: "2,500" },
        { name: "Nail art", price: "from 300", note: "per nail design" },
      ],
    },
    {
      title: "Face and brows",
      items: [
        { name: "Express facial", price: "1,500" },
        { name: "Deep-cleanse facial", price: "2,500" },
        { name: "Brow shaping", price: "500" },
        { name: "Lash lift", price: "2,500" },
        { name: "Makeup application", price: "3,000" },
      ],
    },
  ],
  men: [
    {
      title: "Hair and beard",
      items: [
        { name: "Haircut", price: "400" },
        { name: "Haircut and beard trim", price: "600" },
        { name: "Beard shape-up", price: "300" },
        { name: "Hot towel shave", price: "500" },
        { name: "Kids' cut", price: "300" },
      ],
    },
    {
      title: "Skin",
      items: [
        { name: "Facial scrub", price: "800" },
        { name: "Deep-cleanse facial", price: "2,000" },
        { name: "Back and shoulder scrub", price: "1,200" },
      ],
    },
    {
      title: "Hands and feet",
      items: [
        { name: "Manicure", price: "700" },
        { name: "Pedicure", price: "900" },
        { name: "Foot scrub and massage", price: "1,200" },
      ],
    },
  ],
};
