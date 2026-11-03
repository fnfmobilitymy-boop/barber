import { shopPhotos } from "../data/shopPhotos";

export function ShopPhoto({ id, className = "" }: { id: string; className?: string }) {
  const photo = shopPhotos.find((item) => item.id === id)!;
  return <img className={className} data-shop-photo={photo.id} src={`${import.meta.env.BASE_URL}${photo.src}`} alt={photo.alt} loading="lazy" decoding="async" />;
}
