import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Contact() {
  const { language, dir } = useLanguage();
  const isAr = language === 'ar';
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const SERVICE_ID = 'service_b6cb69v';
      const TEMPLATE_ID = 'template_0mgthxr';
      const PUBLIC_KEY = 'Z8E_Y_vS_ioSbT603';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        to_email: 'info@vasthome.com.sa',
      };

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: SERVICE_ID,
          template_id: TEMPLATE_ID,
          user_id: PUBLIC_KEY,
          template_params: templateParams,
        }),
      });

      if (response.ok) {
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        const error = await response.text();
        console.error('EmailJS error:', error);
        alert(isAr ? 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.' : 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(isAr ? 'حدث خطأ. يرجى المحاولة لاحقاً.' : 'An error occurred. Please try again later.');
    } finally {
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactInfo = [
    {
      label: isAr ? 'العنوان' : 'Address',
      value: isAr ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Kingdom of Saudi Arabia',
    },
    {
      label: isAr ? 'الهاتف' : 'Phone',
      value: '+966 50 000 0000',
    },
    {
      label: isAr ? 'البريد الإلكتروني' : 'Email',
      value: 'info@vasthome.com.sa',
    },
    {
      label: isAr ? 'ساعات العمل' : 'Working Hours',
      value: isAr ? 'السبت - الخميس: 9 ص - 6 م' : 'Sat - Thu: 9 AM - 6 PM',
    },
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
                {isAr ? 'تواصل معنا' : 'Get in Touch'}
              </p>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {isAr ? 'نحن هنا للاستماع' : 'We Are Here to Listen'}
            </h1>
            <p className="text-lg text-white/70 max-w-xl leading-relaxed">
              {isAr
                ? 'سواء كان لديك مشروع جديد أو استفسار، فريقنا جاهز لمساعدتك في كل خطوة.'
                : 'Whether you have a new project or an inquiry, our team is ready to assist you at every step.'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-[#fafbfa] p-10 border border-gray-100">
                <div className={`mb-8 ${isAr ? 'text-right' : 'text-left'}`}>
                  <div className={`flex items-center gap-3 mb-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className="h-px w-8 bg-[#87C24D]" />
                    <p className="text-[#87C24D] text-xs font-medium uppercase tracking-[0.2em]">
                      {isAr ? 'نموذج التواصل' : 'Contact Form'}
                    </p>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {isAr ? 'أرسل لنا رسالتك' : 'Send Us a Message'}
                  </h2>
                </div>

                {submitted ? (
                  <div className={`flex items-center gap-3 p-6 bg-[#0f2e22] text-white ${isAr ? 'flex-row-reverse' : ''}`}>
                    <CheckCircle className="w-5 h-5 text-[#87C24D] flex-shrink-0" />
                    <p className="text-sm">
                      {isAr ? 'تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.' : 'Your message has been sent successfully. We will contact you soon.'}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className={`block text-sm font-medium text-gray-700 mb-2 ${isAr ? 'text-right' : 'text-left'}`}>
                          {isAr ? 'الاسم' : 'Name'}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className={`w-full px-4 py-3 bg-white border border-gray-200 focus:border-[#237357] outline-none transition-colors duration-300 ${isAr ? 'text-right' : 'text-left'}`}
                          placeholder={isAr ? 'اسمك الكامل' : 'Your full name'}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium text-gray-700 mb-2 ${isAr ? 'text-right' : 'text-left'}`}>
                          {isAr ? 'البريد الإلكتروني' : 'Email'}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={`w-full px-4 py-3 bg-white border border-gray-200 focus:border-[#237357] outline-none transition-colors duration-300 ${isAr ? 'text-right' : 'text-left'}`}
                          placeholder={isAr ? 'بريدك الإلكتروني' : 'Your email address'}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className={`block text-sm font-medium text-gray-700 mb-2 ${isAr ? 'text-right' : 'text-left'}`}>
                          {isAr ? 'الهاتف' : 'Phone'}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-white border border-gray-200 focus:border-[#237357] outline-none transition-colors duration-300 ${isAr ? 'text-right' : 'text-left'}`}
                          placeholder={isAr ? 'رقم هاتفك' : 'Your phone number'}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium text-gray-700 mb-2 ${isAr ? 'text-right' : 'text-left'}`}>
                          {isAr ? 'الخدمة المطلوبة' : 'Service Required'}
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-white border border-gray-200 focus:border-[#237357] outline-none transition-colors duration-300 ${isAr ? 'text-right' : 'text-left'}`}
                        >
                          <option value="">{isAr ? 'اختر خدمة' : 'Select a service'}</option>
                          <option value="consultancy">{isAr ? 'الاستشارات الفنية' : 'Technical Consultancy'}</option>
                          <option value="design">{isAr ? 'التصميم' : 'Designing'}</option>
                          <option value="production">{isAr ? 'الإنتاج' : 'Production'}</option>
                          <option value="installation">{isAr ? 'التركيب' : 'Installation'}</option>
                          <option value="maintenance">{isAr ? 'الصيانة السنوية' : 'Annual Maintenance'}</option>
                          <option value="other">{isAr ? 'أخرى' : 'Other'}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium text-gray-700 mb-2 ${isAr ? 'text-right' : 'text-left'}`}>
                        {isAr ? 'الرسالة' : 'Message'}
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className={`w-full px-4 py-3 bg-white border border-gray-200 focus:border-[#237357] outline-none transition-colors duration-300 resize-none ${isAr ? 'text-right' : 'text-left'}`}
                        placeholder={isAr ? 'صف مشروعك أو استفسارك...' : 'Describe your project or inquiry...'}
                      />
                    </div>

                    <button
                      type="submit"
                      className={`inline-flex items-center gap-2 px-10 py-4 bg-[#237357] text-white font-medium hover:bg-[#143d2e] transition-colors duration-300 ${isAr ? 'flex-row-reverse' : ''}`}
                    >
                      <Send className="w-4 h-4" />
                      <span>{isAr ? 'إرسال الرسالة' : 'Send Message'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div>
              <div className="bg-[#0f2e22] p-10">
                <div className={`mb-8 ${isAr ? 'text-right' : 'text-left'}`}>
                  <div className={`flex items-center gap-3 mb-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className="h-px w-8 bg-[#87C24D]" />
                    <p className="text-[#87C24D] text-xs font-medium uppercase tracking-[0.2em]">
                      {isAr ? 'معلومات التواصل' : 'Contact Info'}
                    </p>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {isAr ? 'كيف تجدنا' : 'How to Find Us'}
                  </h3>
                </div>

                <div className="space-y-8">
                  {contactInfo.map((item, index) => (
                    <div key={index} className={`${isAr ? 'text-right' : 'text-left'}`}>
                      <p className="text-white/40 text-xs uppercase tracking-[0.15em] mb-1">{item.label}</p>
                      <p className="text-white font-medium text-[15px]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Image */}
              <div className="mt-4 overflow-hidden group">
                <img
                  src="/images/kitchen3.jpg"
                  alt="VastHome"
                  className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-[#fafbfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-10 ${isAr ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center gap-3 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className="h-px w-12 bg-[#87C24D]" />
              <p className="text-[#87C24D] text-sm font-medium uppercase tracking-[0.2em]">
                {isAr ? 'الموقع' : 'Location'}
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {isAr ? 'زورنا في مقرنا' : 'Visit Our Office'}
            </h2>
          </div>
          <div className="overflow-hidden h-[450px] bg-gray-200 relative">
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