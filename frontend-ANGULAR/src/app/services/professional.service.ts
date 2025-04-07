import { Injectable } from '@angular/core';
import { ProfessionalServiceInterface } from './interfaces/professional';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {
  private apiUrl = `${environment.apiUrl}/professionalServices`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProfessionalServiceInterface[]> {
    return this.http.get<ProfessionalServiceInterface[]>(this.apiUrl);
  }

  registerService(service: ProfessionalServiceInterface): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerService`, service);
  }
}
