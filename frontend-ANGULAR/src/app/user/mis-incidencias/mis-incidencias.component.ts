import { Component, OnInit } from '@angular/core';
import { UseStateService } from '../../services/auth/use-state.service';
import { IncidentService } from '../../services/incidents/incident.service';
import { Incident, IncidentType } from '../../services/interfaces/incident';
import { ReportService } from '../../services/report/report.service';
import { ReportServiceInterface } from '../../services/interfaces/report';

@Component({
  selector: 'app-mis-incidencias',
  standalone: false,
  templateUrl: './mis-incidencias.component.html',
  styleUrl: './mis-incidencias.component.scss'
})
export class MisIncidenciasComponent implements OnInit {
  incidencias: Incident[] = [];
  reportes: ReportServiceInterface[] = [];
  servicios: any[] = [];
  reportesServicio: ReportServiceInterface[] = [];
  reportesPost: ReportServiceInterface[] = [];
  mostrarIncidencias = true;
  mostrarReportesServicio = true;
  mostrarReportesPost = true;


  nuevaIncidencia = {
    title: '',
    description: '',
    type: 'TECNICA' as IncidentType
  };

  nuevoReporte = {
    type: 'BULLYING_OR_HARASSMENT',
    description: '',
    serviceId: 0
  };

  tipos: IncidentType[] = ['TECNICA', 'FINANCIERA', 'OTROS'];
  tiposReporte: string[] = [
    'BULLYING_OR_HARASSMENT',
    'SUICIDE_SELF_INJURY_OR_EATING_DISORDERS',
    'VIOLENCE',
    'ILLEGAL_SALES',
    'NUDITY_OR_SEXUAL_ACTIVITY',
    'SCAMS_FRAUD_OR_SPAM',
    'FALSE_INFORMATION'
  ];

  constructor(
    private incidentService: IncidentService,
    private useStateService: UseStateService,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.cargarIncidencias();
    this.cargarReportes();
    this.servicios = this.useStateService.getProfessionalServices();
  }
  getEstadoClass(state: string): string {
  return state.toLowerCase().replace(' ', '_'); // e.g., "EN_PROGRESO" → "en_progreso"
}
getEstadoIcon(state: string): string {
  switch (state) {
    case 'PENDIENTE': return 'bi-clock-fill';
    case 'EN_PROGRESO': return 'bi-arrow-repeat';
    case 'RESUELTA': return 'bi-check-circle-fill';
    case 'CERRADA': return 'bi-lock-fill';
    default: return 'bi-question-circle-fill';
  }
}
  cargarIncidencias(): void {
    const user = this.useStateService.getUsername();
    this.incidentService.getAllIncidents().subscribe(todas => {
      this.incidencias = todas.filter(i => i.userName === user);
    });
  }

  cargarReportes(): void {
    const user = this.useStateService.getUsername();

    // Reportes de servicios
    this.reportService.getAll().subscribe(servicios => {
      this.reportesServicio = servicios.filter(r => r.userName === user);
    });

    // Reportes de publicaciones
    this.reportService.getAllPostReports().subscribe(posts => {
      this.reportesPost = posts.filter(r => r.userName === user);
    });
  }



  registrarIncidencia(): void {
    const username = this.useStateService.getUsername();
    if (!username) return;
    this.incidentService.registerIncident({
      ...this.nuevaIncidencia,
      userName: username
    }).subscribe(() => {
      this.nuevaIncidencia = { title: '', description: '', type: 'TECNICA' };
      this.cargarIncidencias();
    });
  }

  enviarReporteServicio(): void {
    const username = this.useStateService.getUsername();
    if (!username) return;

    const payload = {
      ...this.nuevoReporte,
      userName: username
    };

    this.reportService.create(payload).subscribe(() => {
      this.nuevoReporte = { type: 'BULLYING_OR_HARASSMENT', description: '', serviceId: 0 };
      this.cargarReportes();
    });
  }

  getNombreTipo(tipo: IncidentType): string {
    switch (tipo) {
      case 'TECNICA': return 'Técnica';
      case 'FINANCIERA': return 'Financiera';
      case 'OTROS': return 'Otros';
      default: return tipo;
    }
  }

  getNombreTipoReporte(tipo: string): string {
    const map: Record<string, string> = {
      BULLYING_OR_HARASSMENT: 'Acoso',
      SUICIDE_SELF_INJURY_OR_EATING_DISORDERS: 'Conducta riesgosa',
      VIOLENCE: 'Violencia',
      ILLEGAL_SALES: 'Ventas ilegales',
      NUDITY_OR_SEXUAL_ACTIVITY: 'Contenido sexual',
      SCAMS_FRAUD_OR_SPAM: 'Estafa o fraude',
      FALSE_INFORMATION: 'Información falsa'
    };
    return map[tipo] || tipo;
  }

  getNombreEstado(estado: string): string {
    switch (estado) {
      case 'PENDING': return 'Pendiente';
      case 'IN_PROGRESS': return 'En progreso';
      case 'COMPLETED': return 'Resuelto';
      default: return estado;
    }
  }
}
