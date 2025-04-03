import { Component, OnInit } from '@angular/core';
import { UseStateService } from '../../services/auth/use-state.service';

@Component({
  selector: 'app-home-no-auth',
  standalone: false,
  templateUrl: './home-no-auth.component.html',
  styleUrl: './home-no-auth.component.scss'
})
export class HomeNoAuthComponent implements OnInit{
  username: string | null = null;
  role: string | null = null;
  email: string | null = null;
  address: string | null = null;
  number: string | null = null;
  comments: any[] = [];
  posts: any[] = [];
  first_name: string | null = null;
  last_name: string | null = null;
  mySelf_description: string | null = null;

  constructor(private useStateService: UseStateService) {
  }

  ngOnInit(): void {
      this.username = this.useStateService.getUsername();
      this.role = this.useStateService.getTypeRole();
      this.email = this.useStateService.getEmail();
      this.address = this.useStateService.getAddress();
      this.number = this.useStateService.getNumber();
      this.comments = this.useStateService.getComments();
      this.posts = this.useStateService.getPosts();
      this.first_name = this.useStateService.getFirstName();
      this.last_name = this.useStateService.getLastName();
      this.mySelf_description = this.useStateService.getMySelfDescription();

  }
}
