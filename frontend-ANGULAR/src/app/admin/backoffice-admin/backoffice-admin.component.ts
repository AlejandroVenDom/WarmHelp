import { Component, OnInit } from '@angular/core';
import { UseStateService } from '../../services/auth/use-state.service';
import { ProfessionalServiceInterface } from '../../services/interfaces/professional';
import { ProfessionalService } from '../../services/professional.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-backoffice-admin',
  standalone: false,
  templateUrl: './backoffice-admin.component.html',
  styleUrl: './backoffice-admin.component.scss'
})
export class BackofficeAdminComponent implements OnInit {
  servicioEditando: ProfessionalServiceInterface | null = null;
  modoEdicion = false;
  servicios: ProfessionalServiceInterface[] = [];
  showModal: boolean = false;
  mostrarBotonScroll = false;
  nuevoServicio: ProfessionalServiceInterface = {
    title: '',
    description: '',
    image: '',
    price: 0,
    tax: 0,
    currencyType: 'USD',
    userName: ''
  };

  constructor(
    private service: ProfessionalService,
    private userState: UseStateService,
    private popup: PopupService
  ) {}

  ngOnInit(): void {
    this.loadMyServices();
    window.addEventListener('scroll', this.verificarScroll.bind(this));
  }
  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.verificarScroll.bind(this));
  }
  verificarScroll(): void {
    this.mostrarBotonScroll = window.scrollY > 100;
  }
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loadMyServices() {
    const currentUser = this.userState.getUsername();
    this.service.getAll().subscribe(response => {
      this.servicios = response.filter(s => s.userName === currentUser);
    });
  }



  openModal(servicio?: ProfessionalServiceInterface) {
    if (servicio) {
      this.servicioEditando = { ...servicio };
      this.modoEdicion = true;
    } else {
      this.servicioEditando = {
        title: '',
        description: '',
        image: '',
        price: 0,
        tax: 0,
        currencyType: 'USD',
        userName: this.userState.getUsername() || ''
      };
      this.modoEdicion = false;
    }
    this.showModal = true;
  }


  closeModal() {
    this.showModal = false;
  }

  guardarServicio() {
    if (!this.servicioEditando) return;

    if (this.modoEdicion && this.servicioEditando.id) {
      const dataToSend = {
        ...this.servicioEditando,
        currency: this.servicioEditando.currencyType
      };

      this.service.update(this.servicioEditando.id, dataToSend).subscribe({
        next: () => {
          this.closeModal();
          this.loadMyServices();
        },
        error: () => alert("Error al actualizar el servicio")
      });
    } else {
      this.service.registerService(this.servicioEditando).subscribe({
        next: () => {
          this.closeModal();
          this.loadMyServices();
        },
        error: () => alert("Error al crear el servicio")
      });
    }
  }
  eliminarServicio(id: number) {
    this.popup
    .showConfirmation(
      '¿Estás seguro?',
      'Esta acción eliminará el servicio permanentemente.',
      'Sí, eliminar',
      'Cancelar'
    )
    .then((confirmed) => {
      if (confirmed) {
        this.service.delete(id).subscribe({
          next: () => {
            this.loadMyServices();
            this.popup.showMessage('Eliminado', 'El servicio ha sido eliminado correctamente.', 'success');
          },
          error: () => {
            this.popup.showMessage('Error', 'Hubo un problema al eliminar el servicio.', 'error');
          }
        });
      }
    });
}


}
