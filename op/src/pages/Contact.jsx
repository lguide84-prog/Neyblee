import React, { useState } from 'react';
import TextRoll from '../components/v1/TextRoll';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Nyblee Contact Information
  const nybleePhone = "9711786455";
  const nybleeEmail = "nybleeteam@gmail.com";
  const nybleeAddress = "Sector 69, Noida, Uttar Pradesh";
  const nybleeWhatsApp = "919711786455"; // Without + for WhatsApp

  // Web3Forms Access Key
  const ACCESS_KEY = "858150d0-8f32-4dbe-9b30-e8cecb8cc170";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: 'New Contact Form Submission - Nyblee',
          from_name: 'Nyblee Website',
          company: 'Nyblee Digital Solutions',
          location: 'Sector 69, Noida',
          botcheck: ''
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully! Our Nyblee team will get back to you within 2 hours.'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Something went wrong. Please try again or call us directly.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection or call us at ' + nybleePhone
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = `Hello Nyblee! I'd like to discuss a project.`;
    window.open(`https://wa.me/${nybleeWhatsApp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Contact Nyblee | Digital Marketing & Web Development Agency in Sector 69, Noida</title>
        <meta
          name="description"
          content="Contact Nyblee for professional digital marketing and web development services in Sector 69, Noida. Call us at 9711786455 or email nybleeteam@gmail.com for a free consultation."
        />
        <meta
          name="keywords"
          content="contact nyblee, digital marketing agency noida, web development company sector 69, noida digital agency, nyblee contact"
        />
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Sector 69, Noida, Uttar Pradesh" />
        <meta name="geo.position" content="28.5355;77.3910" />
        <meta name="ICBM" content="28.5355,77.3910" />
        <meta name="format-detection" content="telephone=9711786455" />
        <meta name="telephone" content="9711786455" />
        <meta name="address" content="Sector 69, Noida, Uttar Pradesh" />
        <meta name="email" content="nybleeteam@gmail.com" />
        <link rel="canonical" href="https://nyblee.com/contact" />
        
        {/* Structured Data for Contact Page */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Nyblee",
            "description": "Contact Nyblee for digital marketing and web development services",
            "url": "https://nyblee.com/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "Nyblee",
              "url": "https://nyblee.com",
              "logo": "https://nyblee.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9711786455",
                "contactType": "customer service",
                "email": "nybleeteam@gmail.com",
                "availableLanguage": ["English", "Hindi"]
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Sector 69",
                "addressLocality": "Noida",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "201301",
                "addressCountry": "IN"
              }
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#ffffff] via-[#fafafa] to-[#f5f5f5] flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="max-w-7xl w-full flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-24">
          
          {/* LEFT SECTION - Text Content */}
          <div className="lg:w-1/2 exo">
            <div className="mb-6">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#F0E9E0] to-[#E0D5C8] text-[#1E2B3A] rounded-full text-sm font-medium border border-[#B76E79]/20 shadow-sm">
                Let's Connect
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-[#1E2B3A] via-[#2A4B7C] to-[#5D4E6D] bg-clip-text text-transparent">
                LET'S WORK TOGETHER
              </span>
            </h1>
            
            <div className="w-24 h-1 bg-gradient-to-r from-[#2A4B7C] to-[#B76E79] mb-8 rounded-full"></div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E2B3A] mb-6">
              <TextRoll className="text-[#1E2B3A]">LET'S CONNECT!</TextRoll>  
            </h2>
            
            <p className="text-xl sm:text-2xl text-[#4A5568] leading-relaxed mb-8">
              Excited about a new project? Share your ideas with us and let's bring them to life together!
            </p>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {/* Phone Card */}
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#2A4B7C] to-[#1E2B3A] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#1E2B3A]">Call Us</h3>
                </div>
                <p className="text-[#2A4B7C] font-semibold text-lg pl-3 ">+91 {nybleePhone}</p>
                <p className="text-xs text-[#4A5568] mt-1 pl-3">Mon-Sat, 9am-7pm</p>
              </div>

              {/* Email Card */}
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#5D4E6D] to-[#2A4B7C] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#1E2B3A]">Email Us</h3>
                </div>
                <p className="text-[#5D4E6D] font-semibold text-lg pl-3">{nybleeEmail}</p>
                <p className="text-xs text-[#4A5568] mt-1 pl-3">24/7 support available</p>
              </div>

              {/* Address Card - Full width */}
              <div className="sm:col-span-2 bg-gradient-to-r from-[#F0E9E0] to-[#E0D5C8] p-5 rounded-xl border border-[#B76E79]/20 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#B76E79] to-[#5D4E6D] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#1E2B3A]">Visit Us</h3>
                </div>
                <p className="text-[#1E2B3A] font-semibold text-lg pl-13">{nybleeAddress}</p>
                <p className="text-xs text-[#4A5568] mt-1 pl-13">Conveniently located in Sector 69</p>
              </div>
            </div>

            {/* WhatsApp Button */}
            <div className="mt-6">
              <button
                onClick={handleWhatsAppClick}
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#5D4E6D] to-[#2A4B7C] text-white rounded-xl hover:from-[#2A4B7C] hover:to-[#5D4E6D] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.297.298-.496.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
                </svg>
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
          
          {/* RIGHT SECTION - Contact Form */}
          <div className="lg:w-1/2">
            <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-gray-100">
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1E2B3A] mb-2">Get in Touch</h3>
                <p className="text-[#4A5568]">Fill the form and we'll respond within 2 hours</p>
                <div className="w-16 h-1 bg-gradient-to-r from-[#2A4B7C] to-[#B76E79] mt-3 rounded-full"></div>
              </div>
              
              {/* Success/Error Messages */}
              {submitStatus && (
                <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
                  submitStatus.type === 'success' 
                    ? 'bg-gradient-to-r from-[#F0E9E0] to-[#E0D5C8] border border-[#5D4E6D]/30 text-[#1E2B3A]' 
                    : 'bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200 text-rose-800'
                }`}>
                  {submitStatus.type === 'success' ? (
                    <svg className="w-5 h-5 text-[#5D4E6D] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <span className="text-sm">{submitStatus.message}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-[#1E2B3A] font-medium mb-2">Your Name</label>
                  <input 
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A4B7C]/20 focus:border-[#2A4B7C] transition-all duration-200 bg-white"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-[#1E2B3A] font-medium mb-2">Email Address</label>
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A4B7C]/20 focus:border-[#2A4B7C] transition-all duration-200 bg-white"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-[#1E2B3A] font-medium mb-2">Your Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A4B7C]/20 focus:border-[#2A4B7C] transition-all duration-200 bg-white resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                
                {/* Bot Check Field (hidden) */}
                <input type="checkbox" name="botcheck" className="hidden" style={{display: 'none'}} />
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-[#1E2B3A] to-[#2A4B7C] hover:from-[#2A4B7C] hover:to-[#1E2B3A] active:scale-[0.98]'
                  } text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>SENDING...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Privacy Note */}
              <p className="mt-6 text-sm text-[#4A5568] text-center flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-[#B76E79]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Your information is safe with Nyblee. We never share your details.
              </p>
            </div>

            {/* Quick Response Badge */}
            <div className="mt-4 text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#F0E9E0] rounded-full text-sm text-[#1E2B3A] border border-[#B76E79]/20">
                <span className="w-2 h-2 rounded-full bg-[#5D4E6D] animate-pulse"></span>
                <span className="font-medium">Average response time: 2 hours</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;