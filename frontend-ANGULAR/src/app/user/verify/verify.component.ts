import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-verify',  
  standalone: false,
  styleUrl: './verify.component.scss',
  templateUrl: './verify.component.html',
})
export class VerifyComponent implements OnInit {
  message: string = 'Verificando token...';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private popupService: PopupService
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.http.get(`/api/verify?token=${token}`).subscribe({
        next: () => {
          this.message = '¡Tu cuenta ha sido activada exitosamente!';
          this.popupService.showMessage('Éxito', this.message, 'success');
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: () => {
          this.message = 'Token inválido o expirado.';
          this.popupService.showMessage('Error', this.message, 'error');
          setTimeout(() => this.router.navigate(['/register']), 4000);
        }
      });
    }
  }
}
