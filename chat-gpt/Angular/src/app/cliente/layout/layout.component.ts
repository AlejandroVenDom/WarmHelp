import { Component } from '@angular/core';
import {HeaderClienteComponent} from '../header-cliente/header-cliente.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    HeaderClienteComponent,
    RouterOutlet
  ],
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
