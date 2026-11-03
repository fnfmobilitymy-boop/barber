export type ShopLocation = {
  id: string;
  name: string;
  label: string;
  address: string;
  hours: string | null;
};

export const locations: ShopLocation[] = [
  {
    id: "petaling-jaya",
    name: "Petaling Jaya · Seksyen 14",
    label: "MAIN BRANCH / CAWANGAN UTAMA",
    address: "5B, Jalan 14/20, Seksyen 14, 46100 Petaling Jaya, Selangor",
    hours: "10:00–21:00",
  },
  {
    id: "bandar-saujana-putra",
    name: "Bandar Saujana Putra",
    label: "BRANCH 02 / CAWANGAN 02",
    address: "36-1, Jalan SP 1/2, Bandar Saujana Putra, 42610 Jenjarom, Selangor",
    hours: null,
  },
];

export const googleMapsHref = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export const business = {
  name: "SPARTANS BARBERSHOP",
  bookingUrl: "https://spartansbarbershopsb02.setmore.com/",
  whatsappNumber: "+60146277166",
  email: "spartansbarbershophq@gmail.com",
  address: locations[0].address,
  hours: locations[0].hours,
  socials: {
    instagram: "https://www.instagram.com/_spartansbarbershop/",
    tiktok: "",
    facebook: "https://www.facebook.com/p/Spartans-Barbershop-100086754182552/",
  },
};
export const whatsappHref =
  `https://wa.me/${business.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Spartans, I'd like to book a haircut. Could you share your available barbers, dates and times?")}`;
export const bookingHref = business.bookingUrl || whatsappHref;
