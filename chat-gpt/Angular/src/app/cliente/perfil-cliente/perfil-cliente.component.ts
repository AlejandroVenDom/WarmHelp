import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/auth/user-service.service';
import { TokenService } from '../../services/auth/token.service';
import { Router, RouterLink } from '@angular/router';
import { PopupService } from '../../services/utils/popup.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-perfil-cliente',
  imports: [CommonModule, RouterLink, FormsModule, FooterComponent],
  templateUrl: './perfil-cliente.component.html',
  styleUrl: './perfil-cliente.component.scss'
})
export class PerfilClienteComponent implements OnInit {
  userData: any = {};
  showBackendButton: boolean = false;
  showChangePassword: boolean = false;

  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private popupService: PopupService,
    private userService: UserServiceService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }
  togglePasswordVisibility(field: string) {
    if (field === 'current') {
      this.showCurrentPassword = !this.showCurrentPassword;
    } else if (field === 'new') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  loadUserProfile(): void {
    this.userData = {
      username: this.userService.getUsername(),
      role: this.userService.getRole(),
      firstName: this.userService.getFirstName(),
      lastName: this.userService.getLastName(),
      address: this.userService.getAddress()
    };

    const userRole = this.userData.role;
    this.showBackendButton = userRole === 'ADMIN' || userRole === 'SELLER';
  }



  toggleChangePasswordForm() {
    this.showChangePassword = !this.showChangePassword;
  }

  async changePassword() {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      this.popupService.showMessage('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

    try {
      const response = await this.http
        .put(`${environment.apiUrl}/users/change-password`, this.passwordData, { responseType: 'text' })
        .toPromise();

      if (response) {
        this.popupService.showMessage('Éxito', 'Contraseña actualizada correctamente', 'success');
        this.passwordData = { currentPassword: '', newPassword: '', confirmPassword: '' };
        this.showChangePassword = false;
      }
    } catch (error: any) {
      console.error('Error en el cambio de contraseña:', error);

      let errorMessage = 'No se pudo cambiar la contraseña.';

      if (error.status === 400) {
        errorMessage = error.error || 'Contraseña incorrecta o no válida.';
      } else if (error.status === 500) {
        errorMessage = 'Error en el servidor, intenta más tarde.';
      } else if (!navigator.onLine) {
        errorMessage = 'Parece que no tienes conexión a Internet.';
      }

      this.popupService.showMessage('Error', errorMessage, 'error');
    }
  }



  async logout() {
    const confirmLogout = await this.popupService.showConfirmation(
      "Cerrar Sesión",
      "¿Está seguro de que desea cerrar sesión?",
      "Sí, cerrar sesión",
      "No, permanecer en la sesión"
    );

    if (confirmLogout) {
      this.popupService.loader("Cerrando sesión...", "Por favor espera");

      this.tokenService.removeToken();
      this.userService.removeSession();
      setTimeout(() => {
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
        this.popupService.close();
      }, 750);
    } else {
      this.popupService.showMessage("Cancelado", "Tu sesión sigue activa", "info");
    }
  }
}

