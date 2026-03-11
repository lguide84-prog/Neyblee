import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Helmet } from 'react-helmet-async';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Reviews = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const highlightsRef = useRef([]);

  // Memoize testimonials data to prevent unnecessary re-renders
  const testimonials = useMemo(() => [
    {
      id: 1,
      name: "Arjun Mehta",
      position: "Digital Marketing Head",
      quote: "He asked thoughtful, strategic questions that helped us clarify our message and visual identity. The result was a digital presence that feels alive, intuitive, and deeply aligned with our values.",
      highlight: "alive, intuitive, and value-aligned"
    },
    {
      id: 2,
      name: "Priya Sharma",
      position: "UI/UX Lead",
      quote: "His grasp of UI/UX principles is sophisticated, and he approaches every project with equal parts logic and imagination. What impressed me most was his ability to think like a true designer.",
      highlight: "logic and imagination in perfect balance"
    },
    {
      id: 3,
      name: "Rajesh Patel",
      position: "Marketing Head",
      quote: "He is the kind of designer every marketing team dreams of working with. He listens deeply, understands the brand voice instantly, and brings ideas to life with clarity and creativity.",
      highlight: "listens deeply and understands instantly"
    },
  ], []);

  useEffect(() => {
    // Cleanup function for animations
    let scrollTriggers = [];

    // Title reveal animation
    const titleAnimation = ScrollTrigger.create({
      trigger: titleRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out'
          }
        );
      }
    });
    scrollTriggers.push(titleAnimation);

    // Cards animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        const cardAnimation = ScrollTrigger.create({
          trigger: card,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.fromTo(card,
              { 
                opacity: 0, 
                y: 80,
                scale: 0.95 
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.9,
                delay: index * 0.15,
                ease: 'power3.out'
              }
            );
          }
        });
        scrollTriggers.push(cardAnimation);
      }
    });

    // Highlight text animation
    highlightsRef.current.forEach((highlight, index) => {
      if (highlight) {
        const highlightAnimation = ScrollTrigger.create({
          trigger: highlight,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.fromTo(highlight,
              { width: 0 },
              {
                width: '100%',
                duration: 1.5,
                delay: index * 0.3 + 0.8,
                ease: 'power2.inOut'
              }
            );
          }
        });
        scrollTriggers.push(highlightAnimation);
      }
    });

    // Cleanup function
    return () => {
      scrollTriggers.forEach(trigger => trigger.kill());
      gsap.killTweensOf([titleRef.current, ...cardsRef.current, ...highlightsRef.current]);
    };
  }, []);

  const handleCardHover = React.useCallback((index, isHovering) => {
    const card = cardsRef.current[index];
    if (card) {
      gsap.killTweensOf(card);
      gsap.to(card, {
        y: isHovering ? -12 : 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  }, []);

  // Preload any critical assets
  useEffect(() => {
    // Preconnect to any external domains if needed
    const preconnectLinks = [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
    ];

    preconnectLinks.forEach(link => {
      const el = document.createElement("link");
      el.rel = link.rel;
      el.href = link.href;
      el.crossOrigin = "anonymous";
      document.head.appendChild(el);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Client Reviews & Testimonials | Nyblee - Digital Marketing Agency in Noida</title>
        <meta
          name="description"
          content="Read genuine client reviews and testimonials for digital marketing and web development services by Nyblee. See what industry leaders say about working with us in Noida."
        />
        <meta
          name="keywords"
          content="client reviews, testimonials, digital marketing feedback, web development reviews, nyblee reviews, noida digital agency testimonials"
        />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta property="og:title" content="Client Reviews & Testimonials | Nyblee" />
        <meta property="og:description" content="Read genuine client reviews and testimonials for digital marketing services by Nyblee in Noida." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nyblee.com/reviews" />
        <meta property="og:site_name" content="Nyblee" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nyblee Client Reviews" />
        <meta name="twitter:description" content="What industry leaders say about working with Nyblee" />
        <link rel="canonical" href="https://nyblee.com/reviews" />
        
        {/* Structured Data for Reviews */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Client Reviews & Testimonials",
            "description": "Genuine client reviews and testimonials for Nyblee",
            "url": "https://nyblee.com/reviews",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": testimonials.map((testimonial, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": testimonial.name
                  },
                  "reviewBody": testimonial.quote,
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "publisher": {
                    "@type": "Organization",
                    "name": "Nyblee",
                    "address": {
                      "@type": "PostalAddress",
                      "addressLocality": "Sector 69, Noida",
                      "addressRegion": "Uttar Pradesh",
                      "addressCountry": "India"
                    }
                  }
                }
              }))
            }
          })}
        </script>
      </Helmet>

      <div 
        className="min-h-screen bg-gradient-to-br from-[#1E2B3A] via-[#2A4B7C] to-[#1E2B3A] text-white rounded-t-3xl" 
        ref={sectionRef}
        role="main"
        aria-label="Client reviews and testimonials"
      >
        <section className="py-20 lg:py-12 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Title Section */}
            <div className="mb-20 lg:mb-28">
              <div ref={titleRef} className="inline-block">
                <div className="relative mb-5">
                  <h1 className="text-6xl exo lg:text-9xl font-bold relative z-10 tracking-tight">
                    <span className="bg-gradient-to-r from-white via-[#F0E9E0] to-[#B76E79] bg-clip-text text-transparent">
                      REVIEWS
                    </span>
                  </h1>
                  {/* Decorative underline */}
                  <div className="absolute -bottom-4 left-0 w-24 h-1 bg-gradient-to-r from-[#B76E79] to-transparent"></div>
                </div>
                
                <p className="text-lg lg:text-xl text-white/80 max-w-2xl mx-auto">
                  What industry leaders say about our collaboration
                </p>
              </div>
            </div>

            {/* Testimonials Grid */}
            <div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 mb-24"
              role="list"
              aria-label="Client testimonials"
            >
              {testimonials.map((testimonial, index) => (
                <article
                  key={testimonial.id}
                  ref={(el) => {
                    if (el && !cardsRef.current.includes(el)) {
                      cardsRef.current[index] = el;
                    }
                  }}
                  className="group relative"
                  onMouseEnter={() => handleCardHover(index, true)}
                  onMouseLeave={() => handleCardHover(index, false)}
                  onFocus={() => handleCardHover(index, true)}
                  onBlur={() => handleCardHover(index, false)}
                  role="listitem"
                  aria-labelledby={`testimonial-title-${testimonial.id}`}
                  tabIndex={0}
                >
                  {/* Glow effect - Professional gradient */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-[#B76E79]/20 via-transparent to-[#5D4E6D]/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    aria-hidden="true"
                  />
                  
                  {/* Card */}
                  <div className="relative h-full p-8 lg:p-10 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 group-hover:border-[#B76E79]/30 transition-all duration-500 shadow-xl">
                    {/* Company logo indicator */}
                    <div 
                      className="absolute top-6 right-6 text-white/10 text-4xl font-bold"
                      aria-hidden="true"
                    >
                      0{testimonial.id}
                    </div>
                    
                    {/* Quote */}
                    <div className="mb-8">
                      <div 
                        className="text-[#B76E79]/40 text-5xl font-serif mb-6"
                        aria-hidden="true"
                      >
                        "
                      </div>
                      <p className="text-lg lg:text-xl text-white/90 leading-relaxed">
                        {testimonial.quote}
                      </p>
                    </div>

                    {/* Highlight underline */}
                    <div className="mb-10 overflow-hidden">
                      <div 
                        ref={(el) => {
                          if (el && !highlightsRef.current.includes(el)) {
                            highlightsRef.current[index] = el;
                          }
                        }}
                        className="h-px bg-gradient-to-r from-transparent via-[#B76E79] to-transparent"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Client Info */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 
                          id={`testimonial-title-${testimonial.id}`}
                          className="text-2xl font-bold mb-1 bg-gradient-to-r from-white to-[#F0E9E0] bg-clip-text text-transparent"
                        >
                          {testimonial.name}
                        </h3>
                        <p className="text-white/60">{testimonial.position}</p>
                        {/* Hidden text for SEO */}
                        <span className="sr-only">
                          Rating: 5 out of 5 stars. Review excerpt: {testimonial.highlight}
                        </span>
                      </div>
                      
                      {/* Hover arrow - Professional styling */}
                      <div 
                        className="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300"
                        aria-hidden="true"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#B76E79] to-[#5D4E6D] flex items-center justify-center shadow-lg">
                          <svg 
                            className="w-5 h-5 text-white" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M17 8l4 4m0 0l-4 4m4-4H3" 
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Decorative corner elements */}
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-transparent group-hover:border-[#B76E79]/30 transition-all duration-500"></div>
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-transparent group-hover:border-[#B76E79]/30 transition-all duration-500"></div>
                  </div>
                </article>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="text-center">
              <div className="inline-flex items-center gap-6 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <div className="flex -space-x-2">
                  {[1,2,3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B76E79] to-[#5D4E6D] flex items-center justify-center text-white text-xs font-bold border-2 border-white/20">
                      <span className="sr-only">Verified reviewer</span>
                    </div>
                  ))}
                </div>
                <span className="text-sm text-white/80">
                  <span className="font-semibold text-white">5.0</span> average rating from 50+ reviews
                </span>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-[#B76E79]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="relative mt-16">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-12 bg-gradient-to-b from-[#B76E79] to-transparent"></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default React.memo(Reviews);