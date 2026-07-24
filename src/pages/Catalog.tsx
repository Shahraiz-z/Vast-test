import { useState, useEffect, useCallback } from 'react';
import { X, Download, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

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
  const isAr = language === 'ar';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<CatalogItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [selectedPdf, setSelectedPdf] = useState<PdfItem | null>(null);

  const categories = [
    { key: 'all', label: isAr ? 'الكل' : 'All' },
    { key: 'kitchens', label: isAr ? 'المطابخ' : 'Kitchens' },
    { key: 'cabinets', label: isAr ? 'الخزائن' : 'Cabinets' },
  ];

  const filteredItems = activeCategory === 'all'
    ? catalogItems
    : catalogItems.filter(item => item.category === activeCategory);

  const handleDownload = (pdf: PdfItem) => {
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
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 35%, #1a4d3a 35%, #143d2e 100%)'
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col lg:flex-row gap-12 lg:gap-16 ${isAr ? 'lg:flex-row-reverse' : ''}`}>
            {/* Left: PDF Sidebar */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-white p-8 border border-gray-100 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]">
                <div className={`mb-8 ${isAr ? 'text-right' : 'text-left'}`}>
                  <div className={`flex items-center gap-3 mb-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className="h-px w-8 bg-[#87C24D]" />
                    <p className="text-[#87C24D] text-xs font-medium uppercase tracking-[0.2em]">
                      {isAr ? 'الموارد' : 'Resources'}
                    </p>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {isAr ? 'كتالوجاتنا' : 'Our Catalogs'}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {isAr ? 'حمّل كتالوجاتنا الكاملة' : 'Download our complete catalogs'}
                  </p>
                </div>

                <div className="space-y-4">
                  {pdfCatalogues.map((pdf) => (
                    <div
                      key={pdf.id}
                      className="group p-5 bg-[#fafbfa] border border-gray-100 hover:border-[#237357]/20 hover:bg-white transition-all duration-500"
                    >
                      <div className={`${isAr ? 'text-right' : 'text-left'}`}>
                        <span className="text-[10px] font-medium uppercase tracking-wider text-[#237357]/60">
                          PDF
                        </span>
                        <h3 className="font-semibold text-gray-900 text-sm mt-1">
                          {isAr ? pdf.nameAr : pdf.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                          {isAr ? pdf.descriptionAr : pdf.description}
                        </p>
                      </div>

                      <div className={`flex items-center gap-2 mt-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                        <button
                          onClick={() => openPdf(pdf)}
                          className="flex-1 h-9 flex items-center justify-center gap-1.5 bg-[#237357] text-white text-xs font-medium hover:bg-[#143d2e] transition-colors duration-300"
                        >
                          {isAr ? 'عرض' : 'View'}
                        </button>
                        <button
                          onClick={() => handleDownload(pdf)}
                          className="flex-1 h-9 flex items-center justify-center gap-1.5 border border-gray-300 text-gray-700 text-xs font-medium hover:border-[#237357] hover:text-[#237357] transition-all duration-300"
                        >
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
                <div className={`flex items-center gap-3 mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <div className="h-px w-12 bg-[#87C24D]" />
                  <p className="text-[#87C24D] text-sm font-medium uppercase tracking-[0.2em]">
                    {isAr ? 'محفظة أعمالنا' : 'Our Portfolio'}
                  </p>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {isAr ? 'تصاميم تروي قصصاً' : 'Designs That Tell Stories'}
                </h1>
                <p className="text-lg text-white/70 max-w-xl leading-relaxed">
                  {isAr
                    ? 'تصفح مجموعتنا من المطابخ والخزائن المصممة بعناية فائقة لتناسب أذواقكم المختلفة.'
                    : 'Browse our collection of kitchens and cabinets designed with meticulous care to suit your diverse tastes.'}
                </p>

                <div className={`flex gap-10 mt-10 ${isAr ? 'flex-row-reverse justify-end' : ''}`}>
                  <div>
                    <p className="text-3xl font-bold text-white">500+</p>
                    <p className="text-sm text-white/50 mt-1">{isAr ? 'مشروع منجز' : 'Projects Completed'}</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">10+</p>
                    <p className="text-sm text-white/50 mt-1">{isAr ? 'سنوات خبرة' : 'Years Experience'}</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">98%</p>
                    <p className="text-sm text-white/50 mt-1">{isAr ? 'رضا العملاء' : 'Client Satisfaction'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-12 ${isAr ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center gap-3 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className="h-px w-12 bg-[#87C24D]" />
              <p className="text-[#87C24D] text-sm font-medium uppercase tracking-[0.2em]">
                {isAr ? 'المعرض' : 'Gallery'}
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {isAr ? 'أعمالنا المختارة' : 'Selected Works'}
            </h2>
          </div>

          {/* Category Filters */}
          <div className={`flex flex-wrap gap-3 mb-12 ${isAr ? 'justify-end' : 'justify-start'}`}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.key
                    ? 'bg-[#237357] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-[3/4] bg-gray-100 overflow-hidden cursor-pointer"
                onClick={() => openImageSlider(item)}
              >
                <img
                  src={item.src}
                  alt={isAr ? item.titleAr : item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className={`absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ${isAr ? 'text-right' : 'text-left'}`}>
                  <span className="text-[#87C24D] text-[10px] font-medium uppercase tracking-[0.2em]">
                    {isAr ? item.categoryAr : item.category}
                  </span>
                  <h3 className="text-white font-medium text-sm mt-1">
                    {isAr ? item.titleAr : item.title}
                  </h3>
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

      {/* Image Slider Modal */}
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

          <div className="relative max-w-5xl w-full mx-8 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={currentItem.src}
              alt={isAr ? currentItem.titleAr : currentItem.title}
              className="max-h-[75vh] w-auto object-contain"
            />
            <div className={`mt-6 text-center ${isAr ? 'text-right' : 'text-left'}`}>
              <span className="text-[#87C24D] text-sm font-medium uppercase tracking-[0.2em]">{isAr ? currentItem.categoryAr : currentItem.category}</span>
              <h3 className="text-white text-xl font-semibold mt-1">{isAr ? currentItem.titleAr : currentItem.title}</h3>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 px-4 py-3 bg-white/5 max-w-[90vw] overflow-x-auto">
            {filteredItems.map((item, index) => (
              <button
                key={item.id}
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); setSelectedImage(item); }}
                className={`flex-shrink-0 w-16 h-16 overflow-hidden border-2 transition-all duration-300 ${
                  index === currentImageIndex ? 'border-[#87C24D] opacity-100' : 'border-transparent opacity-40 hover:opacity-70'
                }`}
              >
                <img src={item.src} alt={isAr ? item.titleAr : item.title} className="w-full h-full object-cover"/>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4" onClick={closePdf}>
          <div className="relative w-full max-w-5xl h-[90vh] bg-gray-900 overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className={`flex items-center justify-between px-6 py-4 bg-[#0f2e22] border-b border-white/10 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                <span className="text-white font-medium text-sm truncate max-w-md">{isAr ? selectedPdf.nameAr : selectedPdf.name}</span>
              </div>
              <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                <button onClick={() => handleDownload(selectedPdf)} className="px-4 py-2 bg-[#237357] hover:bg-[#143d2e] text-white text-xs font-medium transition-colors duration-300 flex items-center gap-2">
                  <Download className="w-3.5 h-3.5"/>
                  {isAr ? 'تحميل' : 'Download'}
                </button>
                <button onClick={closePdf} className="p-2 hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
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