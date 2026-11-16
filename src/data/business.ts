export type ShopLocation = {
  id: string;
  name: string;
  label: string;
  address: string;
  hours: string | null;
  bookingUrl?: string;
  mapsUrl?: string;
};

export const locations: ShopLocation[] = [
  {
    id: "petaling-jaya",
    name: "Petaling Jaya · Seksyen 14",
    label: "MAIN BRANCH · SHOP 01",
    address: "5B, Jalan 14/20, Seksyen 14, 46100 Petaling Jaya, Selangor",
    hours: "10:00–21:00",
    bookingUrl: "https://spartansbarbershop.setmore.com/",
  },
  {
    id: "taman-medan",
    name: "Taman Medan",
    label: "SECOND BRANCH · SHOP 02",
    address: "B3-4-1, Jalan PJS 3/11C, Taman JRK Delta, 46000 Petaling Jaya, Selangor",
    hours: null,
    bookingUrl: "https://spartansbarbershopsb02.setmore.com/",
    mapsUrl: "https://share.google/F8jnjL6oJDZ10VNNe",
  },
  {
    id: "bandar-saujana-putra",
    name: "Bandar Saujana Putra",
    label: "THIRD BRANCH · SHOP 03",
    address: "36-1, Jalan SP 1/2, Bandar Saujana Putra, 42610 Jenjarom, Selangor",
    hours: null,
    bookingUrl: "https://spartansbarbershopsb03.setmore.com/",
  },
];

// Query URLs work on static GitHub Pages and can be opened directly or refreshed.
export const branchHref = (id: string) => `${import.meta.env.BASE_URL}?branch=${encodeURIComponent(id)}`;
export const activeBranch = locations.find((location) => location.id === new URLSearchParams(window.location.search).get("branch"));
export const visibleLocations = activeBranch ? [activeBranch] : locations;

export const googleMapsHref = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export const business = {
  name: "SPARTANS BARBERSHOP",
  bookingUrl: activeBranch?.bookingUrl ?? "",
  whatsappNumber: "+60146277166",
  email: "spartansbarbershophq@gmail.com",
  address: locations[0].address,
  hours: locations[0].hours,
  socials: {
    instagram: "https://www.instagram.com/_spartansbarbershop/",
    tiktok: "https://www.tiktok.com/@spartansbarbershop",
    facebook: "https://www.facebook.com/p/Spartans-Barbershop-100086754182552/",
  },
};
export const whatsappHref =
  `https://wa.me/${business.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi Spartans, I'd like to book a haircut${activeBranch ? ` at ${activeBranch.name}` : ""}. Could you share your available barbers, dates and times?`)}`;
export const bookingHref = activeBranch ? (activeBranch.bookingUrl || whatsappHref) : "#branches";
