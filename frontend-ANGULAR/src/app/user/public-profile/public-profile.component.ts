import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/users/user.service';
import { CartService } from '../../services/auth/cart.service';
import { UseStateService } from '../../services/auth/use-state.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-public-profile',
  standalone: false,
  templateUrl: './public-profile.component.html',
  styleUrl: './public-profile.component.scss'
})
export class PublicProfileComponent implements OnInit {
  user: any = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private cartService: CartService,
    private popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const username = params.get('username');
      if (username) {
        this.userService.getPublicProfile(username).subscribe({
  next: (res) => {
    this.user = res;

    // 🔧 Combinar todas las reseñas de todos los servicios
    this.user.reviews = this.user.professionalServices?.flatMap((s: any) => s.reviews || []) || [];
  },
  error: (err) => console.error('Error cargando perfil público:', err)
});
      }
    });
  }
  getStarCount(calification: string): number {
  switch (calification) {
    case 'EXCELENTE': return 5;
    case 'BUENO': return 4;
    case 'REGULAR': return 3;
    case 'MALO': return 2;
    case 'PESIMO': return 1;
    default: return 0;
  }
}

  addToCart(service: any): void {
    this.cartService.addToCart(service, 1);
    this.popupService.showMessage(
      'Servicio añadido',
      'El servicio se ha añadido correctamente al carrito.',
      'success'
    );
  }
}
