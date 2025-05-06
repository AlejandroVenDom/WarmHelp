import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UseStateService } from './use-state.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CartItem } from '../interfaces/cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems$ = new BehaviorSubject<CartItem[]>([]);
  private cartSidebarVisible$ = new BehaviorSubject<boolean>(false);
  private currentCartId: number | null = null;

  private cartUrl = `${environment.apiUrl}/carts`;
  private cartItemsUrl = `${environment.apiUrl}/carts/items`;

  constructor(
    private http: HttpClient,
    private useState: UseStateService
  ) {}

  getCartSidebarVisibility() {
    return this.cartSidebarVisible$.asObservable();
  }

  toggleCart() {
    this.cartSidebarVisible$.next(!this.cartSidebarVisible$.value);
  }

  getCartItems() {
    return this.cartItems$.asObservable();
  }

  loadUserCartFromBackend(): void {
    const userId = this.useState.getUserId();
    const username = this.useState.getUsername();
    if (!userId || !username) return;

    this.http.get<any[]>(this.cartUrl).subscribe(carts => {
      const userCart = carts.find(c => c.userName === username);
      if (userCart) {
        this.currentCartId = userCart.cartId;
        this.cartItems$.next(userCart.items);
      } else {
        const body = { userInfoId: userId, cartItemsIds: [] };
        this.http.post(this.cartUrl, body).subscribe((newCart: any) => {
          this.currentCartId = newCart.cartId;
          this.cartItems$.next([]);
        });
      }
    });
  }

  addToCart(service: any, quantity: number = 1) {
    if (this.currentCartId === null) return;

    const dto = {
      cartId: this.currentCartId,
      serviceId: service.id,
      quantity: quantity
    };

    this.http.post(`${this.cartUrl}/${this.currentCartId}/add-item`, dto).subscribe(() => {
      this.loadUserCartFromBackend();
    });
  }

  removeItem(cartItemId: number) {
    if (this.currentCartId === null) return;

    this.http.delete(`${this.cartUrl}/${this.currentCartId}/items/${cartItemId}`).subscribe(() => {
      this.loadUserCartFromBackend();
    });
  }
  updateItemQuantity(cartItemId: number, newQuantity: number) {
    if (this.currentCartId === null) return;

    const dto = { quantity: newQuantity };

    this.http.patch(`${this.cartItemsUrl}/${cartItemId}/quantity`, dto).subscribe(() => {
      this.loadUserCartFromBackend();
    });
  }
  clearCartLocally() {
    this.cartItems$.next([]);
  }
}
