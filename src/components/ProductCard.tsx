import { Product } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Package } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const isAvailable = product.availability.toLowerCase() === 'yes';
  const discountedPrice = product.price - (product.price * product.discount / 100);

  return (
    <Card
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-card-hover animate-fade-in"
      onClick={onClick}
    >
      <div className="aspect-square bg-muted relative overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.productName}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-16 w-16 text-muted-foreground" />
          </div>
        )}
        {product.discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
            -{product.discount}%
          </Badge>
        )}
        {!isAvailable && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Badge variant="destructive">Out of Stock</Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.productName}
        </h3>
        
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.company}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
        </div>

        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-primary">
            ${discountedPrice.toFixed(2)}
          </div>
          {product.discount > 0 && (
            <div className="text-sm text-muted-foreground line-through">
              ${product.price.toFixed(2)}
            </div>
          )}
        </div>
        <Badge variant={isAvailable ? "default" : "secondary"}>
          {isAvailable ? "In Stock" : "Out of Stock"}
        </Badge>
      </CardFooter>
    </Card>
  );
}
