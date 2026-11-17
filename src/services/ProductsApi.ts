import { Product } from "../types";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("https://dummyjson.com/products?limit=100");

  if (!res.ok) {
    throw new Error("Couldn't load products");
  }

  const json = await res.json();

  return json.products.map((p: any) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    image: p.thumbnail,
    category: p.category,
    rating: p.rating,
  }));
}
