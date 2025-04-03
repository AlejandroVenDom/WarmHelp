import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {TabNotificationComponent} from '../tabs/tab-notification/tab-notification.component';
import { TabGridComponent } from '../tabs/tab-grid/tab-grid.component';
import { TabMenuComponent } from '../tabs/tab-menu/tab-menu.component';
import {SidebarStatusService} from '../../services/status/sidebar-status.service';
import {SettingsComponent} from '../tabs/settings/settings.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-backoffice',
  imports: [
    NgIf,
    TabNotificationComponent,
    SettingsComponent,
    TabMenuComponent,
    TabGridComponent,
    RouterLink
],
  standalone: true,
  templateUrl: './header-backoffice.component.html',
  styleUrl: './header-backoffice.component.scss'
})
export class HeaderBackofficeComponent {

  isActive: boolean = true;

  // Variables de tabs

  isActiveItems: any = {
    isActiveNotification: false,
    isActiveSettings: false,
    isActiveMenu: false,
    isActiveGear: false,
    isActiveGrid: false
  }

  constructor(
    private sidebarStatusService: SidebarStatusService,
  ) {}

  toggleLogo() {
    this.isActive = !this.isActive;
    this.sidebarStatusService.changeStatus(this.isActive);
  }

   toggleItem(option: string) {
    if (this.isActiveItems[option]) {
      this.isActiveItems[option] = false;
    }
    else {
      Object.keys(this.isActiveItems).forEach((item) => {
        this.isActiveItems[item] = false;
      })
      this.isActiveItems[option] = true;
    }
  }

}
