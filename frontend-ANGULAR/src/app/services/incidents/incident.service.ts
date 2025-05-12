import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Incident, IncidentState } from '../interfaces/incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private apiUrl = `${environment.apiUrl}/incidents`;

  constructor(private http: HttpClient) {}

  getAllIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.apiUrl);
  }

  registerIncident(data: {
    title: string;
    description: string;
    type: 'TECNICA' | 'FINANCIERA' | 'OTROS';
    userName: string;
  }): Observable<Incident> {
    return this.http.post<Incident>(`${this.apiUrl}/registerIncident`, data);
  }
  updateIncidentState(id: number, newState: IncidentState) {
  return this.http.patch(`${this.apiUrl}/${id}/update-state`, {
    newState
  });
}
deleteIncident(id: number): Observable<string> {
  return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
}


}
