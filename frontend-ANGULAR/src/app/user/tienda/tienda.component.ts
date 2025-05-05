import { Component, OnInit } from '@angular/core';
import { ProfessionalServiceInterface } from '../../services/interfaces/professional';
import { ProfessionalService } from '../../services/professional.service';
import { Router } from '@angular/router';
import { UseStateService } from '../../services/auth/use-state.service';
import { PopupService } from '../../services/popup.service';
import { ReportService } from '../../services/report/report.service';
import { CartService } from '../../services/auth/cart.service';

@Component({
  selector: 'app-tienda',
  standalone: false,
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.scss'
})
export class TiendaComponent implements OnInit {
  servicios: ProfessionalServiceInterface[] = [];
  filteredServices: ProfessionalServiceInterface[] = [];
  searchTerm = '';
  minPrice = 0;
  maxPrice = 1000;
  priceRangeMin = 0;
  priceRangeMax = 1000;
  selectedService: ProfessionalServiceInterface | null = null;
  showModal = false;
  mostrarBotonScroll = false;
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
    private service: ProfessionalService,
    private router: Router,
    private cartService: CartService,
    private reportService: ReportService,
    private useStateService: UseStateService,
    private popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.loadServicios();
    window.addEventListener('scroll', this.verificarScroll.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.verificarScroll.bind(this));
  }

  verificarScroll(): void {
    this.mostrarBotonScroll = window.scrollY > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loadServicios() {
    this.service.getAll().subscribe(servicios => {
      console.log("📦 Servicios recibidos del backend:", servicios);
      this.servicios = servicios;
      this.filteredServices = [...this.servicios];
      this.setPriceRangeLimits();
    });
  }

  verPerfilPublico(username: string): void {
    if (username) {
      this.router.navigate(['/perfil-publico', username]);
    }
  }

  addToCart(servicio: ProfessionalServiceInterface): void {
    this.cartService.addToCart({
      id: servicio.id!,
      title: servicio.title,
      image: servicio.image || '/ans.jpg',
      price: servicio.price,
      tax: servicio.tax,
      currencyType: servicio.currencyType
    }, 1);
  }

  toggleCart(): void {
    this.cartService.toggleCart();
  }

  setPriceRangeLimits() {
    const prices = this.servicios.map(s => s.price);
    this.priceRangeMin = 0;
    this.priceRangeMax = Math.max(...prices);
    this.minPrice = this.priceRangeMin;
    this.maxPrice = this.priceRangeMax;
    this.updateSliderTrack();
  }

  filterServicios() {
    this.filteredServices = this.servicios.filter(s =>
      s.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      s.price >= this.minPrice &&
      s.price <= this.maxPrice
    );
  }

  updateSliderTrack() {
    const min = ((this.minPrice - this.priceRangeMin) / (this.priceRangeMax - this.priceRangeMin)) * 100;
    const max = ((this.maxPrice - this.priceRangeMin) / (this.priceRangeMax - this.priceRangeMin)) * 100;
    document.documentElement.style.setProperty('--slider-min', `${min}%`);
    document.documentElement.style.setProperty('--slider-max', `${max}%`);
  }

  updatePriceRange() {
    this.filterServicios();
    this.updateSliderTrack();
  }

  resetFilters() {
    this.searchTerm = '';
    this.minPrice = this.priceRangeMin;
    this.maxPrice = this.priceRangeMax;
    this.filteredServices = [...this.servicios];
    this.updateSliderTrack();
  }

  openModal(servicio: ProfessionalServiceInterface) {
    this.selectedService = servicio;
    if (servicio.id !== undefined) {
      this.nuevoReporte.serviceId = servicio.id;
    }
    this.showReportModal = false;
    this.showModal = true;
  }

  enviarReporteServicio() {
    const username = this.useStateService.getUsername();
    if (!username) return;

    const payload = {
      ...this.nuevoReporte,
      userName: username
    };

    this.reportService.create(payload).subscribe(() => {
      this.popupService.showMessage('Reporte enviado', 'Gracias por tu reporte, lo revisaremos.', 'success');
      this.nuevoReporte = { type: 'BULLYING_OR_HARASSMENT', description: '', serviceId: 0 };
      this.showReportModal = false;
      this.closeModal();
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

  closeModal() {
    this.showModal = false;
    this.selectedService = null;
  }
}

