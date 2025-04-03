import { Component } from '@angular/core';
import {StatsComponent} from '../control-panel-tabs/stats/stats.component';
import {GraphicsComponent} from '../control-panel-tabs/graphics/graphics.component';

@Component({
  selector: 'app-control-panel',
  imports: [
    StatsComponent,
    GraphicsComponent
  ],
  standalone: true,
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent {

}
