import { Component, OnInit } from '@angular/core';
import { CartComponent } from "../cart/cart.component";
import { ProductService } from '../../services/auth/product.service';
import { ProductInterface } from '../../services/interfaces/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/auth/cart.service';
import { FooterComponent } from "../../footer/footer.component";
import { PopupService } from '../../services/utils/popup.service';

@Component({
  selector: 'app-tienda',
  imports: [CartComponent, CommonModule, FormsModule, FooterComponent],
  standalone: true,
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.scss'
})
export class TiendaComponent implements OnInit {
  products: ProductInterface[] = [];
  filteredProducts: ProductInterface[] = [];
  searchTerm: string = '';
  minPrice: number = 0;
  maxPrice: number = 1000;
  priceRangeMin: number = 0;
  priceRangeMax: number = 1000;
  selectedProduct: ProductInterface | null = null;
  showModal: boolean = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private popUpService: PopupService
    ) {}

  ngOnInit(): void {
    this.loadProducts();
  }
  addToCart(product: ProductInterface, event: Event) {
    event.stopPropagation(); // Evitar que se abra el modal al hacer clic en el carrito
    this.cartService.addToCart(product);
    this.popUpService.showMessage(
    "Producto añadido",
    `🛒 ${product.name} ha sido agregado al carrito.`,
    "success")
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        console.log("📦 Productos cargados:", products);
        this.products = products;
        this.filteredProducts = products;
        this.updatePriceLimits();
      },
      error: (error) => {
        console.error(" Error al cargar los productos", error);
      }
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      product.price >= this.minPrice && product.price <= this.maxPrice
    );
  }

  updatePriceRange() {
    if (this.minPrice < this.priceRangeMin) this.minPrice = this.priceRangeMin;
    if (this.maxPrice > this.priceRangeMax) this.maxPrice = this.priceRangeMax;
    if (this.minPrice > this.maxPrice) this.minPrice = this.maxPrice - 1; // Evitar cruce

    this.filterProducts();
    this.updateSliderTrack();
  }

  updatePriceLimits() {
    if (this.products.length > 0) {
      const prices = this.products.map(p => p.price);
      this.priceRangeMin = 0;  // 🔹 SIEMPRE INICIAR EN 0
      this.priceRangeMax = Math.max(...prices);
      this.minPrice = this.priceRangeMin;
      this.maxPrice = this.priceRangeMax;
      this.updateSliderTrack();
    }
  }

  updateSliderTrack() {
    const minPosition = ((this.minPrice - this.priceRangeMin) / (this.priceRangeMax - this.priceRangeMin)) * 100;
    const maxPosition = ((this.maxPrice - this.priceRangeMin) / (this.priceRangeMax - this.priceRangeMin)) * 100;
    document.documentElement.style.setProperty('--slider-min', `${minPosition}%`);
    document.documentElement.style.setProperty('--slider-max', `${maxPosition}%`);
  }

  resetFilters() {
    this.searchTerm = '';
    this.minPrice = this.priceRangeMin;
    this.maxPrice = this.priceRangeMax;
    this.filteredProducts = [...this.products];
    this.updateSliderTrack();
  }

  openModal(product: ProductInterface) {
    this.selectedProduct = product;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedProduct = null;
  }
}
