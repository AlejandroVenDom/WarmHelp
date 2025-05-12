import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UseStateService } from '../../services/auth/use-state.service';
import { CartService } from '../../services/auth/cart.service';
import { filter, take, switchMap } from 'rxjs';

@Component({
  selector: 'app-payment-success',
  standalone: false,
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss'
})
export class PaymentSuccessComponent implements OnInit {
  sessionId: string|null = null;
  email: string|null = null;

  constructor(private route: ActivatedRoute, private useStateService: UseStateService,private cartService: CartService) {}

  ngOnInit(): void {
  this.route.queryParamMap.subscribe((params) => {
    this.sessionId = params.get('session_id');
    this.email = this.useStateService.getEmail();

    this.cartService.loadUserCartFromBackend();

    this.cartService.getCartItems()
      .pipe(
        filter(items => !!this.sessionId && items.length > 0),
        take(1), // solo ejecuta una vez
        switchMap(() => {
          return this.cartService.clearCartFromBackendAsObservable(); // deberías devolver el observable
        })
      )
      .subscribe(() => {
        console.log('Carrito vaciado tras el pago.');
      });
  });
  }
}
