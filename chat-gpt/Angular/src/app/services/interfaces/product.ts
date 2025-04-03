export interface ProductInterface {
  id: number;
  name: string;
  description: string;
  image: string; // Base64 opcional
  price: number;
  tax: number;
  currency: 'USD' | 'EUR';
  sellerUsername: string; // Para mostrar quién publicó el producto
}
