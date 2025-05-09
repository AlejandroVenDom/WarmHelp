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
  modalNuevoPost = false;
  mostrarBotonScroll = false;
  nuevoPost = {
    title: '',
    description: '',
    image: '',
    userName: ''
  };
  filtroBusqueda: string = '';

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

  cargarMisPosts(): void {
    const username = this.stateService.getUsername();
    this.postService.getAllPosts().subscribe(posts => {
      this.misPosts = posts
  .filter(post => post.username === username)
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

this.postsFiltrados = [...this.misPosts];
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
      userName: this.stateService.getUsername() || ''
    };
  }

  publicarPost(): void {
    if (!this.nuevoPost.title.trim() || !this.nuevoPost.description.trim()) {
      alert('Completa el título y la descripción');
      return;
    }

    this.postService.createPost(this.nuevoPost).subscribe(post => {
      this.misPosts.unshift(post);
      this.postsFiltrados = [...this.misPosts];
      this.cerrarModalNuevoPost();
    });
  }

  filtrarPosts(): void {
    const filtro = this.filtroBusqueda.toLowerCase().trim();
    this.postsFiltrados = this.misPosts.filter(post =>
      post.title.toLowerCase().includes(filtro) ||
      post.description.toLowerCase().includes(filtro)
    );
  }
}
