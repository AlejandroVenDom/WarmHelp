import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../../services/interfaces/product';
import { ProductService } from '../../services/auth/product.service';
import { UserServiceService } from '../../services/auth/user-service.service';
import { PopupService } from '../../services/utils/popup.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent implements OnInit {
  userProducts: ProductInterface[] = [];
  selectedFile: File | null = null;
  showModal = false;
  currentUser: string = ''; // Usuario autenticado

  newProduct: ProductInterface = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    tax: 0,
    currency: 'USD',
    image: '',
    sellerUsername: ''
  };

  constructor(
    private productService: ProductService,
    private userService: UserServiceService,
    private popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getUsername() ?? '';
    this.loadUserProducts();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.resetNewProduct();
  }

  loadUserProducts() {
    if (this.currentUser) {
      this.productService.getUserProducts(this.currentUser).subscribe({
        next: (products) => {
          this.userProducts = products;
        },
        error: () => {
          this.popupService.showMessage('Error', 'No se pudieron cargar los productos', 'error');
        }
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  createProduct() {
    const productData = {
      name: this.newProduct.name,
      description: this.newProduct.description,
      price: this.newProduct.price,
      tax: this.newProduct.tax,
      currency: this.newProduct.currency,
      sellerUsername: this.currentUser //  Asignamos el usuario actual
    };

    this.productService.createProduct(productData).subscribe({
      next: (createdProduct) => {
        this.popupService.showMessage('Éxito', 'Producto creado correctamente', 'success');

        //  Asignar el username del vendedor para evitar que aparezca "Desconocido"
        createdProduct.sellerUsername = this.currentUser;

        //  Agregar el nuevo producto directamente a la lista sin necesidad de recargar
        this.userProducts.push(createdProduct);

        this.closeModal();
      },
      error: (error) => {
        console.error(" Error al crear producto:", error);
        this.popupService.showMessage('Error', 'No se pudo crear el producto', 'error');
      }
    });
  }


  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        console.log("Respuesta del backend:", response);

        if (response.message) {
          this.popupService.showMessage('Éxito', response.message, 'success');
          this.userProducts = this.userProducts.filter(product => product.id !== id);
        } else {
          this.popupService.showMessage('Error', 'No se pudo eliminar el producto', 'error');
        }
      },
      error: (error) => {
        console.error(" Error al eliminar producto:", error);
        this.popupService.showMessage('Error', error.message || 'No se pudo eliminar el producto', 'error');
      }
    });
  }




  resetNewProduct() {
    this.newProduct = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      tax: 0,
      currency: 'USD',
      image: '',
      sellerUsername: this.currentUser //  Mantiene el usuario actual
    };
  }
}
