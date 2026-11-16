export type MenuItem = {
  name: string;
  minutes: number;
  price: number;
  description?: string;
  includes?: string[];
};
export const serviceMenu: { id: string; name: string; items: MenuItem[] }[] = [
  {
    id: "haircut", name: "Haircut",
    items: [
      { name: "HAIRCUT", minutes: 30, price: 25, description: "Get a fresh, stylish cut tailored to your look and personality. Every haircut includes a complimentary hair wash before or after your service for a clean, comfortable, and refreshing experience. Perfect finish with expert styling to keep you looking sharp and confident." },
      { name: "HAIRCUT & QUICK WASH", minutes: 30, price: 30 },
      { name: "HAIRCUT KID (<12Y)", minutes: 30, price: 15 },
      { name: "BEARD GROOMING", minutes: 20, price: 10 },
      { name: "PREMIUM STEAM SHAVE", minutes: 25, price: 20 },
    ],
  },
  {
    id: "colour", name: "Hair colour",
    items: [
      { name: "FULL HAIR COLOUR", minutes: 60, price: 180 },
      { name: "HIGHLIGHTS", minutes: 60, price: 150 },
      { name: "BLACK DYE - QUICK TOUCH", minutes: 30, price: 25 },
    ],
  },
  {
    id: "treatment", name: "Hair treatment",
    items: [
      { name: "SCALP TREATMENT", minutes: 30, price: 35 },
      { name: "SCALP TREATMENT & HAIRCUT", minutes: 50, price: 50 },
      { name: "SCALP TREATMENT, HAIRCUT & PREMIUM FACIAL", minutes: 60, price: 80 },
      { name: "HAIR INTENSIVE TREATMENT", minutes: 30, price: 70 },
      { name: "PERM TREATMENT", minutes: 60, price: 150 },
    ],
  },
  {
    id: "packages", name: "Spartans packages",
    items: [
      { name: "BASIC", minutes: 30, price: 35, description: "Haircut + Premium Hair wash" },
      { name: "CLASSIC", minutes: 40, price: 45, includes: ["Haircut", "Premium Hair Wash", "Beard Grooming"] },
      { name: "PREMIUM", minutes: 60, price: 65, includes: ["Haircut", "Premium Hair Wash", "Beard Grooming", "Face Scrub / Face Mask"] },
      { name: "ULTIMATE", minutes: 80, price: 80, includes: ["Haircut", "Premium Hair Wash", "Beard Grooming", "Face Scrub / Face Mask", "Head Massage"] },
      { name: "ROYAL", minutes: 100, price: 100, includes: ["Haircut", "Premium Hair Wash", "Beard Grooming + Steam", "Head Massage", "Premium Facial (5 Step)"] },
    ],
  },
];
