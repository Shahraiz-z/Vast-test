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
    name: 'Cabinet Catalogue',
    nameAr: 'كتالوج الخزائن',
    description: 'Complete cabinet designs & specifications',
    descriptionAr: 'تصاميم ومواصفات الخزائن الكاملة',
    path: '/pdf/Cabinet Catalogue New.pdf',
  },
  {
    id: 2,
    name: 'Closet Catalogue',
    nameAr: 'كتالوج الدواليب',
    description: 'Wardrobe & closet solutions guide',
    descriptionAr: 'دليل حلول الخزائن والدواليب',
    path: '/pdf/Closet Catalogue New.pdf',
  },
];

export default function Catalog() {
  const { language, dir } = useLanguage();
  const t = translations[language];
  const isAr = language === 'ar';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<CatalogItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<PdfItem | null>(null);

  const categories = [
    { key: 'all', label: t.catalog.categories.all },
    { key: 'kitchens', label: t.catalog.categories.kitchens },
    { key: 'cabinets', label: t.catalog.categories.cabinets },
  ];

  const filteredItems = activeCategory === 'all'
    ? catalogItems
    : catalogItems.filter(item => item.category === activeCategory);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const openPdf = (pdf: PdfItem) => {
    setSelectedPdf(pdf);
    closeSidebar();
  };

  const closePdf = () => setSelectedPdf(null);

  const handleDownload = (pdf: PdfItem) => {
    const link = document.createElement('a');
    link.href = pdf.path;
    link.download = pdf.path.split('/').pop() || pdf.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  // Keyboard navigation
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
    <div className={`${isAr ? 'font-arabic' : ''}`} dir={dir}>
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 bg-gradient-to-br from-[#237357] to-[#1a5a43]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#87C24D] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-start justify-between ${isAr ? 'flex-row-reverse' : ''}`}>
            <div className={`${isAr ? 'text-right' : 'text-left'}`}>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {t.catalog.hero.title}
              </h1>
              <p className="text-lg text-white/80 max-w-2xl">
                {t.catalog.hero.subtitle}
              </p>
            </div>
            {/* Sidebar Trigger Button */}
            <button
              onClick={openSidebar}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white transition-all duration-200 group mt-2"
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">
                {isAr ? 'الكتالوجات' : 'Catalogues'}
              </span>
              {isAr ? (
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              ) : (
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className={`flex flex-wrap gap-3 mb-10 ${isAr ? 'justify-end' : 'justify-start'}`}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.key
                    ? 'bg-[#237357] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative w-full max-w-[190px] h-[254px] bg-[#f5f5f5] text-[#252525] rounded overflow-hidden leading-[150%] shadow-[0px_10px_20px_rgba(80,80,80,0.2)] hover:shadow-[0px_15px_30px_rgba(80,80,80,0.3)] transition-shadow duration-300 cursor-pointer"
                onClick={() => openImageSlider(item)}
              >
                {/* Image */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#237357] to-[#87C24D] transition-transform duration-300 ease-in-out z-[2] group-hover:-translate-y-20"
                >
                  <img
                    src={item.src}
                    alt={isAr ? item.titleAr : item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* View Button */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center px-4 transform translate-y-[-6em] z-[3]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openImageSlider(item);
                    }}
                    className="bg-[#f5f5f5] p-2.5 rounded-full cursor-pointer opacity-0 translate-y-0 group-hover:opacity-100 group-hover:translate-y-[-5%] transition-all duration-300 delay-100 shadow-md hover:bg-[#237357] hover:text-white group/icon"
                  >
                    <Eye className="w-6 h-6 text-[#252525] group-hover/icon:text-white transition-colors" />
                  </button>
                </div>

                {/* Card Info */}
                <div className="absolute bottom-4 w-full text-center px-2">
                  <p className="text-lg font-bold truncate">
                    {isAr ? item.titleAr : item.title}
                  </p>
                  <p className="text-sm tracking-wide text-[#237357] font-medium uppercase">
                    {isAr ? item.categoryAr : item.category}
                  </p>
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
          {/* Close Button */}
          <button
            onClick={closeSlider}
            className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-medium">
            {currentImageIndex + 1} / {filteredItems.length}
          </div>

          {/* Previous Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              isAr ? goToNext() : goToPrev();
            }}
            className={`absolute top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 ${isAr ? 'right-4 sm:right-8' : 'left-4 sm:left-8'}`}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              isAr ? goToPrev() : goToNext();
            }}
            className={`absolute top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 ${isAr ? 'left-4 sm:left-8' : 'right-4 sm:right-8'}`}
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Main Image Container */}
          <div
            className="relative max-w-5xl w-full mx-4 sm:mx-8 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full flex items-center justify-center">
              <img
                src={currentItem.src}
                alt={isAr ? currentItem.titleAr : currentItem.title}
                className="max-h-[75vh] w-auto object-contain rounded-lg"
              />
            </div>

            {/* Image Info */}
            <div className={`mt-6 text-center ${isAr ? 'text-right' : 'text-left'}`}>
              <span className="text-[#87C24D] text-sm font-medium uppercase tracking-wide">
                {isAr ? currentItem.categoryAr : currentItem.category}
              </span>
              <h3 className="text-white text-xl font-semibold mt-1">
                {isAr ? currentItem.titleAr : currentItem.title}
              </h3>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-sm max-w-[90vw] overflow-x-auto">
            {filteredItems.map((item, index) => (
              <button
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                  setSelectedImage(item);
                }}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === currentImageIndex
                    ? 'border-[#87C24D] opacity-100 scale-110'
                    : 'border-transparent opacity-50 hover:opacity-80'
                }`}
              >
                <img
                  src={item.src}
                  alt={isAr ? item.titleAr : item.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Slide-in Sidebar */}
      <aside
        className={`fixed top-0 ${isAr ? 'left-0' : 'right-0'} h-full w-80 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isSidebarOpen
            ? 'translate-x-0'
            : isAr
            ? '-translate-x-full'
            : 'translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className={`flex items-center justify-between p-5 border-b border-gray-100 ${isAr ? 'flex-row-reverse' : ''}`}>
          <h2 className="text-lg font-bold text-gray-800">
            {isAr ? 'الكتالوجات' : 'Catalogues'}
          </h2>
          <button
            onClick={closeSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 p-5 space-y-4 overflow-y-auto bg-gray-50">
          <p className="text-sm text-gray-500 mb-4">
            {isAr ? 'حمّل كتالوجاتنا الكاملة' : 'Download our complete catalogues'}
          </p>

          {pdfCatalogues.map((pdf) => (
            <div
              key={pdf.id}
              className="group relative flex flex-col gap-3 p-4 bg-[#27272a] rounded-2xl"
            >
              {/* PDF Icon Container */}
              <div className="relative overflow-hidden cursor-pointer z-[5] w-full h-32 bg-[#1a5a43] rounded-lg flex items-center justify-center group-hover:bg-[#237357] transition-colors duration-300">
                <FileText className="w-12 h-12 text-[#d9d9d9]" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <div className="overflow-hidden w-full">
                <h3 className="text-base font-semibold text-[#d9d9d9] truncate">
                  {isAr ? pdf.nameAr : pdf.name}
                </h3>
                <p className="text-xs text-[#d9d9d9]/60 mt-0.5 truncate">
                  {isAr ? pdf.descriptionAr : pdf.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* View Button */}
                <button
                  onClick={() => openPdf(pdf)}
                  className="relative flex-1 h-10 cursor-pointer flex items-center justify-center border border-[#1a5a43] bg-[#237357] overflow-hidden rounded-lg group/btn hover:bg-[#1a5a43] transition-all duration-300"
                >
                  <span className="text-xs font-semibold text-white group-hover/btn:text-transparent transition-all duration-300">
                    {isAr ? 'عرض' : 'View'}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 bg-[#146c54]">
                    <Eye className="w-4 h-4 text-white" />
                  </span>
                </button>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(pdf)}
                  className="relative flex-1 h-10 cursor-pointer flex items-center border border-[#171979] bg-[#382099] overflow-hidden rounded-lg group/dl hover:bg-[#172779] transition-all duration-300"
                >
                  <span className="absolute left-0 right-0 text-center text-xs font-semibold text-white group-hover/dl:text-transparent transition-all duration-300">
                    {isAr ? 'تحميل' : 'Download'}
                  </span>
                  <span className="absolute right-0 h-full w-10 bg-[#171979] flex items-center justify-center group-hover/dl:w-full transition-all duration-300">
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z" />
                      <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z" />
                      <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-5 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-400 text-center">
            {isAr ? 'كتالوج قاست هوم' : 'Catalogue VastHome'}
          </p>
        </div>
      </aside>

      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          onClick={closePdf}
        >
          <div
            className="relative w-full max-w-5xl h-[90vh] bg-gray-900 rounded-xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`flex items-center justify-between px-5 py-3 bg-gray-800 border-b border-gray-700 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                <FileText className="w-5 h-5 text-red-500" />
                <span className="text-white font-medium text-sm truncate max-w-md">
                  {isAr ? selectedPdf.nameAr : selectedPdf.name}
                </span>
              </div>
              <div className={`flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                <button
                  onClick={() => handleDownload(selectedPdf)}
                  className="px-3 py-1.5 bg-[#237357] hover:bg-[#1a5a43] text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  {isAr ? 'تحميل' : 'Download'}
                </button>
                <button
                  onClick={closePdf}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            {/* PDF Iframe */}
            <div className="flex-1 bg-gray-800">
              <iframe
                src={selectedPdf.path}
                className="w-full h-full"
                title={selectedPdf.name}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}