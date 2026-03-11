import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "./Navbar";
import CircularText from "./CircularText";
import { Helmet } from 'react-helmet-async';

function Home() {
  // Refs for text animations only
  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const supportingLineRef = useRef(null);
  const ctaRef = useRef(null);
  const trustIndicatorRef = useRef(null);
  const leftHandRef = useRef(null);
  const rightHandRef = useRef(null);
  const animationTimeoutRef = useRef(null);

  useEffect(() => {
    if (window.Shery && window.gsap) {
      // 🎯 Magnet Effect
      window.Shery.makeMagnet(".magnet",{
        duration: 1,
      });
    }
  }, []);

  useEffect(() => {
    // Clear any existing timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    // Start animation after 3 seconds
    animationTimeoutRef.current = setTimeout(() => {
      startTextAnimation();
    }, 500);

    // Cleanup
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const startTextAnimation = () => {
    // Create animation timeline for text only
    const tl = gsap.timeline({
      defaults: { 
        duration: 1.2, 
        ease: "power3.out"
      }
    });

    // Set initial state (hidden)
    gsap.set([
      badgeRef.current, 
      headlineRef.current, 
      subheadlineRef.current,
      supportingLineRef.current,
      ctaRef.current,
      trustIndicatorRef.current,
      leftHandRef.current,
      rightHandRef.current
    ], {
      opacity: 0,
      y: 30
    });

    // Animate elements sequentially
    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.8 })
      .to(headlineRef.current, { opacity: 1, y: 0, duration: 1 }, "-=0.4")
      .to(subheadlineRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .to(supportingLineRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.2")
      .to(trustIndicatorRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
      .to([leftHandRef.current, rightHandRef.current], { 
        opacity: 1, 
        y: 0, 
        duration: 1.2,
        stagger: 0.2
      }, "-=0.8");
  };

  return (
  <>

   <Helmet>
  {/* Basic SEO - Updated for Nyblee */}
  <title>Nyblee | AI-Powered Digital Marketing & Web Development Agency in Noida</title>
  <meta
    name="description"
    content="Nyblee is an AI-powered digital marketing and web development agency in Sector 69, Noida. We provide SEO-friendly websites, Google Ads, CRM software, app development, and complete digital solutions for business growth."
  />

  {/* Robots */}
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

  {/* Canonical */}
  <link rel="canonical" href="https://nyblee.com/" />

  {/* Open Graph - Updated for Nyblee */}
  <meta property="og:title" content="Nyblee – AI-Driven Digital Marketing & Web Development in Noida" />
  <meta property="og:description" content="Grow your business with AI-powered SEO-optimized websites, Google Ads, CRM software, and complete digital marketing solutions in Sector 69, Noida." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://nyblee.com/" />
  <meta property="og:site_name" content="Nyblee" />
  <meta property="og:locale" content="en_IN" />

  {/* Twitter - Updated for Nyblee */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@nyblee" />
  <meta name="twitter:title" content="Nyblee | AI-Powered Digital Solutions for Business Growth" />
  <meta name="twitter:description" content="Affordable, fast, and AI-driven websites with digital marketing, Google Ads, and CRM solutions in Noida." />

  {/* Mobile / UX */}
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5" />
  <meta name="theme-color" content="#f8f5f0" />

  {/* Local SEO - Updated for Noida location */}
  <meta name="geo.region" content="IN-UP" />
  <meta name="geo.placename" content="Sector 69, Noida, Uttar Pradesh" />
  <meta name="geo.position" content="28.5355;77.3910" />
  <meta name="ICBM" content="28.5355,77.3910" />

  {/* Contact Details for Search Engines */}
  <meta name="format-detection" content="telephone=9711786455" />
  <meta name="telephone" content="9711786455" />
  <meta name="address" content="Sector 69, Noida, Uttar Pradesh" />
  <meta name="email" content="nybleeteam@gmail.com" />

  {/* Brand / Trust - Updated for Nyblee */}
  <meta name="author" content="Nyblee" />
  <meta name="publisher" content="Nyblee" />
  <meta name="copyright" content="Nyblee" />

  {/* App / Platform hints */}
  <meta name="application-name" content="Nyblee" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-title" content="Nyblee" />

  {/* Performance hint */}
  <meta httpEquiv="x-dns-prefetch-control" content="on" />
</Helmet>

    <div className="w-full min-h-screen bg-gradient-to-br from-[#faf7f2] via-[#f5f0e8] to-[#f0e9e0] relative overflow-hidden">
      
      {/* Abstract Shapes for Modern Tech Look - Professional color palette */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs - Professional muted colors */}
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-[#2A4B7C]/10 rounded-full blur-2xl lg:blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-40 sm:w-60 lg:w-80 h-40 sm:h-60 lg:h-80 bg-[#5D4E6D]/10 rounded-full blur-2xl lg:blur-3xl"></div>
        <div className="absolute top-20 sm:top-40 right-10 sm:right-40 w-20 sm:w-30 lg:w-40 h-20 sm:h-30 lg:h-40 bg-[#B76E79]/10 rounded-full blur-xl lg:blur-2xl"></div>
        
        {/* Grid Pattern - Subtle */}
        <div className="absolute inset-0 opacity-40" style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.02) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* Floating Dots - Professional colors */}
        <div className="absolute top-1/4 left-1/4 w-1 sm:w-2 h-1 sm:h-2 bg-[#2A4B7C]/20 rounded-full"></div>
        <div className="absolute top-3/4 right-1/3 w-2 sm:w-3 h-2 sm:h-3 bg-[#5D4E6D]/20 rounded-full hidden sm:block"></div>
        <div className="absolute bottom-1/4 left-1/2 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-[#B76E79]/30 rounded-full"></div>
      </div>

      {/* Main Hero Content - Responsive padding */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] sm:min-h-[calc(100vh-120px)] lg:min-h-0">
          
          {/* Center Column - Main Content - Full width on mobile */}
          <div className="w-full max-w-4xl text-center px-2 sm:px-4">
            
            {/* Top Badge - Professional */}
            <div 
              ref={badgeRef}
              className="inline-flex items-center justify-center mb-4 sm:mb-6 opacity-0"
            >
              <span className="bg-[#2A4B7C] text-white text-xs sm:text-sm font-medium px-4 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-md tracking-wide">
                <span className="mr-1">⚡</span> AI-POWERED MARKETING
              </span>
            </div>
            
            {/* Main Headline - Professional gradient */}
            <h1 
              ref={headlineRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-3 sm:mb-4 opacity-0 leading-tight"
            >
              <span className="bg-gradient-to-r from-[#1E2B3A] via-[#2A4B7C] to-[#5D4E6D] bg-clip-text text-transparent">
                AI-Driven Growth
              </span>
            </h1>
            
            {/* Subheading - Professional */}
            <h2 
              ref={subheadlineRef}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#2D3E50] font-medium mb-3 sm:mb-4 opacity-0 px-2 tracking-tight"
            >
              Digital Marketing & Web Development Agency
            </h2>
            
            {/* Supporting Line - Professional */}
            <p 
              ref={supportingLineRef}
              className="text-sm sm:text-base md:text-lg text-[#4A5568] max-w-2xl mx-auto mb-6 sm:mb-8 opacity-0 px-4 leading-relaxed"
            >
              Helping Businesses Scale with Smart Technology and Data-Driven Strategies
            </p>
            
            {/* CTA Button - Professional */}
            <div 
              ref={ctaRef}
              className="flex justify-center mb-4 sm:mb-6 opacity-0"
            >
              <button className="group flex items-center gap-2 sm:gap-3 bg-[#1E2B3A] hover:bg-[#2A4B7C] text-white font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 magnet text-sm sm:text-base">
                <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <i className="fas fa-arrow-right text-white text-xs sm:text-sm"></i>
                </span>
                <span>Claim Your Free Strategy</span>
              </button>
            </div>
            
            {/* Trust Indicator - Professional */}
            <div 
              ref={trustIndicatorRef}
              className="opacity-0"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <i key={star} className="fas fa-star text-[#B76E79] text-xs sm:text-sm"></i>
                  ))}
                </div>
                <span className="text-xs sm:text-sm font-medium text-[#4A5568]">Trusted by 200+ Growing Businesses</span>
              </div>
            </div>

            {/* Mobile Contact Info - Visible only on mobile */}
            <div className="mt-8 sm:hidden flex flex-col items-center gap-2 text-xs">
              <div className="flex items-center gap-3 text-[#4A5568]">
                <span className="flex items-center gap-1">
                  <i className="fas fa-phone-alt text-[#2A4B7C] text-xs"></i>
                  9711786455
                </span>
                <span className="w-px h-3 bg-gray-300"></span>
                <span className="flex items-center gap-1">
                  <i className="far fa-envelope text-[#2A4B7C] text-xs"></i>
                  nyblee@
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#4A5568]">
                <i className="fas fa-map-marker-alt text-[#2A4B7C] text-xs"></i>
                <span>Sector 69, Noida</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Icons - Professional colors */}
        <div className="hidden sm:flex fixed left-2 lg:left-6 top-1/2 transform -translate-y-1/2 flex-col gap-2 lg:gap-4 z-30">
          <a href="https://wa.me/9711786455" target="_blank" rel="noopener noreferrer" className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all magnet border border-gray-200 group">
            <i className="fab fa-whatsapp text-[#2A4B7C] group-hover:text-[#1E2B3A] text-sm lg:text-xl"></i>
          </a>
          <a href="https://www.instagram.com/nyblee/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all magnet border border-gray-200 group">
            <i className="fab fa-instagram text-[#5D4E6D] group-hover:text-[#1E2B3A] text-sm lg:text-xl"></i>
          </a>
          <a href="https://www.facebook.com/nyblee/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all magnet border border-gray-200 group">
            <i className="fab fa-facebook-f text-[#2A4B7C] group-hover:text-[#1E2B3A] text-sm lg:text-xl"></i>
          </a>
          <a href="https://www.youtube.com/@nyblee" target="_blank" rel="noopener noreferrer" className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all magnet border border-gray-200 group">
            <i className="fab fa-youtube text-[#B76E79] group-hover:text-[#1E2B3A] text-sm lg:text-xl"></i>
          </a>
        </div>
        
        {/* Bottom Contact Bar - Professional */}
        <div className="hidden sm:flex absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 items-center gap-3 lg:gap-6 bg-white/90 backdrop-blur-sm px-4 lg:px-6 py-2 lg:py-3 rounded-full shadow-md border border-gray-200 text-xs lg:text-sm">
          <span className="flex items-center gap-1 lg:gap-2 text-[#4A5568]">
            <i className="fas fa-phone-alt text-[#2A4B7C] text-xs lg:text-sm"></i>
            9711786455
          </span>
          <span className="w-px h-3 lg:h-4 bg-gray-300"></span>
          <span className="flex items-center gap-1 lg:gap-2 text-[#4A5568]">
            <i className="far fa-envelope text-[#2A4B7C] text-xs lg:text-sm"></i>
            <span className="hidden sm:inline">nybleeteam@gmail.com</span>
            <span className="sm:hidden">Email</span>
          </span>
          <span className="w-px h-3 lg:h-4 bg-gray-300 hidden sm:block"></span>
          <span className="items-center gap-1 lg:gap-2 hidden sm:flex text-[#4A5568]">
            <i className="fas fa-map-marker-alt text-[#2A4B7C] text-xs lg:text-sm"></i>
            <span className="hidden lg:inline">Sector 69, Noida</span>
            <span className="lg:hidden">Noida</span>
          </span>
        </div>
      </div>
    </div>
  </> 
  );
}

export default Home;