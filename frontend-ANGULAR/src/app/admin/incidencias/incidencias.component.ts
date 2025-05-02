import { Component } from '@angular/core';
import { IncidentService } from '../../services/incidents/incident.service';
import { Incident } from '../../services/interfaces/incident';

@Component({
  selector: 'app-incidencias',
  standalone: false,
  templateUrl: './incidencias.component.html',
  styleUrl: './incidencias.component.scss'
})
export class IncidenciasComponent {
  incidencias: Incident[] = [];

  constructor(private incidentService: IncidentService) {}

  ngOnInit(): void {
    this.incidentService.getAllIncidents().subscribe(data => {
      this.incidencias = data;
    });
  }
}
