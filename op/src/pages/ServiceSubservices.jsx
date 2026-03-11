import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { services } from '../components/data/data';
import { Helmet } from 'react-helmet-async';

const ServiceSubservices = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSubservices, setFilteredSubservices] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const service = services.find(s => s.id === parseInt(serviceId));

  // Nyblee Contact Information
  const nybleePhone = "9711786455";
  const nybleeEmail = "nybleeteam@gmail.com";
  const nybleeAddress = "Sector 69, Noida";

  useEffect(() => {
    if (service?.subservices) {
      let filtered = service.subservices.filter(sub =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (activeFilter === 'monthly') {
        filtered = filtered.filter(sub => sub.price.includes('/month'));
      } else if (activeFilter === 'one-time') {
        filtered = filtered.filter(sub => !sub.price.includes('/month') && !sub.price.includes('Custom'));
      } else if (activeFilter === 'custom') {
        filtered = filtered.filter(sub => sub.price.includes('Custom'));
      }

      setFilteredSubservices(filtered);
    }
  }, [service, searchTerm, activeFilter]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ffffff] to-[#f5f5f5] px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-[#1E2B3A] to-[#2A4B7C] rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#1E2B3A] mb-3">Service Not Found</h1>
          <p className="text-[#4A5568] mb-8">The service you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gradient-to-r from-[#1E2B3A] to-[#2A4B7C] text-white rounded-lg font-medium hover:from-[#2A4B7C] hover:to-[#1E2B3A] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Return to Nyblee Home
          </button>
        </div>
      </div>
    );
  }

  const handleSubserviceClick = (subserviceId) => {
    navigate(`/subservice/${serviceId}/detail/${subserviceId}`);
  };

  const getPriceType = (price) => {
    if (price.includes('/month')) return 'monthly';
    if (price.includes('Custom')) return 'custom';
    return 'one-time';
  };

  const priceTypeColors = {
    'monthly': 'bg-[#F0E9E0] text-[#2A4B7C] border border-[#2A4B7C]/20',
    'one-time': 'bg-[#E0D5C8] text-[#1E2B3A] border border-[#1E2B3A]/20',
    'custom': 'bg-[#5D4E6D]/10 text-[#5D4E6D] border border-[#5D4E6D]/20'
  };

  return (
    <>  
      <Helmet>
        <title>{service.name} Services | Nyblee Digital Solutions - Sector 69, Noida</title>
        <meta
          name="description"
          content={`Explore our ${service.name} services at Nyblee. Professional digital solutions in Sector 69, Noida with expert team and competitive pricing.`}
        />
        <meta
          name="keywords"
          content={`${service.name}, digital marketing noida, web development sector 69, nyblee services, noida digital agency`}
        />
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Sector 69, Noida" />
        <meta name="geo.position" content="28.5355;77.3910" />
        <meta name="ICBM" content="28.5355,77.3910" />
        <link rel="canonical" href={`https://nyblee.com/services/${serviceId}`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#ffffff] via-[#fafafa] to-[#f5f5f5]">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Hero Section */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="mb-6">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#F0E9E0] to-[#E0D5C8] text-[#1E2B3A] rounded-full text-sm font-medium mb-4 border border-[#B76E79]/20 shadow-sm">
                Nyblee Premium Solutions
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-[#1E2B3A] via-[#2A4B7C] to-[#5D4E6D] bg-clip-text text-transparent">
                {service.name} Services
              </span>
            </h1>
            <p className="text-lg text-[#4A5568] max-w-3xl mx-auto leading-relaxed">
              {service.description}
            </p>
            
            {/* Decorative line */}
            <div className="w-24 h-1 bg-gradient-to-r from-[#2A4B7C] to-[#B76E79] mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Solutions Grid */}
          {filteredSubservices.length > 0 ? (
            <>
              <div className="mb-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1E2B3A] mb-2">
                      Available Solutions
                    </h2>
                    <p className="text-[#4A5568]">Select a solution to get detailed information and pricing</p>
                  </div>
                  
                  {/* Results count */}
                  <div className="px-4 py-2 bg-[#F0E9E0] rounded-full border border-[#B76E79]/20">
                    <span className="text-sm font-medium text-[#1E2B3A]">
                      {filteredSubservices.length} {filteredSubservices.length === 1 ? 'Solution' : 'Solutions'} Available
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredSubservices.map((subservice, index) => (
                  <div 
                    key={subservice.id}
                    className="group relative bg-white border border-gray-200 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-[#B76E79]/30 hover:scale-[1.02] hover:-translate-y-1"
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => handleSubserviceClick(subservice.id)}
                  >
                    {/* Hover gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F0E9E0]/0 via-[#F0E9E0]/0 to-[#B76E79]/0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                    
                    {/* Price Type Badge */}
                    <div className="absolute top-6 right-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${priceTypeColors[getPriceType(subservice.price)]}`}>
                        {getPriceType(subservice.price).charAt(0).toUpperCase() + getPriceType(subservice.price).slice(1)}
                      </span>
                    </div>

                    {/* Icon - Nyblee styled */}
                    <div className="mb-6">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1E2B3A] to-[#2A4B7C] flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                        <span className="text-2xl font-bold text-white">
                          {subservice.name.charAt(0)}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[#1E2B3A] mb-3 group-hover:text-[#2A4B7C] transition-colors duration-200 pr-20">
                      {subservice.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-[#4A5568] mb-6 line-clamp-2 leading-relaxed">
                      {subservice.description}
                    </p>

                    {/* Key Features */}
                    <div className="mb-6 space-y-2.5">
                      {subservice.features?.slice(0, 4).map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                            <svg className="w-full h-full text-[#B76E79]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-sm text-[#4A5568] leading-tight">{feature}</span>
                        </div>
                      ))}
                      
                      {subservice.features?.length > 4 && (
                        <div className="flex items-center gap-2 text-xs text-[#5D4E6D] font-medium">
                          <span>+{subservice.features.length - 4} more features</span>
                        </div>
                      )}
                    </div>

                    {/* Price Preview */}
                    <div className="mb-4">
                      <span className="text-sm text-[#4A5568]">Starting from</span>
                      <div className="text-xl font-bold bg-gradient-to-r from-[#2A4B7C] to-[#B76E79] bg-clip-text text-transparent">
                        {subservice.price}
                      </div>
                    </div>

                    {/* CTA Button - Nyblee styled */}
                    <div className="pt-6 border-t border-gray-100">
                      <button className="w-full py-3.5 bg-gradient-to-r from-[#1E2B3A] to-[#2A4B7C] text-white font-medium rounded-xl hover:from-[#2A4B7C] hover:to-[#1E2B3A] transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg group/btn">
                        <div className="flex items-center justify-center gap-2">
                          <span>View Details</span>
                          <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </button>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-transparent group-hover:border-[#B76E79]/30 transition-all duration-300 rounded-tl-2xl"></div>
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-transparent group-hover:border-[#B76E79]/30 transition-all duration-300 rounded-br-2xl"></div>
                  </div>
                ))}
              </div>

              {/* Contact Bar */}
              <div className="mt-16 p-6 bg-gradient-to-r from-[#F0E9E0] to-[#E0D5C8] rounded-2xl border border-[#B76E79]/20">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2A4B7C] to-[#1E2B3A] flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1E2B3A]">Need Help Choosing?</h4>
                      <p className="text-sm text-[#4A5568]">Our experts are here to guide you</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2 text-[#1E2B3A]">
                      <svg className="w-4 h-4 text-[#B76E79]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {nybleePhone}
                    </span>
                    <button 
                      onClick={() => navigate('/contact')}
                      className="px-6 py-2.5 bg-gradient-to-r from-[#2A4B7C] to-[#1E2B3A] text-white rounded-xl hover:from-[#1E2B3A] hover:to-[#2A4B7C] transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-[#F0E9E0] to-[#E0D5C8] rounded-full flex items-center justify-center border border-[#B76E79]/20 shadow-lg">
                <svg className="w-16 h-16 text-[#2A4B7C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1E2B3A] mb-3">No Solutions Found</h3>
              <p className="text-[#4A5568] mb-8 max-w-md mx-auto">
                {searchTerm 
                  ? `We couldn't find any solutions matching "${searchTerm}". Try searching with different keywords.`
                  : 'No solutions available for this service category at the moment.'
                }
              </p>
              {searchTerm && (
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-6 py-3 bg-gradient-to-r from-[#1E2B3A] to-[#2A4B7C] text-white rounded-lg font-medium hover:from-[#2A4B7C] hover:to-[#1E2B3A] transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Clear Search
                  </button>
                  <button
                    onClick={() => navigate('/contact')}
                    className="px-6 py-3 bg-white border border-[#2A4B7C]/30 text-[#1E2B3A] rounded-lg font-medium hover:bg-[#F0E9E0] transition-colors duration-200"
                  >
                    Request Custom Solution
                  </button>
                </div>
              )}
              
              {!searchTerm && (
                <div className="mt-8">
                  <button
                    onClick={() => navigate('/services')}
                    className="px-8 py-3 bg-gradient-to-r from-[#1E2B3A] to-[#2A4B7C] text-white rounded-lg font-medium hover:from-[#2A4B7C] hover:to-[#1E2B3A] transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    View All Services
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default ServiceSubservices;