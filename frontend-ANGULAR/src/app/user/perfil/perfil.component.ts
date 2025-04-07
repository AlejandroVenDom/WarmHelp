import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/auth/token.service';
import { UseStateService } from '../../services/auth/use-state.service';
import { PopupService } from '../../services/popup.service';
import { PostService } from '../../services/posts/post.service';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
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

  constructor(
    private useStateService: UseStateService,
    private tokenService: TokenService,
    private router: Router,
    private popupService: PopupService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.username = this.useStateService.getUsername();
    this.role = this.useStateService.getTypeRole();
    this.email = this.useStateService.getEmail();
    this.address = this.useStateService.getAddress();
    this.number = this.useStateService.getNumber();
    this.comments = this.useStateService.getComments();
    this.postService.getAllPosts().subscribe((allPosts) => {
      this.posts = allPosts.filter(p => p.userInfo?.user?.username === this.username);
    });
    this.first_name = this.useStateService.getFirstName();
    this.last_name = this.useStateService.getLastName();
    this.mySelf_description = this.useStateService.getMySelfDescription();
    this.responseComments = this.useStateService.getResponseComments();
    this.professionalServices = this.useStateService.getProfessionalServices();
    this.reviews = this.useStateService.getReviews();

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
