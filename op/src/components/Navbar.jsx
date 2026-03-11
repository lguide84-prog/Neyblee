import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import AnimatedButton from './v1/AnimatedButton';
import { services } from './data/data';
import { useNavigate, Link } from 'react-router-dom';

function Navbar({ isHomePage = false }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [activeOverlayItem, setActiveOverlayItem] = useState(null);
  
  const menuOverlayRef = useRef(null);
  const dropdownRef = useRef(null);
  const subDropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const subTimeoutRef = useRef(null);

  // Updated menu items for Nyblee
  const menuItems = [
    { 
      title: 'Home', 
      number: '01',
      navColor: 'from-green-500 to-emerald-400',
      href: '/'
    },
    { 
      title: 'Services', 
      number: '02',
      navColor: 'from-blue-500 to-cyan-400',
      href: '/services',
      hasDropdown: true,
      subServices: services
    },
    { 
      title: 'Contact', 
      number: '04',
      navColor: 'from-green-500 to-emerald-400',
      href: '/contact'
    },
  ];

  // Nyblee Contact Information
  const nybleePhone = "9711786455";
  const nybleeEmail = "nybleeteam@gmail.com";
  const nybleeAddress = "Sector 69, Noida";

  // Handle scroll to close dropdown
  useEffect(() => {
    const handleScroll = () => {
      // Close dropdown when scrolling
      if (activeDropdown) {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
      }
      
      // Update scrolled state for navbar styling
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeDropdown]); // Re-run when activeDropdown changes

  useEffect(() => {
    if (window.Shery && window.gsap) {
      window.Shery.makeMagnet(".magnet", {
        duration: 1,
      });
    }
  }, []);

  useEffect(() => {
    if (menuOverlayRef.current) {
      menuOverlayRef.current.style.display = 'none';
    }
  }, []);

  const handleMouseEnter = (itemTitle) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(itemTitle);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveSubDropdown(null);
    }, 200);
  };

  const handleSubMouseEnter = (serviceId) => {
    if (subTimeoutRef.current) {
      clearTimeout(subTimeoutRef.current);
    }
    setActiveSubDropdown(serviceId);
  };

  const handleSubMouseLeave = () => {
    subTimeoutRef.current = setTimeout(() => {
      setActiveSubDropdown(null);
    }, 150);
  };

  const handleOverlayItemClick = (item) => {
    if (item.hasDropdown) {
      setActiveOverlayItem(activeOverlayItem === item.title ? null : item.title);
    } else {
      handleMenuClick();
      
      setTimeout(() => {
        navigate(item.href);
      }, 400);
    }
  };

  const handleMenuClick = () => {
    const wasOpen = isMenuOpen;
    setIsMenuOpen(!wasOpen);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
    setActiveOverlayItem(null);

    if (!wasOpen) {
      if (menuOverlayRef.current) {
        menuOverlayRef.current.style.display = 'flex';
        
        const menuContainer = menuOverlayRef.current.querySelector('.relative');
        
        if (menuContainer) {
          gsap.set(menuContainer, {
            x: '100%',
            y: '100%',
            opacity: 0,
            scale: 0.9,
            transformOrigin: 'bottom right'
          });

          gsap.to(menuContainer, {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'expo.out'
          });

          gsap.fromTo(menuOverlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.4 }
          );

          const menuItems = menuContainer.querySelectorAll('.menu-item');
          gsap.fromTo(menuItems,
            {
              opacity: 0,
              y: 40
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              delay: 0.3,
              ease: 'power3.out'
            }
          );

          const closeBtn = menuContainer.querySelector('.close-btn');
          if (closeBtn) {
            gsap.fromTo(closeBtn,
              { opacity: 0, rotation: -45 },
              { opacity: 1, rotation: 0, duration: 0.5, delay: 0.8 }
            );
          }
        }
      }
    } else {
      if (menuOverlayRef.current) {
        const menuContainer = menuOverlayRef.current.querySelector('.relative');
        
        if (menuContainer) {
          const menuItems = menuContainer.querySelectorAll('.menu-item');
          gsap.to(menuItems,
            {
              opacity: 0,
              y: 20,
              duration: 0.3,
              stagger: 0.05,
              ease: 'power2.in'
            }
          );

          const closeBtn = menuContainer.querySelector('.close-btn');
          if (closeBtn) {
            gsap.to(closeBtn, {
              opacity: 0,
              rotation: 45,
              duration: 0.3
            });
          }

          gsap.to(menuContainer, {
            x: '100%',
            y: '100%',
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            ease: 'expo.in',
            onComplete: () => {
              if (menuOverlayRef.current) {
                menuOverlayRef.current.style.display = 'none';
              }
            }
          });

          gsap.to(menuOverlayRef.current, {
            opacity: 0,
            duration: 0.4
          });
        }
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleServiceLinkClick = (serviceId, e) => {
    e.stopPropagation();
    
    if (isMenuOpen) {
      handleMenuClick();
      setTimeout(() => {
        navigate(`/subservice/${serviceId}/subservices`);
      }, 400);
    } else {
      navigate(`/subservice/${serviceId}/subservices`);
    }
  };

  const handleSubserviceLinkClick = (serviceId, subserviceId, e) => {
    e.stopPropagation();
    handleMenuClick();
   
    setTimeout(() => {
      navigate(`/subservice/${serviceId}/detail/${subserviceId}`);
    }, 400);
  };

  const handleViewAllClick = (href, e) => {
    e.stopPropagation();
    handleMenuClick();
    
    setTimeout(() => {
      navigate(href);
    }, 400);
  };

  // Check if screen is mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle desktop click on Services
  const handleDesktopServicesClick = (e, item) => {
    if (!isMobile && item.hasDropdown) {
      e.preventDefault();
      setActiveDropdown(activeDropdown === item.title ? null : item.title);
      setActiveSubDropdown(null);
    } else if (!item.hasDropdown) {
      navigate(item.href);
    }
  };

  // Close menu when clicking outside on mobile
  useEffect(() => {
    const handleMobileClickOutside = (event) => {
      if (isMobile && isMenuOpen && menuOverlayRef.current && 
          !menuOverlayRef.current.contains(event.target)) {
        handleMenuClick();
      }
    };

    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        if (isMenuOpen) {
          handleMenuClick();
        }
        // Also close dropdown on Escape
        if (activeDropdown) {
          setActiveDropdown(null);
          setActiveSubDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleMobileClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('mousedown', handleMobileClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isMobile, isMenuOpen, activeDropdown]);

  return (
    <>
      {/* Top Contact Bar - Updated with Nyblee colors */}
      <div className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-[#1E2B3A] to-[#2A4B7C] text-white py-2 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center lg:justify-between gap-4 text-sm">
          <div className="flex items-center space-x-4">
            {/* Phone */}
            <div className="flex items-center gap-2">
              <i className="fas fa-phone-alt text-[#B76E79] text-sm"></i>
              <span>{nybleePhone}</span>
            </div>
            
            <span className="text-gray-400">|</span>
            
            {/* Email */}
            <div className="flex items-center gap-2">
              <i className="far fa-envelope text-[#B76E79] text-sm"></i>
              <span className="hidden sm:inline">{nybleeEmail}</span>
              <span className="sm:hidden">Email</span>
            </div>
            
            <span className="text-gray-400 hidden md:inline">|</span>
            
            {/* Location */}
            <div className="hidden md:flex items-center gap-2">
              <i className="fas fa-map-marker-alt text-[#B76E79] text-sm"></i>
              <span>{nybleeAddress}</span>
            </div>
          </div>
          
          {/* Right side professional message */}
          <div className="hidden lg:flex items-center text-gray-300 text-sm">
            <span>Premium Digital Agency • Sector 69, Noida</span>
          </div>
        </div>
      </div>

      {/* Announcement Bar - Updated with Nyblee colors */}
      <div className="fixed top-8 lg:top-8 left-0 right-0 z-[9998] bg-gradient-to-r from-[#F0E9E0] to-[#E0D5C8] py-2 px-4 border-b border-[#B76E79]/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#1E2B3A] text-sm font-medium">
            Trusted Digital Solutions. Grow Your Business with Nyblee.
          </p>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        className={`fixed top-16 lg:top-16 left-0 right-0 z-[9997] transition-all duration-300 bg-white border-b border-gray-200 ${
          isScrolled ? 'shadow-lg' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src="/logo.jpg" className="h-15 w-15 lg:h-20 lg:w-24 rounded-full" alt="Nyblee Logo"/>
            </Link>
            
            {/* Desktop Navigation - Center */}
            <div className='hidden md:flex items-center space-x-1 lg:space-x-2' ref={dropdownRef}>
              {menuItems.map((item, index) => (
                <div 
                  key={index}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.hasDropdown ? (
                    <button
                      className={`text-gray-700 font-medium px-3 lg:px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 inline-flex items-center justify-center group ${
                        activeDropdown === item.title ? 'text-[#2A4B7C] bg-gray-50' : ''
                      }`}
                      onClick={(e) => handleDesktopServicesClick(e, item)}
                    >
                      <span className="text-center text-sm lg:text-base relative">
                        {item.title}
                        <span className={`ml-1 text-xs transition-transform duration-300 inline-block ${
                          activeDropdown === item.title ? 'rotate-180 text-[#B76E79]' : 'text-gray-500'
                        }`}>▼</span>
                        
                        {/* Animated underline on hover */}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#2A4B7C] to-[#B76E79] group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </button>
                  ) : (
                    <button
                      className={`text-gray-700 font-medium px-3 lg:px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 inline-flex items-center justify-center group relative`}
                      onClick={() => navigate(item.href)}
                    >
                      <span className="text-center text-sm lg:text-base">
                        {item.title}
                        {/* Animated underline on hover */}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#2A4B7C] to-[#B76E79] group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </button>
                  )}

                  {/* SERVICES DROPDOWN - REDUCED SIZE */}
                  {item.hasDropdown && activeDropdown === item.title && !isMobile && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-[650px] z-[9999] animate-fadeIn"
                      onMouseEnter={() => handleMouseEnter(item.title)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                        {/* Dropdown Header - Compact */}
                        <div className="bg-gradient-to-r from-[#1E2B3A] to-[#2A4B7C] px-5 py-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-white font-bold text-base mb-0.5">Our Services</h3>
                              <p className="text-[#F0E9E0] text-xs">Digital solutions for your growth</p>
                            </div>
                            <button 
                              onClick={(e) => handleViewAllClick('/services', e)}
                              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-all duration-300 border border-white/20 flex items-center gap-1 group"
                            >
                              <span>View All</span>
                              <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        {/* Dropdown Content - Compact Layout */}
                        <div className="flex p-4">
                          {/* Left Column - Main Services */}
                          <div className="w-2/5 border-r border-gray-200 pr-3">
                            <h4 className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wider mb-2">Service Categories</h4>
                            <div className="space-y-1.5">
                              {item.subServices.map((service, idx) => {
                                const colors = [
                                  { dot: 'bg-[#2A4B7C]', bg: 'bg-[#2A4B7C]/5', border: 'border-[#2A4B7C]/20' },
                                  { dot: 'bg-[#5D4E6D]', bg: 'bg-[#5D4E6D]/5', border: 'border-[#5D4E6D]/20' },
                                  { dot: 'bg-[#B76E79]', bg: 'bg-[#B76E79]/5', border: 'border-[#B76E79]/20' },
                                ];
                                const color = colors[idx % colors.length];
                                
                                return (
                                  <div 
                                    key={service.id}
                                    className={`relative p-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
                                      activeSubDropdown === service.id 
                                        ? `${color.bg} border-l-2 border-${color.dot}` 
                                        : 'hover:bg-gray-50'
                                    }`}
                                    onMouseEnter={() => handleSubMouseEnter(service.id)}
                                    onClick={(e) => handleServiceLinkClick(service.id, e)}
                                  >
                                    <div className="flex items-start">
                                      <div className={`w-1.5 h-1.5 rounded-full ${color.dot} mt-1.5 mr-2 flex-shrink-0`}></div>
                                      <div>
                                        <h4 className="text-sm font-semibold text-[#1E2B3A]">
                                          {service.name}
                                        </h4>
                                        <p className="text-[#4A5568] text-[10px] mt-0.5 line-clamp-1">{service.description}</p>
                                        
                                        <div className="flex items-center gap-2 mt-1">
                                          <span className="text-[8px] font-medium text-[#5D4E6D] bg-white px-1.5 py-0.5 rounded-full border border-[#5D4E6D]/20">
                                            {service.subservices?.length || 0} solutions
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Right Column - Subservices - Compact */}
                          <div className="w-3/5 pl-3">
                            {activeSubDropdown ? (() => {
                              const service = item.subServices.find(s => s.id === activeSubDropdown);
                              if (!service || !service.subservices || service.subservices.length === 0) {
                                return (
                                  <div className="h-full flex items-center justify-center">
                                    <div className="text-center p-3">
                                      <div className="w-10 h-10 mx-auto mb-2 bg-[#F0E9E0] rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-[#5D4E6D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" />
                                        </svg>
                                      </div>
                                      <p className="text-[#4A5568] text-xs">Select a service</p>
                                    </div>
                                  </div>
                                );
                              }

                              return (
                                <div className="animate-fadeIn">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-wider">
                                      Solutions
                                    </h4>
                                    <span className="text-[8px] text-[#5D4E6D] bg-[#F0E9E0] px-2 py-0.5 rounded-full">
                                      {service.subservices.length}
                                    </span>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-2">
                                    {service.subservices.slice(0, 4).map((subservice) => (
                                      <button
                                        key={subservice.id}
                                        className="group relative p-2 bg-white border border-gray-200 rounded-lg hover:border-[#B76E79] hover:shadow-md transition-all duration-200 text-left"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleSubserviceLinkClick(service.id, subservice.id, e);
                                        }}
                                      >
                                        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#F0E9E0] to-[#E0D5C8] flex items-center justify-center mb-1.5">
                                          <span className="text-[#2A4B7C] text-[8px] font-bold">
                                            {subservice.name.charAt(0)}
                                          </span>
                                        </div>
                                        
                                        <h5 className="text-xs font-semibold text-[#1E2B3A] mb-1 group-hover:text-[#2A4B7C] transition-colors">
                                          {subservice.name.length > 15 ? subservice.name.substring(0, 15) + '...' : subservice.name}
                                        </h5>
                                        
                                        <p className="text-[8px] text-[#4A5568] line-clamp-1 mb-1">
                                          {subservice.description.substring(0, 30)}...
                                        </p>
                                        
                                        <div className="flex items-center justify-between">
                                          <span className="text-[7px] font-medium text-[#5D4E6D] bg-[#F0E9E0] px-1 py-0.5 rounded-full">
                                            {subservice.price}
                                          </span>
                                        </div>
                                      </button>
                                    ))}
                                  </div>
                                  
                                  {service.subservices.length > 4 && (
                                    <div className="mt-2 text-right">
                                      <button
                                        onClick={(e) => handleServiceLinkClick(service.id, e)}
                                        className="text-[8px] font-medium text-[#2A4B7C] hover:text-[#1E2B3A] transition-colors inline-flex items-center gap-0.5"
                                      >
                                        <span>+{service.subservices.length - 4} more</span>
                                        <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              );
                            })() : (
                              <div className="h-full flex items-center justify-center">
                                <div className="text-center p-3">
                                  <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-[#F0E9E0] to-[#E0D5C8] rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-[#2A4B7C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                  </div>
                                  <p className="text-[#4A5568] text-xs font-medium">Hover over a service</p>
                                  <p className="text-[10px] text-gray-500 mt-0.5">to view solutions</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Dropdown Footer - Compact */}
                        <div className="px-4 py-2 bg-[#F0E9E0]/30 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-[#4A5568]">Need help?</span>
                              <a href={`tel:+91${nybleePhone}`} className="text-[10px] font-medium text-[#2A4B7C] hover:text-[#1E2B3A] transition-colors flex items-center gap-1">
                                <i className="fas fa-phone-alt text-[#B76E79] text-[8px]"></i>
                                Call {nybleePhone}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[8px] text-[#4A5568]">2h response</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-[#5D4E6D] animate-pulse"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button - Updated */}
            <div className="flex items-center">
              <button className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[#1E2B3A] to-[#2A4B7C] hover:from-[#2A4B7C] hover:to-[#1E2B3A] text-white font-medium px-5 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg group">
                <span className="w-6 h-6 rounded-full bg-[#B76E79] flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <i className="fas fa-arrow-right text-white text-xs"></i>
                </span>
                <span>Get Free Website Audit</span>
              </button>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button 
                  onClick={handleMenuClick}
                  className="px-4 py-2 text-gray-700 text-md font-medium rounded-full transition-all duration-300 hover:bg-gray-100 magnet"
                >
                  <AnimatedButton text={isMenuOpen ? "CLOSE" : "☰ MENU"} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed header */}
      <div className="h-36"></div>

      {/* MOBILE MENU OVERLAY - Updated with Nyblee colors */}
      <div 
        ref={menuOverlayRef}
        className="fixed inset-0 z-[9999] hidden items-end justify-end px-4 md:hidden"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={handleMenuClick}
        />
        
        {/* Menu Content */}
        <div 
          className="relative h-[90vh] w-full bg-white rounded-t-4xl overflow-hidden shadow-2xl transform-gpu overflow-y-auto"
          style={{
            transformOrigin: 'bottom right'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={handleMenuClick}
            className="absolute right-6 top-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10 close-btn"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Mobile Menu Header with Contact Info - Updated */}
          <div className="px-6 pt-12 pb-4 bg-gradient-to-r from-[#1E2B3A] to-[#2A4B7C]">
            <h2 className="text-3xl font-bold text-white">Nyblee</h2>
            <p className="text-[#F0E9E0] text-sm mt-1">Digital Solutions • Sector 69, Noida</p>
            <div className="flex flex-col gap-2 mt-4 text-sm text-white/90">
              <div className="flex items-center gap-3">
                <i className="fas fa-phone-alt text-[#B76E79] w-4"></i>
                <span>{nybleePhone}</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="far fa-envelope text-[#B76E79] w-4"></i>
                <span>{nybleeEmail}</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-map-marker-alt text-[#B76E79] w-4"></i>
                <span>{nybleeAddress}</span>
              </div>
            </div>
          </div>

          {/* Mobile Menu Items */}
          <div className="px-6 py-4">
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <div key={index} className="menu-item border-b border-gray-100 last:border-0">
                  <div 
                    className="flex items-center justify-between cursor-pointer py-4 group"
                    onClick={() => handleOverlayItemClick(item)}
                  >
                    <h3 className="text-black font-bold text-xl flex items-center group-hover:text-[#2A4B7C] transition-colors">
                      {item.title}
                      {item.hasDropdown && (
                        <span className={`ml-2 text-lg transform transition-all duration-300 ${
                          activeOverlayItem === item.title ? 'rotate-90 text-[#B76E79]' : 'group-hover:translate-x-1'
                        }`}>
                          ›
                        </span>
                      )}
                    </h3>
                    <span className="text-gray-400 text-sm group-hover:text-[#5D4E6D] transition-colors">{item.number}</span>
                  </div>

                  {/* Mobile Services Dropdown - Enhanced */}
                  {item.hasDropdown && activeOverlayItem === item.title && (
                    <div className="pb-4 animate-slideDown">
                      <div className="pl-4 space-y-4">
                        {item.subServices.map((service, idx) => {
                          const colors = [
                            { dot: 'bg-[#2A4B7C]', bg: 'bg-[#2A4B7C]/5' },
                            { dot: 'bg-[#5D4E6D]', bg: 'bg-[#5D4E6D]/5' },
                            { dot: 'bg-[#B76E79]', bg: 'bg-[#B76E79]/5' },
                          ];
                          const color = colors[idx % colors.length];
                          
                          return (
                            <div key={service.id}>
                              <div 
                                className={`cursor-pointer p-3 rounded-xl transition-all duration-300 hover:${color.bg}`}
                                onClick={(e) => handleServiceLinkClick(service.id, e)}
                              >
                                <h4 className="font-semibold text-gray-800 flex items-center">
                                  <span className={`w-2 h-2 rounded-full ${color.dot} mr-2`}></span>
                                  {service.name}
                                  <span className="ml-2 text-xs text-gray-500">
                                    ({service.subservices?.length || 0})
                                  </span>
                                </h4>
                              </div>
                              
                              {service.subservices && service.subservices.length > 0 && (
                                <div className="grid grid-cols-2 gap-2 mt-2 ml-4">
                                  {service.subservices.map((subservice) => (
                                    <div
                                      key={subservice.id}
                                      className="cursor-pointer p-3 bg-gray-50 hover:bg-[#F0E9E0] rounded-xl text-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
                                      onClick={(e) => handleSubserviceLinkClick(service.id, subservice.id, e)}
                                    >
                                      <span className="font-medium text-gray-800 group-hover:text-[#2A4B7C] block mb-1">
                                        {subservice.name}
                                      </span>
                                      <span className="text-[10px] text-gray-500">{subservice.price}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile CTA Button - Updated */}
            <button className="w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-[#1E2B3A] to-[#2A4B7C] hover:from-[#2A4B7C] hover:to-[#1E2B3A] text-white font-medium px-5 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg group">
              <span className="w-6 h-6 rounded-full bg-[#B76E79] flex items-center justify-center group-hover:rotate-12 transition-transform">
                <i className="fas fa-arrow-right text-white text-xs"></i>
              </span>
              <span>Get Free Website Audit</span>
            </button>

            {/* Copyright */}
            <p className="text-center text-xs text-gray-500 mt-6">
              © 2024 Nyblee • All rights reserved
            </p>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
}

export default Navbar;