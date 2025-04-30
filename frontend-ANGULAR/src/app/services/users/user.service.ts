import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicProfile(username: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/public-profile/${username}`);
  }
}
