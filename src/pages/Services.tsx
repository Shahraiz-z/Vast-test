import { Check, ClipboardList, Hammer, Paintbrush, Truck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

export default function Services() {
 const { language, dir } = useLanguage();
 const t = translations[language];
 const isAr = language === 'ar';

 const serviceIcons = [Paintbrush, ClipboardList, Hammer, Truck];
 const processIcons = [ClipboardList, Paintbrush, Hammer, Truck];

 return (
 <div className={`${isAr ? 'font-arabic' : ''}`} dir={dir}>
 {/* Hero Section */}
 <section className="relative pt-24 pb-12 overflow-hidden">
 <div 
 className="absolute inset-0"
 style={{
 background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 30%, #237357 30%, #1a5a43 100%)'
 }}
 />
 <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className={`${isAr ? 'text-right' : 'text-left'}`}>
 <p className="text-[#87C24D] text-sm font-semibold uppercase tracking-wider mb-3">
 {isAr ? 'خدماتنا' : 'Our Services'}
 </p>
 <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
 {t.services.hero.title}
 </h1>
 <p className="text-lg text-white/80 max-w-2xl">
 {t.services.hero.subtitle}
 </p>
 </div>
 </div>
 </section>

 {/* Services Grid */}
 <section className="py-20 bg-white">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid md:grid-cols-2 gap-8">
 {t.services.items.map((service, index) => {
 const Icon = serviceIcons[index];
 return (
 <div
 key={index}
 className="bg-gray-50 p-8 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
 >
 <div className={`flex items-start gap-6 ${isAr ? 'flex-row-reverse text-right' : 'text-left'}`}>
 <div className="w-16 h-16 bg-[#237357]/10 flex items-center justify-center flex-shrink-0">
 <Icon className="w-8 h-8 text-[#237357]" />
 </div>
 <div className="flex-1">
 <h3 className="text-xl font-semibold text-gray-900 mb-3">
 {service.title}
 </h3>
 <p className="text-gray-600 text-sm leading-relaxed mb-4">
 {service.description}
 </p>
 <ul className={`space-y-2 ${isAr ? 'text-right' : 'text-left'}`}>
 {service.features.map((feature, fIndex) => (
 <li
 key={fIndex}
 className={`flex items-center gap-2 text-sm text-gray-700 ${isAr ? 'flex-row-reverse justify-end' : ''}`}
 >
 <Check className="w-4 h-4 text-[#87C24D] flex-shrink-0" />
 <span>{feature}</span>
 </li>
 ))}
 </ul>
 </div>
 </div>
 </div>
 );
 })}
 </div>
 </div>
 </section>

 {/* Process Section */}
 <section className="py-20 bg-gray-50">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className={`text-center mb-14 ${isAr ? 'text-right' : 'text-left'} max-w-2xl mx-auto`}>
 <h2 className="text-3xl sm:text-4xl font-bold text-[#237357] mb-4">
 {t.services.process.title}
 </h2>
 </div>
 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
 {t.services.process.steps.map((step, index) => {
 const Icon = processIcons[index];
 return (
 <div key={index} className="relative text-center">
 {/* Step Number */}
 <div className="w-20 h-20 bg-[#237357] flex items-center justify-center mx-auto mb-4 relative z-10">
 <Icon className="w-8 h-8 text-white" />
 </div>
 {/* Connector Line */}
 {index < 3 && (
 <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-[#237357]/20" />
 )}
 <div className="w-8 h-8 bg-[#87C24D] text-white text-sm font-bold flex items-center justify-center mx-auto mb-3">
 {index + 1}
 </div>
 <h3 className="text-lg font-semibold text-gray-900 mb-2">
 {step.title}
 </h3>
 <p className="text-gray-600 text-sm leading-relaxed">
 {step.description}
 </p>
 </div>
 );
 })}
 </div>
 </div>
 </section>

 {/* Image Showcase */}
 <section className="py-20 bg-white">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid lg:grid-cols-3 gap-6">
 <div className="lg:col-span-2 overflow-hidden shadow-xl">
 <img
 src="/images/kitchen2.jpg"
 alt="Kitchen Design"
 className="w-full h-[350px] object-cover"
 />
 </div>
 <div className="overflow-hidden shadow-xl">
 <img
 src="/images/wardrobe2.jpg"
 alt="Wardrobe Design"
 className="w-full h-[350px] object-cover"
 />
 </div>
 </div>
 </div>
 </section>
 </div>
 );
}