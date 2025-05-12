import { Component, OnInit } from '@angular/core';
import { ReportServiceInterface } from '../../services/interfaces/report';
import { ReportService } from '../../services/report/report.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-reports-admin',
  standalone: false,
  templateUrl: './reports-admin.component.html',
  styleUrl: './reports-admin.component.scss'
})
export class ReportsAdminComponent implements OnInit {
  reportes: ReportServiceInterface[] = [];
  reportStates: string[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];

  constructor(
    private reportService: ReportService,
    private popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.reportService.getAll().subscribe(data => {
      this.reportes = data;
    });
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

  onEstadoChange(event: Event, reportId: number) {
    const newState = (event.target as HTMLSelectElement).value;

    this.reportService.updateServiceReportState(reportId, newState).subscribe({
      next: () => {
        const reporte = this.reportes.find(r => r.id === reportId);
        if (reporte) reporte.state = newState;
        this.popupService.showMessage("Éxito", "Estado actualizado correctamente", "success");
      },
      error: err => {
        console.error(err);
        this.popupService.showMessage("Error", "No se pudo actualizar el estado", "error");
      }
    });
  }
}
