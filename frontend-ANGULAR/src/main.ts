/// <reference types="@angular/localize" />

import { platformBrowser } from '@angular/platform-browser';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { AppModule } from './app/app.module';

platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
