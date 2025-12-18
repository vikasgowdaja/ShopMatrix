import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterOptions } from "@/types";
import { Filter, X, Search, TrendingUp } from "lucide-react";

interface FilterPanelProps {
  onFilterChange: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
}

export function FilterPanel({ onFilterChange, initialFilters = {} }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    const emptyFilters: FilterOptions = {
      minPrice: undefined,
      maxPrice: undefined,
      availability: '',
      top: undefined,
      sortBy: undefined,
      search: undefined,
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <Card className="shadow-card border-2 border-transparent hover:border-purple-500/50 transition-colors">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardTitle className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
          <Filter className="h-5 w-5" />
          Smart Filters & Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {/* Search Bar */}
        <div className="space-y-2">
          <Label htmlFor="search" className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400">
            <Search className="h-4 w-4" />
            Search Products
          </Label>
          <Input
            id="search"
            type="text"
            placeholder="Search by name..."
            value={filters.search || ''}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value })
            }
            className="border-2 border-purple-200 dark:border-purple-700 focus:border-purple-500 transition-colors"
          />
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="minPrice" className="font-semibold">Min Price</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-green-600 font-bold">₹</span>
              <Input
                id="minPrice"
                type="number"
                placeholder="0"
                value={filters.minPrice || ''}
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })
                }
                className="pl-7 border-2 border-green-200 dark:border-green-700 focus:border-green-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxPrice" className="font-semibold">Max Price</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-green-600 font-bold">₹</span>
              <Input
                id="maxPrice"
                type="number"
                placeholder="500000"
                value={filters.maxPrice || ''}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })
                }
                className="pl-7 border-2 border-green-200 dark:border-green-700 focus:border-green-500"
              />
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="space-y-2">
          <Label htmlFor="availability" className="font-semibold">Availability</Label>
          <Select
            value={filters.availability || 'all'}
            onValueChange={(value) =>
              setFilters({ ...filters, availability: value === 'all' ? '' : (value as 'yes' | 'no') })
            }
          >
            <SelectTrigger className="border-2 border-blue-200 dark:border-blue-700 focus:border-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="yes">In Stock Only</SelectItem>
              <SelectItem value="no">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <Label htmlFor="sortBy" className="flex items-center gap-2 font-semibold text-orange-600 dark:text-orange-400">
            <TrendingUp className="h-4 w-4" />
            Sort By
          </Label>
          <Select
            value={filters.sortBy || 'newest'}
            onValueChange={(value) =>
              setFilters({ ...filters, sortBy: value as FilterOptions['sortBy'] })
            }
          >
            <SelectTrigger className="border-2 border-orange-200 dark:border-orange-700 focus:border-orange-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="discount">Best Discount</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Top Products */}
        <div className="space-y-2">
          <Label htmlFor="top" className="font-semibold">Limit Results</Label>
          <Input
            id="top"
            type="number"
            placeholder="Show all"
            value={filters.top || ''}
            onChange={(e) =>
              setFilters({ ...filters, top: e.target.value ? Number(e.target.value) : undefined })
            }
            className="border-2 border-cyan-200 dark:border-cyan-700 focus:border-cyan-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-4">
          <Button
            onClick={handleApplyFilters}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Apply Filters
          </Button>
          <Button
            onClick={handleClearFilters}
            variant="outline"
            className="flex-1 border-2 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
