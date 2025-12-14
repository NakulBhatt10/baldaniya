import { Link } from 'react-router-dom';
import { Award, Users, Truck, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const values = [
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'We use only the finest MDF materials with precision laser cutting for perfect fit and finish.',
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'Your satisfaction is our priority. We\'re always here to help with any questions or concerns.',
  },
  {
    icon: Truck,
    title: 'Pan India Delivery',
    description: 'We ship to all corners of India with careful packaging to ensure your puzzle arrives safely.',
  },
  {
    icon: Shield,
    title: 'Trusted Business',
    description: 'Registered business with GST compliance. Thousands of happy customers across India.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-secondary via-background to-muted py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                About Baldaniya
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We are passionate craftsmen dedicated to bringing joy through the art of wooden puzzles. 
                Based in Thane, Maharashtra, we create premium MDF 3D puzzles that combine traditional 
                craftsmanship with modern precision.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Baldaniya started with a simple idea: to create beautiful, engaging puzzles that 
                    bring families together and provide hours of creative satisfaction. What began as 
                    a small workshop has grown into a trusted name in the wooden puzzle industry.
                  </p>
                  <p>
                    Every puzzle we create is designed with care and precision. We use premium MDF 
                    (Medium Density Fiberboard) that's perfect for intricate designs and long-lasting 
                    durability. Our laser cutting technology ensures each piece fits perfectly.
                  </p>
                  <p>
                    From vintage cars to mythical dragons, architectural marvels to office organizers, 
                    our collection offers something for everyone. Whether you're a beginner or an expert 
                    puzzler, we have designs that will challenge and delight you.
                  </p>
                </div>
              </div>
              <div className="card-wood p-8 bg-primary/5">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <p className="font-display text-4xl font-bold text-primary">37+</p>
                    <p className="text-sm text-muted-foreground">Unique Designs</p>
                  </div>
                  <div>
                    <p className="font-display text-4xl font-bold text-primary">5000+</p>
                    <p className="text-sm text-muted-foreground">Happy Customers</p>
                  </div>
                  <div>
                    <p className="font-display text-4xl font-bold text-primary">Pan India</p>
                    <p className="text-sm text-muted-foreground">Delivery</p>
                  </div>
                  <div>
                    <p className="font-display text-4xl font-bold text-primary">GST</p>
                    <p className="text-sm text-muted-foreground">Registered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-center mb-12">
              Why Choose Baldaniya?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="card-wood p-6 text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Business Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto card-wood p-8">
              <h2 className="font-display text-2xl font-bold text-center mb-6">
                Business Information
              </h2>
              <div className="space-y-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Company Name</p>
                  <p className="font-display font-semibold text-lg">Baldaniya</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Website</p>
                  <p className="font-display font-semibold text-lg">Baldaniya.Com</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-display font-semibold text-lg">Thane, Maharashtra, India</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">GST Number</p>
                  <p className="font-mono text-lg">27ALKPB5328B1ZI</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold mb-4">
              Start Your Puzzle Journey
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Explore our collection and find the perfect puzzle for yourself or as a gift.
            </p>
            <Button asChild size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link to="/shop">
                Browse Collection
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
