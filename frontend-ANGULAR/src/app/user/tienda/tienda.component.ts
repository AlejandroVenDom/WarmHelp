import { Component, OnInit } from '@angular/core';
import { ProfessionalServiceInterface } from '../../services/interfaces/professional';
import { ProfessionalService } from '../../services/professional.service';

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

  constructor(private service: ProfessionalService) {}

  ngOnInit(): void {
    this.loadServicios();
  }

  loadServicios() {
    this.service.getAll().subscribe(servicios => {
      console.log("📦 Servicios recibidos del backend:", servicios); // <-- esto
      this.servicios = servicios.map(s => ({
        ...s,
        currencyType: s.currencyType,
        userName: s.userName
      }));
      this.filteredServices = [...this.servicios];
      this.setPriceRangeLimits();
    });
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
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedService = null;
  }
}
