import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  X, 
  Instagram, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold text-primary">Team Sportivo</h2>
            </Link>
            <p className="text-gray-600 max-w-xs">
              Elevating athletics through passion, precision, and perseverance. Join our community of champions.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.facebook.com/sportivoteamfuture"
                className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <X size={18} />
              </a>
              <a 
                href="https://www.instagram.com/sportivoteamfuture/?igsh=OWs1N3Bhc3JjN3hi#" 
                className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://youtube.com/@sportivoteamfuture?si=vUixMmLHUjxK2Ljl" 
                className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
                aria-label="Youtube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1">
                  <ArrowRight size={15} />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1">
                  <ArrowRight size={15} />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1">
                  <ArrowRight size={15} />
                  <span>Gallery</span>
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1">
                  <ArrowRight size={15} />
                  <span>Events</span>
                </Link>
              </li>
              <li>
                <Link to="/sponsors" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1">
                  <ArrowRight size={15} />
                  <span>Sponsors</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Events</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/xaplotes" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1">
                  <ArrowRight size={15} />
                  <span>Xaplotes</span>
                </Link>
              </li>
              <li>
                <Link to="/vibgyor" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1">
                  <ArrowRight size={15} />
                  <span>Vibgyor</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1">
                  <ArrowRight size={15} />
                  <span>Join Our Team</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">
                  Sonarpur Station Rd, Mission Pally, Narendrapur, Kolkata, West Bengal 700150
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="text-gray-600 space-y-1">
                  <p>Rohit Yadav (+91 98301 16661) </p>
                  <p>Aman Agastya (+91 96935 53439) </p>
                  <p>Chhavinav Verma (+91 74797 03520) </p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-gray-600">sportivo@teamfuture.in</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Team Sportivo. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link to="/terms" className="text-sm text-gray-500 hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookie" className="text-sm text-gray-500 hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
