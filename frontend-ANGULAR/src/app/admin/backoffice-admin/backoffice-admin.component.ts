import { Component, OnInit } from '@angular/core';
import { UseStateService } from '../../services/auth/use-state.service';
import { ProfessionalServiceInterface } from '../../services/interfaces/professional';
import { ProfessionalService } from '../../services/professional.service';

@Component({
  selector: 'app-backoffice-admin',
  standalone: false,
  templateUrl: './backoffice-admin.component.html',
  styleUrl: './backoffice-admin.component.scss'
})
export class BackofficeAdminComponent implements OnInit {
  servicios: ProfessionalServiceInterface[] = [];
  showModal: boolean = false;
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
    private userState: UseStateService
  ) {}

  ngOnInit(): void {
    this.loadMyServices();
  }

  loadMyServices() {
    const currentUser = this.userState.getUsername();
    this.service.getAll().subscribe(response => {
      this.servicios = response.filter(s => s.userName === currentUser);
    });
  }



  openModal() {
    this.showModal = true;
    this.nuevoServicio = {
      title: '',
      description: '',
      image: '',
      price: 0,
      tax: 0,
      currencyType: 'USD',
      userName: this.userState.getUsername() || ''
    };
  }

  closeModal() {
    this.showModal = false;
  }

  crearServicio() {
    console.log("Enviando servicio:", this.nuevoServicio);
    this.service.registerService(this.nuevoServicio).subscribe({
      next: () => {
        this.closeModal();
        this.loadMyServices();
      },
      error: (err) => {
        if (err.status === 400) {
          alert('❌ Error en los datos: ' + err.error); // <-- Aquí te dirá "Valor de moneda no válido"
        } else if (err.status === 401) {
          alert('⚠️ No autorizado. Verifica tu sesión.');
        } else {
          alert('🚨 Error inesperado.');
        }
        console.error('❌ Error al crear servicio', err);
      }
    });
  }

}
