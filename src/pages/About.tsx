import { Award, Heart, Lightbulb, Shield } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

export default function About() {
 const { language, dir } = useLanguage();
 const t = translations[language];
 const isAr = language === 'ar';

 const values = [
 { icon: Lightbulb, ...t.about.values.items[0] },
 { icon: Shield, ...t.about.values.items[1] },
 { icon: Heart, ...t.about.values.items[2] },
 { icon: Award, ...t.about.values.items[3] },
 ];

 const stats = t.about.stats.items;

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
 {isAr ? 'من نحن' : 'About Us'}
 </p>
 <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
 {t.about.hero.title}
 </h1>
 <p className="text-lg text-white/80 max-w-2xl">
 {t.about.hero.subtitle}
 </p>
 </div>
 </div>
 </section>

 {/* Story Section */}
 <section className="py-20 bg-white">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className={`grid lg:grid-cols-2 gap-12 items-center`}>
 <div className={isAr ? 'order-2 text-right' : 'order-1 text-left'}>
 <h2 className="text-3xl sm:text-4xl font-bold text-[#237357] mb-6">
 {t.about.story.title}
 </h2>
 <div className="space-y-4">
 {t.about.story.paragraphs.map((paragraph, index) => (
 <p key={index} className="text-gray-600 leading-relaxed">
 {paragraph}
 </p>
 ))}
 </div>
 </div>
 <div className={isAr ? 'order-1' : 'order-2'}>
 <div className="relative">
 <img
 src="/images/kitchen4.jpg"
 alt="VastHome"
 className="shadow-xl w-full h-[400px] object-cover"
 />
 <div className="absolute -bottom-6 -left-6 bg-[#87C24D] p-6 shadow-lg hidden sm:block">
 <p className="text-3xl font-bold text-white">10+</p>
 <p className="text-white/80 text-sm">{isAr ? 'سنوات الخبرة' : 'Years Experience'}</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Values Section */}
 <section className="py-20 bg-gray-50">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className={`text-center mb-14 ${isAr ? 'text-right' : 'text-left'} max-w-2xl mx-auto`}>
 <h2 className="text-3xl sm:text-4xl font-bold text-[#237357] mb-4">
 {t.about.values.title}
 </h2>
 </div>
 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
 {values.map((value, index) => (
 <div
 key={index}
 className="bg-white p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 text-center"
 >
 <div className="w-16 h-16 bg-[#237357]/10 flex items-center justify-center mb-4 mx-auto">
 <value.icon className="w-8 h-8 text-[#237357]" />
 </div>
 <h3 className="text-lg font-semibold text-gray-900 mb-2">
 {value.title}
 </h3>
 <p className="text-gray-600 text-sm leading-relaxed">
 {value.description}
 </p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Stats Section */}
 <section className="py-20 bg-gradient-to-r from-[#237357] to-[#2d8a6a]">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className={`text-center mb-14 ${isAr ? 'text-right' : 'text-left'} max-w-2xl mx-auto`}>
 <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
 {t.about.stats.title}
 </h2>
 </div>
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
 {stats.map((stat, index) => (
 <div
 key={index}
 className="bg-white/10 backdrop-blur-sm p-6 text-center border border-white/20"
 >
 <p className="text-4xl font-bold text-[#87C24D] mb-2">{stat.number}</p>
 <p className="text-white/80 text-sm">{stat.label}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Team Image Section */}
 <section className="py-20 bg-white">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid lg:grid-cols-2 gap-8">
 <div className="overflow-hidden shadow-xl">
 <img
 src="/images/kitchen5.jpg"
 alt="VastHome Work"
 className="w-full h-[300px] object-cover"
 />
 </div>
 <div className="overflow-hidden shadow-xl">
 <img
 src="/images/kitchen6.jpg"
 alt="VastHome Work"
 className="w-full h-[300px] object-cover"
 />
 </div>
 </div>
 </div>
 </section>
 </div>
 );
}