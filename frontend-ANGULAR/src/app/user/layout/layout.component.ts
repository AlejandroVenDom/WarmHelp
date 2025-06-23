import { Component } from '@angular/core';
import { HeaderClienteComponent } from '../header-cliente/header-cliente.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  showChat = false;

  toggleChat(): void {
    this.showChat = !this.showChat;
  }

  closeChat(): void {
    this.showChat = false;
  }
}
