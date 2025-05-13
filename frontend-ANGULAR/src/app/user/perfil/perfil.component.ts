import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/auth/token.service';
import { UseStateService } from '../../services/auth/use-state.service';
import { PopupService } from '../../services/popup.service';
import { PostService } from '../../services/posts/post.service';
import { CredentialsService } from '../../services/auth/credentials.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  username: string | null = null;
  role: string | null = null;
  email: string | null = null;
  address: string | null = null;
  number: string | null = null;
  avatar: string | null = null;
  comments: any[] = [];
  posts: any[] = [];
  first_name: string | null = null;
  last_name: string | null = null;
  mySelf_description: string | null = null;
  responseComments: any[] = [];
  professionalServices: any[] = [];
  reviews: any[] = [];
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showRepeatPassword: boolean = false;
  mostrarBotonScroll = false;
  avatarSub!: Subscription;

  // Cambio de contraseña
  oldPassword: string = '';
  newPassword: string = '';
  repeatNewPassword: string = '';
  passwordError: boolean = false;
  showPasswordFields: boolean = false;

  // Modal edición de perfil
  showEditModal: boolean = false;
  editData: any = {
    username: '',
    first_name: '',
    last_name: '',
    address: '',
    number: '',
    email: '',
    mySelf_description: ''
  };

  constructor(
    private useStateService: UseStateService,
    private tokenService: TokenService,
    private router: Router,
    private popupService: PopupService,
    private postService: PostService,
    private credentialsService: CredentialsService
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
    this.responseComments = this.useStateService.getResponseComments();
    this.professionalServices = this.useStateService.getProfessionalServices();
    const services = this.useStateService.getProfessionalServices() || [];
this.professionalServices = services;
this.reviews = services.flatMap((s: any) => s.reviews || []);
    this.avatar = this.useStateService.getAvatar();
    window.addEventListener('scroll', this.verificarScroll.bind(this));
  }
  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.verificarScroll.bind(this));
    if (this.avatarSub) {
      this.avatarSub.unsubscribe();
    }
  }
  verificarScroll(): void {
    this.mostrarBotonScroll = window.scrollY > 300;
  }
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  togglePasswordFields() {
    this.showPasswordFields = !this.showPasswordFields;
    this.passwordError = false;
  }
  getImageUrl(imagePath: string): string {
    if (!imagePath || typeof imagePath !== 'string') return '';
    const trimmed = imagePath.trim();
    if (trimmed.startsWith('http')) return trimmed;
    return `http://localhost:8080/api/uploads/images/${encodeURIComponent(trimmed)}`;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (!img.src.includes('image-not-found.jpg')) {
      img.src = '/assets/image-not-found.jpg';
    }
  }
  getStarCount(calification: string): number {
  switch (calification) {
    case 'EXCELENTE': return 5;
    case 'BUENO': return 4;
    case 'REGULAR': return 3;
    case 'MALO': return 2;
    case 'PESIMO': return 1;
    default: return 0;
  }
}


  cancelPasswordChange() {
    this.oldPassword = '';
    this.newPassword = '';
    this.repeatNewPassword = '';
    this.showPasswordFields = false;
    this.passwordError = false;
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const userId = this.useStateService.getUserId();
    if (!userId) return;

    this.credentialsService.uploadAvatar(userId, formData).subscribe({
      next: (res) => {
        this.avatar = res.avatar;
        this.useStateService.setAvatar(res.avatar);
        this.popupService.showMessage('Éxito', 'Avatar actualizado correctamente', 'success');
      },
      error: () => {
        this.popupService.showMessage('Error', 'No se pudo actualizar el avatar', 'error');
      }
    });
  }




  onChangePassword() {
    if (this.newPassword !== this.repeatNewPassword) {
      this.passwordError = true;
      this.popupService.showMessage('Error', 'Las nuevas contraseñas no coinciden', 'error');
      return;
    }

    if (this.oldPassword === this.newPassword) {
      this.passwordError = true;
      this.popupService.showMessage('Error', 'La nueva contraseña no puede ser igual a la actual', 'error');
      return;
    }

    this.passwordError = false;

    this.credentialsService.changePassword(this.oldPassword, this.newPassword, this.username!)
      .subscribe({
        next: (res) => {
          const message = typeof res === 'string' ? res : res?.message || 'Contraseña actualizada correctamente';
          this.popupService.showMessage('Éxito', message, 'success');
          this.cancelPasswordChange();
        },
        error: (err) => {
          const errorMessage =
            typeof err.error === 'string'
              ? err.error
              : err.error?.message || 'Error al cambiar la contraseña';

          this.popupService.showMessage('Error', errorMessage, 'error');
        }
      });
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

  // Editar perfil
  openEditModal() {
    this.editData = {
      username: this.username!,
      first_name: this.first_name!,
      last_name: this.last_name!,
      address: this.address!,
      number: this.number!,
      email: this.email!,
      mySelf_description: this.mySelf_description!
    };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  onUpdateProfile() {
    const userId = this.useStateService.getUserId();

    if (!userId) {
      this.popupService.showMessage('Error', 'No se pudo obtener el ID del usuario', 'error');
      return;
    }

    this.credentialsService.updateProfileById(userId, this.editData).subscribe({
      next: (updated) => {
        this.popupService.showMessage('Éxito', 'Perfil actualizado correctamente', 'success');

        const currentSession = this.useStateService.getSession();

        const newSession = {
          ...currentSession,
          ...updated,
          avatar: currentSession.avatar // <- MANTENER avatar actual
        };

        this.useStateService.save(newSession);

        // ACTUALIZAR datos locales
        this.username = newSession.username;
        this.first_name = newSession.first_name;
        this.last_name = newSession.last_name;
        this.address = newSession.address;
        this.number = newSession.number;
        this.email = newSession.email;
        this.mySelf_description = newSession.mySelf_description;

        this.closeEditModal();
      },
      error: (err) => {
        this.popupService.showMessage('Error', err?.error?.message || 'Error al actualizar el perfil', 'error');
      }
    });
  }





}
