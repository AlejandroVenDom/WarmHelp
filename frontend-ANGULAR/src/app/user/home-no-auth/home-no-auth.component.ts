import { Component } from '@angular/core';
import { UseStateService } from '../../services/auth/use-state.service';

@Component({
  selector: 'app-home-no-auth',
  standalone: false,
  templateUrl: './home-no-auth.component.html',
  styleUrl: './home-no-auth.component.scss'
})
export class HomeNoAuthComponent {
  username: string | null;
  role: string | null;
  email: string | null;

  constructor(private useStateService: UseStateService) {
    this.username = useStateService.getUsername();
    this.role = useStateService.getTypeRole();
    this.email = useStateService.getEmail();
  }
}
