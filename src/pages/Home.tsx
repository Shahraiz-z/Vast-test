import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ShowcaseItem {
  src: string;
  title: string;
  titleAr: string;
  category: string;
  categoryAr: string;
}

const showcaseItems: ShowcaseItem[] = [
  { src: '/images/kitchen1.jpg', title: 'Modern White Kitchen', titleAr: 'مطبخ أبيض عصري', category: 'Kitchen', categoryAr: 'مطبخ' },
  { src: '/images/kitchen2.jpg', title: 'Blue Elegant Kitchen', titleAr: 'مطبخ أنيق أزرق', category: 'Kitchen', categoryAr: 'مطبخ' },
  { src: '/images/kitchen3.jpg', title: 'Contemporary Kitchen', titleAr: 'مطبخ معاصر', category: 'Kitchen', categoryAr: 'مطبخ' },
  { src: '/images/kitchen4.jpg', title: 'Warm Tone Kitchen', titleAr: 'مطبخ بألوان دافئة', category: 'Kitchen', categoryAr: 'مطبخ' },
  { src: '/images/kitchen5.jpg', title: 'Minimalist Kitchen', titleAr: 'مطبخ بسيط', category: 'Kitchen', categoryAr: 'مطبخ' },
  { src: '/images/kitchen6.jpg', title: 'Modern Cabinet Design', titleAr: 'تصميم خزائن عصري', category: 'Kitchen', categoryAr: 'مطبخ' },
  { src: '/images/kitchen7.jpg', title: 'Sleek White Kitchen', titleAr: 'مطبخ أبيض أنيق', category: 'Kitchen', categoryAr: 'مطبخ' },
  { src: '/images/wardrobe1.jpg', title: 'Built-in Wardrobe', titleAr: 'دولاب مدمج', category: 'Wardrobe', categoryAr: 'خزانة' },
  { src: '/images/wardrobe2.jpg', title: 'Glass Door Wardrobe', titleAr: 'دولاب باب زجاجي', category: 'Wardrobe', categoryAr: 'خزانة' },
  { src: '/images/wardrobe3.jpg', title: 'Modern Closet', titleAr: 'خزانة ملابس عصرية', category: 'Wardrobe', categoryAr: 'خزانة' },
];

const productOverview = [
  {
    src: '/images/kitchen1.jpg',
    title: 'Our kitchen variety',
    titleAr: 'تشكيلة مطابخنا',
    subtitle: 'Discover our range',
    subtitleAr: 'اكتشف مجموعتنا',
    link: '/catalog',
  },
  {
    src: '/images/2.jpeg',
    title: 'Wardrobes made for me',
    titleAr: 'خزائن مصممة لي',
    subtitle: 'Personal storage solutions',
    subtitleAr: 'حلول تخزين شخصية',
    link: '/catalog',
  },
  {
    src: '/images/3.jpeg',
    title: 'Space for life',
    titleAr: 'مساحة للحياة',
    subtitle: 'Living room designs',
    subtitleAr: 'تصاميم غرف المعيشة',
    link: '/catalog',
  },
];

