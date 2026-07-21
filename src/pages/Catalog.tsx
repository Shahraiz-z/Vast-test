import { useState, useEffect, useCallback } from 'react';
import { Eye, X, FileText, Download, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

interface CatalogItem {
 id: number;
 src: string;
 title: string;
 titleAr: string;
 category: string;
 categoryAr: string;
}

const catalogItems: CatalogItem[] = [
 { id: 1, src: '/images/kitchen1.jpg', title: 'Modern White Kitchen', titleAr: 'مطبخ أبيض عصري', category: 'kitchens', categoryAr: 'مطابخ' },
 { id: 2, src: '/images/kitchen2.jpg', title: 'Blue Elegant Kitchen', titleAr: 'مطبخ أنيق أزرق', category: 'kitchens', categoryAr: 'مطابخ' },
 { id: 3, src: '/images/kitchen3.jpg', title: 'Contemporary Kitchen', titleAr: 'مطبخ معاصر', category: 'kitchens', categoryAr: 'مطابخ' },
 { id: 4, src: '/images/kitchen4.jpg', title: 'Warm Tone Kitchen', titleAr: 'مطبخ بألوان دافئة', category: 'kitchens', categoryAr: 'مطابخ' },
 { id: 5, src: '/images/kitchen5.jpg', title: 'Minimalist Kitchen', titleAr: 'مطبخ بسيط', category: 'kitchens', categoryAr: 'مطابخ' },
 { id: 6, src: '/images/kitchen6.jpg', title: 'Modern Cabinet Design', titleAr: 'تصميم خزائن عصري', category: 'kitchens', categoryAr: 'مطابخ' },
 { id: 7, src: '/images/kitchen7.jpg', title: 'Sleek White Kitchen', titleAr: 'مطبخ أبيض أنيق', category: 'kitchens', categoryAr: 'مطابخ' },
 { id: 8, src: '/images/wardrobe1.jpg', title: 'Built-in Wardrobe', titleAr: 'دولاب مدمج', category: 'cabinets', categoryAr: 'خزائن' },
 { id: 9, src: '/images/wardrobe2.jpg', title: 'Glass Door Wardrobe', titleAr: 'دولاب باب زجاجي', category: 'cabinets', categoryAr: 'خزائن' },
 { id: 10, src: '/images/wardrobe3.jpg', title: 'Modern Closet', titleAr: 'خزانة ملابس عصرية', category: 'cabinets', categoryAr: 'خزائن' },
];

interface PdfItem {
 id: number;
 name: string;
 nameAr: string;
 description: string;
 descriptionAr: string;
 path: string;
}

const pdfCatalogues: PdfItem[] = [
 {
 id: 1,
 name: 'Cabinet Catalog',
 nameAr: 'كتالوج الخزائن',
 description: 'Complete cabinet designs & specifications',
 descriptionAr: 'تصاميم ومواصفات الخزائن الكاملة',
 path: 'https://drive.google.com/file/d/1WE_S8auHHqL1qCKjWg6erfjbffTaQifl/preview',
 },
 {
 id: 2,
 name: 'Closet Catalog',
 nameAr: 'كتالوج الدواليب',
 description: 'Wardrobe & closet solutions guide',
 descriptionAr: 'دليل حلول الخزائن والدواليب',
 path: 'https://drive.google.com/file/d/1xgKuZ8C38ZH1qwDFasWN94HjNPiGuvrY/preview',
 },
];

export default function Catalog() {
 const { language, dir } = useLanguage();
 const t = translations[language];
 const isAr = language === 'ar';
 const [activeCategory, setActiveCategory] = useState<string>('all');
 const [selectedImage, setSelectedImage] = useState<CatalogItem | null>(null);
 const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
 const [selectedPdf, setSelectedPdf] = useState<PdfItem | null>(null);
 

 const categories = [
 { key: 'all', label: t.catalog.categories.all },
 { key: 'kitchens', label: t.catalog.categories.kitchens },
 { key: 'cabinets', label: t.catalog.categories.cabinets },
 ];

 const filteredItems = activeCategory === 'all'
 ? catalogItems
 : catalogItems.filter(item => item.category === activeCategory);

 

 

 const handleDownload = (pdf: PdfItem) => {
 // For Google Drive: use export/download URL
 // Replace 'preview' with 'uc?export=download' for direct download
 const downloadUrl = pdf.path.replace('/preview', '/uc?export=download');
 const link = document.createElement('a');
 link.href = downloadUrl;
 link.download = pdf.name + '.pdf';
 link.target = '_blank';
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
 };

 const openPdf = (pdf: PdfItem) => {
 setSelectedPdf(pdf);
 };

 const closePdf = () => setSelectedPdf(null);

 const openImageSlider = (item: CatalogItem) => {
 const index = filteredItems.findIndex(i => i.id === item.id);
 setCurrentImageIndex(index >= 0 ? index : 0);
 setSelectedImage(item);
 };

 const goToNext = useCallback(() => {
 if (filteredItems.length === 0) return;
 const nextIndex = (currentImageIndex + 1) % filteredItems.length;
 setCurrentImageIndex(nextIndex);
 setSelectedImage(filteredItems[nextIndex]);
 }, [currentImageIndex, filteredItems]);

 const goToPrev = useCallback(() => {
 if (filteredItems.length === 0) return;
 const prevIndex = currentImageIndex === 0 ? filteredItems.length - 1 : currentImageIndex - 1;
 setCurrentImageIndex(prevIndex);
 setSelectedImage(filteredItems[prevIndex]);
 }, [currentImageIndex, filteredItems]);

 const closeSlider = () => {
 setSelectedImage(null);
 setCurrentImageIndex(0);
 };

 useEffect(() => {
 const handleKeyDown = (e: KeyboardEvent) => {
 if (!selectedImage) return;
 if (e.key === 'ArrowRight') {
 isAr ? goToPrev() : goToNext();
 } else if (e.key === 'ArrowLeft') {
 isAr ? goToNext() : goToPrev();
 } else if (e.key === 'Escape') {
 closeSlider();
 }
 };
 window.addEventListener('keydown', handleKeyDown);
 return () => window.removeEventListener('keydown', handleKeyDown);
 }, [selectedImage, goToNext, goToPrev, isAr]);

 const currentItem = filteredItems[currentImageIndex];

 return (
 <div className={`${isAr ? 'font-arabic' : ''} min-h-screen bg-gray-50`} dir={dir}>
 {/* ===== HERO SECTION - White to Green Gradient ===== */}
 <section className="relative pt-24 pb-12 overflow-hidden">
 {/* White to Green gradient overlay */}
 <div 
 className="absolute inset-0"
 style={{
 background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 30%, #237357 30%, #1a5a43 100%)'
 }}
 />

 <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className={`flex flex-col lg:flex-row gap-8 lg:gap-12 ${isAr ? 'lg:flex-row-reverse' : ''}`}>

 {/* Left: PDF Sidebar - Always Visible */}
 <div className="w-full lg:w-80 flex-shrink-0">
 <div className="bg-white shadow-lg p-6 border border-gray-100">
 <div className={`flex items-center justify-between mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
 <div>
 <h2 className="text-xl font-bold text-gray-900">
 {isAr ? 'كتالوجاتنا' : 'Our Catalogs'}
 </h2>
 <p className="text-sm text-gray-500 mt-1">
 {isAr ? 'حمّل كتالوجاتنا الكاملة' : 'Download our complete catalogs'}
 </p>
 </div>
 <div className="w-10 h-10 bg-[#237357]/10 flex items-center justify-center">
 <FileText className="w-5 h-5 text-[#237357]"/>
 </div>
 </div>

 <div className="space-y-4">
 {pdfCatalogues.map((pdf) => (
 <div
 key={pdf.id}
 className="group relative flex flex-col gap-3 p-4 bg-gray-50 border border-gray-100 hover:border-[#237357]/30 hover:shadow-md transition-all duration-300"
 >
 {/* PDF Icon */}
 <div className="w-12 h-12 bg-[#237357]/10 flex items-center justify-center group-hover:bg-[#237357] transition-colors duration-300">
 <FileText className="w-6 h-6 text-[#237357] group-hover:text-white transition-colors"strokeWidth={1.5} />
 </div>

 <div className={isAr ? 'text-right' : 'text-left'}>
 <h3 className="font-semibold text-gray-900 text-sm">
 {isAr ? pdf.nameAr : pdf.name}
 </h3>
 <p className="text-xs text-gray-500 mt-0.5">
 {isAr ? pdf.descriptionAr : pdf.description}
 </p>
 </div>

 <div className={`flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
 <button
 onClick={() => openPdf(pdf)}
 className="flex-1 h-9 flex items-center justify-center gap-1.5 bg-[#237357] text-white text-xs font-medium hover:bg-[#1a5a43] transition-colors"
 >
 <Eye className="w-3.5 h-3.5"/>
 {isAr ? 'عرض' : 'View'}
 </button>
 <button
 onClick={() => handleDownload(pdf)}
 className="flex-1 h-9 flex items-center justify-center gap-1.5 border border-gray-300 text-gray-700 text-xs font-medium hover:bg-gray-100 transition-colors"
 >
 <Download className="w-3.5 h-3.5"/>
 {isAr ? 'تحميل' : 'Download'}
 </button>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Right: Hero Content */}
 <div className="flex-1 flex flex-col justify-center">
 <div className={`${isAr ? 'text-right' : 'text-left'}`}>
 <p className="text-[#87C24D] text-sm font-semibold uppercase tracking-wider mb-3">
 {isAr ? 'محفظة أعمالنا' : 'Our Portfolio'}
 </p>
 <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
 {t.catalog.hero.title}
 </h1>
 <p className="text-lg text-white/80 max-w-xl leading-relaxed">
 {t.catalog.hero.subtitle}
 </p>

 {/* Stats */}
 <div className={`flex gap-8 mt-8 ${isAr ? 'flex-row-reverse justify-end' : ''}`}>
 <div>
 <p className="text-3xl font-bold text-white">500+</p>
 <p className="text-sm text-white/70">{isAr ? 'مشروع منجز' : 'Projects Completed'}</p>
 </div>
 <div>
 <p className="text-3xl font-bold text-white">10+</p>
 <p className="text-sm text-white/70">{isAr ? 'سنوات خبرة' : 'Years Experience'}</p>
 </div>
 <div>
 <p className="text-3xl font-bold text-white">100%</p>
 <p className="text-sm text-white/70">{isAr ? 'رضا العملاء' : 'Client Satisfaction'}</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* ===== GALLERY SECTION ===== */}
 <section className="py-16 bg-white">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 {/* Section Header */}
 <div className={`mb-10 ${isAr ? 'text-right' : 'text-left'}`}>
 <h2 className="text-3xl font-bold text-gray-900">
 {isAr ? 'معرض أعمالنا' : 'Our Gallery'}
 </h2>
 <p className="text-gray-500 mt-2">
 {isAr ? 'تصفح مجموعة مختارة من تصاميمنا' : 'Browse a curated selection of our designs'}
 </p>
 </div>

 {/* Category Filters */}
 <div className={`flex flex-wrap gap-3 mb-10 ${isAr ? 'justify-end' : 'justify-start'}`}>
 {categories.map((cat) => (
 <button
 key={cat.key}
 onClick={() => setActiveCategory(cat.key)}
 className={`px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
 activeCategory === cat.key
 ? 'bg-[#237357] text-white shadow-md'
 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
 }`}
 >
 {cat.label}
 </button>
 ))}
 </div>

 {/* Gallery Grid */}
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
 {filteredItems.map((item) => (
 <div
 key={item.id}
 className="group relative aspect-[3/4] bg-gray-100 overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
 onClick={() => openImageSlider(item)}
 >
 <img
 src={item.src}
 alt={isAr ? item.titleAr : item.title}
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
 />

 {/* Overlay on hover */}
 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>

 {/* Info */}
 <div className={`absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ${isAr ? 'text-right' : 'text-left'}`}>
 <span className="text-[#87C24D] text-xs font-medium uppercase tracking-wide">
 {isAr ? item.categoryAr : item.category}
 </span>
 <h3 className="text-white font-semibold text-sm mt-1">
 {isAr ? item.titleAr : item.title}
 </h3>
 </div>

 {/* View Icon */}
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
 <Eye className="w-5 h-5 text-white"/>
 </div>
 </div>
 ))}
 </div>

 {filteredItems.length === 0 && (
 <div className="text-center py-20">
 <p className="text-gray-500 text-lg">
 {isAr ? 'لا توجد مشاريع في هذا القسم' : 'No projects found in this category.'}
 </p>
 </div>
 )}
 </div>
 </section>

 {/* ===== IMAGE SLIDER MODAL ===== */}
 {selectedImage && currentItem && (
 <div
 className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
 onClick={closeSlider}
 >
 <button
 onClick={closeSlider}
 className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all"
 >
 <X className="w-6 h-6"/>
 </button>

 <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-white/10 text-white/80 text-sm font-medium">
 {currentImageIndex + 1} / {filteredItems.length}
 </div>

 <button
 onClick={(e) => { e.stopPropagation(); isAr ? goToNext() : goToPrev(); }}
 className={`absolute top-1/2 -translate-y-1/2 z-50 w-14 h-14 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all ${isAr ? 'right-4' : 'left-4'}`}
 >
 <ChevronLeft className="w-8 h-8"/>
 </button>

 <button
 onClick={(e) => { e.stopPropagation(); isAr ? goToPrev() : goToNext(); }}
 className={`absolute top-1/2 -translate-y-1/2 z-50 w-14 h-14 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all ${isAr ? 'left-4' : 'right-4'}`}
 >
 <ChevronRight className="w-8 h-8"/>
 </button>

 <div className="relative max-w-5xl w-full mx-8 flex flex-col items-center"onClick={(e) => e.stopPropagation()}>
 <img
 src={currentItem.src}
 alt={isAr ? currentItem.titleAr : currentItem.title}
 className="max-h-[75vh] w-auto object-contain"
 />
 <div className={`mt-6 text-center ${isAr ? 'text-right' : 'text-left'}`}>
 <span className="text-[#87C24D] text-sm font-medium uppercase">{isAr ? currentItem.categoryAr : currentItem.category}</span>
 <h3 className="text-white text-xl font-semibold mt-1">{isAr ? currentItem.titleAr : currentItem.title}</h3>
 </div>
 </div>

 <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 px-4 py-3 bg-white/5 backdrop-blur-sm max-w-[90vw] overflow-x-auto">
 {filteredItems.map((item, index) => (
 <button
 key={item.id}
 onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); setSelectedImage(item); }}
 className={`flex-shrink-0 w-16 h-16 overflow-hidden border-2 transition-all ${
 index === currentImageIndex ? 'border-[#87C24D] opacity-100 scale-110' : 'border-transparent opacity-50 hover:opacity-80'
 }`}
 >
 <img src={item.src} alt={isAr ? item.titleAr : item.title} className="w-full h-full object-cover"/>
 </button>
 ))}
 </div>
 </div>
 )}

 
 

 {/* ===== PDF VIEWER MODAL ===== */}
 {selectedPdf && (
 <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4" onClick={closePdf}>
 <div className="relative w-full max-w-5xl h-[90vh] bg-gray-900 overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
 <div className={`flex items-center justify-between px-5 py-3 bg-gray-800 border-b border-gray-700 ${isAr ? 'flex-row-reverse' : ''}`}>
 <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
 <FileText className="w-5 h-5 text-red-500"/>
 <span className="text-white font-medium text-sm truncate max-w-md">{isAr ? selectedPdf.nameAr : selectedPdf.name}</span>
 </div>
 <div className={`flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
 <button onClick={() => handleDownload(selectedPdf)} className="px-3 py-1.5 bg-[#237357] hover:bg-[#1a5a43] text-white text-xs font-medium transition-colors flex items-center gap-1.5">
 <Download className="w-3.5 h-3.5"/>
 {isAr ? 'تحميل' : 'Download'}
 </button>
 <button onClick={closePdf} className="p-2 hover:bg-gray-700 transition-colors text-gray-400 hover:text-white">
 <X className="w-4 h-4"/>
 </button>
 </div>
 </div>
 <div className="flex-1 bg-gray-800">
 <iframe
 src={selectedPdf.path}
 className="w-full h-full"
 title={selectedPdf.name}
 allow="fullscreen"
 />
 </div>
 </div>
 </div>
 )}
 </div>
 );
}