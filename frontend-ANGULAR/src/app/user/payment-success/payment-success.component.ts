import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UseStateService } from '../../services/auth/use-state.service';
import { CartService } from '../../services/auth/cart.service';
import { filter, take, switchMap } from 'rxjs';
import { PopupService } from '../../services/popup.service';
import { ReviewService, ReviewRequest } from '../../services/review.service';

@Component({
  selector: 'app-payment-success',
  standalone: false,
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss'
})
export class PaymentSuccessComponent implements OnInit {
  sessionId: string | null = null;
  email: string | null = null;
  showReviewModal = false;

  // Reseña
  reviewDescription: string = '';
  selectedCalification: string = 'EXCELENTE';
  purchasedServiceId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private useStateService: UseStateService,
    private cartService: CartService,
    private reviewService: ReviewService,
    private popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.sessionId = params.get('session_id');
      this.email = this.useStateService.getEmail();

      this.cartService.loadUserCartFromBackend();

      this.cartService.getCartItems()
        .pipe(
          filter(items => !!this.sessionId && items.length > 0),
          take(1),
          switchMap((items) => {
            // Asumimos que solo hay un servicio en la compra
            this.purchasedServiceId = items[0].serviceId;
            return this.cartService.clearCartFromBackendAsObservable();
          })
        )
        .subscribe(() => {
          console.log('Carrito vaciado tras el pago.');
        });
    });
  }

  abrirModalResena(): void {
    this.showReviewModal = true;
  }

  cerrarModalResena(): void {
    this.showReviewModal = false;
    this.reviewDescription = '';
    this.selectedCalification = 'EXCELENTE';
  }

  enviarResena(): void {
    const username = this.useStateService.getUsername();

    if (!username || !this.purchasedServiceId) {
      this.popupService.showMessage('Error', 'Faltan datos para enviar la reseña', 'error');
      return;
    }

    const review: ReviewRequest = {
      description: this.reviewDescription,
      userName: username,
      professionalServiceId: this.purchasedServiceId,
      calificationType: this.selectedCalification as any
    };

    this.reviewService.registerReview(review).subscribe({
      next: () => {
        this.popupService.showMessage('Éxito', 'Reseña enviada correctamente', 'success');
        this.cerrarModalResena();
      },
      error: () => {
        this.popupService.showMessage('Error', 'No se pudo enviar la reseña', 'error');
      }
    });
  }
}
