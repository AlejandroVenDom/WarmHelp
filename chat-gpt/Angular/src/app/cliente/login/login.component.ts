import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CredentialsService} from '../../services/auth/credentials.service';
import {LoginInterface} from '../../services/interfaces/auth';
import {TokenService} from '../../services/auth/token.service';
import { RegistroComponent } from '../registro/registro.component';
import {Router, RouterLink} from '@angular/router';
import { NgClass } from '@angular/common';
import { UserServiceService } from '../../services/auth/user-service.service';
import { PopupService } from '../../services/utils/popup.service';
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule, RouterLink, NgClass,
    FooterComponent
],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  showPassword: boolean = false;

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private credentialsService: CredentialsService,
    private tokenService: TokenService,
    private router: Router,
    private userServiceService: UserServiceService,
    private popupService: PopupService,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }




  submit() {
    if (this.loginForm.invalid) {
      this.popupService.showMessage("Error", "Todos los campos son obligatorios", "warning");
      return;
    }
    this.credentialsService.login(this.loginForm.value as LoginInterface).subscribe({
      next: (data) => {

    this.popupService.loader("Iniciando sesión...", "Por favor espera");

    setTimeout(() => {
      this.tokenService.saveTokens(data.token, "234325423423");
      this.userServiceService.save(data.username, data.role,data.firstName, data.lastName, data.address);
      this.popupService.close();
      this.popupService.showMessage("Bienvenido", `Hola ${data.firstName},${data.lastName} !`, "success");
      this.router.navigate(['/app/control-panel']).then(() => {
        window.location.reload();
      });
    }, 700)

      },
      error: err => {
        let message;

        switch (err.error) {
            case "Invalid password":
                message = "Contraseña incorrecta, inténtelo de nuevo.";
                break;
            case "User not found":
                message = "El usuario no existe. Verifique sus credenciales.";
                break;
            case "Unauthorized access":
                message = "Acceso no autorizado. Verifique su usuario y contraseña.";
                break;
            default:
                message = err.error || "Ha ocurrido un error inesperado. Inténtelo de nuevo más tarde.";
                break;
        }

        this.popupService.showMessage(
            'Ups, ha ocurrido un error', message, 'error'
        );
    }

    });
  }
}
