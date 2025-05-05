import { Component, OnInit } from '@angular/core';
import { UseStateService } from '../../services/auth/use-state.service';
import { CartService } from '../../services/auth/cart.service';
import { CartItem } from '../../services/interfaces/cart';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  visible = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => this.cartItems = items);
    this.cartService.getCartSidebarVisibility().subscribe(v => this.visible = v);
  }

  get total(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
  }

  remove(serviceId: number) {
    this.cartService.removeItem(serviceId);
  }

  close() {
    this.cartService.toggleCart();
  }

  checkout() {
    this.cartService.syncCartToBackend()?.then(() => {
      alert('Carrito enviado con éxito');
      this.cartService.clearCart();
      this.close();
    });
  }
}
