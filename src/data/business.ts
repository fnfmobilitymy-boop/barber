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
  {
    name: "Signature Haircut",
    category: "THE ESSENTIAL",
    description:
      "Tailored cuts crafted around your face shape, lifestyle, and personal style.",
    price: null,
    image: "signature-service",
  },
  {
    name: "Skin Fade",
    category: "THE DETAIL",
    description: "Sharp transitions, seamless blends, and precise finishing.",
    price: null,
    image: "fade-service",
  },
  {
    name: "Beard Sculpting",
    category: "THE FINISH",
    description: "Professional shaping, detailing, and refinement.",
    price: null,
    image: "beard-service",
  },
  {
    name: "The Complete Experience",
    category: "THE RITUAL",
    description:
      "A personalized grooming session combining haircut and beard styling.",
    price: null,
    image: "complete-service",
  },
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
