import { Product, Company, Category } from '@/types';

export const mockCategories: Category[] = [
  { name: 'Electronics' },
  { name: 'Fashion' },
];

export const mockCompanies: Company[] = [
  { code: 'apple', name: 'Apple' },
  { code: 'samsung', name: 'Samsung' },
];

export const mockProducts: Product[] = [
  {
    id: 'p1',
    productName: 'iPhone 15',
    company: 'apple',
    category: 'Electronics',
    price: 80000,
    availability: 'yes',
    rating: 4.8,
    discount: 0,
  },
  {
    id: 'p2',
    productName: 'Galaxy S24',
    company: 'samsung',
    category: 'Electronics',
    price: 70000,
    availability: 'no',
    rating: 4.6,
    discount: 0,
  },
];
