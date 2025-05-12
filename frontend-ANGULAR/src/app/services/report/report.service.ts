import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ReportServiceInterface } from '../interfaces/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = `${environment.apiUrl}/reports-services`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ReportServiceInterface[]> {
    return this.http.get<ReportServiceInterface[]>(this.apiUrl);
  }
  getAllPostReports(): Observable<ReportServiceInterface[]> {
    return this.http.get<ReportServiceInterface[]>(`${environment.apiUrl}/reports-posts`);
  }

  create(report: {
    type: string;
    description: string;
    userName: string;
    serviceId: number;
  }): Observable<ReportServiceInterface> {
    return this.http.post<ReportServiceInterface>(`${this.apiUrl}/register-report-service`, report);
  }
  createPostReport(report: {
    type: string;
    description: string;
    userName: string;
    postId: number;
  }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/reports-posts/register-report-post`, report);
  }
  updateServiceReportState(id: number, newState: string): Observable<any> {
  return this.http.patch(`${this.apiUrl}/${id}/update-state`, { newState });
}

updatePostReportState(id: number, newState: string): Observable<any> {
  return this.http.patch(`${environment.apiUrl}/reports-posts/${id}/update-state`, { newState });
}
deleteServiceReport(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}
deletePostReport(id: number): Observable<any> {
  return this.http.delete(`${environment.apiUrl}/reports-posts/${id}`);
}



}
