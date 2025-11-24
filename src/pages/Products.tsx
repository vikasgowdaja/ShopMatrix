import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { api } from "@/lib/api";
import { Product, FilterOptions } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { FilterPanel } from "@/components/FilterPanel";
import { ProductDetail } from "@/components/ProductDetail";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

export default function Products() {
  const { company, category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(true);

  const fetchProducts = async (filters: FilterOptions = {}) => {
    setLoading(true);
    try {
      let data: Product[];

      if (company && category) {
        data = await api.getFilteredProducts(company, category, filters);
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

  useEffect(() => {
    const filters: FilterOptions = {
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      availability: (searchParams.get('availability') as 'yes' | 'no') || '',
      top: searchParams.get('top') ? Number(searchParams.get('top')) : undefined,
    };

    fetchProducts(filters);
  }, [company, category, searchParams]);

  const handleFilterChange = (filters: FilterOptions) => {
    const params = new URLSearchParams();
    
    if (filters.minPrice !== undefined) params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice !== undefined) params.set('maxPrice', filters.maxPrice.toString());
    if (filters.availability) params.set('availability', filters.availability);
    if (filters.top) params.set('top', filters.top.toString());

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
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">{getTitle()}</h2>
          <p className="text-muted-foreground">{products.length} products found</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden"
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
                initialFilters={{
                  minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
                  maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
                  availability: (searchParams.get('availability') as 'yes' | 'no') || '',
                  top: searchParams.get('top') ? Number(searchParams.get('top')) : undefined,
                }}
              />
            </div>
          </div>
        )}

        <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No products found</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
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