const kitchenStyles = [
  {
    src: '/images/kitchen2.jpg',
    title: 'Modern kitchens.',
    titleAr: 'مطابخ عصرية.',
    description: 'Dramatic contrasts or subtle highlights? Our extensive range of colours and fronts invite custom combinations. With our colour-coordinated material concepts, you are sure to find just the right kitchen.',
    descriptionAr: 'تباينات دراماتيكية أو لمسات خفية؟ تشكيلتنا الواسعة من الألوان والواجهات تدعو إلى التوليفات المخصصة. مع مفاهيم المواد المتناسقة ألوانًا، ستجد بالتأكيد المطبخ المناسب.',
    cta: 'TO MODERN KITCHENS',
    ctaAr: 'إلى المطابخ العصرية',
    reverse: false,
  },
  {
    src: '/images/kitchen4.jpg',
    title: 'Designer kitchens.',
    titleAr: 'مطابخ بتصميم فاخر.',
    description: 'Clean lines, exquisite materials and clearly structured architecture – this is what distinguishes our designer kitchens. The smooth, uncomplicated finishes make quite the impression, even in open-concept kitchens – for a straightforward lifestyle with a modern flair.',
    descriptionAr: 'خطوط نظيفة، مواد راقية وهندسة معمارية منظمة بوضوح – هذا ما يميز مطابخنا المصممة. التشطيبات السلسة غير المعقدة تترك انطباعًا قويًا، حتى في المطابخ المفتوحة – لأسلوب حياة بسيط مع لمسة عصرية.',
    cta: 'TO THE DESIGNER KITCHENS',
    ctaAr: 'إلى المطابخ الفاخرة',
    reverse: true,
  },
  {
    src: '/images/kitchen6.jpg',
    title: 'Natural living.',
    titleAr: 'حياة طبيعية.',
    description: 'The modern wood decors with elegant textures and warm nuances of the natural living kitchens create an inviting atmosphere.',
    descriptionAr: 'ديكورات الخشب العصرية بقوامها الأنيق ودرجاتها الدافئة تخلق أجواءً دافئةً ومرحبة في المطابخ الطبيعية.',
    cta: 'TO NATURAL LIVING KITCHENS',
    ctaAr: 'إلى المطابخ الطبيعية',
    reverse: false,
  },
  {
    src: '/images/5.jpeg',
    title: 'Cottage style kitchens.',
    titleAr: 'مطابخ على الطراز الريفي.',
    description: 'The trend toward a new naturalness is popular with young and old alike. Clear shapes, soft lines and natural decors and colours are characteristic of the modern cottage style. An abundance of alluring details lend this kitchen an authentic appearance with a feel-good factor.',
    descriptionAr: 'الاتجاه نحو الطبيعية الجديدة يحظى بشعبية بين الصغار والكبار على حد سواء. الأشكال الواضحة، الخطوط الناعمة والديكورات والألوان الطبيعية هي سمات الطراز الريفي العصري. وفرة التفاصيل الجذابة تمنح هذا المطبخ مظهرًا أصيلًا مع عامل الراحة.',
    cta: 'TO COTTAGE STYLE KITCHENS',
    ctaAr: 'إلى المطابخ الريفية',
    reverse: true,
  },
  {
    src: '/images/7.jpeg',
    title: 'LINE N - the handleless kitchen',
    titleAr: 'LINE N - المطبخ بدون مقابض',
    description: 'Admirers of puristic design are well-served with our LINE N handleless kitchens. Here, the integrated recessed handles take the lead as the horizontal stylistic element that sets the tone for the new kitchen.',
    descriptionAr: 'عشاق التصميم النقي يجدون ضالتهم في مطابخ LINE N بدون مقابض. هنا، المقابض المدمجة تأخذ زمام المبادرة كعنصر أسلوبي أفقي يحدد نغمة المطبخ الجديد.',
    cta: 'TO HANDLELESS KITCHENS',
    ctaAr: 'إلى المطابخ بدون مقابض',
    reverse: false,
  },
];

const bottomCards = [
  {
    src: '/images/kitchen3.jpg',
    title: 'Design elements',
    titleAr: 'عناصر التصميم',
    description: 'What characterises your kitchen, bathroom and living room? Our extensive selection of fronts, handles, carcase colours, worktops and niche panelling allows you to customise your furniture to suit your style perfectly.',
    descriptionAr: 'ما الذي يميز مطبخك أو حمامك أو غرفة معيشتك؟ تشكيلتنا الواسعة من الواجهات والمقابض وألوان الهياكل وأسطح العمل تتيح لك تخصيص أثاثك ليناسب أسلوبك تمامًا.',
    cta: 'Select your style',
    ctaAr: 'اختر أسلوبك',
    link: '/catalog',
  },
  {
    src: '/images/wardrobe2.jpg',
    title: 'Interior fittings',
    titleAr: 'التجهيزات الداخلية',
    description: 'Discover clever storage space solutions that fulfil every space requirement, as well as lighting systems for radiant accents and much more in our interior fittings section.',
    descriptionAr: 'اكتشف حلول التخزين الذكية التي تلبي كل متطلبات المساحة، بالإضافة إلى أنظمة الإضاءة لللمسات المشرقة والمزيد في قسم التجهيزات الداخلية.',
    cta: 'Explore interior fittings',
    ctaAr: 'استكشف التجهيزات الداخلية',
    link: '/catalog',
  },
  {
    src: '/images/wardrobe3.jpg',
    title: 'Electric appliances',
    titleAr: 'الأجهزة الكهربائية',
    description: 'Whether you are looking for high-quality appliances from renowned manufacturers or budget-friendly options - nobilia complements your dream kitchen with suitable built-in appliances for every need and in various price ranges.',
    descriptionAr: 'سواء كنت تبحث عن أجهزة عالية الجودة من مصنعين مشهورين أو خيارات اقتصادية - نكمل مطبخ أحلامك بالأجهزة المدمجة المناسبة لكل حاجة وفي مختلف الفئات السعرية.',
    cta: 'Discover electric appliances',
    ctaAr: 'اكتشف الأجهزة الكهربائية',
    link: '/catalog',
  },
];

