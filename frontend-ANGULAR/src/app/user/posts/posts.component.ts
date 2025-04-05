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
    private useState: UseStateService
  ) {}

  ngOnInit(): void {
    this.nuevoPost.userName = this.useState.getUsername() || '';
    this.cargarPosts();
  }

  cargarPosts(): void {
    this.postService.getAllPosts().subscribe((data) => {
      console.log("Posts recibidos desde el backend:", data);
      this.posts = data.reverse(); // ordenar del más reciente al más antiguo
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
      userName: this.useState.getUsername() || ''
    };
  }

  publicarPost(): void {
    if (!this.nuevoPost.title.trim() || !this.nuevoPost.description.trim()) {
      alert('Completa el título y la descripción');
      return;
    }

    this.postService.createPost(this.nuevoPost).subscribe({
      next: (post) => {
        this.posts.unshift(post); // insertar al principio de la lista
        this.cerrarModal();
      },
      error: (err) => {
        alert('Error al crear el post: ' + err.error);
      }
    });
  }
}
