import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/auth/token.service';
import { UseStateService } from '../../services/auth/use-state.service';

@Component({
  selector: 'app-header-cliente',
  standalone: false,
  templateUrl: './header-cliente.component.html',
  styleUrl: './header-cliente.component.scss'
})
export class HeaderClienteComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string | null = null;
  menuOpen: boolean = false;
  role: string | null = null;

  constructor(
    private tokenService: TokenService,
    private useStateService: UseStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateLoginStatus();
    this.router.events.subscribe(() => {
      this.updateLoginStatus();
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  updateLoginStatus() {
    const token = this.tokenService.getAccessToken();
    this.isLoggedIn = !!token;

    if (this.isLoggedIn) {
      this.username = this.useStateService.getUsername();
      this.role = this.useStateService.getTypeRole(); // ✅ Obtiene el rol
    } else {
      this.username = null;
      this.role = null;
    }
  }

  hasAdminOrProfessionalRole(): boolean {
    return ['ADMIN', 'PROFESSIONAL'].includes(this.role?.toUpperCase() || '');
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const menu = document.querySelector('.nav-container');
    const button = document.querySelector('.menu-toggle, .close-menu');
    if (this.menuOpen && menu && !menu.contains(event.target as Node) && !button?.contains(event.target as Node)) {
      this.closeMenu();
    }
  }
}
