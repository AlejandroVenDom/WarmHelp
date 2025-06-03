import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserInterface } from '../../services/interfaces/auth';
import { PopupService } from '../../services/popup.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-users-admin',
  standalone: false,
  templateUrl: './users-admin.component.html',
  styleUrl: './users-admin.component.scss',
})
export class UsersAdminComponent implements OnInit {
  users: UserInterface[] = [];
  userForm: FormGroup;
  isEditing = false;
  currentUserId: number | null = null;
  loggedUserId: number | null = null;
  filtroBusqueda = '';
  cantidadMostrar = 10;
  cantidadesDisponibles = [5, 10, 20, 50];
  paginaActual = 1;
  totalPaginas = 1;
  paginas: number[] = [];

  allUsers: UserInterface[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private popup: PopupService
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: [''], // solo obligatorio en alta
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      number: ['', Validators.required],
      mySelf_description: [''],
      roleType: ['CLIENT', Validators.required],
    });
  }

  ngOnInit(): void {
    const session = sessionStorage.getItem('warmhelp_user');
    if (session) {
      this.loggedUserId = JSON.parse(session).id;
    }
    this.loadUsers();
  }

  generatePDF() {
    const doc = new jsPDF('landscape'); // Crear PDF en orientación horizontal

    const referenceNumber =
      'REF-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Obtener la fecha actual
    const date = new Date();
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    // Configurar el encabezado con título y fecha
    doc.setFontSize(16); // Tamaño de fuente más pequeño
    doc.setFont('helvetica', 'bold');
    doc.text('Lista de usuarios de WarmHelp', 14, 20);
    doc.setFontSize(10); // Tamaño de fuente más pequeño para el resto
    doc.text(`Fecha: ${formattedDate}`, 14, 28);
    doc.text(`Número de referencia: ${referenceNumber}`, 14, 40);

    // Agregar una imagen en la parte superior derecha
    const imageUrl = 'logot.png'; // Ruta de la imagen
    doc.addImage(imageUrl, 'PNG', 200, 10, 60, 15); // Aumentar el tamaño de la imagen a 50x50

    // Separador entre encabezado y tabla
    doc.line(14, 42, 280, 42); // Línea horizontal (mayor ancho debido a la orientación horizontal)

    // Encabezado de la tabla
    doc.setFont('helvetica', 'bold');
    doc.text('ID', 14, 50);
    doc.text('Nombre y Apellido', 40, 50);
    doc.text('Correo', 100, 50);
    doc.text('Teléfono', 150, 50);
    doc.text('Dirección', 210, 50); // Nueva columna para dirección

    // Línea para separar los encabezados de los datos
    doc.line(14, 52, 280, 52); // Línea horizontal

    let y = 60; // Inicializamos la posición para los datos

    // Añadir datos de cada usuario
    this.users.forEach((user) => {
      // Nombre completo
      const fullName = `${user.first_name} ${user.last_name}`;

      // Escribir cada línea de datos en la tabla
      doc.setFont('helvetica', 'normal');
      doc.text(user.idUser.toString(), 14, y);
      doc.text(fullName, 40, y);
      doc.text(user.email, 100, y);
      doc.text(user.number, 150, y);
      doc.text(user.address, 210, y); // Dirección del usuario

      // Incrementar la posición Y para la siguiente fila
      y += 8; // Menor separación entre filas

      // Si se alcanza el final de la página, crear una nueva página
      if (y > 190) {
        // Ajuste para una página horizontal
        doc.addPage();
        y = 20;
        doc.text('ID', 14, y);
        doc.text('Nombre', 40, y);
        doc.text('Correo', 100, y);
        doc.text('Teléfono', 150, y);
        doc.text('Dirección', 210, y);
        doc.line(14, y + 2, 280, y + 2); // Línea horizontal
        y += 10;
      }
    });

    // Guardar el PDF generado
    doc.save('Usuarios.pdf');
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.allUsers = users;
      this.actualizarListaUsuarios();
    });
  }
  actualizarListaUsuarios(): void {
    const filtro = this.filtroBusqueda.toLowerCase().trim();

    const filtrados = this.allUsers.filter(
      (user) =>
        user.username.toLowerCase().includes(filtro) ||
        user.email.toLowerCase().includes(filtro) ||
        user.first_name.toLowerCase().includes(filtro) ||
        user.last_name.toLowerCase().includes(filtro)
    );

    this.totalPaginas = Math.ceil(filtrados.length / this.cantidadMostrar);
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);

    if (this.paginaActual > this.totalPaginas) {
      this.paginaActual = this.totalPaginas || 1;
    }

    const start = (this.paginaActual - 1) * this.cantidadMostrar;
    const end = start + this.cantidadMostrar;

    this.users = filtrados.slice(start, end);
  }

  filtrarUsuarios(): void {
    this.paginaActual = 1;
    this.actualizarListaUsuarios();
  }

  onCantidadChange(): void {
    this.cantidadMostrar = +this.cantidadMostrar;
    this.paginaActual = 1;
    this.actualizarListaUsuarios();
  }

  resetearFiltros(): void {
    this.filtroBusqueda = '';
    this.cantidadMostrar = 10;
    this.paginaActual = 1;
    this.actualizarListaUsuarios();
  }

  cambiarPagina(delta: number): void {
    const nueva = this.paginaActual + delta;
    if (nueva >= 1 && nueva <= this.totalPaginas) {
      this.paginaActual = nueva;
      this.actualizarListaUsuarios();
    }
  }

  irAPagina(p: number): void {
    this.paginaActual = p;
    this.actualizarListaUsuarios();
  }

  startEdit(user: UserInterface): void {
    this.isEditing = true;
    this.currentUserId = user.idUser;
    this.userForm.patchValue(user);
    this.userForm.get('password')?.setValue('');

    if (this.loggedUserId === user.idUser) {
      this.userForm.get('roleType')?.disable();
    } else {
      this.userForm.get('roleType')?.enable();
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.currentUserId = null;
    this.userForm.reset({ roleType: 'CLIENT' });
    this.userForm.get('roleType')?.enable();
  }

  submit(): void {
    if (this.userForm.invalid) return;
    const formData = this.userForm.getRawValue();

    if (this.isEditing && this.currentUserId !== null) {
      if (this.currentUserId === this.loggedUserId) {
        delete formData.roleType;
      }

      this.userService.updateUser(this.currentUserId, formData).subscribe({
        next: () => {
          this.popup.showMessage(
            'Actualizado',
            'Usuario actualizado correctamente',
            'success'
          );
          this.loadUsers();
          this.cancelEdit();
        },
        error: (err) => {
          this.popup.showMessage(
            'Error',
            err?.error?.message || 'Error al actualizar usuario',
            'error'
          );
        },
      });
    } else {
      if (!formData.password) {
        this.popup.showMessage(
          'Error',
          'La contraseña es obligatoria para crear usuario',
          'error'
        );
        return;
      }

      this.userService.addUser(formData).subscribe({
        next: () => {
          this.popup.showMessage(
            'Creado',
            'Usuario creado correctamente',
            'success'
          );
          this.loadUsers();
          this.cancelEdit();
        },
        error: (err) => {
          this.popup.showMessage(
            'Error',
            err?.error?.message || 'Error al crear usuario',
            'error'
          );
        },
      });
    }
  }

  async deleteUser(idUser: number): Promise<void> {
    const confirm = await this.popup.showConfirmation(
      'Eliminar usuario',
      '¿Estás seguro de eliminar a este usuario definitivamente de WarmHelp?',
      'Sí, eliminar usuario',
      'Cancelar'
    );

    if (confirm) {
      try {
        await this.userService.deleteUser(idUser).toPromise(); // usamos await en lugar de subscribe
        this.popup.showMessage(
          'Usuario eliminado',
          'Usuario eliminado correctamente de warmhelp',
          'success'
        );
        this.loadUsers(); // también deberías revisar esta función por si da error
      } catch (error) {
        console.error('Error al eliminar:', error);
        this.popup.showMessage(
          'Error',
          'No se pudo eliminar el usuario',
          'error'
        );
      }
    }
  }
}
