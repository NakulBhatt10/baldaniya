import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import { products, categories, getCategoryCount } from '@/data/products';

const difficulties = ['Easy', 'Medium', 'Hard', 'Expert'] as const;
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 - ₹1000', min: 500, max: 1000 },
  { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
  { label: 'Above ₹2000', min: 2000, max: Infinity },
];
const pieceRanges = [
  { label: 'All Pieces', min: 0, max: Infinity },
  { label: 'Under 50', min: 0, max: 50 },
  { label: '50 - 100', min: 50, max: 100 },
  { label: '100 - 200', min: 100, max: 200 },
  { label: 'Above 200', min: 200, max: Infinity },
];
const sortOptions = [
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'pieces-asc', label: 'Pieces: Low to High' },
  { value: 'pieces-desc', label: 'Pieces: High to Low' },
];

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filter states from URL
  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || '';
  const selectedDifficulty = searchParams.get('difficulty') || '';
  const selectedPriceRange = searchParams.get('price') || 'All Prices';
  const selectedPieceRange = searchParams.get('pieces') || 'All Pieces';
  const sortBy = searchParams.get('sort') || 'name-asc';

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Difficulty
    if (selectedDifficulty) {
      result = result.filter((p) => p.difficulty === selectedDifficulty);
    }

    // Price Range
    const priceRange = priceRanges.find((r) => r.label === selectedPriceRange);
    if (priceRange && priceRange.label !== 'All Prices') {
      result = result.filter(
        (p) => p.price >= priceRange.min && p.price < priceRange.max
      );
    }

    // Piece Range
    const pieceRange = pieceRanges.find((r) => r.label === selectedPieceRange);
    if (pieceRange && pieceRange.label !== 'All Pieces') {
      result = result.filter(
        (p) => p.pieces >= pieceRange.min && p.pieces < pieceRange.max
      );
    }

    // Sort
    const [sortField, sortOrder] = sortBy.split('-');
    result.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'price') {
        comparison = a.price - b.price;
      } else if (sortField === 'pieces') {
        comparison = a.pieces - b.pieces;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return result;
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedPriceRange, selectedPieceRange, sortBy]);

  const hasActiveFilters = selectedCategory || selectedDifficulty || selectedPriceRange !== 'All Prices' || selectedPieceRange !== 'All Pieces';

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <div
          className="flex items-center justify-between cursor-pointer mb-3"
          onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
        >
          <h3 className="font-display font-semibold text-lg">Products & Services</h3>
          {isFiltersExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
        {isFiltersExpanded && (
          <div className="space-y-1">
            <button
              onClick={() => updateFilter('category', '')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                !selectedCategory
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              All Products ({products.length})
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => updateFilter('category', category)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                {category} ({getCategoryCount(category)})
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="font-display font-semibold text-lg mb-3">Difficulty</h3>
        <div className="space-y-1">
          <button
            onClick={() => updateFilter('difficulty', '')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !selectedDifficulty
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
          >
            All Levels
          </button>
          {difficulties.map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => updateFilter('difficulty', difficulty)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedDifficulty === difficulty
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="font-display font-semibold text-lg mb-3">Price Range</h3>
        <div className="space-y-1">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => updateFilter('price', range.label)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedPriceRange === range.label
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="font-display font-semibold text-lg mb-3">Pieces Count</h3>
        <div className="space-y-1">
          {pieceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => updateFilter('pieces', range.label)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedPieceRange === range.label
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full mt-4">
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Shop All Products
          </h1>
          <p className="text-muted-foreground">
            Discover our collection of {products.length} premium MDF 3D wooden puzzles
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 card-wood p-6">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  className="pl-10 bg-card"
                />
              </div>
              <div className="flex gap-2">
                {/* Mobile Filters */}
                <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters
                      {hasActiveFilters && (
                        <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                          !
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 bg-card overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>

                <Select value={sortBy} onValueChange={(value) => updateFilter('sort', value)}>
                  <SelectTrigger className="w-[180px] bg-card">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            {(hasActiveFilters || searchQuery) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {searchQuery}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => updateFilter('search', '')}
                    />
                  </Badge>
                )}
                {selectedCategory && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedCategory}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => updateFilter('category', '')}
                    />
                  </Badge>
                )}
                {selectedDifficulty && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedDifficulty}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => updateFilter('difficulty', '')}
                    />
                  </Badge>
                )}
                {selectedPriceRange !== 'All Prices' && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedPriceRange}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => updateFilter('price', 'All Prices')}
                    />
                  </Badge>
                )}
                {selectedPieceRange !== 'All Pieces' && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedPieceRange}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => updateFilter('pieces', 'All Pieces')}
                    />
                  </Badge>
                )}
              </div>
            )}

            {/* Results Count */}
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl font-display text-muted-foreground mb-4">
                  No products found
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
