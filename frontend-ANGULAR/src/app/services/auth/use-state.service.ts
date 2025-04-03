import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UseStateService {

  private readonly USER_KEY = 'warmhelp_user'

  constructor() { }

  save(username:string, typeRole: string, first_name:string, last_name:string, address:string, number:string, email:string, mySelf_description:string):void{
    sessionStorage.setItem(this.USER_KEY, JSON.stringify({username, typeRole, first_name, last_name, address, number, email, mySelf_description}));
  }

  getUsername():string | null {
    const session = JSON.parse(<string>sessionStorage.getItem(this.USER_KEY));
    if(!session){
      return null;
    }
    return session.username;
  }

  getTypeRole():string | null {
    const session = JSON.parse(<string>sessionStorage.getItem(this.USER_KEY));
    if(!session){
      return null;
    }
    return session.typeRole;
  }

  getFirstName():string | null {
    const session = JSON.parse(<string>sessionStorage.getItem(this.USER_KEY));
    if(!session){
      return null;
    }
    return session.first_name;
  }

  getLastName():string | null {    
    const session = JSON.parse(<string>sessionStorage.getItem(this.USER_KEY));
    if(!session){
      return null;
    }
    return session.last_name;
  }

  getAddress():string | null {    
    const session = JSON.parse(<string>sessionStorage.getItem(this.USER_KEY));
    if(!session){
      return null;
    }
    return session.address;
  }

  getNumber():string | null {    
    const session = JSON.parse(<string>sessionStorage.getItem(this.USER_KEY));
    if(!session){
      return null;
    }
    return session.number;
  }

  getEmail():string | null {
    const session = JSON.parse(<string>sessionStorage.getItem(this.USER_KEY));
    if(!session){
      return null;
    }
    return session.email;
  }

  getMySelfDescription():string | null {
    const session = JSON.parse(<string>sessionStorage.getItem(this.USER_KEY));
    if(!session){
      return null;
    }
    return session.mySelf_description;
  }

  removeSession():void{
    sessionStorage.removeItem(this.USER_KEY);
  }

}
