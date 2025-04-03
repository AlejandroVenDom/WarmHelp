import { Component, OnInit } from '@angular/core';
import { PopupService } from '../../services/utils/popup.service';
import { UserServiceService } from '../../services/auth/user-service.service';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {
  userData: any = {};

  constructor(
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userData = {
      username: this.userService.getUsername(),
      role: this.userService.getRole(),
      firstName: this.userService.getFirstName(),
      lastName: this.userService.getLastName(),
      address: this.userService.getAddress()
    };
  }
}
