import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import whiteLogo from "@/assets/white-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground w-full">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src={whiteLogo} 
                alt="Schmidt Zeevis Logo" 
                className="h-20 md:h-32 object-contain"
              />
            </Link>
            <p className="text-primary-foreground/80 text-sm">
              Verse vis en zeevruchten, rechtstreeks van de haven naar uw deur. Al meer dan 30 jaar uw betrouwbare vishandel.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Snelle Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link to="/collections" className="hover:text-primary-foreground transition-colors">Alle Collecties</Link></li>
              <li><Link to="/collections/deals" className="hover:text-primary-foreground transition-colors">Aanbiedingen</Link></li>
              <li><Link to="/collections/seasonal" className="hover:text-primary-foreground transition-colors">Seizoensproducten</Link></li>
              <li><Link to="/about" className="hover:text-primary-foreground transition-colors">Over Ons</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Klantenservice</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link to="/faq" className="hover:text-primary-foreground transition-colors">Veelgestelde Vragen</Link></li>
              <li><Link to="/shipping" className="hover:text-primary-foreground transition-colors">Verzending & Levering</Link></li>
              <li><Link to="/returns" className="hover:text-primary-foreground transition-colors">Retourneren</Link></li>
              <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Havenweg 123, 1234 AB Scheveningen</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+31701234567" className="hover:text-primary-foreground transition-colors">+31 (0)70 123 4567</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@schmidtzeevis.nl" className="hover:text-primary-foreground transition-colors">info@schmidtzeevis.nl</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p>© 2024 Schmidt Zeevis. Alle rechten voorbehouden.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-primary-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-primary-foreground transition-colors">Voorwaarden</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
