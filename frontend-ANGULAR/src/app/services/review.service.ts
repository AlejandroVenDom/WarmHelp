import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ReviewRequest {
  description: string;
  userName: string;
  professionalServiceId: number;
  calificationType: 'EXCELENTE' | 'BUENO' | 'REGULAR' | 'MALO' | 'PESIMO';
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = `${environment.apiUrl}/reviews`;

  constructor(private http: HttpClient) {}

  registerReview(review: ReviewRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerReview`, review);
  }

  getAllReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
}
