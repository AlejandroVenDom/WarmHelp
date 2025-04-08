import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CommentRequest {
  description: string;
  userName: string;
  postId: number;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8080/api/comments';

  constructor(private http: HttpClient) {}

  createComment(comment: CommentRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerComment`, comment);
  }
}
