import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../services/auth/user-service.service';
import { TokenService } from '../../services/auth/token.service';
import { CartComponent } from "../cart/cart.component";
import { CartService } from '../../services/auth/cart.service';

@Component({
  selector: 'app-header-cliente',
  imports: [RouterLink, CommonModule, CartComponent],
  standalone: true,
  templateUrl: './header-cliente.component.html',
  styleUrl: './header-cliente.component.scss'
})
export class HeaderClienteComponent implements OnInit {

  isLoggedIn: boolean = false;
  username: string | null = null;
  menuOpen: boolean = false;
cartComponent: any;

  constructor(
    private tokenService: TokenService,
    private userService: UserServiceService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.updateLoginStatus();
    this.listenToSessionChanges();
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  closeMenu() {
    this.menuOpen = false;
  }
  toggleCart() {
    this.cartService.toggleCart();
  }

  updateLoginStatus() {
    const token = this.tokenService.getAccessToken();
    this.isLoggedIn = !!token;

    if (this.isLoggedIn) {
      this.username = this.userService.getUsername();
    } else {
      this.username = null;
    }
  }
  listenToSessionChanges() {
    this.router.events.subscribe(() => {
      this.updateLoginStatus();
    });
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

