import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private readonly USER_KEY = "tienda_online";


  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  save(username: string, role: string,firstName: string,lastName: string,address: string): void {
    sessionStorage.setItem(this.USER_KEY, JSON.stringify({username, role, firstName, lastName, address}));
  }

  getUsername(): string | null {
    const session = JSON.parse(<string>sessionStorage.getItem(this.USER_KEY));
    if (!session) {
      return null;
    }
    return session.username;
  }
  getRole(): string | null {
    const session = JSON.parse(<string>sessionStorage.getItem(this.USER_KEY));
    if (!session) {
      return null;
    }
    return session.role;
  }
  getFirstName(): string | null {
    const session = JSON.parse(<string>sessionStorage.getItem(this.USER_KEY));
    if (!session) {
      return null;
    }
    return session.firstName;
  }
  getLastName(): string | null {
    const session = JSON.parse(<string>sessionStorage.getItem(this.USER_KEY));
    if (!session) {
      return null;
    }
    return session.lastName;
  }
  getAddress(): string | null {
    const session = JSON.parse(<string>sessionStorage.getItem(this.USER_KEY));
    if (!session) {
      return null;
    }
    return session.address;
  }

  removeSession(): void {
    sessionStorage.removeItem(this.USER_KEY)
  }

}
