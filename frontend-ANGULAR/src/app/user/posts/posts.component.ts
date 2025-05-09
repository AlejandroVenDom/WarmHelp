import { Component, OnInit } from '@angular/core';
import { UseStateService } from '../../services/auth/use-state.service';
import { Post } from '../../services/interfaces/post';
import { PostService } from '../../services/posts/post.service';
import { CommentRequest, CommentService } from '../../services/posts/comment.service';
import { ResponseCommentsService, ResponseCommentRequest } from '../../services/posts/response-comments.service';
import { ResponseComment } from '../../services/interfaces/response-coment';
import { PopupService } from '../../services/popup.service';
import { delay } from 'rxjs';
import { Router } from '@angular/router';
import { ReportService } from '../../services/report/report.service';
import { LikeService } from '../../services/posts/like.service';

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
  likedPosts: Set<number> = new Set();
  likesCount: { [postId: number]: number } = {};
  filtroBusqueda = '';
  cantidadMostrar = 10;
  cantidadesDisponibles = [6, 10, 16, 20, 30, 40, 50];
  paginaActual = 1;
  totalPaginas = 1;
  paginas: number[] = [];
  mostrarBotonScroll = false;
  imagenSeleccionada: File | null = null;
  modoImagen: 'url' | 'archivo' = 'url';

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

  modalReportePostVisible = false;
  postReporteSeleccionado: Post | null = null;
  nuevoReportePost = {
  description: '',
  type: 'FALSE_INFORMATION',
  postId: 0
};

tiposReporte: string[] = [
  'BULLYING_OR_HARASSMENT',
  'SUICIDE_SELF_INJURY_OR_EATING_DISORDERS',
  'VIOLENCE',
  'ILLEGAL_SALES',
  'NUDITY_OR_SEXUAL_ACTIVITY',
  'SCAMS_FRAUD_OR_SPAM',
  'FALSE_INFORMATION'
];

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
    private popupService: PopupService,
    private router: Router,
    private reportService: ReportService,
    private likeService: LikeService
  ) {}

  ngOnInit(): void {
    this.cantidadMostrar = Number(localStorage.getItem('cantidadMostrar')) || 10;
    this.nuevoPost.userName = this.useStateService.getUsername() || 'anon';
    this.cargarPosts();
    window.addEventListener('scroll', this.verificarScroll.bind(this));
    document.addEventListener('keydown', this.detectarEscape.bind(this));
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.detectarEscape.bind(this));
    window.removeEventListener('scroll', this.verificarScroll.bind(this));
  }
  verificarScroll(): void {
    this.mostrarBotonScroll = window.scrollY > 300;
  }
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  abrirModalReportePost(post: Post): void {
    this.postReporteSeleccionado = post;
    this.nuevoReportePost = {
      description: '',
      type: 'FALSE_INFORMATION',
      postId: post.id
    };
    this.modalReportePostVisible = true;
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imagenSeleccionada = file;
    }
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

  cerrarModalReportePost(): void {
    this.modalReportePostVisible = false;
    this.postReporteSeleccionado = null;
    this.nuevoReportePost = {
      description: '',
      type: 'FALSE_INFORMATION',
      postId: 0
    };
  }

  getNombreTipoReporte(tipo: string): string {
    const map: Record<string, string> = {
      BULLYING_OR_HARASSMENT: 'Acoso',
      SUICIDE_SELF_INJURY_OR_EATING_DISORDERS: 'Conducta riesgosa',
      VIOLENCE: 'Violencia',
      ILLEGAL_SALES: 'Ventas ilegales',
      NUDITY_OR_SEXUAL_ACTIVITY: 'Contenido sexual',
      SCAMS_FRAUD_OR_SPAM: 'Estafa o fraude',
      FALSE_INFORMATION: 'Información falsa'
    };
    return map[tipo] || tipo;
  }

  enviarReportePost(): void {
    const username = this.useStateService.getUsername();
    if (!username) return;

    const payload = {
      ...this.nuevoReportePost,
      userName: username
    };

    this.reportService.createPostReport(payload).subscribe({
      next: () => {
        this.popupService.showMessage('Reporte enviado', 'Gracias por tu reporte, lo revisaremos.', 'success');
        this.cerrarModalReportePost();
      },
      error: err => {
        this.popupService.showMessage('Error', 'No se pudo enviar el reporte', 'error');
      }
    });
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
        this.allPosts = posts.reverse();
        const userId = this.useStateService.getUserId();
        posts.forEach(post => {
          this.likeService.countLikes(post.id).subscribe(count => {
            this.likesCount[post.id] = count;
          });

          if (userId) {
            this.likeService.isLiked(post.id, userId).subscribe(isLiked => {
              if (isLiked) this.likedPosts.add(post.id);
            });
          }
        });

        if (!preservarPagina) this.paginaActual = 1;
        this.actualizarLista();
      },
      error: err => console.error('Error al cargar posts:', err)
    });
  }

  toggleLike(postId: number): void {
    const userId = this.useStateService.getUserId();
    if (!userId) return;

    this.likeService.toggleLike(postId, userId).subscribe(response => {
      if (response.liked) {
        this.likedPosts.add(postId);
      } else {
        this.likedPosts.delete(postId);
      }
      this.likesCount[postId] = response.totalLikes;
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
    this.cantidadMostrar = 10;
    localStorage.setItem('cantidadMostrar', '10');
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
  verPerfilPublico(username: string): void {
    if (username) {
      this.router.navigate(['/perfil-publico', username]);
    }
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
    const { title, description, userName } = this.nuevoPost;
    if (!title.trim() || !description.trim()) {
      alert('Completa el título y la descripción');
      return;
    }

    this.popupService.loader('Publicando...', 'Esto puede tardar un poco');

    const obs = this.modoImagen === 'archivo' && this.imagenSeleccionada
      ? this.postService.createPostWithImage(title, description, userName, this.imagenSeleccionada)
      : this.postService.createPost(this.nuevoPost);

    obs.pipe(delay(200)).subscribe({
      next: () => {
        this.popupService.close();
        this.popupService.showMessage('Publicación subida', '¡Tu publicación ha sido subida exitosamente!', 'success');
        this.cerrarModalNuevoPost();
        this.cargarPosts();
        this.imagenSeleccionada = null;
      },
      error: err => {
        const mensaje = err.error?.message || JSON.stringify(err.error);
        this.popupService.showMessage('Error de publicación', 'ERROR: ' + mensaje, 'error');
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
