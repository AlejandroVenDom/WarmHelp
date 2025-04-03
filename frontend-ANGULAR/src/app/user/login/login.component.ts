import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CredentialsService } from '../../services/auth/credentials.service';
import { LoginInterface } from '../../services/interfaces/auth';
import { Router } from '@angular/router';
import { TokenService } from '../../services/auth/token.service';
import { UseStateService } from '../../services/auth/use-state.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  username: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private credentialsService: CredentialsService,
    private router: Router,
    private tokenService: TokenService,
    private useStateService: UseStateService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.username = useStateService.getUsername();
  }

  submit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.credentialsService
      .login(this.loginForm.value as LoginInterface)
      .subscribe({
        next: (data) => {

          console.log("Datos recibidos del backend:", data);

          // popuService aqui

          setTimeout(() => {
            this.tokenService.saveTokens(data.token, '234325423423');
            this.useStateService.save({
              username: data.username,
              first_name: data.first_name,
              last_name: data.last_name,
              address: data.address,
              number: data.number,
              email: data.email,
              mySelf_description: data.mySelf_description,
              comments: data.comments,
              posts: data.posts,
              role: data.role
            });
            
            this.router.navigate(['']);
          }, 1500);
        },
        error: (err) => {
          let message;
          if (err.error == 'Invalid password') {
            message = 'Contraseña incorrecta, inténtelo de nuevo.';
          } else if (err.error == 'User not found') {
            message =
              'El usuario no existe. Compruebe los datos o registrate en la plataforma';
          } else {
            message = err.error;
          }
        },
      });
  }
}
