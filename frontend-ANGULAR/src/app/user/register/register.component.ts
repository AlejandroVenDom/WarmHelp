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
  showPassword: boolean = true;
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private credentialsService: CredentialsService,
    private router: Router,
    private popupService: PopupService
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(15)]],
      password: [
        '',
        [
          Validators.required,
          // Validators.minLength(8),Validators.maxLength(15),
          // Validators.pattern(/^(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%*?&]+$/)
        ],
      ],
      roleType: ['', [Validators.required]],
      first_name: ['', [Validators.required, Validators.maxLength(15)]],
      last_name: ['', [Validators.required, Validators.maxLength(15)]],
      address: ['', [Validators.required, Validators.maxLength(25)]],
      number: ['', Validators.required], // nuevo
      email: ['', [Validators.required, Validators.email]], // nuevo
      mySelf_description: [''],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  submit() {
    if (this.registerForm.invalid) {
      this.popupService.showMessage(
        'Error',
        'Por favor, complete todos los campos correctamente',
        'error'
      );
      return;
    }

    this.popupService.loader('Completando Registro', 'Por favor espere...');

    this.credentialsService
      .register(this.registerForm.value as UserInterface)
      .subscribe({
        next: () => {
          setTimeout(() => {
            this.router.navigate(['/login']);
            this.popupService.close();
            this.popupService.showMessage(
              'Éxito',
              'Usted se ha registrado correctamente',
              'success'
            );
          }, 1200);
        },
        error: (err) => {
          this.popupService.close();
          let message;

          switch (err.error) {
            case 'Username already taken':
              message = 'El nombre de usuario ya está en uso. Prueba con otro.';
              break;
            default:
              message =
                err.error ||
                'Hubo un problema al registrar el usuario. Inténtelo de nuevo más tarde.';
              break;
          }

          this.popupService.showMessage('Error', message, 'error');
        },
      });
  }
}
