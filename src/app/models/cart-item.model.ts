// src/app/models/cart-item.model.ts
import { Article } from './article.model';

export interface CartItem extends Article {
  quantity: number;
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  images: string[];
}
