import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CredentialsService } from '../../services/auth/credentials.service';
import { UserInterface } from '../../services/interfaces/auth';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  isWaitingForVerification: boolean = false; // Nueva variable
  isLoading: boolean = false; // Controla la pantalla de espera
  showVerificationMessage: boolean = false; // Controla el mensaje de verificación
  showPassword: boolean = true;  
  emailSentTo: string = ''; // Nuevo: Guarda el email para mostrarlo
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private credentialsService: CredentialsService,
    private router: Router,
    private popupService: PopupService
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          // Validators.minLength(8),Validators.maxLength(15),
          // Validators.pattern(/^(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%*?&]+$/)
        ],
      ],
      roleType: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      number: ['', Validators.required], // nuevo
      email: ['', [Validators.required]], // nuevo
      mySelf_description: [''],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  submit() {
    if (this.registerForm.invalid) return;
  
    this.isLoading = true;
    this.popupService.loader('Completando Registro', 'Espera...');
  
    this.credentialsService.register(this.registerForm.value as UserInterface).subscribe({
      next: () => {
        this.isLoading = false;
        this.isWaitingForVerification = true; // Activa el estado de espera
        this.emailSentTo = this.registerForm.value.email;
        this.popupService.close();
      },
      error: (err) => { /* ... */ }
    });
  }
  
  // Nuevo método (añádelo después de submit())
  resendVerificationEmail() {
    this.credentialsService.resendVerificationEmail(this.emailSentTo).subscribe({
      next: () => {
        this.popupService.showMessage('Éxito', '¡Correo de verificación reenviado!', 'success');
      },
      error: () => {
        this.popupService.showMessage('Error', 'No se pudo reenviar el correo. Inténtalo más tarde.', 'error');
      },
    });
  }
  continueAfterVerification() {
    // Redirige al login (aunque la cuenta no esté verificada aún)
    this.router.navigate(['/login']);
  
    // Opcional: Mostrar un mensaje recordando verificar el email
    this.popupService.showMessage(
      'Importante',
      'Tu cuenta aún no está verificada. Por favor revisa tu correo electrónico para activarla.',
      'info'
    );
  }
}