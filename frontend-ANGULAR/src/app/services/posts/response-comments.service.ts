import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ResponseCommentRequest {
  description: string;
  userName: string;
  commentId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ResponseCommentsService {
  private apiUrl = 'http://localhost:8080/api/responseComments';

  constructor(private http: HttpClient) {}

  getAllResponseComments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createResponseComment(response: ResponseCommentRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerResponseComment`, response);
  }
}
