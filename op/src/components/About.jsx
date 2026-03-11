import React, { useEffect, useRef } from 'react'
import AnimatedButton from "./v1/AnimatedButton"; 
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const navigate = useNavigate();
  const textRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const funnelRef = useRef(null);

  useEffect(() => {
    if (window.Shery && window.gsap) {
      window.Shery.makeMagnet(".magnet", {
        duration: 1,
      });
    }
  }, []);

  const goToContact = () => {
    navigate("/Contact");
  };

  useEffect(() => {
    if (!textRef.current) return;

    // Wrap each character in a span
    const text = textRef.current.innerText;
    textRef.current.innerHTML = text
      .split("")
      .map((char) => `<span>${char}</span>`)
      .join("");

    const chars = textRef.current.querySelectorAll("span");

    gsap.fromTo(
      chars,
      { color: "#999999" }, // initial color
      {
        color: "#000000", // final color
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
        stagger: 0.5, // slight delay between characters
      }
    );
  }, []);

  // Animation for funnel and columns on scroll
  useEffect(() => {
    if (leftColumnRef.current && rightColumnRef.current && funnelRef.current) {
      gsap.fromTo(
        leftColumnRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: leftColumnRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        rightColumnRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: rightColumnRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        funnelRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: funnelRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>About Us | Nyblee - Digital Marketing & Web Development Agency in Noida</title>
        <meta
          name="description"
          content="Nyblee is a leading digital marketing and web development agency in Sector 69, Noida. We help businesses grow through data-driven SEO, website design, app development, and CRM solutions."
        />
        <meta
          name="keywords"
          content="about nyblee, digital marketing agency noida, web development company noida, seo agency noida"
        />
        <link rel="canonical" href="https://nyblee.com/about" />
      </Helmet>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#ffffff] via-[#fafafa] to-[#f5f5f5] mont overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          
          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left Column - Content */}
            <div 
              ref={leftColumnRef}
              className="w-full lg:w-1/2 space-y-6"
            >
              {/* Main Heading with Professional Gradient */}
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-[#1E2B3A] via-[#2A4B7C] to-[#5D4E6D] bg-clip-text text-transparent">
                  Leading Digital Marketing & Web Development Agency in India
                </span>
                <span className="text-[#1E2B3A] block mt-2">– Driving Business Growth</span>
              </h2>
              
              {/* Description Paragraph */}
              <p className="text-[#4A5568] text-base lg:text-lg leading-relaxed">
                Nyblee helps businesses grow online through data-driven digital marketing and innovative technology solutions. 
                Our team combines SEO expertise, performance marketing, modern web design, and powerful CRM systems to create 
                scalable growth strategies that deliver real results for businesses.
              </p>
              
              {/* Subheading */}
              <h3 className="text-xl lg:text-2xl font-semibold text-[#2D3E50] mt-8">
                Our Strategic Approach Includes:
              </h3>
              
              {/* Bullet Points with Professional Check Icons */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#B76E79] rounded-full flex items-center justify-center mt-1 shadow-sm">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                  <p className="text-[#4A5568] text-base lg:text-lg">
                    <span className="font-semibold text-[#1E2B3A]">AI-Powered, Performance-Focused Marketing</span>
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#B76E79] rounded-full flex items-center justify-center mt-1 shadow-sm">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                  <p className="text-[#4A5568] text-base lg:text-lg">
                    <span className="font-semibold text-[#1E2B3A]">Full-Funnel Digital Marketing & Development Solutions</span>
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#B76E79] rounded-full flex items-center justify-center mt-1 shadow-sm">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                  <p className="text-[#4A5568] text-base lg:text-lg">
                    <span className="font-semibold text-[#1E2B3A]">Custom Website, App, and CRM Development</span>
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#B76E79] rounded-full flex items-center justify-center mt-1 shadow-sm">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                  <p className="text-[#4A5568] text-base lg:text-lg">
                    <span className="font-semibold text-[#1E2B3A]">Data-Driven SEO and Growth Strategies</span>
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#B76E79] rounded-full flex items-center justify-center mt-1 shadow-sm">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                  <p className="text-[#4A5568] text-base lg:text-lg">
                    <span className="font-semibold text-[#1E2B3A]">Multi-Platform Digital Marketing for Scalable Results</span>
                  </p>
                </div>
              </div>
              
              {/* Enquiry Button - Professional styling */}
              <div className="mt-10">
                <button 
                  onClick={goToContact} 
                  className="magnet flex items-center gap-2 transition bg-[#1E2B3A] hover:bg-[#2A4B7C] text-white py-3 px-8 rounded-full border-none shadow-lg hover:shadow-xl text-lg"
                >
                  <AnimatedButton text="ENQUIRY" />
                </button>
              </div>
            </div>
            
            {/* Right Column - Funnel Infographic */}
            <div 
              ref={rightColumnRef}
              className="w-full lg:w-1/2 flex justify-center"
            >
              <div 
                ref={funnelRef}
                className="relative w-full max-w-md"
              >
                {/* Funnel Graphic - Professional colors */}
                <div className="relative flex flex-col items-center">
                  
                  {/* Top Layer - Data & Insights */}
                  <div className="w-full bg-gradient-to-r from-[#2A4B7C] to-[#1E2B3A] rounded-t-3xl p-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-white font-bold text-xl mb-3 flex items-center gap-2">
                      <i className="fas fa-chart-line text-[#B76E79]"></i>
                      Data & Insights
                    </h3>
                    <ul className="space-y-2 text-white/90 text-sm">
                      <li className="flex items-center gap-2">
                        <i className="fas fa-circle text-[#B76E79] text-[6px]"></i>
                        Market Research
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-circle text-[#B76E79] text-[6px]"></i>
                        SEO Intelligence
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-circle text-[#B76E79] text-[6px]"></i>
                        User Behavior Analysis
                      </li>
                    </ul>
                  </div>
                  
                  {/* Middle Layer - Growth Strategies */}
                  <div className="w-[90%] bg-gradient-to-r from-[#5D4E6D] to-[#2A4B7C] rounded-2xl p-6 -mt-4 shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-white font-bold text-xl mb-3 flex items-center gap-2">
                      <i className="fas fa-bullseye text-[#B76E79]"></i>
                      Growth Strategies
                    </h3>
                    <ul className="space-y-2 text-white/90 text-sm">
                      <li className="flex items-center gap-2">
                        <i className="fas fa-circle text-[#B76E79] text-[6px]"></i>
                        Targeted Campaigns
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-circle text-[#B76E79] text-[6px]"></i>
                        Platform Optimization
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-circle text-[#B76E79] text-[6px]"></i>
                        Brand Messaging
                      </li>
                    </ul>
                  </div>
                  
                  {/* Bottom Layer - Higher ROI */}
                  <div className="w-[80%] bg-gradient-to-r from-[#B76E79] to-[#5D4E6D] rounded-2xl p-6 -mt-4 shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-white font-bold text-xl mb-3 flex items-center gap-2">
                      <i className="fas fa-chart-pie text-[#FFE5B4]"></i>
                      Higher ROI
                    </h3>
                    <ul className="space-y-2 text-white/90 text-sm">
                      <li className="flex items-center gap-2">
                        <i className="fas fa-circle text-[#FFE5B4] text-[6px]"></i>
                        Lead Generation
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-circle text-[#FFE5B4] text-[6px]"></i>
                        Conversion Optimization
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-circle text-[#FFE5B4] text-[6px]"></i>
                        Customer Retention
                      </li>
                    </ul>
                  </div>
                  
                  {/* Funnel connector lines */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-[#2A4B7C] via-[#5D4E6D] to-[#B76E79] opacity-30 -z-10"></div>
                </div>
                
                {/* Decorative elements - Professional */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#B76E79]/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#5D4E6D]/20 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>          
  )
}

export default About