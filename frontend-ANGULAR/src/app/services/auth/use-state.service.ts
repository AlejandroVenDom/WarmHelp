import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UseStateService {

  private readonly USER_KEY = 'warmhelp_user';

  constructor() { }

  save(username: string, role: string, first_name: string, last_name: string, address: string, number: string, email: string, mySelf_description: string, comments: any[], posts: any[]): void {
    sessionStorage.setItem(this.USER_KEY, JSON.stringify({
      username, role, first_name, last_name, address, number, email, mySelf_description, comments, posts
    }));
  }

  getUsername(): string | null {
    const session = this.getSession();
    return session ? session.username : null;
  }

  getTypeRole(): string | null {
    const session = this.getSession();
    return session ? session.role : null;
  }

  getFirstName(): string | null {
    const session = this.getSession();
    return session ? session.first_name : null;
  }

  getLastName(): string | null {
    const session = this.getSession();
    return session ? session.last_name : null;
  }

  getAddress(): string | null {
    const session = this.getSession();
    return session ? session.address : null;
  }

  getNumber(): string | null {
    const session = this.getSession();
    return session ? session.number : null;
  }

  getEmail(): string | null {
    const session = this.getSession();
    return session ? session.email : null;
  }

  getMySelfDescription(): string | null {
    const session = this.getSession();
    return session ? session.mySelf_description : null;
  }

  getComments(): any[] {
    const session = this.getSession();
    return session ? session.comments : [];
  }

  getPosts(): any[] {
    const session = this.getSession();
    return session ? session.posts : [];
  }

  removeSession(): void {
    sessionStorage.removeItem(this.USER_KEY);
  }

  private getSession(): any {
    return JSON.parse(<string>sessionStorage.getItem(this.USER_KEY));
  }
}
