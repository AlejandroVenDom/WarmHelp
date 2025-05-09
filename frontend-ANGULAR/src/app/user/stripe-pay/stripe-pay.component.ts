import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/auth/cart.service';
import { CartItem } from '../../services/interfaces/cart';

@Component({
  selector: 'app-stripe-pay',
  standalone: false,
  templateUrl: './stripe-pay.component.html',
  styleUrl: './stripe-pay.component.scss'
})
export class StripePayComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => this.cartItems = items);
    this.cartService.loadUserCartFromBackend();
  }

  get total(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
  }
}
