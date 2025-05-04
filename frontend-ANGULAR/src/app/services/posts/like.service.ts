import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private baseUrl = `${environment.apiUrl}/likes`;

  constructor(private http: HttpClient) {}

  toggleLike(postId: number, userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/toggle`, { postId, userId });
  }

  isLiked(postId: number, userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/isLiked`, {
      params: { postId, userId }
    });
  }

  countLikes(postId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`, {
      params: { id: postId }
    });
  }
}
