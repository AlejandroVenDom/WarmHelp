import { Component, OnInit } from '@angular/core';
import { UseStateService } from '../../services/auth/use-state.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/auth/token.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-home-no-auth',
  standalone: false,
  templateUrl: './home-no-auth.component.html',
  styleUrl: './home-no-auth.component.scss'
})
export class HomeNoAuthComponent implements OnInit {
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

  constructor(
    private useStateService: UseStateService,
    private tokenService: TokenService,
    private router: Router,
    private popupService: PopupService
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
