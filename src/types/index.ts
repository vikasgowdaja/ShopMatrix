export interface Product {
  id: string;
  productName: string;
  price: number;
  rating: number;
  discount: number;
  availability: string;
  company: string;
  category: string;
  image?: string;
  description?: string;
}

export interface Company {
  code: string;
  name: string;
}

export interface Category {
  name: string;
  icon?: string;
}

export interface FilterOptions {
  minPrice?: number;
  maxPrice?: number;
  availability?: 'yes' | 'no' | '';
  top?: number;
}
