import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../services/auth/cart.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  isCartVisible = false;
  totalAmount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.calculateTotal();
    });

    this.cartService.cartVisible$.subscribe(visible => {
      this.isCartVisible = visible;
    });
  }

  toggleCart(): void {
    this.cartService.toggleCart();
  }

  increaseQuantity(productId: number): void {
    const product = this.cart.find(p => p.id === productId);
    if (product) {
      this.cartService.updateQuantity(productId, product.quantity + 1);
    }
  }

  decreaseQuantity(productId: number): void {
    const product = this.cart.find(p => p.id === productId);
    if (product && product.quantity > 1) {
      this.cartService.updateQuantity(productId, product.quantity - 1);
    }
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  getPrice(product: CartItem): number {
    return product.currencyType === 'EUR'
      ? (product.price + product.tax) * 1.1
      : product.price + product.tax;
  }

  calculateTotal(): void {
    this.totalAmount = this.cart.reduce(
      (sum, item) => sum + this.getPrice(item) * item.quantity,
      0
    );
  }
}
