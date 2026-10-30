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
    image: "craft-study",
  },
  {
    name: "Skin Fade",
    category: "THE DETAIL",
    description: "Sharp transitions, seamless blends, and precise finishing.",
    price: null,
    image: "fade-study",
  },
  {
    name: "Beard Sculpting",
    category: "THE FINISH",
    description: "Professional shaping, detailing, and refinement.",
    price: null,
    image: "detail-study",
  },
  {
    name: "The Complete Experience",
    category: "THE RITUAL",
    description:
      "A personalized grooming session combining haircut and beard styling.",
    price: null,
    image: "complete-study",
  },
];
export const gallery = [
  {
    image: "fade-study",
    category: "Skin Fade",
    title: "The clean finish",
  },
  {
    image: "craft-study",
    category: "Classic",
    title: "A timeless ritual",
  },
  {
    image: "detail-study",
    category: "Beard",
    title: "Details make the difference",
  },
  {
    image: "complete-study",
    category: "Textured",
    title: "Individual by design",
  },
];
export const photo = (id: string, _width = 1000) => `${import.meta.env.BASE_URL}images/${id}.svg`;
