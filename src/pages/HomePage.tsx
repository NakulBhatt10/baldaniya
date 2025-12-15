import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowRight, CreditCard, ShoppingBag, Truck, Shield, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import { getBestsellers, getFeaturedProducts, categories, getCategoryCount } from '@/data/products';

const testimonials = [
  {
    name: 'Rajesh Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'Excellent quality puzzles! The vintage car model exceeded my expectations. Great craftsmanship.',
  },
  {
    name: 'Priya Patel',
    location: 'Pune',
    rating: 5,
    text: 'Ordered the sailing ship for my son. He spent hours building it and now it proudly sits on his desk.',
  },
  {
    name: 'Amit Joshi',
    location: 'Thane',
    rating: 5,
    text: 'Premium MDF quality, precise cuts, and detailed instructions. Will definitely order again!',
  },
];

const valueProps = [
  {
    icon: Truck,
    title: 'Pan India Shipping',
    description: 'Fast & secure delivery across India',
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Premium MDF with precision cutting',
  },
  {
    icon: CreditCard,
    title: 'Easy Payment',
    description: 'Simple QR code payment via GPay',
  },
  {
    icon: ShoppingBag,
    title: 'Wide Selection',
    description: '37+ unique 3D puzzle designs',
  },
];

export default function HomePage() {
  const bestsellers = getBestsellers();
  const featured = getFeaturedProducts();

  // ✅ ADDED: Hero slideshow logic
  const heroImages = ['/mf1.png', '/safety3.png', '/kids2.png', '/woodanimal1.png'];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setBgIndex((i) => (i + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-muted">
          {/* ✅ ADDED: Slideshow background ONLY within hero */}
          <div className="absolute inset-0 z-0">
            {heroImages.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                  i === bgIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-black/30" />
          </div>

          <div className="absolute inset-0 opacity-5 z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary))_0%,transparent_50%)]" />
          </div>
          
          <div className="container mx-auto px-4 py-16 md:py-24 relative z-20">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-highlight/20 text-highlight-foreground border-highlight/30">
                Handcrafted in India
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
                Puzzle Wood
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
                Discover the art of precision craftsmanship. Build stunning 3D models from premium MDF wood pieces.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Button asChild size="xl">
                  <Link to="/shop">
                    <ShoppingBag className="h-5 w-5" />
                    Shop Now
                  </Link>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <Link to="/how-to-pay">
                    <CreditCard className="h-5 w-5" />
                    How to Pay
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 bg-card border-y border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/shop?category=${encodeURIComponent(category)}`}
                  className="group flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <span className="font-medium">{category}</span>
                  <span className="text-sm opacity-70">({getCategoryCount(category)})</span>
                  <ChevronRight className="h-4 w-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {valueProps.map((prop, index) => (
                <div
                  key={prop.title}
                  className="text-center p-6 rounded-xl bg-card border border-border/50 hover:shadow-soft transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                    <prop.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{prop.title}</h3>
                  <p className="text-sm text-muted-foreground">{prop.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bestsellers */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Bestsellers
                </h2>
                <p className="text-muted-foreground mt-1">Our most popular wooden puzzles</p>
              </div>
              <Button asChild variant="ghost" className="gap-2">
                <Link to="/shop">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestsellers.slice(0, 4).map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Featured Collection
                </h2>
                <p className="text-muted-foreground mt-1">Handpicked premium designs</p>
              </div>
              <Button asChild variant="ghost" className="gap-2">
                <Link to="/shop">
                  Explore All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.slice(0, 6).map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 md:py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
                What Our Customers Say
              </h2>
              <p className="text-primary-foreground/70">Join thousands of happy puzzle enthusiasts</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className="p-6 rounded-xl bg-primary-foreground/10 backdrop-blur animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-highlight text-highlight" />
                    ))}
                  </div>
                  <p className="text-primary-foreground/90 mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-primary-foreground/60">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-warm to-highlight">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-highlight-foreground mb-4">
              Ready to Start Building?
            </h2>
            <p className="text-highlight-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Explore our collection of premium Puzzle Wood and find your next project.
            </p>
            <Button asChild size="xl" variant="default" className="bg-primary hover:bg-primary/90">
              <Link to="/shop">
                Browse Collection
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
