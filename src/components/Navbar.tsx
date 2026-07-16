import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

export default function Navbar() {
  const { language, toggleLanguage, dir } = useLanguage();
  const t = translations[language];
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/about', label: t.nav.about },
    { path: '/services', label: t.nav.services },
    { path: '/catalog', label: t.nav.catalog },
    { path: '/contact', label: t.nav.contact },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white/95 backdrop-blur-md shadow-md py-1'
          : 'bg-transparent py-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 flex-shrink-0 -ml-1">
            <img
              src="/images/logo.png"
              alt="VastHome"
              className="h-24 sm:h-28 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? isScrolled
                      ? 'text-[#237357] bg-[#237357]/10'
                      : 'text-[#87C24D] bg-white/10'
                    : isScrolled
                      ? 'text-gray-700 hover:text-[#237357] hover:bg-gray-50'
                      : 'text-white hover:text-[#87C24D] hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-lg bg-[#237357] text-white text-sm font-semibold hover:bg-[#1a5a43] transition-colors duration-200 flex items-center gap-1"
            >
              <span className="text-xs">{dir === 'rtl' ? 'EN' : 'AR'}</span>
            </button>

            {/* Contact Button (Desktop) */}
            <Link
              to="/contact"
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isScrolled
                  ? 'bg-[#87C24D] text-white hover:bg-[#6fa33d]'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/30'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>{t.nav.contact}</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-1.5 rounded-lg transition-colors ${
                isScrolled || isMobileMenuOpen
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - SOLID WHITE BACKGROUND */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pb-3 pt-3 bg-white rounded-b-xl shadow-lg animate-fade-in">
            <div className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-[#237357] bg-[#237357]/10'
                      : 'text-gray-700 hover:text-[#237357] hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#87C24D] text-white text-sm font-medium hover:bg-[#6fa33d] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{t.nav.contact}</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}