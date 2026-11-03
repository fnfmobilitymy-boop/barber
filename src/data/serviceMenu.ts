export type MenuItem = {
  name: string;
  nameMs: string;
  minutes: number;
  price: number;
  description?: string;
  descriptionMs?: string;
  includes?: string[];
  includesMs?: string[];
};
export const serviceMenu: { id: string; name: string; nameMs: string; items: MenuItem[] }[] = [
  {
    id: "haircut", name: "Haircut", nameMs: "Potongan rambut",
    items: [
      { name: "HAIRCUT", nameMs: "Potongan rambut", minutes: 30, price: 25, description: "Get a fresh, stylish cut tailored to your look and personality. Every haircut includes a complimentary hair wash before or after your service for a clean, comfortable, and refreshing experience. Perfect finish with expert styling to keep you looking sharp and confident.", descriptionMs: "Potongan rambut segar dan bergaya mengikut penampilan serta personaliti anda. Setiap potongan termasuk cucian rambut percuma sebelum atau selepas servis untuk pengalaman yang bersih, selesa dan menyegarkan, diakhiri dengan penggayaan profesional." },
      { name: "HAIRCUT & QUICK WASH", nameMs: "Potongan rambut & cucian ringkas", minutes: 30, price: 30 },
      { name: "HAIRCUT KID (<12Y)", nameMs: "Potongan rambut kanak-kanak bawah 12 tahun", minutes: 30, price: 15 },
      { name: "BEARD GROOMING", nameMs: "Dandanan janggut", minutes: 20, price: 10 },
      { name: "PREMIUM STEAM SHAVE", nameMs: "Cukuran wap premium", minutes: 25, price: 20 },
    ],
  },
  {
    id: "colour", name: "Hair colour", nameMs: "Pewarnaan rambut",
    items: [
      { name: "FULL HAIR COLOUR", nameMs: "Pewarnaan rambut penuh", minutes: 60, price: 180 },
      { name: "HIGHLIGHTS", nameMs: "Sorotan warna rambut", minutes: 60, price: 150 },
      { name: "BLACK DYE - QUICK TOUCH", nameMs: "Pewarna hitam — sentuhan ringkas", minutes: 30, price: 25 },
    ],
  },
  {
    id: "treatment", name: "Hair treatment", nameMs: "Rawatan rambut",
    items: [
      { name: "SCALP TREATMENT", nameMs: "Rawatan kulit kepala", minutes: 30, price: 35 },
      { name: "SCALP TREATMENT & HAIRCUT", nameMs: "Rawatan kulit kepala & potongan rambut", minutes: 50, price: 50 },
      { name: "SCALP TREATMENT, HAIRCUT & PREMIUM FACIAL", nameMs: "Rawatan kulit kepala, potongan rambut & rawatan wajah premium", minutes: 60, price: 80 },
      { name: "HAIR INTENSIVE TREATMENT", nameMs: "Rawatan rambut intensif", minutes: 30, price: 70 },
      { name: "PERM TREATMENT", nameMs: "Rawatan pengeritingan rambut", minutes: 60, price: 150 },
    ],
  },
  {
    id: "packages", name: "Spartans packages", nameMs: "Pakej Spartans",
    items: [
      { name: "BASIC", nameMs: "Pakej Basic", minutes: 30, price: 35, includes: ["Haircut", "Premium hair wash"], includesMs: ["Potongan rambut", "Cucian rambut premium"] },
      { name: "CLASSIC", nameMs: "Pakej Classic", minutes: 40, price: 45, includes: ["Haircut", "Premium hair wash", "Beard grooming"], includesMs: ["Potongan rambut", "Cucian rambut premium", "Dandanan janggut"] },
      { name: "PREMIUM", nameMs: "Pakej Premium", minutes: 60, price: 65, includes: ["Haircut", "Premium hair wash", "Beard grooming", "Face scrub / face mask"], includesMs: ["Potongan rambut", "Cucian rambut premium", "Dandanan janggut", "Skrub wajah / masker wajah"] },
      { name: "ULTIMATE", nameMs: "Pakej Ultimate", minutes: 80, price: 80, includes: ["Haircut", "Premium hair wash", "Beard grooming", "Face scrub / face mask", "Head massage"], includesMs: ["Potongan rambut", "Cucian rambut premium", "Dandanan janggut", "Skrub wajah / masker wajah", "Urutan kepala"] },
      { name: "ROYAL", nameMs: "Pakej Royal", minutes: 100, price: 100, includes: ["Haircut", "Premium hair wash", "Beard grooming + steam", "Head massage", "Premium facial (5 step)"], includesMs: ["Potongan rambut", "Cucian rambut premium", "Dandanan janggut + wap", "Urutan kepala", "Rawatan wajah premium (5 langkah)"] },
    ],
  },
];
