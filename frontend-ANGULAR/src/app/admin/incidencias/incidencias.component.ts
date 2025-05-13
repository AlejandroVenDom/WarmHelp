import { Component } from '@angular/core';
import { IncidentService } from '../../services/incidents/incident.service';
import { Incident, IncidentState } from '../../services/interfaces/incident';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-incidencias',
  standalone: false,
  templateUrl: './incidencias.component.html',
  styleUrl: './incidencias.component.scss'
})
export class IncidenciasComponent {
  incidencias: Incident[] = [];
  incidentStates: IncidentState[] = ['PENDIENTE', 'EN_PROGRESO', 'RESUELTA', 'CERRADA'];

  constructor(
    private incidentService: IncidentService,
    private popupService: PopupService // <-- inyectar
  ) {}

  ngOnInit(): void {
    this.incidentService.getAllIncidents().subscribe(data => {
      this.incidencias = data;
    });
  }

  onEstadoChange(event: Event, incidentId: number) {
  const selectElement = event.target as HTMLSelectElement;
  const newState = selectElement.value as IncidentState;

  this.incidentService.updateIncidentState(incidentId, newState).subscribe({
    next: (res: any) => {
      if (res?.success) {
        const incident = this.incidencias.find(i => i.id === incidentId);
        if (incident) incident.state = newState;
        this.popupService.showMessage("Actualizado", "Estado cambiado correctamente", "success");
      } else {
        this.popupService.showMessage("Error", res?.message || "Error desconocido", "error");
      }
    },
    error: err => {
      console.error('Error actualizando estado:', err);
      this.popupService.showMessage("Error", "Hubo un error al actualizar el estado.", "error");
    }
  });
}


  async eliminarIncidencia(incidentId: number): Promise<void> {
    const confirmed = await this.popupService.showConfirmation(
      "¿Estás seguro?",
      "¿Estás seguro de que quieres eliminar esta incidencia?",
      "Sí, eliminar",
      "Cancelar"
    );

    if (confirmed) {
      this.incidentService.deleteIncident(incidentId).subscribe({
        next: () => {
          this.incidencias = this.incidencias.filter(i => i.id !== incidentId);
          this.popupService.showMessage("Eliminado", "La incidencia se ha eliminado correctamente.", "success");
        },
        error: err => {
          console.error('Error eliminando incidencia:', err);
          this.popupService.showMessage("Error", "Hubo un error al eliminar la incidencia.", "error");
        }
      });
    }
  }
  getEstadoClass(state: string): string {
  return state.toLowerCase().replace(' ', '_'); // "EN PROGRESO" → "en_progreso"
  }
}
