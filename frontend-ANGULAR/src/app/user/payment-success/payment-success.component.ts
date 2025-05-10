import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UseStateService } from '../../services/auth/use-state.service';

@Component({
  selector: 'app-payment-success',
  standalone: false,
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss'
})
export class PaymentSuccessComponent implements OnInit {
  sessionId: string|null = null;
  email: string|null = null;

  constructor(private route: ActivatedRoute, private useStateService: UseStateService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.sessionId = params.get('session_id');
      console.log(this.sessionId);
    })

    this.email = this.useStateService.getEmail();
  }
}
