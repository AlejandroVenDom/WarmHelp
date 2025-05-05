export interface CartItem {
  cartItemId?: number;
  username?: string;
  quantity: number;
  priceUd: number;
  totalPrice?: number;
  serviceId: number;
  serviceTitle?: string;
  serviceDescription?: string;
  image?: string;
  currency?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Cart {
  cartId: number;
  userName: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}
