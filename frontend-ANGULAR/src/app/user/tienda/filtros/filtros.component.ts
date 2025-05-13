import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-filtros',
  standalone: false,
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.scss'
})
export class FiltrosComponent implements OnChanges, AfterViewInit {
  ordenSeleccionado = 'recientes';
  @Input() isOpen = false;
  @Input() searchTerm = '';
  @Input() minPrice = 0;
  @Input() maxPrice = 1000;
  @Input() priceRangeMin = 0;
  @Input() priceRangeMax = 1000;
  @Input() availableCurrencies: string[] = [];
  @Input() selectedCurrency: string = '';

  @Output() searchChange = new EventEmitter<string>();
  @Output() priceChange = new EventEmitter<{ min: number; max: number }>();
  @Output() reset = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() orderChange = new EventEmitter<string>();
  @Output() currencyChange = new EventEmitter<string>();

  onCurrencyChange() {
  this.currencyChange.emit(this.selectedCurrency);
}

  ngAfterViewInit(): void {
    this.updateSliderTrack();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['minPrice'] || changes['maxPrice']) {
      this.updateSliderTrack();
    }
  }

  onInput() {
    this.updateSliderTrack();
    this.searchChange.emit(this.searchTerm);
    this.priceChange.emit({ min: this.minPrice, max: this.maxPrice });
  }

  resetFilters() {
    this.searchTerm = '';
    this.minPrice = this.priceRangeMin;
    this.maxPrice = this.priceRangeMax;
    this.ordenSeleccionado = 'recientes'; // 🆕 restablece la orden
    this.updateSliderTrack();
    this.selectedCurrency = '';
    this.currencyChange.emit(this.selectedCurrency);
    this.searchChange.emit(this.searchTerm);
    this.priceChange.emit({ min: this.minPrice, max: this.maxPrice });
    this.orderChange.emit(this.ordenSeleccionado); // 🆕 notifica el cambio de orden
    this.reset.emit();
  }


  cerrar() {
    this.close.emit();
  }
  onOrderChange() {
    this.orderChange.emit(this.ordenSeleccionado);
  }

  updateSliderTrack(): void {
    const minPercent = ((this.minPrice - this.priceRangeMin) / (this.priceRangeMax - this.priceRangeMin)) * 100;
    const maxPercent = ((this.maxPrice - this.priceRangeMin) / (this.priceRangeMax - this.priceRangeMin)) * 100;

    document.documentElement.style.setProperty('--slider-min', `${minPercent}%`);
    document.documentElement.style.setProperty('--slider-max', `${maxPercent}%`);
  }
}
