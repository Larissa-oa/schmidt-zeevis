import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Menu, User, Fish, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import logoImage from "@/assets/black-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  // Check if shop is open (Mon-Sat 8:00-18:00)
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const isOpen = day >= 1 && day <= 6 && hour >= 8 && hour < 18;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collections/alle-producten?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-foreground text-background py-1.5">
        <div className="container flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-400' : 'bg-red-400'}`} />
            <Clock className="h-3 w-3 opacity-70" />
            <span className="opacity-90">Ma-Za 8:00-18:00</span>
          </div>
          <span className="hidden sm:inline opacity-40">|</span>
          <span className="hidden sm:inline opacity-90">Ruim assortiment • Meer dan 133 soorten verse vis dagelijks</span>
        </div>
      </div>
      
      <div className="bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src={logoImage} 
            alt="Schmidt Zeevis Logo" 
            className="h-12 md:h-16 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-12">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Webwinkel
          </Link>
          <Link to="/collections/alle-producten" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Alle producten
          </Link>
          <Link to="/collections/vangst-van-de-maand" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Verse vangst
          </Link>
          <Link to="/collections/verse-vis" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Verse vis
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-2">
            <div className="relative">
              <Input
                type="text"
                placeholder="Zoek producten..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </form>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <User className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-green text-accent-green-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div 
        className={`md:hidden bg-card border-t border-border overflow-hidden transition-all duration-300 ease-in-out ${
          isSearchOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0 border-t-0'
        }`}
      >
        <div className="container py-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Input
                type="text"
                placeholder="Zoek producten..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4"
                autoFocus={isSearchOpen}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-card border-t border-border overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 border-t-0'
        }`}
      >
        <div className="container py-6">
          <nav className="flex flex-col gap-1">
            <Link 
              to="/" 
              className="py-3 px-4 rounded-xl hover:bg-secondary/50 transition-all duration-200 font-medium text-foreground hover:text-primary flex items-center gap-3 group"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Webwinkel
            </Link>
            <Link 
              to="/collections/alle-producten" 
              className="py-3 px-4 rounded-xl hover:bg-secondary/50 transition-all duration-200 font-medium text-foreground hover:text-primary flex items-center gap-3 group"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Alle producten
            </Link>
            <Link 
              to="/collections/vangst-van-de-maand" 
              className="py-3 px-4 rounded-xl hover:bg-secondary/50 transition-all duration-200 font-medium text-foreground hover:text-primary flex items-center gap-3 group"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Verse vangst
            </Link>
            <Link 
              to="/collections/verse-vis" 
              className="py-3 px-4 rounded-xl hover:bg-secondary/50 transition-all duration-200 font-medium text-foreground hover:text-primary flex items-center gap-3 group"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Verse vis
            </Link>
          </nav>
        </div>
      </div>
      </div>
    </header>
  );
};

export default Header;
