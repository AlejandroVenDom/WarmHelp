import { Component, OnInit } from '@angular/core';
import { ProfessionalServiceInterface } from '../../services/interfaces/professional';
import { PopupService } from '../../services/popup.service';
import { ProfessionalService } from '../../services/professional.service';
import Swal from 'sweetalert2';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-servicios-admin',
  standalone: false,
  templateUrl: './servicios-admin.component.html',
  styleUrl: './servicios-admin.component.scss'
})
export class ServiciosAdminComponent implements OnInit {
  servicios: ProfessionalServiceInterface[] = [];
  serviciosFiltrados: ProfessionalServiceInterface[] = [];
  servicioEditando: ProfessionalServiceInterface | null = null;
  mostrarModal: boolean = false;

  filtroBusqueda = '';
  cantidadMostrar = 10;
  cantidadesDisponibles = [5, 10, 20, 50];
  paginaActual = 1;
  totalPaginas = 1;
  paginas: number[] = [];

  constructor(
    private professionalService: ProfessionalService,
    private popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.cargarServicios();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent): void {
    if (this.mostrarModal) {
      this.cerrarModal();
    }
  }

  cargarServicios(): void {
    this.professionalService.getAll().subscribe({
      next: (data) => {
        this.servicios = data;
        this.serviciosFiltrados = [...this.servicios];
        this.actualizarPaginacion();
      },
      error: () => {
        this.popupService.showMessage("Error", "No se pudieron cargar los servicios", "error");
      }
    });
  }

  filtrarServicios(): void {
    const filtro = this.filtroBusqueda.toLowerCase().trim();
    this.paginaActual = 1;
    this.serviciosFiltrados = this.servicios.filter(s =>
      s.title.toLowerCase().includes(filtro) ||
      s.description.toLowerCase().includes(filtro) ||
      s.userName.toLowerCase().includes(filtro)
    );
    this.actualizarPaginacion();
  }

  actualizarPaginacion(): void {
    this.totalPaginas = Math.ceil(this.serviciosFiltrados.length / this.cantidadMostrar);
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);

    const start = (this.paginaActual - 1) * this.cantidadMostrar;
    const end = start + this.cantidadMostrar;
    this.serviciosFiltrados = [...this.serviciosFiltrados].slice(start, end);
  }

  onCantidadChange(): void {
    this.paginaActual = 1;
    this.actualizarPaginacion();
  }

  cambiarPagina(delta: number): void {
    const nueva = this.paginaActual + delta;
    if (nueva >= 1 && nueva <= this.totalPaginas) {
      this.paginaActual = nueva;
      this.actualizarPaginacion();
    }
  }

  irAPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.actualizarPaginacion();
  }

  resetearFiltros(): void {
    this.filtroBusqueda = '';
    this.cantidadMostrar = 10;
    this.paginaActual = 1;
    this.serviciosFiltrados = [...this.servicios];
    this.actualizarPaginacion();
  }

  eliminarServicio(id: number): void {
    this.popupService
      .showConfirmation("¿Eliminar servicio?", "Esta acción no se puede deshacer.")
      .then((confirmado) => {
        if (confirmado) {
          this.professionalService.delete(id).subscribe({
            next: () => {
              // ✅ Elimina el servicio localmente
              this.servicios = this.servicios.filter(s => s.id !== id);
              this.filtrarServicios(); // aplica de nuevo filtros y paginación

              // ✅ Muestra el popup correctamente
              Swal.fire("Eliminado", "Servicio eliminado correctamente", "success");
            },
            error: () => {
              Swal.fire("Error", "No se pudo eliminar el servicio", "error");
            }
          });
        }
      });
  }


  abrirModalEditar(servicio: ProfessionalServiceInterface): void {
    this.servicioEditando = { ...servicio };
    this.mostrarModal = true;
    document.body.style.overflow = 'hidden';
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.servicioEditando = null;
    document.body.style.overflow = '';
  }

  guardarCambios(): void {
    if (!this.servicioEditando || !this.servicioEditando.id) return;

    const dataToSend = {
      ...this.servicioEditando,
      currency: this.servicioEditando.currencyType
    };

    this.professionalService.update(this.servicioEditando.id, dataToSend).subscribe({
      next: () => {
        // ✅ Actualizar el servicio en la lista local sin recargar desde backend
        const index = this.servicios.findIndex(s => s.id === this.servicioEditando!.id);
        if (index !== -1) {
          this.servicios[index] = { ...this.servicioEditando! };
          this.filtrarServicios(); // volver a aplicar filtro y paginación
        }

        this.cerrarModal();
        Swal.fire("Actualizado", "Servicio actualizado correctamente", "success");
      },
      error: () => {
        Swal.fire("Error", "No se pudo actualizar el servicio", "error");
      }
    });
  }
}
