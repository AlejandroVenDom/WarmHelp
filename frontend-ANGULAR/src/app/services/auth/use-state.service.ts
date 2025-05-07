import { Injectable } from '@angular/core';
import { ReportServiceInterface } from '../interfaces/report';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UseStateService {
  private readonly USER_KEY = 'warmhelp_user';
  private avatarSubject = new BehaviorSubject<string | null>(this.getAvatar());

  constructor() {
    const session = this.getSession();
    if (session?.avatar) {
      this.avatarSubject.next(session.avatar);
    }
  }

  save(userData: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    address: string;
    number: string;
    email: string;
    mySelf_description: string;
    comments: any[];
    posts: any[];
    professionalServices: any[];
    reviews: any[];
    responseComments: any[];
    incidents: any[];
    reports: any[];
    likes: any[],
    role: string;
    avatar: string;
  }): void {
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(userData));
    this.avatarSubject.next(userData.avatar || null);
  }
  getUserId(): number | null {
    const session = this.getSession();
    return session ? session.id : null;
  }

  getReports(): ReportServiceInterface[] {
    const session = this.getSession();
    return session ? session.reportServiceResponseDTOS || [] : [];
  }
  getAvatar(): string | null {
    const session = this.getSession();
    return session?.avatar || null;
  }
  getAvatar$(): Observable<string | null> {
    return this.avatarSubject.asObservable();
  }

  setAvatar(avatar: string) {
    const session = this.getSession();
    if (session) {
      const newSession = { ...session, avatar };
      this.save(newSession);
      this.avatarSubject.next(avatar);
    }
  }
  getIncidents(): any[] {
    const session = this.getSession();
    return session ? session.incidents || [] : [];
  }
  getLikes(): any[] {
    const session = this.getSession();
    return session ? session.likes || [] : [];
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

  getProfessionalServices(): any[] {
    const session = this.getSession();
    return session ? session.professionalServices : [];
  }

  getReviews(): any[] {
    const session = this.getSession();
    return session ? session.reviews : [];
  }

  getResponseComments(): any[] {
    const session = this.getSession();
    return session ? session.responseComments : [];
  }

  removeSession(): void {
    sessionStorage.removeItem(this.USER_KEY);
  }

  public getSession(): any {
    return JSON.parse(<string>sessionStorage.getItem(this.USER_KEY));
  }
}
