import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { UserInterface } from "../interfaces/auth";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.apiUrl}/users-info`);
  }

  getUserByUsername(username: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.apiUrl}/getbyusername/${username}`);
  }

  updateUser(id: number, data: Partial<UserInterface>): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/update`, data);
  }

  updateUsername(id: number, newUsername: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/username`, { newUsername });
  }

  addUser(user: UserInterface): Observable<any> {
    const request = {
      username: user.username,
      password: user.password,
      roleType: user.roleType,
      first_name: user.first_name,
      last_name: user.last_name,
      address: user.address,
      number: user.number,
      email: user.email,
      mySelf_description: user.mySelf_description || ''
    };
    return this.http.post(`${this.apiUrl}/register`, request);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getPublicProfile(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/public-profile/${username}`);
  }
}
