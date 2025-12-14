import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Phone, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import RequestCallbackModal from '@/components/RequestCallbackModal';

export default function Header() {
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/how-to-pay', label: 'How to Pay' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        {/* Top bar with GST */}
        <div className="bg-primary text-primary-foreground py-1.5 text-center text-xs">
          <span className="opacity-80">GST No: 27ALKPB5328B1ZI</span>
          <span className="mx-3 opacity-50">|</span>
          <span className="opacity-80">Thane, Maharashtra, India</span>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-xl">B</span>
              </div>
              <span className="font-display text-xl font-semibold text-foreground hidden sm:block">
                Baldaniya.Com
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search puzzles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50 border-border/50 focus:bg-card"
                />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Request Callback */}
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex gap-2 border-primary/30 hover:bg-primary/10"
                onClick={() => setIsCallbackOpen(true)}
              >
                <Phone className="h-4 w-4" />
                <span className="hidden lg:inline">Request Callback</span>
              </Button>

              {/* Call Button */}
              <Button
                asChild
                variant="default"
                size="sm"
                className="hidden sm:flex gap-2"
              >
                <a href="tel:08048606609">
                  <Phone className="h-4 w-4" />
                  <span className="hidden lg:inline">08048606609</span>
                </a>
              </Button>

              {/* Cart */}
              <Button asChild variant="ghost" size="icon" className="relative">
                <Link to="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground">
                      {totalItems}
                    </Badge>
                  )}
                </Link>
              </Button>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72 bg-card">
                  <nav className="flex flex-col gap-4 mt-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border/50"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Button
                      className="mt-4 gap-2"
                      onClick={() => setIsCallbackOpen(true)}
                    >
                      <Phone className="h-4 w-4" />
                      Request Callback
                    </Button>
                    <Button asChild variant="outline" className="gap-2">
                      <a href="tel:08048606609">
                        <Phone className="h-4 w-4" />
                        Call: 08048606609
                      </a>
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <form onSubmit={handleSearch} className="py-3 md:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search puzzles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50"
                  autoFocus
                />
              </div>
            </form>
          )}
        </div>
      </header>

      <RequestCallbackModal open={isCallbackOpen} onOpenChange={setIsCallbackOpen} />
    </>
  );
}
