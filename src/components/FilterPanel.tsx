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
import { Filter, X } from "lucide-react";

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
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="minPrice">Min Price ($)</Label>
          <Input
            id="minPrice"
            type="number"
            placeholder="0"
            value={filters.minPrice || ''}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxPrice">Max Price ($)</Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="10000"
            value={filters.maxPrice || ''}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="availability">Availability</Label>
          <Select
            value={filters.availability || 'all'}
            onValueChange={(value) =>
              setFilters({ ...filters, availability: value === 'all' ? '' : (value as 'yes' | 'no') })
            }
          >
            <SelectTrigger id="availability">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="yes">In Stock</SelectItem>
              <SelectItem value="no">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="top">Top N Products</Label>
          <Input
            id="top"
            type="number"
            placeholder="Show all"
            min="1"
            value={filters.top || ''}
            onChange={(e) =>
              setFilters({ ...filters, top: e.target.value ? Number(e.target.value) : undefined })
            }
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={handleApplyFilters} className="flex-1 bg-gradient-primary">
            Apply Filters
          </Button>
          <Button onClick={handleClearFilters} variant="outline" size="icon">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
