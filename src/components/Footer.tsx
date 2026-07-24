import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const quickLinks = [
    { path: '/', label: isAr ? 'الرئيسية' : 'Home' },
    { path: '/about', label: isAr ? 'من نحن' : 'About' },
    { path: '/services', label: isAr ? 'خدماتنا' : 'Services' },
    { path: '/catalog', label: isAr ? 'الكتالوج' : 'Catalog' },
    { path: '/contact', label: isAr ? 'تواصل معنا' : 'Contact' },
  ];

  const services = [
    isAr ? 'الاستشارات الفنية' : 'Technical Consultancy',
    isAr ? 'التصميم' : 'Designing',
    isAr ? 'الإنتاج' : 'Production',
    isAr ? 'التركيب' : 'Installation',
    isAr ? 'الصيانة السنوية' : 'Annual Maintenance',
  ];

  return (
    <footer className="bg-[#0f2e22] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 ${isAr ? 'lg:text-right' : 'lg:text-left'}`}>
          {/* Company Info */}
          <div className={isAr ? 'text-right' : 'text-left'}>
            <img
              src="/images/logo.png"
              alt="VastHome"
              className={`h-10 w-auto mb-6 brightness-0 invert opacity-90 ${isAr ? 'mr-0 ml-auto' : ''}`}
            />
            <p className="text-white/40 text-sm leading-relaxed">
              {isAr
                ? 'حلول تصميم داخلي فاخرة تجمع بين الهندسة الدقيقة والإبداع البصري. منذ أكثر من عشر سنوات، نحول المساحات إلى تجارب معيشية استثنائية.'
                : 'Premium interior design solutions that blend precise engineering with visual creativity. For over a decade, we transform spaces into extraordinary living experiences.'}
            </p>
          </div>

          {/* Quick Links */}
          <div className={isAr ? 'text-right' : 'text-left'}>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-[#87C24D] mb-6">
              {isAr ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={isAr ? 'text-right' : 'text-left'}>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-[#87C24D] mb-6">
              {isAr ? 'خدماتنا' : 'Services'}
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-white/50 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className={isAr ? 'text-right' : 'text-left'}>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-[#87C24D] mb-6">
              {isAr ? 'تواصل معنا' : 'Get in Touch'}
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.15em] mb-1">
                  {isAr ? 'العنوان' : 'Address'}
                </p>
                <p className="text-white/60 text-sm">
                  {isAr ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Kingdom of Saudi Arabia'}
                </p>
              </div>
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.15em] mb-1">
                  {isAr ? 'الهاتف' : 'Phone'}
                </p>
                <p className="text-white/60 text-sm">+966 50 000 0000</p>
              </div>
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.15em] mb-1">
                  {isAr ? 'البريد الإلكتروني' : 'Email'}
                </p>
                <p className="text-white/60 text-sm">info@vasthome.com.sa</p>
              </div>
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.15em] mb-1">
                  {isAr ? 'ساعات العمل' : 'Working Hours'}
                </p>
                <p className="text-white/60 text-sm">
                  {isAr ? 'السبت - الخميس: 9 ص - 6 م' : 'Sat - Thu: 9 AM - 6 PM'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-white/30 text-xs text-center tracking-wide">
            &copy; {new Date().getFullYear()} VastHome. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}