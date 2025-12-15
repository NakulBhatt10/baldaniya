import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Phone, ArrowLeft, Puzzle, Clock, Ruler, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import RequestCallbackModal from '@/components/RequestCallbackModal';
import { getProductBySlug, products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/utils/orderUtils';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  const product = getProductBySlug(slug || '');

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Product Not Found</h1>
          <Button asChild>
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: 'Added to Cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    addItem(product);
    navigate('/cart');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const difficultyColor = {
    Easy: 'bg-accent/20 text-accent',
    Medium: 'bg-highlight/20 text-highlight-foreground',
    Hard: 'bg-warm/20 text-warm-foreground',
    Expert: 'bg-primary/20 text-primary',
  }[product.difficulty];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-foreground transition-colors">
              Shop
            </Link>
            <span>/</span>
            <Link
              to={`/shop?category=${encodeURIComponent(product.category)}`}
              className="hover:text-foreground transition-colors"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev === 0 ? product.images.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center hover:bg-card transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev === product.images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center hover:bg-card transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
                {product.bestseller && (
                  <Badge className="absolute top-4 left-4 bg-highlight text-highlight-foreground">
                    Bestseller
                  </Badge>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? 'border-primary'
                          : 'border-transparent hover:border-border'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="font-display text-3xl font-bold text-foreground">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <Badge
                  variant={product.stockStatus === 'In Stock' ? 'secondary' : 'destructive'}
                >
                  {product.stockStatus}
                </Badge>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4 p-6 rounded-xl bg-muted/50 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center">
                    <Puzzle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pieces</p>
                    <p className="font-semibold">{product.pieces}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Build Time</p>
                    <p className="font-semibold">{product.buildTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center">
                    <Ruler className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dimensions</p>
                    <p className="font-semibold">{product.dimensions}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${difficultyColor}`}>
                    <span className="text-sm font-bold">{product.difficulty[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Difficulty</p>
                    <p className="font-semibold">{product.difficulty}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* In The Box */}
              <div className="mb-8">
                <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  In The Box
                </h3>
                <ul className="grid grid-cols-2 gap-2">
                  {product.inTheBox.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button onClick={handleAddToCart} size="lg" className="flex-1 gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button onClick={handleBuyNow} variant="highlight" size="lg" className="flex-1 gap-2">
                  Buy via QR (Pay Now)
                </Button>
              </div>

              <Button
                variant="outline"
                size="lg"
                className="w-full gap-2"
                onClick={() => setIsCallbackOpen(true)}
              >
                <Phone className="h-5 w-5" />
                Request a Callback
              </Button>

              {/* Contact */}
              <div className="mt-6 p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-sm text-muted-foreground mb-1">Need help? Call us directly</p>
                <a
                  href="tel:9699721211"
                  className="font-display text-lg font-semibold text-primary hover:underline"
                >
                  9699721211
                </a>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
      <RequestCallbackModal
        open={isCallbackOpen}
        onOpenChange={setIsCallbackOpen}
        productName={product.name}
      />
    </div>
  );
}
