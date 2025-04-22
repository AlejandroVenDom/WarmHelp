import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginInterface, UserInterface } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  constructor(private http: HttpClient) { }

  // login de usuario
  login(credentials: LoginInterface) : Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/users/login`, credentials);
  }

  // registro de usuario
  register(userData: UserInterface):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/users/register`, userData);
  }

  // cambio de contraseña, REVISAR POR SI ACASO ESTÁ MAL, * No se si realizar una interfaz o no
  changePassword(oldPassword: string, newPassword: string, username:string):Observable<any>{
    const payload = {
      oldPassword,
      newPassword,
      username
    };
    return this.http.post<any>(`${environment.apiUrl}/users/change-password`, payload);
  }

  updateProfileById(id: number, data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/${id}/update`, data);
  }





}
