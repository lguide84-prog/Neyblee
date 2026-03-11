import React from 'react';

const IndustryExpertise = () => {
  const industries = [
    { name: 'Ecommerce', icon: '🛒' },
    { name: 'Real Estate', icon: '🏢' },
    { name: 'Healthcare', icon: '⚕️' },
    { name: 'Fashion & Apparel', icon: '👔' },
    { name: 'Jewelry & Luxury Brands', icon: '💎' },
    { name: 'Automotive', icon: '🚗' },
    { name: 'B2B Businesses', icon: '🤝' },
    { name: 'Home Services', icon: '🔧' },
    { name: 'Consumer Goods', icon: '📦' },
    { name: 'Education & EdTech', icon: '📚' },
    { name: 'Manufacturing', icon: '🏭' },
    { name: 'D2C Brands', icon: '📱' },
    { name: 'SaaS & Technology', icon: '☁️' },
    { name: 'Food & Beverage', icon: '🍽️' },
    { name: 'Finance', icon: '💰' }
  ];

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#ffffff] to-[#f5f5f5]">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-[#1E2B3A] via-[#2A4B7C] to-[#5D4E6D] bg-clip-text text-transparent">
              Industry-Focused Digital Expertise
            </span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#2A4B7C] to-[#B76E79] mx-auto mb-6 sm:mb-8 rounded-full"></div>
          <p className="text-base sm:text-lg text-[#4A5568] max-w-3xl mx-auto leading-relaxed px-4">
            Nyblee understands the unique challenges businesses face across different industries. 
            Using data-driven insights, advanced digital marketing strategies, and modern technology 
            solutions, we help brands increase visibility, generate high-quality leads, and achieve 
            scalable digital growth.
          </p>
        </div>

        {/* Industry Tags Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="group flex items-center space-x-2 sm:space-x-3 bg-white rounded-full 
                         px-3 sm:px-4 py-2.5 sm:py-3 shadow-sm hover:shadow-lg 
                         transition-all duration-300 border border-gray-200 
                         hover:border-[#B76E79]/30 cursor-default
                         hover:bg-gradient-to-r hover:from-[#F9F5F0] hover:to-[#F0E9E0]"
            >
              <span className="text-lg sm:text-xl" role="img" aria-label={industry.name}>
                {industry.icon}
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#4A5568] group-hover:text-[#1E2B3A] 
                             whitespace-nowrap overflow-hidden text-ellipsis">
                {industry.name}
              </span>
            </div>
          ))}
        </div>

        {/* Optional: Decorative Elements */}
        <div className="mt-8 text-center">
          <p className="text-xs sm:text-sm text-[#5D4E6D]/60">
            <span className="font-medium text-[#B76E79]">✦</span> Trusted by businesses across 15+ industries <span className="font-medium text-[#B76E79]">✦</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndustryExpertise;