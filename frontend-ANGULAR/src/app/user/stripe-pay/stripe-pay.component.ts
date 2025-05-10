import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/auth/cart.service';
import { CartItem } from '../../services/interfaces/cart';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';
import { CredentialsService } from '../../services/auth/credentials.service';

@Component({
  selector: 'app-stripe-pay',
  standalone: false,
  templateUrl: './stripe-pay.component.html',
  styleUrl: './stripe-pay.component.scss'
})
export class StripePayComponent implements OnInit {
  cartItems: CartItem[] = [];
  stripe:Stripe | null = null;
  constructor(private cartService: CartService, private credetialsService: CredentialsService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => this.cartItems = items);
    this.cartService.loadUserCartFromBackend();
  
    loadStripe(environment.stripePublicKey).then(stripe => this.stripe = stripe);
  }

  

  get total(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
  }

  payWithStripe(){
    if(this.cartItems.length === 0){
      alert('No tienes productos en el carrito');
      return;
    }
  
    const paymentData = {
      currency:this.cartItems[0].currency || 'EUR',
      amount: this.total * 100,
      serviceName: this.cartItems[0].serviceTitle || 'servicio desconocido',
    };

    this.credetialsService.createCheckoutSession(paymentData).subscribe(
      (response) => {
        if (this.stripe) {
          this.stripe.redirectToCheckout({ sessionId: response.sessionId })
            .then((result: any) => {
              if (result.error) {
                console.log(result.error.message);
              }
            });
        }
      },
      (error) => {
        console.error('Error al crear la sesión de pago:', error);
      }
    );    
    
  }



}
