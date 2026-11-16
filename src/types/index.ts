export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

export interface User {
  email: string;
  name: string;
}
