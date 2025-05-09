import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  createPost(post: {
    title: string;
    description: string;
    image: string;
    userName: string;
  }): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/registerPost`, post);
  }
  updatePost(id: number, post: { title: string; description: string; image?: string }): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/${id}/update`, post);
  }

  softDeletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  createPostWithImage(
    title: string,
    description: string,
    userName: string,
    image: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('username', userName);
    formData.append('image', image);

    return this.http.post(`${this.apiUrl}/uploadPostWithImage`, formData, { responseType: 'text' });
  }
  createPostImage(
    title: string,
    description: string,
    userName: string,
    image: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('username', userName);
    formData.append('image', image);

    return this.http.post(`${this.apiUrl}/uploadPostWithImage`, formData);
  }

}
