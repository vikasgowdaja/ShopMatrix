import { Product } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Package, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const isAvailable = product.availability.toLowerCase() === 'yes';
  const discountedPrice = product.price - (product.price * product.discount / 100);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="group cursor-pointer overflow-hidden transition-all duration-500 hover:shadow-card-hover animate-slide-in card-hover border-0 bg-white dark:bg-slate-800 hover:border-purple-500/20">
      {/* Image Container with Overlay */}
      <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 relative overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.productName}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-16 w-16 text-slate-400 group-hover:text-purple-500 transition-colors" />
          </div>
        )}

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isFavorite
                ? 'bg-red-500 text-white'
                : 'bg-white/80 hover:bg-white text-gray-600'
            }`}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="p-2 rounded-full backdrop-blur-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>

        {/* Discount Badge */}
        {product.discount > 0 && (
          <Badge className="absolute top-2 left-2 badge-discount text-white font-bold text-xs px-3 py-1 shadow-lg">
            -{product.discount}%
          </Badge>
        )}

        {/* New/Hot Badge */}
        {product.discount > 15 && (
          <Badge className="absolute top-10 left-2 badge-hot text-white font-bold text-xs px-3 py-1">
            🔥 HOT
          </Badge>
        )}

        {/* Availability Badge */}
        {!isAvailable && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
            <Badge variant="destructive" className="text-lg font-bold">Out of Stock</Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-2">
        {/* Product Name */}
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-tight">
          {product.productName}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
            {product.description}
          </p>
        )}

        {/* Category & Company Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-semibold">
            {product.company.toUpperCase()}
          </Badge>
          <Badge variant="outline" className="text-xs border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 font-semibold">
            {product.category}
          </Badge>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 w-fit px-2 py-1 rounded-lg">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold text-amber-700 dark:text-amber-400">{product.rating.toFixed(1)}</span>
        </div>
      </CardContent>

      {/* Footer with Price */}
      <CardFooter className="p-4 pt-0 flex flex-col gap-2 border-t border-gray-200 dark:border-gray-700">
        <div className="w-full flex items-center justify-between">
          <div>
            <div className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ₹{discountedPrice.toLocaleString('en-IN')}
            </div>
            {product.discount > 0 && (
              <div className="text-sm text-gray-500 line-through dark:text-gray-400">
                ₹{product.price.toLocaleString('en-IN')}
              </div>
            )}
          </div>
          <Badge variant={isAvailable ? "default" : "secondary"} className="text-xs font-bold">
            {isAvailable ? "✓ In Stock" : "× Out"}
          </Badge>
        </div>

        {/* CTA Button */}
        <button
          onClick={onClick}
          disabled={!isAvailable}
          className={`w-full py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            isAvailable
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          {isAvailable ? 'View Details' : 'Not Available'}
        </button>
      </CardFooter>
    </Card>
  );
}
