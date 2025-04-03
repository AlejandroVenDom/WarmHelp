import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip, ChartConfiguration, ChartDataset, ChartType } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

@Component({
  selector: 'app-graphic-segunda-caja',
  imports: [BaseChartDirective],
  standalone: true,
  templateUrl: './graphic-segunda-caja.component.html',
  styleUrl: './graphic-segunda-caja.component.scss'
})
export class GraphicSegundaCajaComponent implements OnInit {

  ngOnInit(): void {
      this.setChartData()
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true, // Línea obligatoria
    maintainAspectRatio: false, // Proporción del gráfico
    plugins: {
      legend: { // campo opcional
        display: false,
        position: 'bottom'
      },
      tooltip: {},
      title: { // Campo opcional
        text: "Segundo gráfico",
        display: true,
      }
    }
  }

  public barChartLabels: string[] = []
    public barChartData: {
      labels: string[],
      datasets: ChartDataset<'bar'>[],
    } = {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      }]
    }
public barChartType: ChartType = 'bar';

  private setChartData(): void {
    this.barChartData.labels = [
      "Label 1",
      "Label 2",
      "Label 3",
      "Label 4",
    ]
    this.barChartData.datasets[0] = {
      label: "Valor",
      data: [35, 20, 15, 47, 60],
      backgroundColor: ["red", "blue", "green", "yellow"],
      hoverBackgroundColor: ["darkred", "darkblue", "darkgreen", "gold"]
    };
  }


}

