export const business = {
  name: "THE HUSTLE BARBER CLUB", // Editable concept name; confirm before launch.
  bookingUrl: "",
  whatsappNumber: "",
  email: "",
  address: "",
  hours: "",
  socials: { instagram: "", tiktok: "", facebook: "" },
};
export const bookingHref =
  business.bookingUrl ||
  (business.whatsappNumber
    ? `https://wa.me/${business.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hi, I'd like to book a haircut. Could you share your available slots?")}`
    : "#booking");
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
