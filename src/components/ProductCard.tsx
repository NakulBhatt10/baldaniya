import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Puzzle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/utils/orderUtils';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({
      title: 'Added to Cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const difficultyColor = {
    Easy: 'bg-accent/20 text-accent',
    Medium: 'bg-highlight/20 text-highlight-foreground',
    Hard: 'bg-warm/20 text-warm-foreground',
    Expert: 'bg-primary/20 text-primary',
  }[product.difficulty];

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group card-wood overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.bestseller && (
          <Badge className="absolute top-3 left-3 bg-highlight text-highlight-foreground gap-1">
            <Star className="h-3 w-3 fill-current" />
            Bestseller
          </Badge>
        )}
        {product.stockStatus === 'Low Stock' && (
          <Badge variant="destructive" className="absolute top-3 right-3">
            Low Stock
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className={difficultyColor}>
            {product.difficulty}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Puzzle className="h-3 w-3" />
            {product.pieces} pcs
          </span>
        </div>

        <div className="flex items-center gap-2 mt-auto">
          <span className="font-display text-lg font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <Button
          onClick={handleAddToCart}
          className="mt-3 w-full gap-2"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </Link>
  );
}
