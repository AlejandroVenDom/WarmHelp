import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {

  private baseUrl = `${environment.apiUrl}/chat`;

  constructor(private http: HttpClient) { }

  askQuestion(question: string): Observable<any> {
    return this.http.post(`${this.baseUrl}`, { question });
  }
  getHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/history`);
  }
  deleteHistory(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/history`);
  }


}
