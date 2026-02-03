import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Star } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy text-white pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">
              Lena <span className="text-gold">Borrayo</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Your trusted Florida real estate expert. Helping you find your dream home in South Florida.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://web.facebook.com/myrealtorlena"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.homes.com/real-estate-agents/lena-borrayo/rnxlsw0"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all"
                aria-label="Homes.com"
              >
                <Star className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-300 hover:text-gold transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-gray-300 hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold" />
                <a href="tel:+17863440357" className="text-gray-300 hover:text-gold transition-colors font-body">
                  1-786-344-0357
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold" />
                <a href="mailto:lenaborrayo@gmail.com" className="text-gray-300 hover:text-gold transition-colors">
                  lenaborrayo@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Miami, Florida</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Lena Borrayo. All rights reserved.</p>
          <Link 
            to="/auth" 
            className="mt-2 md:mt-0 text-gray-500 hover:text-gold transition-colors text-xs"
          >
            Agent Login
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
