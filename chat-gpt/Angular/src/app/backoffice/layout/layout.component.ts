import {Component, OnInit} from '@angular/core';
import {HeaderBackofficeComponent} from '../header-backoffice/header-backoffice.component';
import {RouterOutlet} from '@angular/router';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {SidebarStatusService} from '../../services/status/sidebar-status.service';

@Component({
  selector: 'app-layout',
  imports: [
    HeaderBackofficeComponent,
    RouterOutlet,
    SidebarComponent
  ],
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutBackComponent implements OnInit {

  isActiveSidebar: boolean = true;

  constructor(
    private sidebarStatusService: SidebarStatusService,
  )
  {}

  ngOnInit():void {
    this.sidebarStatusService.status$.subscribe(valorProcedenteDelHeader => {
      this.isActiveSidebar = valorProcedenteDelHeader;
    })
  }

}
