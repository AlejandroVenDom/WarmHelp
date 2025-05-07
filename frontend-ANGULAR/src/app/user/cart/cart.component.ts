import { Component, OnInit } from '@angular/core';
import { UseStateService } from '../../services/auth/use-state.service';
import { CartService } from '../../services/auth/cart.service';
import { CartItem } from '../../services/interfaces/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  visible = false;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.loadUserCartFromBackend();
    this.cartService.getCartItems().subscribe(items => this.cartItems = items);
    this.cartService.getCartSidebarVisibility().subscribe(v => this.visible = v);
  }

  get total(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
  }

  remove(cartItemId: number) {
    this.cartService.removeItem(cartItemId);
  }

  close() {
    this.cartService.toggleCart();
  }

  checkout() {
    this.close();
    this.router.navigate(['/stripe-pay']);
  }

  increaseQuantity(item: CartItem) {
    const newQty = item.quantity + 1;
    this.cartService.updateItemQuantity(item.cartItemId!, newQty);
    this.animateQty(item.cartItemId!);
  }

  decreaseQuantity(item: CartItem) {
    const newQty = item.quantity - 1;
    if (newQty <= 0) {
      this.remove(item.cartItemId!);
    } else {
      this.cartService.updateItemQuantity(item.cartItemId!, newQty);
    }
    this.animateQty(item.cartItemId!);
  }

  private animateQty(id: number) {
    const el = document.getElementById('qty-' + id);
    if (el) {
      el.classList.add('updated');
      setTimeout(() => el.classList.remove('updated'), 400);
    }
  }
}
