export interface ProfessionalServiceInterface {
  id?: number;
  title: string;
  description: string;
  image: string;
  price: number;
  tax: number;
  currencyType: 'USD' | 'EUR' | 'JPY';
  userName: string;
}
