import { Product, Company, Category } from '@/types';

export const mockCategories: Category[] = [
  { name: 'Electronics', icon: '📱' },
  { name: 'Fashion', icon: '👔' },
  { name: 'Accessories', icon: '👜' },
  { name: 'Gaming', icon: '🎮' },
  { name: 'Smartwear', icon: '⌚' },
];

export const mockCompanies: Company[] = [
  { code: 'apple', name: 'Apple' },
  { code: 'samsung', name: 'Samsung' },
  { code: 'sony', name: 'Sony' },
  { code: 'dell', name: 'Dell' },
  { code: 'lg', name: 'LG' },
  { code: 'hp', name: 'HP' },
];

export const mockProducts: Product[] = [
  {
    id: 'p1',
    productName: 'iPhone 15 Pro Max',
    company: 'apple',
    category: 'Electronics',
    price: 129999,
    availability: 'yes',
    rating: 4.9,
    discount: 8,
    description: 'Premium flagship smartphone with A17 Pro chip'
  },
  {
    id: 'p2',
    productName: 'Galaxy S24 Ultra',
    company: 'samsung',
    category: 'Electronics',
    price: 124999,
    availability: 'yes',
    rating: 4.8,
    discount: 5,
    description: 'Ultimate Android smartphone with AI features'
  },
  {
    id: 'p3',
    productName: 'MacBook Pro 16"',
    company: 'apple',
    category: 'Electronics',
    price: 249999,
    availability: 'yes',
    rating: 4.9,
    discount: 0,
    description: 'Powerful laptop for professionals'
  },
  {
    id: 'p4',
    productName: 'Samsung Galaxy Buds2',
    company: 'samsung',
    category: 'Accessories',
    price: 9999,
    availability: 'yes',
    rating: 4.5,
    discount: 15,
    description: 'Premium wireless earbuds with noise cancellation'
  },
  {
    id: 'p5',
    productName: 'Sony WH-1000XM5 Headphones',
    company: 'sony',
    category: 'Accessories',
    price: 29999,
    availability: 'yes',
    rating: 4.8,
    discount: 10,
    description: 'Industry-leading noise cancelling headphones'
  },
  {
    id: 'p6',
    productName: 'Dell XPS 15',
    company: 'dell',
    category: 'Electronics',
    price: 159999,
    availability: 'no',
    rating: 4.7,
    discount: 12,
    description: 'Premium Windows laptop with stunning display'
  },
  {
    id: 'p7',
    productName: 'Samsung 65" QLED TV',
    company: 'samsung',
    category: 'Electronics',
    price: 89999,
    availability: 'yes',
    rating: 4.6,
    discount: 20,
    description: 'Ultra HD 4K Smart TV with quantum dots'
  },
  {
    id: 'p8',
    productName: 'Apple Watch Ultra',
    company: 'apple',
    category: 'Smartwear',
    price: 79999,
    availability: 'yes',
    rating: 4.7,
    discount: 0,
    description: 'Ultimate action sports watch'
  },
  {
    id: 'p9',
    productName: 'Samsung Galaxy Watch 6',
    company: 'samsung',
    category: 'Smartwear',
    price: 29999,
    availability: 'yes',
    rating: 4.5,
    discount: 8,
    description: 'Advanced health & fitness smartwatch'
  },
  {
    id: 'p10',
    productName: 'Sony PS5 Console',
    company: 'sony',
    category: 'Gaming',
    price: 49999,
    availability: 'yes',
    rating: 4.8,
    discount: 0,
    description: 'Next-gen gaming console with incredible graphics'
  },
  {
    id: 'p11',
    productName: 'Dell Gaming Monitor 32"',
    company: 'dell',
    category: 'Gaming',
    price: 39999,
    availability: 'yes',
    rating: 4.6,
    discount: 15,
    description: '4K 144Hz gaming monitor with HDR'
  },
  {
    id: 'p12',
    productName: 'LG 27" Curved Monitor',
    company: 'lg',
    category: 'Gaming',
    price: 29999,
    availability: 'no',
    rating: 4.4,
    discount: 18,
    description: 'Immersive curved display for gaming and work'
  },
  {
    id: 'p13',
    productName: 'HP Envy Printer',
    company: 'hp',
    category: 'Electronics',
    price: 15999,
    availability: 'yes',
    rating: 4.3,
    discount: 25,
    description: 'All-in-one wireless printer with mobile printing'
  },
  {
    id: 'p14',
    productName: 'Apple AirTag Pack',
    company: 'apple',
    category: 'Accessories',
    price: 9999,
    availability: 'yes',
    rating: 4.6,
    discount: 10,
    description: 'Find your items with precision'
  },
  {
    id: 'p15',
    productName: 'Samsung Galaxy Tab S9',
    company: 'samsung',
    category: 'Electronics',
    price: 49999,
    availability: 'yes',
    rating: 4.7,
    discount: 7,
    description: 'Premium Android tablet with stylus'
  },
];
