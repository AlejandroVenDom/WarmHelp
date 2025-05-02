import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CredentialsService } from '../../services/auth/credentials.service';
import { LoginInterface } from '../../services/interfaces/auth';
import { Router } from '@angular/router';
import { TokenService } from '../../services/auth/token.service';
import { UseStateService } from '../../services/auth/use-state.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  username: string | null;
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private credentialsService: CredentialsService,
    private router: Router,
    private tokenService: TokenService,
    private useStateService: UseStateService,
    private popupService: PopupService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.username = useStateService.getUsername();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  submit() {
    if (this.loginForm.invalid) {
      this.popupService.showMessage(
        'Campos requeridos',
        'Por favor, complete todos los campos antes de continuar.',
        'warning'
      );
      return;
    }

    this.popupService.loader('Iniciando sesión', 'Por favor espera...');

    this.credentialsService.login(this.loginForm.value as LoginInterface).subscribe({
      next: (data) => {
        setTimeout(() => {
          this.tokenService.saveTokens(data.token, '234325423423');

          this.useStateService.save({
            id: data.id,
            username: data.username,
            role: data.role,
            first_name: data.first_name,
            last_name: data.last_name,
            address: data.address,
            number: data.number,
            email: data.email,
            mySelf_description: data.mySelf_description,
            comments: data.comments,
            posts: data.posts,
            professionalServices: data.professionalServices,
            reviews: data.reviews,
            responseComments: data.responseComments,
            incidents: data.incidents,
            reports: data.reports
          });

          this.popupService.close();
          this.popupService.showMessage(
            'Bienvenido',
            `Hola ${data.first_name} ${data.last_name}!`,
            'success'
          );

          this.router.navigate(['/perfil']);
        }, 1000);
      },
      error: (err) => {
        this.popupService.close();

        let message = '';
        if (err.error === 'Invalid password') {
          message = 'Contraseña incorrecta. Inténtelo nuevamente.';
        } else if (err.error === 'User not found') {
          message = 'El usuario no existe. Verifica tus datos o regístrate.';
        } else {
          message = err.error || 'Ha ocurrido un error inesperado. Intenta más tarde.';
        }

        this.popupService.showMessage(
          'Error de inicio de sesión',
          message,
          'error'
        );
      },
    });
  }
}
