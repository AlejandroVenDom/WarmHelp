import { Component, OnInit } from '@angular/core';
import { UseStateService } from '../../services/auth/use-state.service';
import { IncidentService } from '../../services/incidents/incident.service';
import { Incident, IncidentType } from '../../services/interfaces/incident';

@Component({
  selector: 'app-mis-incidencias',
  standalone: false,
  templateUrl: './mis-incidencias.component.html',
  styleUrl: './mis-incidencias.component.scss'
})
export class MisIncidenciasComponent implements OnInit {
  incidencias: Incident[] = [];

  nuevaIncidencia: {
    title: string;
    description: string;
    type: IncidentType;
  } = {
    title: '',
    description: '',
    type: 'TECNICA'
  };

  tipos: IncidentType[] = ['TECNICA', 'FINANCIERA', 'OTROS'];

  constructor(
    private incidentService: IncidentService,
    private useStateService: UseStateService
  ) {}

  ngOnInit(): void {
    this.cargarIncidencias();
  }

  cargarIncidencias(): void {
    const user = this.useStateService.getUsername();
    this.incidentService.getAllIncidents().subscribe(todas => {
      this.incidencias = todas.filter(i => i.userName === user && i.state === 'PENDIENTE');
    });
  }
  getNombreTipo(tipo: IncidentType): string {
    switch (tipo) {
      case 'TECNICA':
        return 'Técnica';
      case 'FINANCIERA':
        return 'Financiera';
      case 'OTROS':
        return 'Otros';
      default:
        return tipo;
    }
  }
  getNombreEstado(estado: string): string {
    switch (estado) {
      case 'PENDIENTE':
        return 'Pendiente';
      case 'EN_PROGRESO':
        return 'En progreso';
      case 'RESUELTA':
        return 'Resuelta';
      case 'CERRADA':
        return 'Cerrada';
      default:
        return estado;
    }
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
}
