import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/auth/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  isCartVisible = false;
  totalAmount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.calculateTotal();
    });

    this.cartService.cartVisible$.subscribe(visible => {
      this.isCartVisible = visible;
    });
  }

  toggleCart() {
    this.cartService.toggleCart();
  }

  increaseQuantity(productId: number) {
    this.cartService.updateQuantity(productId, this.cart.find(p => p.id === productId)?.quantity + 1 || 1);
  }

  decreaseQuantity(productId: number) {
    this.cartService.updateQuantity(productId, this.cart.find(p => p.id === productId)?.quantity - 1 || 0);
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }
  calculateTotal() {
    this.totalAmount = this.cart.reduce((acc, product) => {
      const priceInUSD = product.currency === 'EUR' ? product.price * 1.10 + product.tax * 1.10 : product.price + product.tax;
      return acc + priceInUSD * product.quantity;
    }, 0);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
