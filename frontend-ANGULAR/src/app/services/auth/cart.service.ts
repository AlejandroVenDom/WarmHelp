import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UseStateService } from './use-state.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CartItem } from '../interfaces/cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartUrl = `${environment.apiUrl}/cart`;
  private cartItemsUrl = `${environment.apiUrl}/cart-items`;
  private cartSidebarVisible$ = new BehaviorSubject<boolean>(false);
  private cartItems$ = new BehaviorSubject<CartItem[]>(this.getLocalCart());

  constructor(
    private http: HttpClient,
    private useState: UseStateService
  ) {}

  createCartItem(dto: { serviceId: number; quantity: number; cartId: number | null }) {
    return this.http.post<any>(`${this.cartItemsUrl}`, dto);
  }

  createCart(dto: { userInfoId: number; cartItemsIds: number[] }) {
    return this.http.post<any>(`${this.cartUrl}`, dto);
  }

  // Visibilidad del sidebar
  getCartSidebarVisibility() {
    return this.cartSidebarVisible$.asObservable();
  }

  toggleCart() {
    this.cartSidebarVisible$.next(!this.cartSidebarVisible$.value);
  }

  // Obtener estado del carrito
  getCartItems() {
    return this.cartItems$.asObservable();
  }

  private getLocalCart(): CartItem[] {
    const data = localStorage.getItem('warmhelp_cart');
    return data ? JSON.parse(data) : [];
  }

  private saveLocalCart(items: CartItem[]) {
    localStorage.setItem('warmhelp_cart', JSON.stringify(items));
    this.cartItems$.next(items);
  }

  addToCart(service: any, quantity: number = 1) {
    const existing = this.getLocalCart();
    const existingItem = existing.find(item => item.serviceId === service.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.totalPrice = existingItem.quantity * existingItem.priceUd;
    } else {
      const newItem: CartItem = {
        serviceId: service.id,
        quantity,
        priceUd: service.price,
        totalPrice: quantity * service.price,
        image: service.image,
        currency: service.currencyType,
        serviceTitle: service.title
      };
      existing.push(newItem);
    }

    this.saveLocalCart(existing);
  }

  removeItem(serviceId: number) {
    const filtered = this.getLocalCart().filter(i => i.serviceId !== serviceId);
    this.saveLocalCart(filtered);
  }

  clearCart() {
    localStorage.removeItem('warmhelp_cart');
    this.cartItems$.next([]);
  }

  syncCartToBackend() {
    const userId = this.useState.getUserId();
    if (!userId) return;

    const cartItems = this.getLocalCart();
    const creationRequests = cartItems.map(item =>
      this.http.post(`${this.cartItemsUrl}`, {
        serviceId: item.serviceId,
        quantity: item.quantity,
        cartId: null
      })
    );

    return Promise.all(creationRequests).then((responses: any[]) => {
      const ids = responses.map(res => res.cartItemId);
      return this.http.post(`${this.cartUrl}`, {
        userInfoId: userId,
        cartItemsIds: ids
      }).toPromise();
    });
  }
}
