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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleSection = (title: string) => {
    setExpandedSections(prev => 
      prev.includes(title) 
        ? prev.filter(s => s !== title)
        : [...prev, title]
    );
  };

  // Same nav links as before - no changes to buttons
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
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-transparent py-2'
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

            {/* Desktop Navigation - Same buttons as before */}
            <div className="hidden lg:flex items-center">
              <div className={`flex items-center gap-0.5 px-2 py-1.5 rounded-full transition-all duration-300 ${
                isScrolled
                  ? 'bg-black/35 backdrop-blur-sm'
                  : 'bg-black/35 backdrop-blur-sm'
              }`}>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive(link.path)
                        ? 'text-[#237357] bg-white/90 shadow-sm'
                        : 'text-white hover:text-white hover:bg-white/20'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
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
                    : 'bg-black/35 text-white hover:bg-white/20 border border-white/30'
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
                    ? 'text-black hover:bg-gray-100'
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
        </div>
      </nav>

      {/* Full Screen Mobile Menu - Slides from Right */}
      <div 
        className={`fixed inset-0 z-[60] lg:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ direction: 'ltr' }}
      >
        {/* White Background Container */}
        <div className="absolute inset-0 bg-white flex flex-col">
          {/* Header - Logo & Close */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <img
                src="/images/logo.png"
                alt="VastHome"
                className="h-16 w-auto"
              />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-[#237357] hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Content - Scrollable */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="flex flex-col">
              {navLinks.map((link) => {
                return (
                  <div key={link.path} className="border-b border-gray-100">
                    <button
                      className="w-full flex items-center justify-between py-3 text-left"
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-lg font-semibold ${
                          isActive(link.path) ? 'text-[#237357] underline underline-offset-4 decoration-2' : 'text-gray-900'
                        }`}
                      >
                        {link.label}
                      </Link>
                      
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer - Language & Contact */}
          <div className="border-t border-gray-100 px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  toggleLanguage();
                }}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#237357] transition-colors"
              >
                <span className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-xs">
                  {dir === 'rtl' ? 'EN' : 'AR'}
                </span>
                <span>{dir === 'rtl' ? 'English' : 'العربية'}</span>
              </button>

              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#87C24D] text-white text-sm font-medium hover:bg-[#6fa33d] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{t.nav.contact}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[55] bg-black/20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
