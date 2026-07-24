import { Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Services() {
  const { language, dir } = useLanguage();
  const isAr = language === 'ar';

  const services = [
    {
      title: isAr ? 'الاستشارات الفنية' : 'Technical Consultancy',
      description: isAr 
        ? 'تحليل احتياجات المشروع وتقديم الحلول الهندسية المثلى لضمان أعلى مستويات الجودة والكفاءة.'
        : 'Comprehensive project analysis and engineering solutions to ensure optimal quality and efficiency.',
      features: isAr
        ? ['تقييم الموقع والمتطلبات', 'دراسة الجدوى الفنية', 'اختيار المواد والتقنيات', 'التخطيط الاستراتيجي']
        : ['Site & requirement assessment', 'Technical feasibility studies', 'Material & technology selection', 'Strategic planning']
    },
    {
      title: isAr ? 'التصميم' : 'Designing',
      description: isAr
        ? 'تصاميم داخلية مخصصة تجمع بين الجماليات الوظيفية والابتكار لخلق مساحات فريدة.'
        : 'Custom interior designs that blend functional aesthetics with innovation to create distinctive spaces.',
      features: isAr
        ? ['تصميم ثلاثي الأبعاد', 'مخططات تنفيذية', 'اختيار الألوان والمواد', 'التصميم حسب الميزانية']
        : ['3D visualization & renders', 'Technical execution drawings', 'Color & material curation', 'Budget-aligned design']
    },
    {
      title: isAr ? 'الإنتاج' : 'Production',
      description: isAr
        ? 'تصنيع دقيق باستخدام أحدث التقنيات والآلات لضمان جودة لا تضاهى في كل منتج.'
        : 'Precision manufacturing using state-of-the-art machinery and techniques for unmatched product quality.',
      features: isAr
        ? ['تصنيع خشب عالي الجودة', 'تشطيبات متقنة', 'مراقبة الجودة في كل مرحلة', 'التسليم في الموعد']
        : ['Premium wood fabrication', 'Refined finishing techniques', 'Stage-by-stage quality control', 'On-time delivery']
    },
    {
      title: isAr ? 'التركيب' : 'Installation',
      description: isAr
        ? 'فريق متخصص في التركيب الدقيق لضمان التنفيذ المثالي والنتائج النهائية المذهلة.'
        : 'Specialized installation team ensuring flawless execution and stunning final results.',
      features: isAr
        ? ['تركيب احترافي', 'حماية الموقع أثناء العمل', 'اختبار النتيجة النهائية', 'تسليم نظيف ومنظم']
        : ['Professional fitting & assembly', 'Site protection during work', 'Final result verification', 'Clean & organized handover']
    },
    {
      title: isAr ? 'الصيانة السنوية' : 'Annual Maintenance',
      description: isAr
        ? 'برامج صيانة دورية للحفاظ على جودة المنتجات وإطالة عمرها الافتراضي بشكل مستدام.'
        : 'Scheduled maintenance programs to preserve product quality and extend lifespan sustainably.',
      features: isAr
        ? ['فحص دوري شامل', 'إصلاحات وتحديثات', 'تلميع ومعالجة الأسطح', 'دعم فني مستمر']
        : ['Comprehensive periodic inspection', 'Repairs & upgrades', 'Surface polishing & treatment', 'Ongoing technical support']
    }
  ];

  const processSteps = [
    {
      title: isAr ? 'الاستشارة' : 'Consultation',
      description: isAr 
        ? 'نبدأ بفهم رؤيتك وتحليل احتياجاتك بدقة.' 
        : 'We begin by understanding your vision and analyzing your needs precisely.'
    },
    {
      title: isAr ? 'التصميم' : 'Design',
      description: isAr 
        ? 'نترجم أفكارك إلى تصاميم واقعية وقابلة للتنفيذ.' 
        : 'We translate your ideas into realistic, executable designs.'
    },
    {
      title: isAr ? 'التصنيع' : 'Manufacturing',
      description: isAr 
        ? 'ننتج بأعلى معايير الجودة باستخدام أفضل التقنيات.' 
        : 'We produce to the highest quality standards using the best techniques.'
    },
    {
      title: isAr ? 'التركيب' : 'Installation',
      description: isAr 
        ? 'ننفذ بعناية فائقة لضمان النتيجة المثالية.' 
        : 'We execute with utmost care to ensure the perfect outcome.'
    }
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
                {isAr ? 'خدماتنا' : 'Our Services'}
              </p>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {isAr ? 'حلول متكاملة للتصميم الداخلي' : 'Comprehensive Interior Solutions'}
            </h1>
            <p className="text-lg text-white/70 max-w-xl leading-relaxed">
              {isAr 
                ? 'من الاستشارة الفنية إلى الصيانة السنوية، نقدم رحلة متكاملة لتحويل مساحاتك إلى واقع ملموس.'
                : 'From technical consultancy to annual maintenance, we deliver a complete journey to transform your spaces into reality.'}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-[#fafbfa] p-10 hover:bg-white transition-all duration-500 border border-gray-100 hover:border-[#237357]/20 hover:shadow-[0_8px_40px_-12px_rgba(35,115,87,0.15)]"
              >
                {/* Index Number */}
                <div className="absolute top-8 right-8 text-6xl font-bold text-[#237357]/5 group-hover:text-[#237357]/10 transition-colors duration-500 select-none">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="relative">
                  <div className={`flex items-center gap-4 mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className="w-1 h-12 bg-[#87C24D]" />
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">
                    {service.description}
                  </p>

                  <ul className={`space-y-3 ${isAr ? 'text-right' : 'text-left'}`}>
                    {service.features.map((feature, fIndex) => (
                      <li
                        key={fIndex}
                        className={`flex items-center gap-3 text-sm text-gray-700 ${isAr ? 'flex-row-reverse justify-end' : ''}`}
                      >
                        <Check className="w-4 h-4 text-[#87C24D] flex-shrink-0" strokeWidth={2.5} />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-[#0f2e22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-16 ${isAr ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center gap-3 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className="h-px w-12 bg-[#87C24D]" />
              <p className="text-[#87C24D] text-sm font-medium uppercase tracking-[0.2em]">
                {isAr ? 'العملية' : 'The Process'}
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              {isAr ? 'كيف نعمل' : 'How We Work'}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {processSteps.map((step, index) => (
              <div key={index} className="bg-[#0f2e22] p-8 group hover:bg-[#143d2e] transition-colors duration-500">
                <div className={`flex items-start gap-6 ${isAr ? 'flex-row-reverse text-right' : 'text-left'}`}>
                  <span className="text-4xl font-bold text-[#87C24D]/30 group-hover:text-[#87C24D]/50 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Showcase */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 overflow-hidden group">
              <img
                src="/images/kitchen2.jpg"
                alt="Kitchen Design"
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="overflow-hidden group">
              <img
                src="/images/wardrobe2.jpg"
                alt="Wardrobe Design"
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}