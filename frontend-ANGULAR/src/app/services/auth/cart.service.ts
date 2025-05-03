import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UseStateService } from './use-state.service';

export interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  tax: number;
  currencyType: 'USD' | 'EUR' | 'JPY';
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private cartVisibleSubject = new BehaviorSubject<boolean>(false);
  private readonly STORAGE_KEY_PREFIX = 'warmhelp_cart_';
  private currentUsername: string | null = null;

  cart$ = this.cartSubject.asObservable();
  cartVisible$ = this.cartVisibleSubject.asObservable();

  constructor(private useStateService: UseStateService) {
    const username = this.useStateService.getUsername();
    if (username) {
      this.currentUsername = username;
      this.loadCartFromStorage();
    }
  }


  toggleCart(): void {
    const current = this.cartVisibleSubject.getValue();
    this.cartVisibleSubject.next(!current);
  }

  showCart(): void {
    this.cartVisibleSubject.next(true);
  }

  hideCart(): void {
    this.cartVisibleSubject.next(false);
  }

  addToCart(product: Omit<CartItem, 'quantity'>, quantity: number = 1): void {
    const existing = this.cartItems.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cartItems.push({ ...product, quantity });
    }
    this.updateCartState();
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const item = this.cartItems.find(p => p.id === productId);
    if (item) {
      item.quantity = quantity;
      this.updateCartState();
    }
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateCartState();
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCartState();
  }

  private updateCartState(): void {
    this.cartSubject.next([...this.cartItems]);
    this.saveCartToStorage();
  }

  private getStorageKey(): string {
    return `${this.STORAGE_KEY_PREFIX}${this.currentUsername || 'anonimo'}`;
  }


  private loadCartFromStorage(): void {
    const key = this.getStorageKey();
    const storedCart = localStorage.getItem(key);
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
    this.cartSubject.next([...this.cartItems]);
  }

  private saveCartToStorage(): void {
    const key = this.getStorageKey();
    localStorage.setItem(key, JSON.stringify(this.cartItems));
  }
}
