import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { services } from '../components/data/data';
import { Helmet } from 'react-helmet';

const ServiceDetail = () => {
  const { serviceId, subserviceId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    businessLocation: '',
    phoneNumber: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showWhatsAppOptions, setShowWhatsAppOptions] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  
  // Refs for animation
  const elementsRef = useRef([]);
  const formRef = useRef(null);
  const imageRef = useRef(null);

  // Nyblee Contact Information
  const nybleePhone = "9711786455";
  const nybleeEmail = "nybleeteam@gmail.com";
  const nybleeAddress = "Sector 69, Noida";
  const nybleeWhatsApp = "919711786455"; // Without + for WhatsApp

  // Check mobile viewport with better detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Add/remove mobile class to body
      if (mobile) {
        document.body.classList.add('mobile-view');
      } else {
        document.body.classList.remove('mobile-view');
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Prevent zoom on input focus in iOS
    const preventZoom = (e) => {
      if (isMobile && e.target.tagName === 'INPUT') {
        e.target.style.fontSize = '16px';
      }
    };
    
    document.addEventListener('touchstart', preventZoom);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('touchstart', preventZoom);
      document.body.classList.remove('mobile-view');
    };
  }, [isMobile]);

  // Find service and subservice
  const service = services.find(s => s.id === parseInt(serviceId));
  const subservice = service?.subservices.find(s => s.id === parseInt(subserviceId));

  // Extract price from string
  const extractPrice = (priceString) => {
    if (!priceString) return 0;
    const numericString = priceString.replace(/[^\d]/g, '');
    return parseInt(numericString) || 0;
  };

  const servicePrice = extractPrice(subservice?.price);

  // WhatsApp configuration
  const whatsappNumber = nybleeWhatsApp;
  const whatsappMessage = `Hello Nyblee! I'm interested in ${subservice?.name || 'your service'}. Price: ${subservice?.price || 'Not specified'}. Please provide more details. Located in ${formData.businessLocation || 'Sector 69, Noida'}.`;

  // Handle touch events for mobile
  const handleTouchStart = () => setIsTouching(true);
  const handleTouchEnd = () => setTimeout(() => setIsTouching(false), 150);

  // WhatsApp handlers
  const handleWhatsAppDirect = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    setShowWhatsAppOptions(false);
  };

  const handleWhatsAppWeb = () => {
    window.open(`https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    setShowWhatsAppOptions(false);
  };

  const handleWhatsAppCopy = () => {
    navigator.clipboard.writeText(nybleePhone);
    alert('Nyblee WhatsApp number copied to clipboard!');
    setShowWhatsAppOptions(false);
  };

  if (!service || !subservice) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ffffff] to-[#f5f5f5] px-4 safe-area-top safe-area-bottom">
        <div className="text-center p-8 w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#1E2B3A] to-[#2A4B7C] flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E2B3A] mb-4 tracking-tight">Service Not Found</h1>
          <p className="text-[#4A5568] mb-8 text-sm sm:text-base leading-relaxed">
            The service you're looking for doesn't exist or has been moved.
          </p>
          <button 
            onClick={() => navigate('/')}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="group w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#1E2B3A] to-[#2A4B7C] text-white font-semibold rounded-xl hover:from-[#2A4B7C] hover:to-[#1E2B3A] active:from-[#1E2B3A] active:to-[#2A4B7C] transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] active:shadow-lg"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 group-hover:-translate-x-1 group-active:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Nyblee Home
            </span>
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '858150d0-8f32-4dbe-9b30-e8cecb8cc170',
          subject: `Nyblee Inquiry: ${subservice.name}`,
          business_name: formData.businessName,
          business_location: formData.businessLocation,
          phone_number: formData.phoneNumber,
          email: formData.email,
          message: formData.message,
          service: service.name,
          subservice: subservice.name,
          price: subservice.price,
          from_name: formData.businessName,
          reply_to: formData.email,
          company: "Nyblee Digital Solutions",
          location: "Sector 69, Noida"
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          businessName: '',
          businessLocation: '',
          phoneNumber: '',
          email: '',
          message: ''
        });
        
        if (!isMobile) {
          gsap.fromTo('.success-message', 
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
          );
        }
        
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffffff] via-[#fafafa] to-[#f5f5f5] text-[#1E2B3A] pt-16 lg:pt-6 px-4 sm:px-6 safe-area-top safe-area-bottom">

      <Helmet>
        <title>{subservice.name} | Nyblee Digital Solutions - Sector 69, Noida</title>
        <meta
          name="description"
          content={`${subservice.description} Starting at ${subservice.price}. Nyblee provides professional digital marketing and web development services in Sector 69, Noida.`}
        />
        <meta
          name="keywords"
          content={`${subservice.name}, digital marketing noida, web development sector 69, nyblee services, ${service.name} noida`}
        />
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Sector 69, Noida" />
        <meta name="geo.position" content="28.5355;77.3910" />
        <meta name="ICBM" content="28.5355,77.3910" />
        <link rel="canonical" href={`https://nyblee.com/service/${serviceId}/${subserviceId}`} />
      </Helmet>

      {/* Mobile Header Sticky - Nyblee Branded */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/98 backdrop-blur-lg z-40 border-b border-gray-200 shadow-md py-3 safe-area-top">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="p-2.5 rounded-xl bg-[#F0E9E0] active:bg-[#E0D5C8] active:scale-95 transition-all duration-200"
          >
            <svg className="w-5 h-5 text-[#1E2B3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-[#1E2B3A] truncate max-w-[180px] text-center px-2">
            {subservice.name}
          </span>
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#2A4B7C] to-[#B76E79]"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-4 lg:pt-6">
        {/* Desktop Back Button */}
        <div className="hidden lg:block mb-8">
          <button 
            onClick={() => navigate('/')}
            className="group inline-flex items-center px-5 py-3 bg-white border border-gray-200 rounded-xl hover:bg-[#F0E9E0] hover:border-[#B76E79]/30 hover:shadow-md transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2 text-[#4A5568] group-hover:text-[#1E2B3A] group-hover:-translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium text-[#4A5568] group-hover:text-[#1E2B3A]">Back to Nyblee</span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Left Column - Service Details */}
          <div>
            {/* Service Header - Mobile Optimized */}
            <div className="mb-6 lg:mb-10">
              {/* Premium Price Badge - Nyblee Colors */}
              <div className="mb-5">
                <div className="inline-flex items-center px-4 py-3 w-full justify-between bg-gradient-to-r from-[#2A4B7C] to-[#1E2B3A] text-white rounded-2xl shadow-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <span className="text-lg">💰</span>
                    </div>
                    <div>
                      <div className="text-xs opacity-90">Starting from</div>
                      <div className="text-xl font-bold">{subservice.price}</div>
                    </div>
                  </div>
                  {subservice.price.includes('/month') && (
                    <div className="px-2 py-1 bg-white/20 rounded-full text-xs font-semibold whitespace-nowrap">
                      Monthly Plan
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1E2B3A] mb-3 leading-snug tracking-tight">
                  {subservice.name}
                </h1>
                <p className="text-[#4A5568] text-base leading-relaxed">
                  {subservice.description}
                </p>
              </div>
              
              {/* Action Buttons - Nyblee Colors */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button 
                  onClick={() => window.location.href = `tel:+91${nybleePhone}`}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  className="group flex-1 px-4 py-3.5 bg-gradient-to-r from-[#2A4B7C] to-[#1E2B3A] text-white font-bold rounded-xl active:from-[#1E2B3A] active:to-[#2A4B7C] transition-all duration-200 shadow-lg active:shadow-md active:scale-[0.97] flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 group-active:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm">Call Nyblee</span>
                </button>
                
                <div className="relative flex-1">
                  <button 
                    onClick={() => setShowWhatsAppOptions(!showWhatsAppOptions)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    className="group w-full px-4 py-3.5 bg-gradient-to-r from-[#5D4E6D] to-[#2A4B7C] text-white font-bold rounded-xl active:from-[#2A4B7C] active:to-[#5D4E6D] transition-all duration-200 shadow-lg active:shadow-md active:scale-[0.97] flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 group-active:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.297.298-.496.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
                    </svg>
                    <span className="text-sm">WhatsApp</span>
                  </button>
                  
                  {showWhatsAppOptions && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-fadeIn">
                      <div className="p-3 border-b border-gray-100 bg-gradient-to-r from-[#F0E9E0] to-[#E0D5C8]">
                        <p className="text-sm font-semibold text-[#1E2B3A]">Connect with Nyblee</p>
                        <p className="text-xs text-[#4A5568] mt-1">Choose your preferred method</p>
                      </div>
                      <div className="divide-y divide-gray-100">
                        <button 
                          onClick={handleWhatsAppDirect}
                          onTouchStart={handleTouchStart}
                          onTouchEnd={handleTouchEnd}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#F0E9E0] active:bg-[#E0D5C8] transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#5D4E6D] to-[#2A4B7C] flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.297.298-.496.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-[#1E2B3A] text-sm truncate">Direct Message</p>
                            <p className="text-xs text-[#4A5568] truncate">Open WhatsApp app</p>
                          </div>
                        </button>
                        <button 
                          onClick={handleWhatsAppWeb}
                          onTouchStart={handleTouchStart}
                          onTouchEnd={handleTouchEnd}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#F0E9E0] active:bg-[#E0D5C8] transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2A4B7C] to-[#1E2B3A] flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-[#1E2B3A] text-sm truncate">WhatsApp Web</p>
                            <p className="text-xs text-[#4A5568] truncate">Open in browser</p>
                          </div>
                        </button>
                        <button 
                          onClick={handleWhatsAppCopy}
                          onTouchStart={handleTouchStart}
                          onTouchEnd={handleTouchEnd}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#F0E9E0] active:bg-[#E0D5C8] transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#B76E79] to-[#5D4E6D] flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-[#1E2B3A] text-sm truncate">Copy Number</p>
                            <p className="text-xs text-[#4A5568] truncate">+91 {nybleePhone}</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* What's Included Section - Moved to Top */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#2A4B7C] to-[#1E2B3A] flex items-center justify-center mr-3 shadow-md">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1E2B3A]">What's Included</h2>
                <div className="ml-3 px-3 py-1 bg-[#F0E9E0] text-[#2A4B7C] text-xs font-semibold rounded-full">
                  {subservice.features?.length || 0} features
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {subservice.features?.map((feature, index) => (
                  <div 
                    key={index} 
                    className="group bg-white p-4 rounded-xl border border-gray-200 hover:border-[#B76E79]/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#2A4B7C] to-[#1E2B3A] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-[#1E2B3A] text-sm sm:text-base">{feature}</span>
                        <div className="flex items-center mt-1">
                          <div className="w-2 h-2 rounded-full bg-[#B76E79] mr-2"></div>
                          <span className="text-[#B76E79] text-xs font-medium">Included</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Service Overview Card - Moved after What's Included */}
            <div className="mb-8 bg-gradient-to-br from-white to-[#F0E9E0]/30 rounded-2xl p-5 sm:p-8 shadow-lg border border-gray-100">
              <div className="flex items-start mb-5">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-[#2A4B7C] to-[#1E2B3A] flex items-center justify-center mr-3 sm:mr-4 shadow-md flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-2xl font-bold text-[#1E2B3A] truncate">Service Overview</h2>
                  <p className="text-[#4A5568] text-sm sm:text-base mt-1 sm:mt-2 leading-relaxed">
                    Professional digital solutions from Nyblee
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[#4A5568] text-sm sm:text-lg leading-relaxed">
                  {subservice.description}
                </p>
              </div>
              
              {/* Price Display */}
              <div className="mt-6 pt-5 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <h3 className="font-bold text-[#1E2B3A] text-base sm:text-xl truncate">Investment</h3>
                    <p className="text-[#4A5568] text-xs sm:text-sm truncate">All-inclusive package</p>
                  </div>
                  <div className="text-right ml-2">
                    <div className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-[#2A4B7C] to-[#B76E79] bg-clip-text text-transparent">
                      {subservice.price}
                    </div>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {subservice.price.includes('/month') ? 'Monthly • Cancel anytime' : 'One-time payment'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nyblee Premium Benefits - After Service Overview */}
            <div className="mb-8 bg-gradient-to-br from-[#F0E9E0]/50 to-[#E0D5C8]/50 rounded-2xl p-5 sm:p-8 border border-[#B76E79]/30 shadow-lg">
              <div className="flex items-center mb-5">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-[#2A4B7C] to-[#1E2B3A] flex items-center justify-center mr-3 sm:mr-4 shadow-md flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-[#1E2B3A]">Nyblee Premium Benefits</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {text: 'Certified Professionals', icon: '👨‍🎓', desc: 'Industry experts'},
                  {text: 'Fast Delivery', icon: '⚡', desc: 'Quick turnaround'},
                  {text: 'Best Value Pricing', icon: '💰', desc: 'Competitive rates'},
                  {text: 'Satisfaction Guarantee', icon: '✅', desc: '100% money-back'}
                ].map((item, index) => (
                  <div key={index} className="bg-white/70 p-4 rounded-xl border border-[#B76E79]/20 hover:bg-white hover:shadow-md transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">{item.icon}</span>
                      <span className="font-bold text-[#1E2B3A] text-sm sm:text-base">{item.text}</span>
                    </div>
                    <p className="text-[#4A5568] text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp Support Card */}
            <div className="bg-gradient-to-r from-[#F0E9E0]/70 to-[#E0D5C8]/70 rounded-2xl p-6 border border-[#5D4E6D]/30 shadow-lg">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#5D4E6D] to-[#2A4B7C] flex items-center justify-center mr-4 shadow-md flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.297.298-.496.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#1E2B3A] text-lg mb-1">Instant WhatsApp Support</h4>
                  <p className="text-[#4A5568] text-sm mb-3">
                    Get immediate assistance from our team
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#5D4E6D] animate-pulse"></div>
                    <span className="text-[#5D4E6D] text-xs font-medium">Response time: within 5 minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Premium Inquiry Form */}
          <div>
            <div 
              ref={formRef}
              className="bg-gradient-to-b from-white via-white to-[#F0E9E0]/30 rounded-2xl lg:rounded-3xl shadow-2xl border border-gray-100 p-5 sm:p-8 lg:p-10 backdrop-blur-sm sticky top-24"
            >
              <div className="text-center mb-6">
                <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-r from-[#2A4B7C] to-[#1E2B3A] flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-3xl font-bold text-[#1E2B3A] mb-1 sm:mb-2 tracking-tight">Get Free Consultation</h2>
                <p className="text-[#4A5568] text-sm sm:text-base">
                  Nyblee responds within <span className="font-semibold text-[#B76E79]">2 hours</span>
                </p>
                
                {/* Price Badge */}
                <div className="mt-4 sm:mt-6 inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-[#F0E9E0] to-[#E0D5C8] rounded-xl border border-[#B76E79]/30 shadow-sm">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#2A4B7C] to-[#1E2B3A] flex items-center justify-center mr-2 sm:mr-3">
                    <span className="text-white text-xs">₹</span>
                  </div>
                  <div>
                    <div className="text-xs text-[#1E2B3A] font-medium">Service Price</div>
                    <div className="text-lg sm:text-xl font-bold text-[#2A4B7C]">{subservice.price}</div>
                  </div>
                </div>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-5 p-4 bg-gradient-to-r from-[#F0E9E0] to-[#E0D5C8] border border-[#5D4E6D]/30 rounded-xl shadow-sm success-message">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#5D4E6D] to-[#2A4B7C] flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#1E2B3A] text-sm sm:text-lg truncate">Request Sent Successfully!</h4>
                      <p className="text-[#4A5568] text-xs sm:text-sm mt-0.5">Nyblee will contact you shortly.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-5 p-4 bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200 rounded-xl shadow-sm">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-red-600 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-rose-900 text-sm sm:text-lg truncate">Submission Failed</h4>
                      <p className="text-rose-800 text-xs sm:text-sm mt-0.5">Please try again or call {nybleePhone}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Service Summary Card */}
                <div className="p-4 bg-gradient-to-r from-[#F0E9E0] to-[#E0D5C8]/30 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center min-w-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r from-[#2A4B7C] to-[#1E2B3A] flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-[#1E2B3A] text-sm sm:text-base truncate">Selected Service</h3>
                        <p className="text-[#4A5568] text-xs sm:text-sm truncate">{subservice.name}</p>
                      </div>
                    </div>
                    <div className="text-right ml-2">
                      <p className="text-lg sm:text-xl font-bold text-[#2A4B7C]">{subservice.price}</p>
                      <p className="text-gray-500 text-xs">Nyblee Professional</p>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Business Name', name: 'businessName', type: 'text', placeholder: 'Enter business name', icon: '🏢' },
                    { label: 'Location', name: 'businessLocation', type: 'text', placeholder: 'City, State', icon: '📍' },
                    { label: 'Phone Number', name: 'phoneNumber', type: 'tel', placeholder: '+91 9876543210', icon: '📱' },
                    { label: 'Email Address', name: 'email', type: 'email', placeholder: 'you@company.com', icon: '✉️' },
                  ].map((field, index) => (
                    <div key={index} className="relative">
                      <label className="block text-xs sm:text-sm font-semibold text-[#1E2B3A] mb-1 pl-1">
                        {field.label} <span className="text-[#B76E79]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg">
                          {field.icon}
                        </div>
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 sm:pl-12 pr-3 py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2A4B7C]/20 focus:border-[#2A4B7C] focus:bg-white transition-all duration-300 shadow-sm"
                          placeholder={field.placeholder}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Textarea */}
                <div className="relative">
                  <label className="block text-xs sm:text-sm font-semibold text-[#1E2B3A] mb-1 pl-1">
                    Additional Requirements <span className="text-[#B76E79] text-xs font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400 text-base sm:text-lg">
                      💬
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="3"
                      className="w-full pl-10 sm:pl-12 pr-3 py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2A4B7C]/20 focus:border-[#2A4B7C] focus:bg-white transition-all duration-300 shadow-sm resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-xs text-gray-500">
                      {formData.message.length}/500
                    </span>
                  </div>
                </div>

                {/* Nyblee Contact Info Summary */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-[#F0E9E0]/50 rounded-lg text-xs text-[#4A5568] border border-[#B76E79]/20">
                  <span className="flex items-center gap-1">📞 {nybleePhone}</span>
                  <span className="flex items-center gap-1">✉️ {nybleeEmail}</span>
                  <span className="flex items-center gap-1">📍 {nybleeAddress}</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  className="group w-full py-4 bg-gradient-to-r from-[#1E2B3A] to-[#2A4B7C] text-white font-bold rounded-xl active:from-[#2A4B7C] active:to-[#1E2B3A] transition-all duration-300 shadow-xl active:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-sm sm:text-base">Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 group-active:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <span className="text-sm sm:text-base">REQUEST FREE CONSULTATION</span>
                    </div>
                  )}
                </button>

                {/* Privacy Assurance */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#B76E79]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-xs sm:text-sm text-gray-600 font-medium">100% secure & confidential</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    By submitting, you agree to Nyblee's <a href="#" className="text-[#2A4B7C] hover:underline">Terms</a> and <a href="#" className="text-[#2A4B7C] hover:underline">Privacy Policy</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Buttons */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#1E2B3A] to-[#2A4B7C] text-white p-3 shadow-2xl z-30 backdrop-blur-md bg-white/10 safe-area-bottom">
        <div className="max-w-7xl mx-auto flex gap-2">
          <button 
            onClick={() => window.location.href = `tel:+91${nybleePhone}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex-1 bg-white/20 backdrop-blur-sm py-3 rounded-xl flex items-center justify-center space-x-2 active:scale-95 transition-transform shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-bold text-xs">CALL</span>
          </button>
          <button 
            onClick={handleWhatsAppDirect}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex-1 bg-gradient-to-r from-[#5D4E6D] to-[#2A4B7C] py-3 rounded-xl flex items-center justify-center space-x-2 active:scale-95 transition-transform shadow-lg"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.297.298-.496.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
            </svg>
            <span className="font-bold text-xs">CHAT</span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Spacing */}
      <div className="lg:hidden h-20 safe-area-bottom"></div>
    </div>
  );
};

export default ServiceDetail; 