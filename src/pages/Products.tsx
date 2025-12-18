import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { api } from "@/lib/api";
import { Product, FilterOptions } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { FilterPanel } from "@/components/FilterPanel";
import { ProductDetail } from "@/components/ProductDetail";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";

export default function Products() {
  const { company, category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({});

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let data: Product[];

      if (company && category) {
        data = await api.getFilteredProducts(company, category, {});
      } else if (company) {
        data = await api.getProductsByCompany(company);
      } else if (category) {
        data = await api.getProductsByCategory(category);
      } else {
        data = await api.getAllProducts();
      }

      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters and search logic
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (filters.search && filters.search.trim() !== '') {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(p =>
        p.productName.toLowerCase().includes(searchTerm) ||
        p.description?.toLowerCase().includes(searchTerm) ||
        p.company.toLowerCase().includes(searchTerm)
      );
    }

    // Price filter
    if (filters.minPrice !== undefined) {
      result = result.filter(p => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter(p => p.price <= filters.maxPrice!);
    }

    // Availability filter
    if (filters.availability && filters.availability !== '') {
      result = result.filter(p => p.availability === filters.availability);
    }

    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-low':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'discount':
          result.sort((a, b) => b.discount - a.discount);
          break;
        case 'newest':
        default:
          // Keep original order
          break;
      }
    }

    // Top products limit
    if (filters.top && filters.top > 0) {
      result = result.slice(0, filters.top);
    }

    setFilteredProducts(result);
  }, [products, filters]);

  useEffect(() => {
    fetchProducts();
  }, [company, category]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);

    const params = new URLSearchParams();
    if (newFilters.minPrice !== undefined) params.set('minPrice', newFilters.minPrice.toString());
    if (newFilters.maxPrice !== undefined) params.set('maxPrice', newFilters.maxPrice.toString());
    if (newFilters.availability) params.set('availability', newFilters.availability);
    if (newFilters.top) params.set('top', newFilters.top.toString());
    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.sortBy) params.set('sortBy', newFilters.sortBy);

    setSearchParams(params);
  };

  const getTitle = () => {
    if (company && category) return `${category} from ${company}`;
    if (company) return `Products from ${company}`;
    if (category) return `${category} Products`;
    return 'All Products';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-spin"></div>
              <div className="absolute inset-1 bg-white dark:bg-slate-900 rounded-full"></div>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-semibold">Loading awesome products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            {getTitle()}
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg">
              <ArrowUpDown className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <p className="text-purple-700 dark:text-purple-300 font-semibold">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden border-2 border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {showFilters && (
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <FilterPanel
                onFilterChange={handleFilterChange}
                initialFilters={filters}
              />
            </div>
          </div>
        )}

        <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="text-6xl">🔍</div>
              <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">No products found</p>
              <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter options</p>
              <Button
                onClick={() => {
                  setFilters({});
                  setSearchParams('');
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white mt-4"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product, index) => (
                <div key={product.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-slide-in">
                  <ProductCard
                    product={product}
                    onClick={() => setSelectedProduct(product)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ProductDetail
        product={selectedProduct}
        open={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
      />
    </div>
  );
}
