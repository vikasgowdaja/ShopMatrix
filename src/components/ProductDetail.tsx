import { Product } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Package, Building2, Tag } from "lucide-react";

interface ProductDetailProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetail({ product, open, onOpenChange }: ProductDetailProps) {
  if (!product) return null;

  const isAvailable = product.availability.toLowerCase() === 'yes';
  const discountedPrice = product.price - (product.price * product.discount / 100);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.productName}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            {product.image ? (
              <img
                src={product.image}
                alt={product.productName}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="h-24 w-24 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-primary">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <Badge className="bg-accent text-accent-foreground">
                      {product.discount}% OFF
                    </Badge>
                  </>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-accent text-accent" />
                <span className="font-semibold">{product.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">/ 5.0</span>
              </div>

              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <span className="font-medium">Company:</span>
                <Badge variant="secondary">{product.company}</Badge>
              </div>

              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-primary" />
                <span className="font-medium">Category:</span>
                <Badge variant="outline">{product.category}</Badge>
              </div>

              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <span className="font-medium">Availability:</span>
                <Badge variant={isAvailable ? "default" : "destructive"}>
                  {isAvailable ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-2">Product Details</h3>
              <p className="text-muted-foreground">
                {product.description || 
                  `${product.productName} from ${product.company}. High-quality ${product.category} with excellent features and performance.`}
              </p>
            </div>

            <div className="pt-4">
              <span className="text-xs text-muted-foreground">Product ID: {product.id}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
