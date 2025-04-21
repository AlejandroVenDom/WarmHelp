import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/auth/token.service';
import { UseStateService } from '../../services/auth/use-state.service';
import { PopupService } from '../../services/popup.service';
import { PostService } from '../../services/posts/post.service';
import { CredentialsService } from '../../services/auth/credentials.service';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  username: string | null = null;
  role: string | null = null;
  email: string | null = null;
  address: string | null = null;
  number: string | null = null;
  comments: any[] = [];
  posts: any[] = [];
  first_name: string | null = null;
  last_name: string | null = null;
  mySelf_description: string | null = null;
  responseComments: any[] = [];
  professionalServices: any[] = [];
  reviews: any[] = [];

  // Cambio de contraseña
  oldPassword: string = '';
  newPassword: string = '';
  repeatNewPassword: string = '';
  passwordError: boolean = false;
  showPasswordFields: boolean = false;

  constructor(
    private useStateService: UseStateService,
    private tokenService: TokenService,
    private router: Router,
    private popupService: PopupService,
    private postService: PostService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.username = this.useStateService.getUsername();
    this.role = this.useStateService.getTypeRole();
    this.email = this.useStateService.getEmail();
    this.address = this.useStateService.getAddress();
    this.number = this.useStateService.getNumber();
    this.comments = this.useStateService.getComments();
    this.posts = this.useStateService.getPosts();

    this.first_name = this.useStateService.getFirstName();
    this.last_name = this.useStateService.getLastName();
    this.mySelf_description = this.useStateService.getMySelfDescription();
    this.responseComments = this.useStateService.getResponseComments();
    this.professionalServices = this.useStateService.getProfessionalServices();
    this.reviews = this.useStateService.getReviews();
  }

  togglePasswordFields() {
    this.showPasswordFields = !this.showPasswordFields;
    this.passwordError = false;
  }

  cancelPasswordChange() {
    this.oldPassword = '';
    this.newPassword = '';
    this.repeatNewPassword = '';
    this.showPasswordFields = false;
    this.passwordError = false;
  }

  onChangePassword() {
    if (this.newPassword !== this.repeatNewPassword) {
      this.passwordError = true;
      return;
    }

    this.passwordError = false;

    this.credentialsService.changePassword(this.oldPassword, this.newPassword, this.username!)
      .subscribe({
        next: (response) => {
          if (typeof response === 'string') {
            this.popupService.showMessage('Éxito', response, 'success');
          } else {
            this.popupService.showMessage('Éxito', 'Contraseña actualizada correctamente', 'success');
          }
          this.cancelPasswordChange();
        },
        error: (err) => {
          let errorMessage = 'Error al cambiar la contraseña';

          if (typeof err.error === 'string') {
            errorMessage = err.error;
          } else if (err.error?.message) {
            errorMessage = err.error.message;
          }

          this.popupService.showMessage('Error', errorMessage, 'error');
        }


      });
  }

  async logout() {
    const confirmLogout = await this.popupService.showConfirmation(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      'Sí, cerrar sesión',
      'No, permanecer en la sesión'
    );

    if (confirmLogout) {
      this.popupService.loader('Cerrando sesión...', 'Por favor espera');

      this.tokenService.removeToken();
      this.useStateService.removeSession();

      setTimeout(() => {
        this.router.navigate(['/login']);
        this.popupService.close();
      }, 750);
    } else {
      this.popupService.showMessage('Cancelado', 'Tu sesión sigue activa', 'info');
    }
  }
}
