import type { MenuItem } from "./serviceMenu";

// Main branch menu supplied by the owner, kept separate from Taman Medan.
export const mainBranchMenu: { id: string; name: string; items: MenuItem[] }[] = [
  { id: "haircut", name: "HAIRCUT", items: [
    { name: "HAIRCUT", minutes: 30, price: 35, description: "Get a fresh, stylish cut tailored to your look and personality. Every haircut includes a complimentary hair wash before or after your service for a clean, comfortable, and refreshing experience. Perfect finish with expert styling to keep you looking sharp and confident." },
    { name: "HAIRCUT & WASH", minutes: 30, price: 40 },
    { name: "HAIRCUT KID (<4Y)", minutes: 30, price: 30, description: "A gentle and patient haircut experience designed for little ones under 6 years old. Our stylists make sure your child feels comfortable while getting a neat and tidy cut that’s easy to manage — with extra care, smiles, and a fun experience throughout." },
    { name: "BEARD GROOMING", minutes: 20, price: 15, description: "Shape, trim, and define your beard to perfection. This service includes precise detailing, contouring, and cleanup for a clean, well-groomed finish. Completed with nourishing beard oil or balm to keep your facial hair soft, healthy, and stylish." },
    { name: "PREMIUM STEAM SHAVE", minutes: 25, price: 25, description: "Experience the ultimate traditional shave with a modern touch. This service includes a relaxing steam treatment to open pores, followed by a precise hot towel shave using premium shaving cream and aftershave balm. Leaves your skin smooth, refreshed, and irritation-free — the perfect grooming ritual for a clean, polished look." },
  ] },
  { id: "colour", name: "HAIR COLOUR", items: [
    { name: "FULL HAIR COLOUR", minutes: 30, price: 180, description: "Price starts from RM180 - 250 depending on hair length and choice of colour and if bleaching required" },
    { name: "HIGHLIGHTS", minutes: 30, price: 150, description: "Price starts from RM150 - 250 depending on hair length and choice of colour and if bleaching required" },
    { name: "BLACK DYE - QUICK TOUCH", minutes: 30, price: 30, description: "BLACK DYE USING QUICK TOUCH COLOURS" },
  ] },
  { id: "treatment", name: "HAIR TREATMENT", items: [
    { name: "SCALP TREATMENT", minutes: 20, price: 40, description: "Revive your scalp and promote healthy hair growth with our deep-cleansing and nourishing scalp treatment. Designed to remove buildup, excess oil, and dandruff while improving blood circulation. Includes a relaxing scalp massage for a refreshed, balanced, and revitalized feeling." },
    { name: "SCALP TREATMENT & HAIRCUT", minutes: 50, price: 70, description: "Get the best of both worlds — a professional haircut paired with a deep-cleansing scalp treatment. This combo removes buildup, refreshes your scalp, and promotes healthy hair while giving you a sharp, stylish cut. Finished with a relaxing massage and premium wash for a clean, confident look." },
    { name: "SCALP TREATMENT, HAIRCUT & PREMIUM FACIAL", minutes: 60, price: 90, description: "The ultimate grooming experience from head to face. Enjoy a refreshing scalp treatment to cleanse and rejuvenate, followed by a precision haircut for a sharp, confident look. Complete the session with our premium facial to exfoliate, hydrate, and brighten your skin — leaving you fully refreshed, clean, and revitalized." },
    { name: "HAIR INTENSIVE TREATMENT", minutes: 30, price: 90, description: "Repair and strengthen damaged or dry hair with our nourishing intensive treatment. Infused with premium ingredients to restore moisture, smoothness, and shine, this treatment deeply revitalizes your hair from root to tip — leaving it softer, healthier, and more manageable." },
    { name: "PERM TREATMENT", minutes: 60, price: 150 },
  ] },
  { id: "other", name: "OTHER SERVICES", items: [
    { name: "PREMIUM HAIR WASH", minutes: 20, price: 15, description: "Indulge in a refreshing scalp cleanse with premium shampoo and conditioner, followed by a soothing scalp massage that promotes relaxation and healthy hair growth. Perfect as a quick refresh or before any haircut or treatment — leaving your hair soft, clean, and revitalized." },
    { name: "FACIAL SCRUB", minutes: 20, price: 25, description: "Revitalize your skin with a deep-cleansing facial scrub designed to remove dead skin cells, unclog pores, and restore a healthy glow. This treatment refreshes tired skin, leaving your face smoother, cleaner, and more energized — the perfect add-on after a haircut or shave." },
    { name: "FACE MASK", minutes: 20, price: 20, description: "Rehydrate and rejuvenate your skin with our soothing face mask treatment. Helps to tighten pores, reduce oil, and refresh your complexion after shaving or a long day. Leaves your skin feeling clean, cool, and deeply nourished." },
    { name: "HAIRSTYLING", minutes: 20, price: 20, description: "Finish your look with expert hairstyling tailored to your desired vibe — classic, modern, or trendy. Our barbers use premium products and precise techniques to shape, set, and style your hair perfectly for any occasion." },
    { name: "HEAD MASSAGE", minutes: 20, price: 20, description: "Unwind with a soothing head massage that relieves stress, improves blood circulation, and promotes healthy hair growth. Using gentle pressure and relaxing techniques, this treatment helps you relax your mind and rejuvenate your scalp — a perfect add-on after a haircut or hair wash." },
    { name: "PREMIUM FACIAL (SCRUB & MASK)", minutes: 30, price: 40, description: "Refresh and restore your skin with a complete facial treatment that combines deep exfoliation and hydration. The facial scrub removes dirt and dead skin cells, while the nourishing mask rejuvenates and tightens your skin for a smooth, healthy glow. Ideal after a shave or haircut — leaving you fresh, clean, and confident." },
    { name: "PREMIUM FACIAL (5 STEP)", minutes: 40, price: 60, description: "Experience the ultimate skin care treatment with our 5-step premium facial. This complete process includes cleansing, exfoliation, steaming, mask application, and moisturizing — designed to deeply cleanse, refresh, and nourish your skin. Perfect for removing impurities and restoring a healthy, radiant glow after a long day." },
    { name: "WAXING (FACE/NOSE/EARS)", minutes: 20, price: 15, description: "Get a clean, polished look with our gentle waxing service for unwanted facial and ear hair. Perfect for removing fine or stubborn hair from the face, nose, or ears — leaving your skin smooth and refreshed. Quick, precise, and comfortable for long-lasting results." },
    { name: "BLACK DYE - QUICK TOUCH", minutes: 30, price: 30, description: "Perfect for covering light greys or refreshing faded color in no time. This quick touch-up service restores your natural black tone, giving your hair a clean, sharp, and youthful look — ideal between full coloring sessions." },
  ] },
  { id: "packages", name: "SPARTANS PACKAGES", items: [
    { name: "BASIC PACKAGE", minutes: 30, price: 45, description: "- HAIRCUT\n- PREMIUM HAIRWASH" },
    { name: "CLASSIC PACKAGE", minutes: 40, price: 60, description: "HAIRCUT, PREMIUM HAIRWASH & BEARD GROOMING" },
    { name: "PREMIUM PACKAGE", minutes: 60, price: 75, description: "HAIRCUT, PREMIUM HAIR WASH, BEARD GROOMING & SCRUB / MASK" },
    { name: "ULTIMATE PACKAGE", minutes: 80, price: 115, description: "HAIRCUT, PREMIUM HAIR WASH, BEARD GROOMING, FACE SCRUB/MASK & HEAD MASSAGE" },
    { name: "ROYAL PACKAGE", minutes: 100, price: 125, description: "HAIRCUT, PREMIUM HAIR WASH, BEARD GROOMING + STEAM, PREMIUM FACIAL (5 STEP) & HEAD MASSAGE" },
  ] },
];
