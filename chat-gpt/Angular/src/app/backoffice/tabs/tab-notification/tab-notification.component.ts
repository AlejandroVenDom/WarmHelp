import { Component } from '@angular/core';
import {TruncateTextPipe} from '../../../services/pipes/truncate-text.pipe';

@Component({
  selector: 'app-tab-notification',
  imports: [
    TruncateTextPipe,
  ],
  templateUrl: './tab-notification.component.html',
  styleUrl: './tab-notification.component.scss'
})
export class TabNotificationComponent {

}
