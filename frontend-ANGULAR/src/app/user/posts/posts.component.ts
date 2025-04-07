import { Component, OnInit } from '@angular/core';
import { UseStateService } from '../../services/auth/use-state.service';
import { Post } from '../../services/interfaces/post';
import { PostService } from '../../services/posts/post.service';

@Component({
  selector: 'app-posts',
  standalone: false,
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  modalVisible = false;

  nuevoPost = {
    title: '',
    description: '',
    image: '',
    userName: ''
  };

  constructor(
    private postService: PostService,
    private useStateService: UseStateService
  ) {}

  ngOnInit(): void {
    this.nuevoPost.userName = this.useStateService.getUsername() || '';
    this.cargarPosts();
  }

  cargarPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data.reverse();
      },
      error: (err) => {
        console.error("Error al cargar posts:", err);
      }
    });
  }

  abrirModal(): void {
    this.modalVisible = true;
  }

  cerrarModal(): void {
    this.modalVisible = false;
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

    this.nuevoPost.userName = this.useStateService.getUsername() || '';

    this.postService.createPost(this.nuevoPost).subscribe({
      next: (post) => {
        this.posts.unshift(post);
        this.cerrarModal();
      },
      error: (err) => {
        alert('Error al crear el post: ' + err.error);
      }
    });
  }
}
