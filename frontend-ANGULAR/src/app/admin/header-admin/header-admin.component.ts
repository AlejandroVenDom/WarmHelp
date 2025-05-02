import { Component, HostListener, OnInit } from '@angular/core';
import { UseStateService } from '../../services/auth/use-state.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/auth/token.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-header-admin',
  standalone: false,
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.scss'
})
export class HeaderAdminComponent implements OnInit {
  sidebarOpen = false;

  username: string | null = '';

  constructor(
    private useStateService: UseStateService,
    private tokenService: TokenService,
    private popupService: PopupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = this.useStateService.getUsername();
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    this.toggleBodyClass(this.sidebarOpen);
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
    this.toggleBodyClass(false);
  }

  private toggleBodyClass(open: boolean): void {
    const content = document.querySelector('.admin-content');
    if (content) {
      content.classList.toggle('menu-open', open);
    }
  }


  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event): void {
    const nav = document.querySelector('.admin-sidebar');
    const toggle = document.querySelector('.toggle-button');
    if (this.sidebarOpen && nav && !nav.contains(event.target as Node) && !toggle?.contains(event.target as Node)) {
      this.closeSidebar();
    }
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