const hardwareProducts = [
  {
    category: 'Hinges',
    categoryAr: 'المفصلات',
    items: [
      {
        src: '/images/Hinge 110 silver.jpg',
        title: 'Hinge 110° Silver',
        titleAr: 'مفصلة 110° فضية',
        description: 'Premium soft-close hinge with 110° opening angle. Features Blumotion technology for silent and effortless closing. Perfect for standard cabinet doors.',
        descriptionAr: 'مفصلة فاخرة بإغلاق ناعم وزاوية فتح 110°. تتميز بتقنية Blumotion للإغلاق الصامت والسهل. مثالية لأبواب الخزائن القياسية.',
      },
      {
        src: '/images/Hinge 155 corner.jpg',
        title: 'Hinge 155° Corner',
        titleAr: 'مفصلة 155° زاوية',
        description: 'Wide-angle hinge with 155° opening for corner cabinets and hard-to-reach spaces. Enables full access to cabinet interiors.',
        descriptionAr: 'مفصلة زاوية واسعة بفتح 155° للخزائن الزاوية والمساحات الصعبة الوصول. تتيح الوصول الكامل لداخل الخزانة.',
      },
      {
        src: '/images/Onyx 110 hinge.jpg',
        title: 'Onyx 110° Hinge',
        titleAr: 'مفصلة أونيكس 110°',
        description: 'Sleek Onyx black finish hinge with integrated soft-close mechanism. Modern aesthetic meets German engineering precision.',
        descriptionAr: 'مفصلة بلمسة سوداء أنيقة مع آلية إغلاق ناعم مدمجة. جمالية عصرية تلتقي بدقة الهندسة الألمانية.',
      },
    ],
  },
  {
    category: 'Drawer Systems',
    categoryAr: 'أنظمة الأدراج',
    items: [
      {
        src: '/images/Marivo K.jpg',
        title: 'Marivo K',
        titleAr: 'ماريفو K',
        description: 'Elegant bathroom drawer system with smooth glide technology. Water-resistant design ideal for humid environments. Soft-close with full extension.',
        descriptionAr: 'نظام أدراج أنيق للحمام بتقنية الانزلاق السلس. تصميم مقاوم للماء مثالي للبيئات الرطبة. إغلاق ناعم مع امتداد كامل.',
      },
      {
        src: '/images/Marivo M.jpg',
        title: 'Marivo M',
        titleAr: 'ماريفو M',
        description: 'Versatile kitchen drawer system with high load capacity. Features organized compartment dividers for cutlery and utensils. German craftsmanship.',
        descriptionAr: 'نظام أدراج متعدد الاستخدامات للمطبخ بقدرة تحميل عالية. يتميز بفواصل منظمة للأدوات والمعلقات. حرفية ألمانية.',
      },
      {
        src: '/images/Marivo N.jpg',
        title: 'Marivo N',
        titleAr: 'ماريفو N',
        description: 'Premium drawer system with integrated LED lighting option. Silent operation with exceptional durability. Perfect for modern kitchen designs.',
        descriptionAr: 'نظام أدراج فاخر مع خيار إضاءة LED مدمجة. تشغيل صامت بمتانة استثنائية. مثالي للتصاميم العصرية.',
      },
    ],
  },
  {
    category: 'Tandembox',
    categoryAr: 'تاندامبوكس',
    items: [
      {
        src: '/images/Tandembox plus D.jpg',
        title: 'Tandembox Plus D',
        titleAr: 'تاندامبوكس بلس D',
        description: 'Flagship drawer side system with sleek metal design. High stability with elegant thin sides. Full extension and soft-close as standard.',
        descriptionAr: 'نظام جانبي أدراج رائد بتصميم معدني أنيق. استقرار عالي بجوانب رفيعة أنيقة. امتداد كامل وإغلاق ناعم كمعيار.',
      },
      {
        src: '/images/Tandembox plus D front fixing.jpg',
        title: 'Front Fixing System',
        titleAr: 'نظام تثبيت الواجهة',
        description: 'Innovative front panel fixing mechanism for Tandembox. Tool-free adjustment with precise alignment. Quick and secure installation.',
        descriptionAr: 'آلية تثبيت لوحة أمامية مبتكرة لتاندامبوكس. ضبط دقيق بدون أدوات. تركيب سريع وآمن.',
      },
      {
        src: '/images/Tandembox plus D front setting.jpg',
        title: 'Front Setting',
        titleAr: 'ضبط الواجهة',
        description: 'Three-dimensional front adjustment system. Height, side, and depth alignment for perfect door fitting. Professional-grade precision.',
        descriptionAr: 'نظام ضبط أمامي ثلاثي الأبعاد. محاذاة الارتفاع والجانب والعمق لتناسب الباب المثالي. دقة على مستوى احترافي.',
      },
      {
        src: '/images/Tandembox plus D stablizer.jpg',
        title: 'Stabilizer',
        titleAr: 'المثبت',
        description: 'Rear stabilizer for enhanced drawer stability and load distribution. Prevents tipping even with heavy contents. Essential for tall drawers.',
        descriptionAr: 'مثبت خلفي لاستقرار محسن وتوزيع الحمل للأدراج. يمنع الانقلاب حتى مع المحتويات الثقيلة. ضروري للأدراج الطويلة.',
      },
    ],
  },
];

