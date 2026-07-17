import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

export default function Contact() {
 const { language, dir } = useLanguage();
 const t = translations[language];
 const isAr = language === 'ar';
 const [submitted, setSubmitted] = useState(false);
 const [formData, setFormData] = useState({
 name: '',
 email: '',
 phone: '',
 service: '',
 message: '',
 });

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 setSubmitted(true);
 setTimeout(() => setSubmitted(false), 5000);
 setFormData({ name: '', email: '', phone: '', service: '', message: '' });
 };

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
 setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
 };

 const contactInfo = [
 { icon: MapPin, label: t.contact.info.address, value: t.contact.info.addressValue },
 { icon: Phone, label: t.contact.info.phone, value: t.contact.info.phoneValue },
 { icon: Mail, label: t.contact.info.email, value: t.contact.info.emailValue },
 { icon: Clock, label: t.contact.info.hours, value: t.contact.info.hoursValue },
 ];

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
 {isAr ? 'تواصل معنا' : 'Get in Touch'}
 </p>
 <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
 {t.contact.hero.title}
 </h1>
 <p className="text-lg text-white/80 max-w-2xl">
 {t.contact.hero.subtitle}
 </p>
 </div>
 </div>
 </section>

 {/* Contact Content */}
 <section className="py-20 bg-white">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid lg:grid-cols-3 gap-12">
 {/* Contact Form */}
 <div className="lg:col-span-2">
 <div className="bg-gray-50 p-8 border border-gray-100">
 <h2 className={`text-2xl font-bold text-[#237357] mb-6 ${isAr ? 'text-right' : 'text-left'}`}>
 {t.contact.form.title}
 </h2>

 {submitted ? (
 <div className="flex items-center gap-3 p-6 bg-green-50 text-green-700">
 <CheckCircle className="w-6 h-6 flex-shrink-0" />
 <p>{t.contact.form.success}</p>
 </div>
 ) : (
 <form onSubmit={handleSubmit} className="space-y-5">
 <div className="grid sm:grid-cols-2 gap-5">
 <div>
 <label className={`block text-sm font-medium text-gray-700 mb-1.5 ${isAr ? 'text-right' : 'text-left'}`}>
 {t.contact.form.name}
 </label>
 <input
 type="text"
 name="name"
 value={formData.name}
 onChange={handleChange}
 required
 className={`w-full px-4 py-3 border border-gray-200 focus:border-[#237357] focus:ring-2 focus:ring-[#237357]/20 outline-none transition-all ${isAr ? 'text-right' : 'text-left'}`}
 placeholder={t.contact.form.name}
 />
 </div>
 <div>
 <label className={`block text-sm font-medium text-gray-700 mb-1.5 ${isAr ? 'text-right' : 'text-left'}`}>
 {t.contact.form.email}
 </label>
 <input
 type="email"
 name="email"
 value={formData.email}
 onChange={handleChange}
 required
 className={`w-full px-4 py-3 border border-gray-200 focus:border-[#237357] focus:ring-2 focus:ring-[#237357]/20 outline-none transition-all ${isAr ? 'text-right' : 'text-left'}`}
 placeholder={t.contact.form.email}
 />
 </div>
 </div>

 <div className="grid sm:grid-cols-2 gap-5">
 <div>
 <label className={`block text-sm font-medium text-gray-700 mb-1.5 ${isAr ? 'text-right' : 'text-left'}`}>
 {t.contact.form.phone}
 </label>
 <input
 type="tel"
 name="phone"
 value={formData.phone}
 onChange={handleChange}
 className={`w-full px-4 py-3 border border-gray-200 focus:border-[#237357] focus:ring-2 focus:ring-[#237357]/20 outline-none transition-all ${isAr ? 'text-right' : 'text-left'}`}
 placeholder={t.contact.form.phone}
 />
 </div>
 <div>
 <label className={`block text-sm font-medium text-gray-700 mb-1.5 ${isAr ? 'text-right' : 'text-left'}`}>
 {t.contact.form.service}
 </label>
 <select
 name="service"
 value={formData.service}
 onChange={handleChange}
 className={`w-full px-4 py-3 border border-gray-200 focus:border-[#237357] focus:ring-2 focus:ring-[#237357]/20 outline-none transition-all bg-white ${isAr ? 'text-right' : 'text-left'}`}
 >
 <option value="">
 {isAr ? 'اختر خدمة' : 'Select a service'}
 </option>
 <option value="kitchen">
 {isAr ? 'تصميم المطابخ' : 'Kitchen Design'}
 </option>
 <option value="cabinets">
 {isAr ? 'الخزائن المخصصة' : 'Custom Cabinets'}
 </option>
 <option value="workspace">
 {isAr ? 'حلول مساحات العمل' : 'Workspace Solutions'}
 </option>
 <option value="installation">
 {isAr ? 'خدمات التركيب' : 'Installation Services'}
 </option>
 <option value="other">
 {isAr ? 'أخرى' : 'Other'}
 </option>
 </select>
 </div>
 </div>

 <div>
 <label className={`block text-sm font-medium text-gray-700 mb-1.5 ${isAr ? 'text-right' : 'text-left'}`}>
 {t.contact.form.message}
 </label>
 <textarea
 name="message"
 value={formData.message}
 onChange={handleChange}
 required
 rows={5}
 className={`w-full px-4 py-3 border border-gray-200 focus:border-[#237357] focus:ring-2 focus:ring-[#237357]/20 outline-none transition-all resize-none ${isAr ? 'text-right' : 'text-left'}`}
 placeholder={t.contact.form.message}
 />
 </div>

 <button
 type="submit"
 className={`inline-flex items-center gap-2 px-8 py-3.5 bg-[#237357] text-white font-semibold hover:bg-[#1a5a43] transition-all duration-200 ${isAr ? 'flex-row-reverse' : ''}`}
 >
 <Send className="w-4 h-4" />
 <span>{t.contact.form.submit}</span>
 </button>
 </form>
 )}
 </div>
 </div>

 {/* Contact Info Sidebar */}
 <div>
 <div className="bg-[#237357] p-8 text-white">
 <h3 className={`text-xl font-bold mb-6 ${isAr ? 'text-right' : 'text-left'}`}>
 {t.contact.info.title}
 </h3>
 <div className="space-y-6">
 {contactInfo.map((item, index) => (
 <div key={index} className={`flex items-start gap-4 ${isAr ? 'flex-row-reverse text-right' : ''}`}>
 <div className="w-10 h-10 bg-white/10 flex items-center justify-center flex-shrink-0">
 <item.icon className="w-5 h-5 text-[#87C24D]" />
 </div>
 <div>
 <p className="text-white/60 text-sm mb-0.5">{item.label}</p>
 <p className="text-white font-medium">{item.value}</p>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Quick Image */}
 <div className="mt-6 overflow-hidden shadow-lg">
 <img
 src="/images/kitchen3.jpg"
 alt="VastHome"
 className="w-full h-48 object-cover"
 />
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Map Section */}
 <section className="py-10 bg-gray-50">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <h2 className={`text-2xl font-bold text-[#237357] mb-6 ${isAr ? 'text-right' : 'text-left'}`}>
 {t.contact.map.title}
 </h2>
 <div className="overflow-hidden shadow-lg h-[400px] bg-gray-200 relative">
 <iframe
 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.768!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzEuMSJF!5e0!3m2!1sen!2ssa!4v1"
 className="absolute inset-0 w-full h-full border-0"
 allowFullScreen
 loading="lazy"
 referrerPolicy="no-referrer-when-downgrade"
 title="VastHome Location"
 />
 </div>
 </div>
 </section>
 </div>
 );
}