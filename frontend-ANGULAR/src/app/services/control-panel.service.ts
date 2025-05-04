import { Injectable } from '@angular/core';
import { map, forkJoin } from 'rxjs';
import { IncidentService } from './incidents/incident.service';
import { PostService } from './posts/post.service';
import { ProfessionalService } from './professional.service';
import { ReportService } from './report/report.service';
import { ChartData } from 'chart.js';
import { UserService } from './users/user.service';

@Injectable({
  providedIn: 'root'
})
export class ControlPanelService {
  constructor(
    private servicios: ProfessionalService,
    private posts: PostService,
    private incidentes: IncidentService,
    private reportes: ReportService
  ) {}

  getResumenServicios() {
    return this.servicios.getAll().pipe(
      map(data => {
        const porMoneda: any = {};
        data.forEach(s => {
          porMoneda[s.currencyType] = (porMoneda[s.currencyType] || 0) + 1;
        });

        return {
          total: data.length,
          porMoneda: {
            labels: Object.keys(porMoneda),
            datasets: [{
              data: Object.values(porMoneda) as number[],
              backgroundColor: ['#3A7D44', '#9DC08B', '#DF6D14']
            }]
          }
        };
      })
    );
  }

  getResumenPosts() {
    return this.posts.getAllPosts().pipe(
      map(data => {
        const semanal: any = {};
        data.forEach(p => {
          const semana = this.getWeekLabel(p.createdAt);
          semanal[semana] = (semanal[semana] || 0) + 1;
        });

        return {
          total: data.length,
          porSemana: {
            labels: Object.keys(semanal),
            datasets: [{
              data: Object.values(semanal) as number[],
              label: 'Posts',
              backgroundColor: '#3A7D44'
            }]
          }
        };
      })
    );
  }

  getResumenIncidencias() {
    return this.incidentes.getAllIncidents().pipe(
      map(data => {
        const estados: any = {};
        const tipos: any = {};
        data.forEach(i => {
          estados[i.state] = (estados[i.state] || 0) + 1;
          tipos[i.type] = (tipos[i.type] || 0) + 1;
        });

        return {
          total: data.length,
          porEstado: {
            labels: Object.keys(estados),
            datasets: [{
              data: Object.values(estados) as number[],
              label: 'Estados',
              backgroundColor: '#DF6D14'
            }]
          },
          porTipo: {
            labels: Object.keys(tipos),
            datasets: [{
              data: Object.values(tipos) as number[],
              label: 'Tipos',
              backgroundColor: '#A7C957'
            }]
          }
        };
      })
    );
  }

  getResumenReportes() {
    return forkJoin([
      this.reportes.getAll(),
      this.reportes.getAllPostReports()
    ]).pipe(
      map(([rs, rp]) => {
        const todos = [...rs, ...rp];
        const tipos: any = {};
        const estados: any = {};
        todos.forEach(r => {
          tipos[r.type] = (tipos[r.type] || 0) + 1;
          estados[r.state] = (estados[r.state] || 0) + 1;
        });

        return {
          total: todos.length,
          porTipo: {
            labels: Object.keys(tipos),
            datasets: [{
              data: Object.values(tipos) as number[],
              label: 'Tipos',
              backgroundColor: '#9DC08B'
            }]
          },
          porEstado: {
            labels: Object.keys(estados),
            datasets: [{
              data: Object.values(estados) as number[],
              label: 'Estados',
              backgroundColor: '#FFB347'
            }]
          }
        };
      })
    );
  }

  private getWeekLabel(dateStr: string): string {
    const d = new Date(dateStr);
    const first = d.getDate() - d.getDay();
    const weekStart = new Date(d.setDate(first));
    return weekStart.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
  }
}
