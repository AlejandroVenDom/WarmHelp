import { Component, OnInit } from '@angular/core';
import { UseStateService } from '../../services/auth/use-state.service';
import { Post } from '../../services/interfaces/post';
import { PostService } from '../../services/posts/post.service';
import { CommentRequest, CommentService } from '../../services/posts/comment.service';
import { ResponseCommentsService, ResponseCommentRequest } from '../../services/posts/response-comments.service';
import { ResponseComment } from '../../services/interfaces/response-coment';
import { PopupService } from '../../services/popup.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-posts',
  standalone: false,
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  // Estado de posts y paginación
  allPosts: Post[] = [];
  posts: Post[] = [];
  filtroBusqueda = '';
  cantidadMostrar = 10;
  cantidadesDisponibles = [6, 10, 16, 20, 30, 40, 50];
  paginaActual = 1;
  totalPaginas = 1;
  paginas: number[] = [];

  // Estado de modales
  modalNuevoPost = false;
  modalComentariosVisible = false;
  modalDetallePostVisible = false;

  // Post seleccionado
  postSeleccionado: Post | null = null;
  postDetalleSeleccionado: Post | null = null;

  // Comentarios y respuestas
  comentarios: any[] = [];
  respuestas: ResponseComment[] = [];
  comentarioSeleccionado: any = null;
  mostrandoRespuestas = false;
  nuevoComentario = '';
  nuevaRespuesta = '';

  // Nuevo post
  nuevoPost = {
    title: '',
    description: '',
    image: '',
    userName: ''
  };

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private responseCommentsService: ResponseCommentsService,
    private useStateService: UseStateService,
    private popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.cantidadMostrar = Number(localStorage.getItem('cantidadMostrar')) || 10;
    this.nuevoPost.userName = this.useStateService.getUsername() || 'anon';
    this.cargarPosts();

    document.addEventListener('keydown', this.detectarEscape.bind(this));
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.detectarEscape.bind(this));
  }

  detectarEscape(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.cerrarModalDetallePost();
      this.cerrarModalNuevoPost();
      this.cerrarModalComentarios();
    }
  }
  cerrarModalAlFondo(event: MouseEvent): void {
    // Puedes reutilizar esta función para cerrar cualquier modal activo
    this.cerrarModalDetallePost();
    this.cerrarModalNuevoPost();
    this.cerrarModalComentarios();
  }


  // --- Manejo de posts ---
  cargarPosts(preservarPagina: boolean = false): void {
    this.postService.getAllPosts().subscribe({
      next: posts => {
        this.allPosts = posts.reverse(); // Nunca recortes aquí
        if (!preservarPagina) {
          this.paginaActual = 1;
        }
        this.actualizarLista();
      },
      error: err => console.error('Error al cargar posts:', err)
    });
  }




  actualizarLista(): void {
    const filtro = this.filtroBusqueda.toLowerCase().trim();

    const postsFiltrados = this.allPosts.filter(p =>
      p.title.toLowerCase().includes(filtro) ||
      p.description.toLowerCase().includes(filtro) ||
      p.username.toLowerCase().includes(filtro)
    );

    this.totalPaginas = Math.max(1, Math.ceil(postsFiltrados.length / this.cantidadMostrar));
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);

    // Evitar desbordamiento de página
    if (this.paginaActual > this.totalPaginas) {
      this.paginaActual = this.totalPaginas;
    }

    const inicio = (this.paginaActual - 1) * this.cantidadMostrar;
    const fin = inicio + this.cantidadMostrar;

    // ✅ Aquí solo se actualiza lo visible
    this.posts = postsFiltrados.slice(inicio, fin);
  }




  resetearFiltros(): void {
    this.filtroBusqueda = '';
    this.paginaActual = 1;
    this.actualizarLista();
  }

  filtrarPosts(): void {
    this.paginaActual = 1;
    this.actualizarLista();
  }

  onCantidadChange(): void {
    this.cantidadMostrar = +this.cantidadMostrar; // fuerza a número
    localStorage.setItem('cantidadMostrar', String(this.cantidadMostrar));
    this.paginaActual = 1;
    this.actualizarLista();
  }



  cambiarPagina(valor: number): void {
    const nuevaPagina = this.paginaActual + valor;
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
      this.actualizarLista();
    }
  }

  irAPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
      this.actualizarLista();
    }
  }


  // --- Publicar post ---
  abrirModalNuevoPost(): void {
    this.modalNuevoPost = true;
  }

  cerrarModalNuevoPost(): void {
    this.modalNuevoPost = false;
    this.nuevoPost = {
      title: '',
      description: '',
      image: '',
      userName: this.useStateService.getUsername() || 'anon'
    };
  }

  publicarPost(): void {
    const { title, description } = this.nuevoPost;
    if (!title.trim() || !description.trim()) {
      alert('Completa el título y la descripción');
      return;
    }

    this.popupService.loader('Publicando...', 'Esto puede tardar un poco');
    this.postService.createPost(this.nuevoPost).pipe(delay(2300)).subscribe({
      next: () => {
        this.popupService.close();
        this.popupService.showMessage('Publicación subida', '¡Tu publicación ha sido subida exitosamente!', 'success');
        this.cerrarModalNuevoPost();
        this.cargarPosts();
      },
      error: err => {
        this.popupService.showMessage('Error de publicación', 'ERROR: ' + err.error, 'error');
      }
    });
  }

  // --- Comentarios ---
  abrirModalComentarios(post: Post): void {
    this.postSeleccionado = post;
    this.comentarios = post.comments || [];
    this.modalComentariosVisible = true;
    this.nuevoComentario = '';
    this.mostrandoRespuestas = false;
    this.respuestas = [];
  }

  cerrarModalComentarios(): void {
    this.modalComentariosVisible = false;
    this.nuevoComentario = '';
    this.nuevaRespuesta = '';
    this.postSeleccionado = null;
    this.comentarioSeleccionado = null;
    this.respuestas = [];
  }

  enviarComentario(): void {
    if (!this.nuevoComentario.trim() || !this.postSeleccionado) return;

    const comentario: CommentRequest = {
      description: this.nuevoComentario.trim(),
      userName: this.useStateService.getUsername() || 'anon',
      postId: this.postSeleccionado.id
    };

    this.commentService.createComment(comentario).subscribe({
      next: () => {
        this.nuevoComentario = '';
        this.cargarPosts(true); // <- Aquí se mantiene la página actual
        setTimeout(() => {
          const actualizado = this.allPosts.find(p => p.id === this.postSeleccionado?.id);
          if (actualizado) {
            this.postSeleccionado = actualizado;
            this.comentarios = actualizado.comments || [];
          }
        }, 300);
      }
    });
  }

  // --- Respuestas ---
  verRespuestas(comentario: any): void {
    this.comentarioSeleccionado = comentario;
    this.mostrandoRespuestas = true;
    this.responseCommentsService.getAllResponseComments().subscribe({
      next: respuestas => {
        this.respuestas = respuestas.filter(r => r.commentId === comentario.id);
      }
    });
  }

  enviarRespuesta(): void {
    if (!this.nuevaRespuesta.trim() || !this.comentarioSeleccionado) return;

    const respuesta: ResponseCommentRequest = {
      description: this.nuevaRespuesta.trim(),
      userName: this.useStateService.getUsername() || 'anon',
      commentId: this.comentarioSeleccionado.id
    };

    this.responseCommentsService.createResponseComment(respuesta).subscribe({
      next: nueva => {
        this.respuestas.push(nueva);
        this.comentarioSeleccionado.responseComments = [
          ...(this.comentarioSeleccionado.responseComments || []),
          nueva
        ];
        this.nuevaRespuesta = '';
      },
      error: err => {
        console.error('Error al enviar respuesta:', err);
        alert('❌ Hubo un problema al guardar tu respuesta');
      }
    });
  }

  volverAComentarios(): void {
    this.mostrandoRespuestas = false;
    this.comentarioSeleccionado = null;
    this.nuevaRespuesta = '';
    this.respuestas = [];
  }

  // --- Detalle post ---
  abrirModalDetallePost(post: Post): void {
    this.postDetalleSeleccionado = post;
    this.modalDetallePostVisible = true;
  }

  cerrarModalDetallePost(): void {
    this.modalDetallePostVisible = false;
    this.postDetalleSeleccionado = null;
  }

  contarTotalRespuestas(post: Post): number {
    return post.comments?.reduce((total, comment: any) => {
      return total + (comment.responseComments?.length || 0);
    }, 0) || 0;
  }
}
