import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/auth/cart.service';
import { UseStateService } from '../../services/auth/use-state.service';
import { ProfessionalServiceInterface } from '../../services/interfaces/professional';
import { PopupService } from '../../services/popup.service';
import { ProfessionalService } from '../../services/professional.service';
import { ReportService } from '../../services/report/report.service';

@Component({
  selector: 'app-servicio-profesional-publico',
  standalone: false,
  templateUrl: './servicio-profesional-publico.component.html',
  styleUrl: './servicio-profesional-publico.component.scss'
})
export class ServicioProfesionalPublicoComponent implements OnInit {
  servicio!: ProfessionalServiceInterface;
  showReportModal = false;
  nuevoReporte = {
    type: 'BULLYING_OR_HARASSMENT',
    description: '',
    serviceId: 0
  };
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
    private route: ActivatedRoute,
    private service: ProfessionalService,
    private cartService: CartService,
    private useStateService: UseStateService,
    private popupService: PopupService,
    private reportService: ReportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getById(+id).subscribe((servicio: ProfessionalServiceInterface) => {
  this.servicio = servicio;
  this.nuevoReporte.serviceId = servicio.id!;
});
    }
  }

  addToCart(): void {
    this.cartService.addToCart(this.servicio, 1);
  }

  verPerfil(): void {
    this.router.navigate(['/perfil-publico', this.servicio.username]);
  }

  abrirModalReporte(): void {
    this.showReportModal = true;
  }

  enviarReporte(): void {
    const username = this.useStateService.getUsername();
    if (!username) return;

    const payload = {
      ...this.nuevoReporte,
      userName: username
    };

    this.reportService.create(payload).subscribe(() => {
      this.popupService.showMessage('Reporte enviado', 'Gracias por tu reporte.', 'success');
      this.showReportModal = false;
      this.nuevoReporte.description = '';
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
}
