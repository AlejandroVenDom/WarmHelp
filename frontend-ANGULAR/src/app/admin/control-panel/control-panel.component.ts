import { Component, OnInit } from '@angular/core';
import { ControlPanelService } from '../../services/control-panel.service';
import { ChartData } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-panel',
  standalone: false,
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent implements OnInit {
  totalServicios = 0;
  totalPosts = 0;
  totalIncidencias = 0;
  totalReportes = 0;
  abrirSelectorReportes = false;

  serviciosPorMoneda: ChartData<'pie', number[], string> = { labels: [], datasets: [] };
  postsPorSemana: ChartData<'bar', number[], string> = { labels: [], datasets: [] };
  incidenciasPorEstado: ChartData<'bar', number[], string> = { labels: [], datasets: [] };
  incidenciasPorTipo: ChartData<'bar', number[], string> = { labels: [], datasets: [] };
  reportesPorTipo: ChartData<'bar', number[], string> = { labels: [], datasets: [] };
  reportesPorEstado: ChartData<'bar', number[], string> = { labels: [], datasets: [] };

  constructor(
    private panelService: ControlPanelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.panelService.getResumenServicios().subscribe(data => {
      this.totalServicios = data.total;
      this.serviciosPorMoneda = data.porMoneda;
    });

    this.panelService.getResumenPosts().subscribe(data => {
      this.totalPosts = data.total;
      this.postsPorSemana = data.porSemana;
    });

    this.panelService.getResumenIncidencias().subscribe(data => {
      this.totalIncidencias = data.total;
      this.incidenciasPorEstado = data.porEstado;
      this.incidenciasPorTipo = data.porTipo;
    });

    this.panelService.getResumenReportes().subscribe(data => {
      this.totalReportes = data.total;
      this.reportesPorTipo = data.porTipo;
      this.reportesPorEstado = data.porEstado;
    });
  }
  irARuta(ruta: string) {
    this.router.navigate([ruta]);
    this.abrirSelectorReportes = false;
  }
}

