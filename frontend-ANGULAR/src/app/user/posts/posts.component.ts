import { Component, OnInit } from '@angular/core';
import { UseStateService } from '../../services/auth/use-state.service';
import { Post } from '../../services/interfaces/post';
import { PostService } from '../../services/posts/post.service';
import { CommentRequest, CommentService } from '../../services/posts/comment.service';
import { ResponseCommentsService, ResponseCommentRequest } from '../../services/posts/response-comments.service';
import { ResponseComment } from '../../services/interfaces/response-coment';

@Component({
  selector: 'app-posts',
  standalone: false,
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  modalNuevoPost = false;
  modalComentariosVisible = false;
  mostrandoRespuestas = false;
  postSeleccionado: Post | null = null;
  comentarioSeleccionado: any = null;
  comentarios: any[] = [];
  respuestas: ResponseComment[] = [];
  nuevoComentario: string = '';
  nuevaRespuesta: string = '';
  nuevoPost = {
    title: '',
    description: '',
    image: '',
    userName: ''
  };

  constructor(
    private postService: PostService,
    private useStateService: UseStateService,
    private commentService: CommentService,
    private responseCommentsService: ResponseCommentsService
  ) {}

  ngOnInit(): void {
    this.nuevoPost.userName = this.useStateService.getUsername() || '';
    this.cargarPosts();
  }

  cargarPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        console.log(data);
        this.posts = data.reverse();
      },
      error: (err) => console.error("Error al cargar posts:", err)
    });
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
      userName: this.useStateService.getUsername() || ''
    };
  }

  publicarPost(): void {
    if (!this.nuevoPost.title.trim() || !this.nuevoPost.description.trim()) {
      alert('Completa el título y la descripción');
      return;
    }

    this.postService.createPost(this.nuevoPost).subscribe({
      next: (post) => {
        this.posts.unshift(post);
        this.cerrarModalNuevoPost();
      },
      error: (err) => alert('Error al crear el post: ' + err.error)
    });
  }

  abrirModalComentarios(post: Post): void {
    this.postSeleccionado = post;
    this.comentarios = post.comments || [];
    this.modalComentariosVisible = true;
    this.nuevoComentario = '';
    this.mostrandoRespuestas = false;
    this.respuestas = []; // limpiar por si acaso
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
        this.cargarPosts();
        setTimeout(() => {
          const actualizado = this.posts.find(p => p.id === this.postSeleccionado?.id);
          if (actualizado) {
            this.postSeleccionado = actualizado;
            this.comentarios = actualizado.comments || [];
          }
        }, 300);
      }
    });
  }

  verRespuestas(comentario: any): void {
    this.comentarioSeleccionado = comentario;
    this.respuestas = [];
    this.responseCommentsService.getAllResponseComments().subscribe({
      next: (res) => {
        this.respuestas = res.filter(r => r.commentId == comentario.id); // ⚠️ usa == por si acaso son string vs number
        this.mostrandoRespuestas = true;
      }
    });
  }

  volverAComentarios(): void {
    this.mostrandoRespuestas = false;
    this.comentarioSeleccionado = null;
    this.nuevaRespuesta = '';
    this.respuestas = [];
  }

  enviarRespuesta(): void {
    if (!this.nuevaRespuesta.trim() || !this.comentarioSeleccionado) return;

    const respuesta: ResponseCommentRequest = {
      description: this.nuevaRespuesta.trim(),
      userName: this.useStateService.getUsername() || 'anon',
      commentId: this.comentarioSeleccionado.id
    };

    this.responseCommentsService.createResponseComment(respuesta).subscribe({
      next: (nuevaRespuesta) => {
        this.respuestas.push(nuevaRespuesta);
        if (this.comentarioSeleccionado.responseComments) {
          this.comentarioSeleccionado.responseComments.push(nuevaRespuesta);
        } else {
          this.comentarioSeleccionado.responseComments = [nuevaRespuesta];
        }
        this.nuevaRespuesta = '';
      },
      error: (err) => {
        console.error("Error al enviar respuesta:", err);
        alert("❌ Hubo un problema al guardar tu respuesta");
      }
    });
  }
}
