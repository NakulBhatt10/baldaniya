import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <span className="font-display font-bold text-xl">B</span>
              </div>
              <span className="font-display text-xl font-semibold">Baldaniya.Com</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Premium MDF 3D Wooden Puzzles crafted with precision and passion. 
              Transform your space with our handcrafted wooden creations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/shop', label: 'Shop All' },
                { to: '/how-to-pay', label: 'How to Pay' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Categories</h4>
            <ul className="space-y-2">
              {[
                'Wooden Puzzle',
                'Display Stand',
                'Display Rack',
                'Puzzle Game',
              ].map((category) => (
                <li key={category}>
                  <Link
                    to={`/shop?category=${encodeURIComponent(category)}`}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="Vinod Baldaniya 
9699721211"
                  className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Vinod Baldaniya 
9699721211
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                Thane, Maharashtra, India
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Mail className="h-4 w-4" />
                info@baldaniya.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>© {new Date().getFullYear()} Baldaniya.Com. All rights reserved.</p>
            <p>GST No: 27ALKPB5328B1ZI</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
