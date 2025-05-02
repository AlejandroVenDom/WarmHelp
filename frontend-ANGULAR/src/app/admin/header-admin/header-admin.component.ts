import { Component, HostListener, OnInit } from '@angular/core';
import { UseStateService } from '../../services/auth/use-state.service';

@Component({
  selector: 'app-header-admin',
  standalone: false,
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.scss'
})
export class HeaderAdminComponent implements OnInit {
  sidebarOpen = false;

  username: string | null = '';

  constructor(
    private useStateService: UseStateService
  ) {}

  ngOnInit(): void {
    this.username = this.useStateService.getUsername();
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    this.toggleBodyClass(this.sidebarOpen);
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
    this.toggleBodyClass(false);
  }

  private toggleBodyClass(open: boolean): void {
    const content = document.querySelector('.admin-content');
    if (content) {
      content.classList.toggle('menu-open', open);
    }
  }


  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event): void {
    const nav = document.querySelector('.admin-sidebar');
    const toggle = document.querySelector('.toggle-button');
    if (this.sidebarOpen && nav && !nav.contains(event.target as Node) && !toggle?.contains(event.target as Node)) {
      this.closeSidebar();
    }
  }
}
