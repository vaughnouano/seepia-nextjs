export const cameras = [
  {
    slug: "g7x-mark-iii",
    name: "G7X – Mark III",
    badge: "Personal Favorite",
    description:
      "Its compact, premium design makes it perfect for Instagram, TikTok, travel, lifestyle content, and timeless memories.",
    image: "/equipment-mock/g7x-mark-iii.png",
  },
  {
    slug: "osmo-pocket-4",
    name: "OSMO Pocket 4",
    badge: "NEW · FULL SET",
    description: "Ultra-portable 4K/240fps gimbal camera",
    image: "/equipment-mock/osmo-pocket-4.png",
  },
  {
    slug: "fz55-pixpro",
    name: "FZ55 – PIXPRO",
    badge: "Classic",
    description:
      "One-touch HD video, 28mm wide-angle lens and a host of features and shooting modes",
    image: "/equipment-mock/fz55-pixpro.png",
  },
];

// helper — used constantly across calendar/booking pages
export function getCameraBySlug(slug) {
  return cameras.find((camera) => camera.slug === slug) ?? null;
}
