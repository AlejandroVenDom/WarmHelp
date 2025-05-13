import { Injectable } from '@angular/core';
import { ProfessionalServiceInterface } from './interfaces/professional';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importamos map
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {
  private apiUrl = 'http://localhost:8080/api/professionalServices';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProfessionalServiceInterface[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((servicios: any[]) =>
        servicios.map(s => ({
          id: s.id,
          title: s.title,
          description: s.description,
          image: s.image,
          price: s.price,
          tax: s.tax,
          currencyType: s.currency,
          userName: s.username,
          createdAt: s.createdAt
        }))
      )
    );
  }

  registerService(service: ProfessionalServiceInterface): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerService`, service);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
  update(id: number, data: ProfessionalServiceInterface): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/update`, data);
  }
  getById(id: number): Observable<ProfessionalServiceInterface> {
  return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
    map(s => ({
      id: s.id,
      title: s.title,
      description: s.description,
      image: s.image,
      price: s.price,
      tax: s.tax,
      currencyType: s.currency,
      userName: s.username,
      username: s.username,
      createdAt: s.createdAt
    }))
  );
}

}
