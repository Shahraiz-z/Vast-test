import { useLanguage } from '@/context/LanguageContext';

export default function About() {
  const { language, dir } = useLanguage();
  const isAr = language === 'ar';

  const storyParagraphs = isAr
    ? [
        'تأسست شركة VastHome على قناعة راسخة بأن كل مساحة تستحق أن تكون انعكاساً حقيقياً لشخصية من يعيش فيها. منذ أكثر من عشر سنوات، نعمل على تحويل المساحات العادية إلى تجارب معيشية استثنائية.',
        'نحن لا نصنع مجرد أثاث — نصنع بيئات. بيئات تُحسَس وتُعاش. من المطابخ التي تجمع العائلة، إلى خزائن الملابس التي تعكس الذوق الشخصي، كل قطعة ننتجها تحمل بصمتنا في الدقة والإتقان.',
        'فريقنا يجمع بين الخبرة الهندسية العميقة والحساسية التصميمية الدقيقة. نؤمن بأن الجمال الحقيقي يكمن في التفاصيل، وأن الجودة ليست خياراً بل معياراً لا نحيد عنه.',
      ]
    : [
        'VastHome was founded on the firm belief that every space deserves to be a true reflection of those who inhabit it. For over a decade, we have been transforming ordinary spaces into extraordinary living experiences.',
        'We do not merely manufacture furniture — we craft environments. Environments that are felt and lived. From kitchens that bring families together, to wardrobes that reflect personal taste, every piece we produce carries our signature of precision and mastery.',
        'Our team combines deep engineering expertise with refined design sensibility. We believe true beauty lies in the details, and that quality is not a choice but a standard we never compromise.',
      ];

  const values = [
    {
      title: isAr ? 'الابتكار' : 'Innovation',
      description: isAr
        ? 'نستكشف باستمرار حدود التصميم والتقنية لتقديم حلول تتجاوز التوقعات.'
        : 'We continuously explore the boundaries of design and technology to deliver solutions that exceed expectations.',
    },
    {
      title: isAr ? 'النزاهة' : 'Integrity',
      description: isAr
        ? 'الشفافية والأمانة في كل تفاعل، من أول لقاء إلى التسليم النهائي.'
        : 'Transparency and honesty in every interaction, from the first meeting to final handover.',
    },
    {
      title: isAr ? 'الشغف' : 'Passion',
      description: isAr
        ? 'نحب ما نفعله، ويظهر ذلك في كل تفصيل من تفاصيل عملنا.'
        : 'We love what we do, and it shows in every detail of our work.',
    },
    {
      title: isAr ? 'التميز' : 'Excellence',
      description: isAr
        ? 'نرفض المقاييس المتوسطة. كل مشروع هو فرصة لتحقيق شيء استثنائي.'
        : 'We reject mediocrity. Every project is an opportunity to achieve something exceptional.',
    },
  ];

  const stats = [
    { number: '10+', label: isAr ? 'سنوات الخبرة' : 'Years Experience' },
    { number: '500+', label: isAr ? 'مشروع منجز' : 'Projects Completed' },
    { number: '50+', label: isAr ? 'خبير وفني' : 'Experts & Technicians' },
    { number: '98%', label: isAr ? 'نسبة رضا العملاء' : 'Client Satisfaction' },
  ];

  return (
    <div className={`${isAr ? 'font-arabic' : ''}`} dir={dir}>
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 35%, #1a4d3a 35%, #143d2e 100%)'
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${isAr ? 'text-right' : 'text-left'} max-w-3xl`}>
            <div className={`flex items-center gap-3 mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className="h-px w-12 bg-[#87C24D]" />
              <p className="text-[#87C24D] text-sm font-medium uppercase tracking-[0.2em]">
                {isAr ? 'من نحن' : 'About Us'}
              </p>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {isAr ? 'نصنع المساحات التي تُحسَس' : 'We Craft Spaces That Are Felt'}
            </h1>
            <p className="text-lg text-white/70 max-w-xl leading-relaxed">
              {isAr
                ? 'أكثر من عشر سنوات من الخبرة في تصميم وتصنيع الأثاث الداخلي الفاخر.'
                : 'Over a decade of expertise in designing and manufacturing premium interior furniture.'}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={isAr ? 'order-2 text-right' : 'order-1 text-left'}>
              <div className={`flex items-center gap-3 mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                <div className="h-px w-12 bg-[#87C24D]" />
                <p className="text-[#87C24D] text-sm font-medium uppercase tracking-[0.2em]">
                  {isAr ? 'قصتنا' : 'Our Story'}
                </p>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
                {isAr ? 'فن يجمع بين الهندسة والإحساس' : 'Where Engineering Meets Feeling'}
              </h2>
              <div className="space-y-5">
                {storyParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-gray-600 leading-relaxed text-[15px]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className={isAr ? 'order-1' : 'order-2'}>
              <div className="relative group">
                <img
                  src="/images/kitchen4.jpg"
                  alt="VastHome"
                  className="w-full h-[480px] object-cover shadow-xl transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute -bottom-6 -left-6 bg-[#0f2e22] p-8 shadow-2xl hidden sm:block">
                  <p className="text-4xl font-bold text-[#87C24D]">10+</p>
                  <p className="text-white/60 text-sm mt-1">{isAr ? 'سنوات الخبرة' : 'Years Experience'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-[#fafbfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-16 ${isAr ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center gap-3 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className="h-px w-12 bg-[#87C24D]" />
              <p className="text-[#87C24D] text-sm font-medium uppercase tracking-[0.2em]">
                {isAr ? 'قيمنا' : 'Our Values'}
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {isAr ? 'ما نؤمن به' : 'What We Stand For'}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-[#fafbfa] p-10 group hover:bg-white transition-all duration-500"
              >
                <div className={`${isAr ? 'text-right' : 'text-left'}`}>
                  <span className="text-5xl font-bold text-[#237357]/10 group-hover:text-[#237357]/15 transition-colors duration-500 select-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-[#0f2e22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-16 ${isAr ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center gap-3 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className="h-px w-12 bg-[#87C24D]" />
              <p className="text-[#87C24D] text-sm font-medium uppercase tracking-[0.2em]">
                {isAr ? 'أرقامنا' : 'By The Numbers'}
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              {isAr ? 'ثقة تُبنى بالنتائج' : 'Trust Built on Results'}
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[#0f2e22] p-10 group hover:bg-[#143d2e] transition-colors duration-500"
              >
                <div className={`${isAr ? 'text-right' : 'text-left'}`}>
                  <p className="text-5xl font-bold text-[#87C24D] mb-3">{stat.number}</p>
                  <p className="text-white/50 text-sm">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="overflow-hidden group">
              <img
                src="/images/kitchen5.jpg"
                alt="VastHome Work"
                className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="overflow-hidden group">
              <img
                src="/images/kitchen6.jpg"
                alt="VastHome Work"
                className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}