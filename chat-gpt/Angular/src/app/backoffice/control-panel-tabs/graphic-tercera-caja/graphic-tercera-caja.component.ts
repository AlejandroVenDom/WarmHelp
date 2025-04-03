import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, BubbleController, PointElement, LinearScale, Title, Tooltip, Legend, ChartConfiguration, ChartDataset, ChartType } from 'chart.js';

Chart.register(BubbleController, PointElement, LinearScale, Title, Tooltip, Legend);

@Component({
  selector: 'app-graphic-tercera-caja',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './graphic-tercera-caja.component.html',
  styleUrl: './graphic-tercera-caja.component.scss'
})
export class GraphicTerceraCajaComponent implements OnInit {

  ngOnInit(): void {
    this.setChartData();
  }

  public bubbleChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      tooltip: {},
      title: {
        text: "Tercer gráfico",
        display: true,
      }
    },
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true }
    }
  };

  public bubbleChartData: {
    datasets: ChartDataset<'bubble'>[],
  } = {
    datasets: [
      {
        label: "Conjunto 1",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      },
      {
        label: "Conjunto 2",
        data: [],
        backgroundColor: "rgba(54, 162, 235, 0.5)"
      }
    ]
  };

  public bubbleChartType: ChartType = 'bubble';

  private setChartData(): void {
    this.bubbleChartData.datasets[0].data = [
      { x: 10, y: 20, r: 15 },
      { x: 30, y: 10, r: 10 },
      { x: 20, y: 40, r: 20 },
      { x: 40, y: 30, r: 25 },
      { x: 50, y: 45, r: 10 },
      { x: 60, y: 60, r: 0 }
    ];

    this.bubbleChartData.datasets[1].data = [
      { x: 15, y: 25, r: 10 },
      { x: 25, y: 35, r: 20 },
      { x: 35, y: 15, r: 15 },
      { x: 45, y: 20, r: 10 },
      { x: 55, y: 40, r: 25 },
      { x: 60, y: 60, r: 0 }
    ];
  }
}