export default function Home() {
  const { language, dir } = useLanguage();
  const isAr = language === 'ar';

  const [selectedImage, setSelectedImage] = useState<ShowcaseItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [activeHardwareCategory, setActiveHardwareCategory] = useState<string>('Hinges');
  const videoRef = useRef<HTMLVideoElement>(null);

  const openImageSlider = (item: ShowcaseItem) => {
    const index = showcaseItems.findIndex(i => i.src === item.src);
    setCurrentImageIndex(index >= 0 ? index : 0);
    setSelectedImage(item);
  };

  const goToNext = useCallback(() => {
    const nextIndex = (currentImageIndex + 1) % showcaseItems.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(showcaseItems[nextIndex]);
  }, [currentImageIndex]);

  const goToPrev = useCallback(() => {
    const prevIndex = currentImageIndex === 0 ? showcaseItems.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(showcaseItems[prevIndex]);
  }, [currentImageIndex]);

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

  const currentItem = showcaseItems[currentImageIndex];

  return (
    <div className={`${isAr ? 'font-arabic' : ''}`} dir={dir}>
      {/* Hero Section with Video Background */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex items-end pb-20 sm:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className={`max-w-2xl ${isAr ? 'mr-auto text-right' : 'ml-auto text-left'}`}>
              <div className={`flex items-center gap-3 mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                <div className="h-px w-12 bg-[#87C24D]" />
                <p className="text-[#87C24D] text-sm font-medium uppercase tracking-[0.2em]">
                  {isAr ? 'تصميم داخلي فاخر' : 'Premium Interior Design'}
                </p>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {isAr ? 'صمم مطبخ أحلامك' : 'Design Your Dream Kitchen'}
              </h1>
              <p className="text-lg sm:text-xl text-white/70 mb-8 leading-relaxed">
                {isAr
                  ? 'اكتشف عالماً من الإمكانيات مع تشكيلتنا الواسعة من المطابخ والخزائن المصممة خصيصاً لك.'
                  : 'Discover a world of possibilities with our extensive range of kitchens and cabinets designed just for you.'}
              </p>
              <div className={`flex flex-wrap gap-4 ${isAr ? 'justify-end' : 'justify-start'}`}>
                <Link
                  to="/catalog"
                  className={`inline-flex items-center gap-2 px-8 py-4 bg-[#237357] text-white font-medium hover:bg-[#143d2e] transition-colors duration-300 ${isAr ? 'flex-row-reverse' : ''}`}
                >
                  <span>{isAr ? 'استكشف الكتالوج' : 'Explore Catalog'}</span>
                  <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-medium hover:bg-white/10 transition-all duration-300"
                >
                  <span>{isAr ? 'تواصل معنا' : 'Contact Us'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white animate-bounce" />
          </div>
        </div>
      </section>

      {/* Product Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-12 ${isAr ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center gap-3 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className="h-px w-12 bg-[#87C24D]" />
              <p className="text-[#87C24D] text-sm font-medium uppercase tracking-[0.2em]">
                {isAr ? 'التشكيلة' : 'Collection'}
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {isAr ? 'استكشف منتجاتنا' : 'Explore Our Products'}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {productOverview.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="group relative h-[400px] sm:h-[500px] overflow-hidden"
              >
                <img
                  src={item.src}
                  alt={isAr ? item.titleAr : item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className={`absolute bottom-0 left-0 right-0 p-8 ${isAr ? 'text-right' : 'text-left'}`}>
                  <p className="text-white/60 text-xs uppercase tracking-[0.2em] mb-2">{isAr ? item.subtitleAr : item.subtitle}</p>
                  <h3 className="text-white text-2xl font-bold">{isAr ? item.titleAr : item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Kitchen Styles */}
      <section className="py-24 bg-[#fafbfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-16 ${isAr ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center gap-3 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className="h-px w-12 bg-[#87C24D]" />
              <p className="text-[#87C24D] text-sm font-medium uppercase tracking-[0.2em]">
                {isAr ? 'الأنماط' : 'Styles'}
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {isAr ? 'جميع أنماط المطابخ' : 'All Kitchen Styles'}
            </h2>
          </div>

          <div className="space-y-24">
            {kitchenStyles.map((style, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${style.reverse ? (isAr ? '' : 'lg:grid-flow-dense') : ''}`}
              >
                <div className={`relative overflow-hidden group ${style.reverse && !isAr ? 'lg:col-start-2' : ''}`}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={style.src}
                      alt={isAr ? style.titleAr : style.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className={`${style.reverse && !isAr ? 'lg:col-start-1 lg:row-start-1' : ''} ${isAr ? 'text-right' : 'text-left'}`}>
                  <div className={`w-12 h-px bg-[#87C24D] mb-6 ${isAr ? 'mr-auto' : 'ml-auto'}`} />
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">
                    {isAr ? style.titleAr : style.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">
                    {isAr ? style.descriptionAr : style.description}
                  </p>
                  <Link
                    to="/catalog"
                    className={`inline-flex items-center gap-2 text-sm font-medium text-[#237357] hover:text-[#143d2e] transition-colors duration-300 ${isAr ? 'flex-row-reverse' : ''}`}
                  >
                    <span>{isAr ? style.ctaAr : style.cta}</span>
                    <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Gallery */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14 gap-4 ${isAr ? 'sm:text-right' : 'sm:text-left'}`}>
            <div>
              <div className={`flex items-center gap-3 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                <div className="h-px w-12 bg-[#87C24D]" />
                <p className="text-[#87C24D] text-sm font-medium uppercase tracking-[0.2em]">
                  {isAr ? 'المعرض' : 'Gallery'}
                </p>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {isAr ? 'أعمالنا المميزة' : 'Featured Works'}
              </h2>
            </div>
            <Link
              to="/catalog"
              className={`inline-flex items-center gap-2 text-sm font-medium text-[#237357] hover:text-[#143d2e] transition-colors duration-300 ${isAr ? 'flex-row-reverse' : ''}`}
            >
              <span>{isAr ? 'عرض الكل' : 'View All'}</span>
              <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {showcaseItems.map((item, index) => (
              <div
                key={index}
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
        </div>
      </section>

      {/* Bottom Cards */}
      <section className="py-24 bg-[#fafbfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-px bg-gray-200">
            {bottomCards.map((card, index) => (
              <div key={index} className="bg-white group hover:bg-[#fafbfa] transition-colors duration-500">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={card.src}
                    alt={isAr ? card.titleAr : card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className={`p-8 ${isAr ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{isAr ? card.titleAr : card.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{isAr ? card.descriptionAr : card.description}</p>
                  <Link
                    to={card.link}
                    className={`inline-flex items-center gap-2 text-sm font-medium text-[#237357] hover:text-[#143d2e] transition-colors duration-300 ${isAr ? 'flex-row-reverse' : ''}`}
                  >
                    <span>{isAr ? card.ctaAr : card.cta}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware & Accessories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-12 ${isAr ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center gap-3 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className="h-px w-12 bg-[#87C24D]" />
              <p className="text-[#87C24D] text-sm font-medium uppercase tracking-[0.2em]">
                {isAr ? 'جودة ألمانية' : 'German Quality'}
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {isAr ? 'المفصلات والأدراج والتجهيزات' : 'Hinges, Drawers & Fittings'}
            </h2>
            <p className="text-gray-600 max-w-2xl text-[15px] leading-relaxed">
              {isAr
                ? 'اكتشف تشكيلتنا من التجهيزات الداخلية عالية الجودة من Blum وأفضل العلامات التجارية الألمانية.'
                : 'Discover our range of premium interior fittings from Blum and leading German brands.'}
            </p>
          </div>

          <div className={`flex flex-wrap gap-3 mb-10 ${isAr ? 'justify-end' : 'justify-start'}`}>
            {hardwareProducts.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveHardwareCategory(cat.category)}
                className={`px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeHardwareCategory === cat.category
                    ? 'bg-[#237357] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isAr ? cat.categoryAr : cat.category}
              </button>
            ))}
          </div>

          {hardwareProducts.map((cat) => (
            activeHardwareCategory === cat.category && (
              <div key={cat.category} className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
                {cat.items.map((item, idx) => (
                  <div key={idx} className="bg-[#fafbfa] p-8 group hover:bg-white transition-all duration-500">
                    <div className="aspect-[4/3] overflow-hidden bg-white mb-6">
                      <img
                        src={item.src}
                        alt={isAr ? item.titleAr : item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className={`${isAr ? 'text-right' : 'text-left'}`}>
                      <span className="text-[#237357] text-[10px] font-medium uppercase tracking-[0.2em]">
                        {isAr ? cat.categoryAr : cat.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-3">
                        {isAr ? item.titleAr : item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {isAr ? item.descriptionAr : item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0f2e22]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`flex items-center justify-center gap-3 mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
            <div className="h-px w-12 bg-[#87C24D]" />
            <p className="text-[#87C24D] text-sm font-medium uppercase tracking-[0.2em]">
              {isAr ? 'ابدأ الآن' : 'Get Started'}
            </p>
            <div className="h-px w-12 bg-[#87C24D]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
            {isAr ? 'جاهز لتحويل منزلك؟' : 'Ready to Transform Your Home?'}
          </h2>
          <p className="text-white/50 mb-10 text-[15px] max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? 'دعنا نساعدك في إنشاء المطبخ أو الخزانة المثالية لمنزلك. تواصل مع فريقنا اليوم.'
              : 'Let us help you create the perfect kitchen or cabinet for your home. Get in touch with our team today.'}
          </p>
          <Link
            to="/contact"
            className={`inline-flex items-center gap-2 px-10 py-4 bg-[#237357] text-white font-medium hover:bg-[#143d2e] transition-colors duration-300 ${isAr ? 'flex-row-reverse' : ''}`}
          >
            <span>{isAr ? 'ابدأ مشروعك' : 'Start Your Project'}</span>
            <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
          </Link>
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
            <X className="w-6 h-6" />
          </button>

          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-white/10 text-white/80 text-sm font-medium">
            {currentImageIndex + 1} / {showcaseItems.length}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); isAr ? goToNext() : goToPrev(); }}
            className={`absolute top-1/2 -translate-y-1/2 z-50 w-14 h-14 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all ${isAr ? 'right-4' : 'left-4'}`}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); isAr ? goToPrev() : goToNext(); }}
            className={`absolute top-1/2 -translate-y-1/2 z-50 w-14 h-14 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all ${isAr ? 'left-4' : 'right-4'}`}
          >
            <ChevronRight className="w-8 h-8" />
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
            {showcaseItems.map((item, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); setSelectedImage(item); }}
                className={`flex-shrink-0 w-16 h-16 overflow-hidden border-2 transition-all duration-300 ${
                  index === currentImageIndex ? 'border-[#87C24D] opacity-100' : 'border-transparent opacity-40 hover:opacity-70'
                }`}
              >
                <img src={item.src} alt={isAr ? item.titleAr : item.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}