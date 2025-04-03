import { Component } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FooterComponent,RouterLink],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
