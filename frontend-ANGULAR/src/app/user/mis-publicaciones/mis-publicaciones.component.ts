import { Component, OnInit } from '@angular/core';
import { UseStateService } from '../../services/auth/use-state.service';
import { Post } from '../../services/interfaces/post';
import { PostService } from '../../services/posts/post.service';

@Component({
  selector: 'app-mis-publicaciones',
  standalone: false,
  templateUrl: './mis-publicaciones.component.html',
  styleUrl: './mis-publicaciones.component.scss'
})
export class MisPublicacionesComponent implements OnInit {
  misPosts: Post[] = [];
  postsFiltrados: Post[] = [];
  postEditando: Post | null = null;
  modalNuevoPost = false;
  mostrarBotonScroll = false;
  filtroBusqueda = '';
  cantidadMostrar = 10;
  cantidadesDisponibles = [6, 10, 20, 30, 40];
  paginaActual = 1;
  totalPaginas = 1;
  paginas: number[] = [];

  nuevoPost = {
    title: '',
    description: '',
    image: '',
    userName: ''
  };

  constructor(
    private postService: PostService,
    private stateService: UseStateService
  ) {}

  ngOnInit(): void {
    this.nuevoPost.userName = this.stateService.getUsername() || '';
    this.cargarMisPosts();
    window.addEventListener('scroll', this.verificarScroll.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.verificarScroll.bind(this));
  }

  verificarScroll(): void {
    this.mostrarBotonScroll = window.scrollY > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  eliminarPost(id: number): void {
    if (!confirm('¿Estás seguro de eliminar esta publicación?')) return;

    this.postService.softDeletePost(id).subscribe({
      next: () => {
        // Elimina localmente de la lista
        this.misPosts = this.misPosts.filter(p => p.id !== id);
        this.actualizarLista();
      },
      error: () => {
        alert('No se pudo eliminar la publicación');
      }
    });
  }

  cargarMisPosts(): void {
    const username = this.stateService.getUsername();
    this.postService.getAllPosts().subscribe(posts => {
      this.misPosts = posts
        .filter(p => p.username === username)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      this.actualizarLista();
    });
  }

  actualizarLista(): void {
    const filtro = this.filtroBusqueda.toLowerCase().trim();
    const filtrados = this.misPosts.filter(p =>
      p.title.toLowerCase().includes(filtro) ||
      p.description.toLowerCase().includes(filtro)
    );

    this.totalPaginas = Math.max(1, Math.ceil(filtrados.length / this.cantidadMostrar));
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);

    if (this.paginaActual > this.totalPaginas) this.paginaActual = this.totalPaginas;

    const inicio = (this.paginaActual - 1) * this.cantidadMostrar;
    const fin = inicio + this.cantidadMostrar;
    this.postsFiltrados = filtrados.slice(inicio, fin);
  }

  filtrarPosts(): void {
    this.paginaActual = 1;
    this.actualizarLista();
  }

  onCantidadChange(): void {
    this.paginaActual = 1;
    this.actualizarLista();
  }

  cambiarPagina(valor: number): void {
    const nueva = this.paginaActual + valor;
    if (nueva >= 1 && nueva <= this.totalPaginas) {
      this.paginaActual = nueva;
      this.actualizarLista();
    }
  }

  irAPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.actualizarLista();
  }

  abrirModalNuevoPost(): void {
    this.modalNuevoPost = true;
  }

  cerrarModalNuevoPost(): void {
    this.modalNuevoPost = false;
    this.nuevoPost = {
      title: '',
      description: '',
      image: '',
      userName: this.stateService.getUsername() || ''
    };
  }

  publicarPost(): void {
    if (!this.nuevoPost.title.trim() || !this.nuevoPost.description.trim()) return;
    this.postService.createPost(this.nuevoPost).subscribe(post => {
      this.misPosts.unshift(post);
      this.actualizarLista();
      this.cerrarModalNuevoPost();
    });
  }

  iniciarEdicion(post: Post): void {
    this.postEditando = { ...post };
  }

  cancelarEdicion(): void {
    this.postEditando = null;
  }

  guardarCambios(): void {
    if (!this.postEditando) return;
    this.postService.updatePost(this.postEditando.id, {
      title: this.postEditando.title,
      description: this.postEditando.description,
      image: this.postEditando.image
    }).subscribe(() => {
      const index = this.misPosts.findIndex(p => p.id === this.postEditando?.id);
      if (index > -1) this.misPosts[index] = this.postEditando!;
      this.actualizarLista();
      this.cancelarEdicion();
    });
  }
}
