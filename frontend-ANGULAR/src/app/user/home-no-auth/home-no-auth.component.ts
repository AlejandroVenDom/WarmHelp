import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/auth/token.service';

@Component({
  selector: 'app-home-no-auth',
  standalone: false,
  templateUrl: './home-no-auth.component.html',
  styleUrl: './home-no-auth.component.scss'
})
export class HomeNoAuthComponent implements OnInit {
  isLoggedIn = false;

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getAccessToken();
  }
}
