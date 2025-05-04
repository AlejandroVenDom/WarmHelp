import { Component, OnInit } from '@angular/core';
import { Post } from '../../services/interfaces/post';
import { PostService } from '../../services/posts/post.service';
import { UseStateService } from '../../services/auth/use-state.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-posts-admin',
  standalone: false,
  templateUrl: './posts-admin.component.html',
  styleUrl: './posts-admin.component.scss'
})
export class PostsAdminComponent implements OnInit {
  posts: Post[] = [];
  allPosts: Post[] = [];
  postEditando: Post | null = null;
  editando: boolean = false;

  filtroBusqueda = '';
  cantidadMostrar = 10;
  cantidadesDisponibles = [5, 10, 20, 50];
  paginaActual = 1;
  totalPaginas = 1;
  paginas: number[] = [];

  constructor(
    private postService: PostService,
    private useStateService: UseStateService,
    private popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.cargarPosts();
  }

  cargarPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.allPosts = data.reverse();
        this.actualizarLista();
      },
      error: () => this.popupService.showMessage('Error', 'No se pudieron cargar los posts', 'error')
    });
  }

  actualizarLista(): void {
    const filtro = this.filtroBusqueda.toLowerCase().trim();

    const filtrados = this.allPosts.filter(post =>
      post.title.toLowerCase().includes(filtro) ||
      post.description.toLowerCase().includes(filtro) ||
      post.username.toLowerCase().includes(filtro)
    );

    this.totalPaginas = Math.ceil(filtrados.length / this.cantidadMostrar);
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);

    if (this.paginaActual > this.totalPaginas) this.paginaActual = 1;

    const start = (this.paginaActual - 1) * this.cantidadMostrar;
    const end = start + this.cantidadMostrar;

    this.posts = filtrados.slice(start, end);
  }
  eliminarPost(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este post?')) return;
    this.postService.softDeletePost(id).subscribe({
      next: () => {
        this.popupService.showMessage('Post eliminado', 'Se eliminó correctamente', 'success');
        this.cargarPosts();
      },
      error: () => this.popupService.showMessage('Error', 'No se pudo eliminar el post', 'error')
    });
  }


  filtrarPosts(): void {
    this.paginaActual = 1;
    this.actualizarLista();
  }

  onCantidadChange(): void {
    this.cantidadMostrar = +this.cantidadMostrar;
    this.paginaActual = 1;
    this.actualizarLista();
  }

  resetearFiltros(): void {
    this.filtroBusqueda = '';
    this.cantidadMostrar = 10;
    this.paginaActual = 1;
    this.actualizarLista();
  }

  cambiarPagina(delta: number): void {
    const nueva = this.paginaActual + delta;
    if (nueva >= 1 && nueva <= this.totalPaginas) {
      this.paginaActual = nueva;
      this.actualizarLista();
    }
  }

  irAPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.actualizarLista();
  }

  iniciarEdicion(post: Post): void {
    this.postEditando = { ...post };
    this.editando = true;
  }

  cancelarEdicion(): void {
    this.postEditando = null;
    this.editando = false;
  }

  guardarCambios(): void {
    if (!this.postEditando) return;
    this.postService.updatePost(this.postEditando.id, {
      title: this.postEditando.title,
      description: this.postEditando.description,
      image: this.postEditando.image
    }).subscribe({
      next: () => {
        this.popupService.showMessage('Actualizado', 'El post fue actualizado correctamente', 'success');
        this.cancelarEdicion();
        this.cargarPosts();
      },
      error: () => this.popupService.showMessage('Error', 'No se pudo actualizar el post', 'error')
    });
  }
}
