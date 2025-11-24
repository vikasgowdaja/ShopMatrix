import { Product, Company, Category, FilterOptions } from '@/types';

// TODO: Replace with your actual API base URL
const API_BASE_URL = 'https://json-server.bytexl.app'; // Update this with your API URL

export const api = {
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  async getCompanies(): Promise<Company[]> {
    const response = await fetch(`${API_BASE_URL}/companies`);
    if (!response.ok) throw new Error('Failed to fetch companies');
    return response.json();
  },

  async getAllProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async getProductsByCompany(company: string): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/companies/${company}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/categories/${category}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async getFilteredProducts(
    company: string,
    category: string,
    filters?: FilterOptions
  ): Promise<Product[]> {
    const params = new URLSearchParams();
    
    if (filters?.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.availability) params.append('availability', filters.availability);
    if (filters?.top) params.append('top', filters.top.toString());

    const queryString = params.toString();
    const url = `${API_BASE_URL}/companies/${company}/categories/${category}/products${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch filtered products');
    return response.json();
  },
};
