import {
  mockCategories,
  mockCompanies,
  mockProducts,
} from '@/mock/data';

export const mockApi = {
  async getCategories() {
    return Promise.resolve(mockCategories);
  },

  async getCompanies() {
    return Promise.resolve(mockCompanies);
  },

  async getAllProducts() {
    return Promise.resolve(mockProducts);
  },

  async getProductsByCompany(company: string) {
    return Promise.resolve(
      mockProducts.filter(p => p.company === company)
    );
  },

  async getProductsByCategory(category: string) {
    return Promise.resolve(
      mockProducts.filter(p => p.category === category)
    );
  },
};
