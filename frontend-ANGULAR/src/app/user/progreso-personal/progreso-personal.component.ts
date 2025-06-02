import { AfterViewInit, Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-progreso-personal',
  standalone: false,
  templateUrl: './progreso-personal.component.html',
  styleUrl: './progreso-personal.component.scss'
})
export class ProgresoPersonalComponent implements AfterViewInit{
  constructor() {
    Chart.register(...registerables); // registrar todos los componentes necesarios
  }

  ngAfterViewInit(): void {
    const ctx = document.getElementById('doughnutChart') as HTMLCanvasElement;
    const ctxLine = document.getElementById('lineChart') as HTMLCanvasElement;
    const ctxRadar = document.getElementById('radarChart') as HTMLCanvasElement;
    const ctxPolarArea = document.getElementById('polarAreaChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Progreso de aumento emocional', 'Tiempo de autocuidado', 'Nutricion consciente'],
        datasets: [{
          label: 'Mi progreso',
          data: [30, 50, 20],
          backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 16,
              }
            }
          },
          title: {
            display: true,
            text: 'Progreso personal durante este ultimo mes', 
            font: {
              size: 18 // Tamaño un poco más grande para el título
            }
          }
        }
      }
    });
     new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
        datasets: [{
          label: 'Estado de ánimo',
          data: [5, 6, 7, 7.5, 8],
          borderColor: '#36a2eb',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.3,
          pointStyle: 'triangle', // cambia aquí el estilo del punto
          pointRadius: 6,
          pointHoverRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
            font: {
              size: 18
          }
        }
          },
          title: {
            display: true,
            text: 'Seguimiento del ánimo semanal',
            font: {
              size: 18
            }
          }
        }
      }
    });
    new Chart(ctxRadar, {
  type: 'radar',
  data: {
    labels: ['Bienestar emocional', 'Vitalidad corporal', 'Claridad mental', 'Vida social'],
      datasets: [{
      label: 'Nivel de bienestar',
      data: [75, 70, 80, 60],
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: '#36a2eb',
      pointBackgroundColor: '#36a2eb',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#36a2eb'
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 100,    
        pointLabels: {
          font: {
            size: 16,  // Aquí aumentas el tamaño de la fuente de las etiquetas del radar
            weight: 'bold'
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: 'Bienestar en diferentes áreas',
        font: {
          size: 18
        }
      }
    }
  }
  });
  new Chart(ctxPolarArea, {
    type: 'polarArea',
    data: {
    labels: ['Bienestar emocional', 'Cuidado personal', 'Alimentación saludable', 'Movimiento', 'Conexiones sociales'],
    datasets: [{
      label: 'Tiempo dedicado (%)',
      data: [20, 25, 15, 30, 10],
      backgroundColor: [
        '#ff6384',
        '#36a2eb',
        '#ffce56',
        '#4bc0c0',
        '#9966ff'
      ]
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: 'Distribución del tiempo dedicado',
        font: {
          size: 18
        }
      }
    }
  }
});
  }
}
  
