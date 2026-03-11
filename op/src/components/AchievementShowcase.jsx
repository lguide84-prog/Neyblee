import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

const ModernAchievement = () => {
  const [counters, setCounters] = useState({
    clients: 0,
    products: 0,
    customers: 0,
    awards: 0
  });

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const targetValues = {
    clients: 777,
    products: 478,
    customers: 637,
    awards: 10
  };

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Counter animation
  useEffect(() => {
    if (!isVisible) return;

    const duration = 1800;
    const steps = 60;
    
    const stepValues = {};
    Object.keys(targetValues).forEach(key => {
      stepValues[key] = targetValues[key] / steps;
    });

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      
      const newValues = {};
      Object.keys(targetValues).forEach(key => {
        const currentValue = stepValues[key] * currentStep;
        newValues[key] = currentStep >= steps ? targetValues[key] : Math.floor(currentValue);
      });

      setCounters(newValues);

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [isVisible]);

  const achievements = [
    {
      id: 1,
      title: "Clients and Brands",
      count: counters.clients,
      suffix: "+",
      description: "Trusting partners across industries",
      delay: "delay-0"
    },
    {
      id: 2,
      title: "Products Delivered",
      count: counters.products,
      suffix: "+",
      description: "Successful project completions",
      delay: "delay-100"
    },
    {
      id: 3,
      title: "Happy Customers",
      count: counters.customers,
      suffix: "+",
      description: "Satisfied client relationships",
      delay: "delay-200"
    },
    {
      id: 4,
      title: "Award Wins",
      count: counters.awards,
      suffix: "+",
      description: "Industry recognition & excellence",
      delay: "delay-300"
    }
  ];

  return (
    <>
    <Helmet>
      <title>Our Achievements | Nyblee - Digital Marketing & Web Development Agency in Noida</title>
      <meta
        name="description"
        content="Discover the achievements and milestones of Nyblee in digital marketing, website development, and business growth. Trusted by 777+ clients with 637+ happy customers."
      />
      <meta
        name="keywords"
        content="nyblee achievements, digital marketing success noida, web development milestones, client success stories"
      />
      <link rel="canonical" href="https://nyblee.com/achievements" />
      
      {/* Structured Data for Achievements */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Nyblee",
          "url": "https://nyblee.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Sector 69, Noida",
            "addressRegion": "Uttar Pradesh",
            "addressCountry": "India"
          },
          "telephone": "9711786455",
          "email": "nybleeteam@gmail.com",
          "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "value": "50+"
          },
          "award": "Digital Excellence Award 2024",
          "description": `Trusted by ${targetValues.clients}+ clients with ${targetValues.customers}+ happy customers and ${targetValues.products}+ successful project deliveries.`
        })}
      </script>
    </Helmet>

    <div 
      ref={sectionRef} 
      className="min-h-screen bg-gradient-to-br from-[#ffffff] via-[#fafafa] to-[#f5f5f5] text-black p-4 font-sans"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 pt-12">
          <div className="inline-block mb-6">
            <div className="text-xs font-semibold tracking-widest text-[#5D4E6D] uppercase mb-2">
              Our Journey in Numbers
            </div>
            <div className="h-px w-16 bg-gradient-to-r from-[#2A4B7C] to-[#B76E79] mx-auto"></div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6 exo">
            <span className="bg-gradient-to-r from-[#1E2B3A] via-[#2A4B7C] to-[#5D4E6D] bg-clip-text text-transparent font-medium">
              What We Achieve
            </span>
          </h1>
          
          <p className="text-lg exo text-[#4A5568] max-w-2xl mx-auto leading-relaxed">
            Years of excellence and trust reflected in our growing numbers. 
            Over a decade of delivering exceptional results across India and beyond.
          </p>
        </div>

        {/* Achievements Grid - Responsive columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20 exo">
          {achievements.map((item) => (
            <div 
              key={item.id}
              className={`group transition-all duration-500 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              } ${item.delay}`}
            >
              <div className="relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#B76E79]/30">
                {/* Hover effect line - Professional gradient */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#2A4B7C] to-[#B76E79] group-hover:w-full transition-all duration-500"></div>
                
                {/* Top accent on hover */}
                <div className="absolute top-0 right-0 w-0 h-0.5 bg-gradient-to-l from-[#2A4B7C] to-[#B76E79] group-hover:w-full transition-all duration-500 delay-100"></div>
                
                <div className="p-6 md:p-8">
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight bg-gradient-to-br from-[#1E2B3A] to-[#2A4B7C] bg-clip-text text-transparent">
                      {item.count}
                    </span>
                    <span className="text-xl md:text-2xl font-light ml-2 text-[#B76E79]">{item.suffix}</span>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-medium mb-3 tracking-tight text-[#1E2B3A]">
                    {item.title}
                  </h3>
                  
                  <p className="text-[#4A5568] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-transparent group-hover:border-[#B76E79]/30 transition-all duration-300"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-transparent group-hover:border-[#B76E79]/30 transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Bar */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-100">
            <div className="flex -space-x-2">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2A4B7C] to-[#B76E79] flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-sm text-[#4A5568]">
              <span className="font-semibold text-[#1E2B3A]">Trusted</span> by industry leaders
            </span>
          </div>
        </div>

        {/* Decorative element */}
        <div className="relative mt-16">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-12 bg-gradient-to-b from-[#2A4B7C] to-transparent"></div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ModernAchievement;