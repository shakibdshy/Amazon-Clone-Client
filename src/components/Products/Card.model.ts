import { ProductDocument } from "./Product.model";

export interface CartItem extends ProductDocument {
    quantity: number;
}

export type Cart = CartItem[];