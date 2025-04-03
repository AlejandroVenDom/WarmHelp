import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart'; // Clave en sessionStorage
  private cart = new BehaviorSubject<any[]>(this.getCartFromSession());
  cart$ = this.cart.asObservable();

  private cartVisible = new BehaviorSubject<boolean>(false);
  cartVisible$ = this.cartVisible.asObservable();

  constructor() {}

  // Obtener carrito de sessionStorage
  private getCartFromSession(): any[] {
    const storedCart = sessionStorage.getItem(this.cartKey);
    return storedCart ? JSON.parse(storedCart) : [];
  }

  // Actualizar sessionStorage y emitir cambios
  private updateSessionStorage(cart: any[]): void {
    sessionStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cart.next(cart);
  }

  getCart(): any[] {
    return this.getCartFromSession();
  }

  addToCart(product: any): void {
    let cart = this.getCartFromSession();
    const index = cart.findIndex(item => item.id === product.id);

    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    this.updateSessionStorage(cart);
  }
  toggleCart() {
    this.cartVisible.next(!this.cartVisible.value);
  }

  updateQuantity(productId: number, quantity: number): void {
    let cart = this.getCartFromSession();
    const index = cart.findIndex(item => item.id === productId);

    if (index !== -1) {
      cart[index].quantity = quantity;
      if (cart[index].quantity <= 0) cart.splice(index, 1);
    }

    this.updateSessionStorage(cart);
  }

  removeFromCart(productId: number): void {
    let cart = this.getCartFromSession();
    cart = cart.filter(item => item.id !== productId);
    this.updateSessionStorage(cart);
  }

  clearCart(): void {
    sessionStorage.removeItem(this.cartKey);
    this.cart.next([]);
  }
}
