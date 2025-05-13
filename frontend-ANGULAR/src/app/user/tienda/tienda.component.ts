import { Component, OnInit } from '@angular/core';
import { ProfessionalServiceInterface } from '../../services/interfaces/professional';
import { ProfessionalService } from '../../services/professional.service';
import { Router } from '@angular/router';
import { UseStateService } from '../../services/auth/use-state.service';
import { PopupService } from '../../services/popup.service';
import { ReportService } from '../../services/report/report.service';
import { CartService } from '../../services/auth/cart.service';
import { FiltrosComponent } from './filtros/filtros.component';

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
  monedasUnicas: string[] = [];
  selectedCurrency = '';
  selectedService: ProfessionalServiceInterface | null = null;
  showModal = false;
  mostrarBotonScroll = false;
  showReportModal = false;
  mostrarFiltros = false;
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
    this.cartService.loadUserCartFromBackend();
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
  goToServicio(servicio: ProfessionalServiceInterface) {
  this.router.navigate(['/servicio', servicio.id]);
}
  loadServicios() {
    this.service.getAll().subscribe(servicios => {
      this.servicios = servicios;
      this.monedasUnicas = [...new Set(servicios.map(s => s.currencyType).filter(Boolean))];
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
    this.cartService.addToCart(servicio, 1);
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
  s.price <= this.maxPrice &&
  (!this.selectedCurrency || s.currencyType === this.selectedCurrency)
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
  ordenarServicios(criterio: string) {
    switch (criterio) {
      case 'precioAsc':
        this.filteredServices.sort((a, b) => a.price - b.price);
        break;
      case 'precioDesc':
        this.filteredServices.sort((a, b) => b.price - a.price);
        break;
      case 'recientes':
        this.filteredServices.sort((a, b) =>
          (b.createdAt || '').localeCompare(a.createdAt || '')
        );
        break;
      case 'antiguos':
        this.filteredServices.sort((a, b) =>
          (a.createdAt || '').localeCompare(b.createdAt || '')
        );
        break;
    }
  }


  closeModal() {
    this.showModal = false;
    this.selectedService = null;
  }
}

