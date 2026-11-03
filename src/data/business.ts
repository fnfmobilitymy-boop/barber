export const locations = [
  {
    id: "petaling-jaya",
    name: "Petaling Jaya · Seksyen 14",
    address: "5B, Jalan 14/20, Seksyen 14, 46100 Petaling Jaya, Selangor",
    hours: "10:00–21:00",
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
export const services = [
  { name: "Haircut & grooming", category: "POTONGAN & DANDANAN", description: "Haircuts, quick washes, kids’ cuts, beard grooming and premium steam shaves.", image: "signature-service" },
  { name: "Hair colour", category: "PEWARNAAN RAMBUT", description: "Full hair colour, highlights and quick black dye touch-ups.", image: "fade-service" },
  { name: "Hair treatment", category: "RAWATAN RAMBUT", description: "Scalp care, intensive hair treatments, perm treatments and facial combinations.", image: "beard-service" },
  { name: "Spartans packages", category: "PAKEJ SPARTANS", description: "From Basic to Royal: explore five grooming packages with clearly listed inclusions.", image: "complete-service" },
];
export const gallery = [
  {
    image: "low-fade",
    category: "Skin Fade",
    title: "The low fade",
    description: "A seamless blend. A sharper silhouette.",
  },
  {
    image: "classic-pompadour",
    category: "Classic",
    title: "The modern classic",
    description: "Timeless structure with effortless volume.",
  },
  {
    image: "textured-crop",
    category: "Textured",
    title: "The textured crop",
    description: "Natural movement. Deliberate detail.",
  },
  {
    image: "sculpted-beard",
    category: "Beard",
    title: "The sculpted finish",
    description: "Clean contours. Individual character.",
  },
];
