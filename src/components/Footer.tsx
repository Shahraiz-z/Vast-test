import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];
  const isAr = language === 'ar';

  const quickLinks = [
    { path: '/', label: t.nav.home },
    { path: '/about', label: t.nav.about },
    { path: '/services', label: t.nav.services },
    { path: '/catalog', label: t.nav.catalog },
    { path: '/contact', label: t.nav.contact },
  ];

  return (
    <footer className="bg-[#237357] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${isAr ? 'lg:text-right' : 'lg:text-left'}`}>
          {/* Company Info */}
          <div className={isAr ? 'text-right' : 'text-left'}>
            <img
              src="/images/logo.png"
              alt="VastHome"
              className={`h-12 w-auto mb-4 brightness-0 invert ${isAr ? 'mr-0 ml-auto' : ''}`}
            />
            <p className="text-white/80 text-sm leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className={isAr ? 'text-right' : 'text-left'}>
            <h3 className="text-lg font-semibold mb-4 text-[#87C24D]">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={isAr ? 'text-right' : 'text-left'}>
            <h3 className="text-lg font-semibold mb-4 text-[#87C24D]">
              {t.footer.services}
            </h3>
            <ul className="space-y-2">
              {t.footer.serviceLinks.map((service, index) => (
                <li key={index}>
                  <span className="text-white/80 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className={isAr ? 'text-right' : 'text-left'}>
            <h3 className="text-lg font-semibold mb-4 text-[#87C24D]">
              {t.footer.contact}
            </h3>
            <ul className="space-y-3">
              <li className={`flex items-start gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                <MapPin className="w-4 h-4 text-[#87C24D] mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">
                  {t.contact.info.addressValue}
                </span>
              </li>
              <li className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                <Phone className="w-4 h-4 text-[#87C24D] flex-shrink-0" />
                <span className="text-white/80 text-sm">
                  {t.contact.info.phoneValue}
                </span>
              </li>
              <li className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                <Mail className="w-4 h-4 text-[#87C24D] flex-shrink-0" />
                <span className="text-white/80 text-sm">
                  {t.contact.info.emailValue}
                </span>
              </li>
              <li className={`flex items-start gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                <Clock className="w-4 h-4 text-[#87C24D] mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">
                  {t.contact.info.hoursValue}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/20 text-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} {t.footer.company}. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
