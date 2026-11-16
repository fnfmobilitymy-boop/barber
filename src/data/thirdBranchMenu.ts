import type { MenuItem } from "./serviceMenu";

// Branch 03 menu supplied by the owner, including its free meeting slots.
export const thirdBranchMenu: { id: string; name: string; items: MenuItem[] }[] = [
  { id: "haircut", name: "HAIRCUT", items: [
    { name: "HAIRCUT", minutes: 30, price: 25 },
    { name: "HAIRCUT & QUICK WASH", minutes: 30, price: 30 },
    { name: "HAIRCUT KID (<12Y)", minutes: 30, price: 15 },
    { name: "BEARD GROOMING", minutes: 20, price: 10 },
    { name: "PREMIUM STEAM SHAVE", minutes: 25, price: 20 },
  ] },
  { id: "colour", name: "HAIR COLOUR", items: [
    { name: "BLACK DYE - QUICK TOUCH", minutes: 30, price: 25 },
    { name: "HIGHLIGHTS", minutes: 60, price: 150 },
    { name: "FULL HAIR COLOUR", minutes: 60, price: 180 },
  ] },
  { id: "treatment", name: "HAIR TREATMENT", items: [
    { name: "HAIR INTENSIVE TREATMENT", minutes: 30, price: 70 },
    { name: "SCALP TREATMENT, HAIRCUT & PREMIUM FACIAL", minutes: 60, price: 80 },
    { name: "SCALP TREATMENT & HAIRCUT", minutes: 50, price: 50 },
    { name: "SCALP TREATMENT", minutes: 30, price: 35 },
    { name: "PERM TREATMENT", minutes: 60, price: 150 },
  ] },
  { id: "packages", name: "SPARTANS PACKAGES", items: [
    { name: "ROYAL", minutes: 100, price: 100 },
    { name: "ULTIMATE", minutes: 80, price: 80 },
    { name: "PREMIUM", minutes: 60, price: 65 },
    { name: "CLASSIC", minutes: 40, price: 45 },
    { name: "BASIC", minutes: 30, price: 35 },
  ] },
  { id: "other", name: "Other", items: [
    { name: "15 Minutes Meeting", minutes: 15, price: 0 },
    { name: "30 Minutes Meeting", minutes: 30, price: 0 },
    { name: "1 Hour Meeting", minutes: 60, price: 0 },
  ] },
];
