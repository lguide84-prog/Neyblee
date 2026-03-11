import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Preload critical images
  React.useEffect(() => {
    // Preload logo image
    const logoImg = new Image();
    logoImg.src = '/logo.jpg';
    
    // Preconnect to social media domains
    const preconnectLinks = [
      { rel: "preconnect", href: "https://www.facebook.com" },
      { rel: "preconnect", href: "https://www.instagram.com" },
      { rel: "preconnect", href: "https://www.linkedin.com" },
      { rel: "preconnect", href: "https://wa.me" },
      { rel: "preconnect", href: "https://twitter.com" },
      { rel: "preconnect", href: "https://www.youtube.com" },
    ];

    preconnectLinks.forEach(link => {
      const el = document.createElement("link");
      el.rel = link.rel;
      el.href = link.href;
      el.crossOrigin = "anonymous";
      document.head.appendChild(el);
    });

    return () => {
      // Cleanup if needed
    };
  }, []);

  // Services list for Nyblee
  const servicesList = React.useMemo(() => [
    { name: "SEO Services", path: "/services/seo" },
    { name: "Digital Marketing", path: "/services/digital-marketing" },
    { name: "Website Development", path: "/services/web-development" },
    { name: "Mobile App Development", path: "/services/app-development" },
    { name: "CRM Development", path: "/services/crm" },
    { name: "UI/UX Design", path: "/services/ui-ux" },
    { name: "E-commerce Development", path: "/services/ecommerce" }
  ], []);

  // Resources list
  const resourcesList = React.useMemo(() => [
    { name: "Blog / Insights", path: "/blog" },
    { name: "Digital Marketing Guides", path: "/guides" },
    { name: "SEO Resources", path: "/seo-resources" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Industry Trends", path: "/trends" },
    { name: "Marketing Tools", path: "/tools" }
  ], []);

  // Company links
  const companyLinks = React.useMemo(() => [
    { name: "About Nyblee", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Careers", path: "/careers" },
    { name: "Support Center", path: "/support" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms & Conditions", path: "/terms" }
  ], []);

  return (
    <footer className="bg-[#0A0A0A] text-gray-300 relative overflow-hidden" role="contentinfo" aria-label="Site footer">
      
      {/* Subtle World Map / Dotted Pattern Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 20px 20px, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
        {/* Globe outline effect */}
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full border border-yellow-500/20"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full border border-blue-500/20"></div>
      </div>

      {/* Add structured data for organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Nyblee",
          "url": "https://nyblee.com",
          "logo": "https://nyblee.com/logo.jpg",
          "description": "Nyblee is a digital marketing and web development agency helping businesses grow through SEO, modern websites, mobile apps, and data-driven marketing strategies.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Sector 69",
            "addressLocality": "Noida",
            "addressRegion": "Uttar Pradesh",
            "postalCode": "201301",
            "addressCountry": "India"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-9711786455",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi"]
          },
          "sameAs": [
            "https://www.facebook.com/nyblee",
            "https://www.instagram.com/nyblee",
            "https://www.linkedin.com/company/nyblee",
            "https://twitter.com/nyblee",
            "https://www.youtube.com/@nyblee",
            "https://wa.me/9711786455"
          ]
        })}
      </script>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
        
        {/* Grid Layout - Responsive: 4 columns desktop, 2 columns tablet, 1 column mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Column 1 — Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.jpg" 
                className="h-12 w-12 rounded-full border-2 border-yellow-400" 
                alt="Nyblee Logo"
                loading="eager"
                width="48"
                height="48"
              />
              <div>
                <h3 className="text-2xl font-bold text-white leading-tight" aria-label="Company name">
                  Nyblee
                </h3>
                <p className="text-xs text-yellow-400 mt-1" aria-label="Company tagline">
                  Digital Solutions
                </p>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 leading-relaxed" aria-label="Company description">
              Nyblee is a digital marketing and web development agency helping businesses grow through SEO, modern websites, mobile apps, and data-driven marketing strategies.
            </p>
            
            
          </div>

          {/* Column 2 — Services */}
          <div role="navigation" aria-label="Services">
            <h3 className="text-white text-lg font-semibold mb-6 relative inline-block">
              Services
              <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-yellow-400"></span>
            </h3>
            <ul className="space-y-3" role="list">
              {servicesList.map((service, index) => (
                <li key={index} role="listitem">
                  <Link 
                    to={service.path} 
                    className="text-sm text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center group"
                    aria-label={`View ${service.name} services`}
                  >
                    <span className="w-1 h-1 bg-yellow-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Resources */}
          <div role="navigation" aria-label="Resources">
            <h3 className="text-white text-lg font-semibold mb-6 relative inline-block">
              Resources
              <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-yellow-400"></span>
            </h3>
            <ul className="space-y-3" role="list">
              {resourcesList.map((resource, index) => (
                <li key={index} role="listitem">
                  <Link 
                    to={resource.path} 
                    className="text-sm text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center group"
                    aria-label={`View ${resource.name}`}
                  >
                    <span className="w-1 h-1 bg-yellow-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{resource.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Company / About */}
          <div role="navigation" aria-label="Company links">
            <h3 className="text-white text-lg font-semibold mb-6 relative inline-block">
              Company
              <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-yellow-400"></span>
            </h3>
            <ul className="space-y-3" role="list">
              {companyLinks.map((link, index) => (
                <li key={index} role="listitem">
                  <Link 
                    to={link.path} 
                    className="text-sm text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center group"
                    aria-label={`View ${link.name}`}
                  >
                    <span className="w-1 h-1 bg-yellow-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section - Badges and Copyright */}
      <div className="border-t border-gray-800 bg-[#050505] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Security / Certification Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 rounded-full border border-gray-800">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-300">Trusted Partner</span>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 rounded-full border border-gray-800">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span className="text-xs text-gray-300">Secure Platform</span>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 rounded-full border border-gray-800">
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span className="text-xs text-gray-300">Verified Agency</span>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 rounded-full border border-gray-800">
              <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
              <span className="text-xs text-gray-300">ISO Certified</span>
            </div>
          </div>
          
          {/* Copyright and Contact Info */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500 text-center md:text-left">
              © {currentYear} <span className="text-white font-medium">Nyblee</span>. All rights reserved.
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                {`9711786455`}
              </span>
              <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                nybleeteam@gmail.com
              </span>
              <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Sector 69, Noida
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/9711786455"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 group relative"
          aria-label="Chat with us on WhatsApp"
        >
          <svg 
            className="w-7 h-7" 
            fill="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.297.298-.496.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
          </svg>
          <span className="absolute -top-8 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Chat with us
          </span>
        </a>
      </div>
    </footer>
  );
};

export default React.memo(Footer);