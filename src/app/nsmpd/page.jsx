"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Raleway, Open_Sans } from 'next/font/google'

const raleway = Raleway({ 
  subsets: ['latin'],
  weight: ['500', '700'], // Added 700 for bold headers
})

const opensans = Open_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Added more weights for better typography
})

const NSMPDPage = () => {
  // Sample slideshow images - replace with your actual images
  const slideshowImages = [
    {
      id: 1,
      image_url: "/images/favicon.png",
      title: "NSUT Parliamentary Debate 2024",
      description: "Join us for the premier parliamentary debate competition at NSUT this year!",
      date: "April 12, 2025"
    },
    {
      id: 2,
      image_url: "/images/nsmlogo.png",
      title: "Break Categories",
      description: "Open and Novice . Less than 3 open breaks",
      date: "Registration closes April 3, 2025"
    },
    {
      id: 3,
      image_url: "/images/pd_card.jpg",
      title: "Random",
      description: "Connect with debaters from across the country at NSMPD",
      date: "April 13, 2025"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if user is on mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Slideshow timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slideshowImages.length]);

  // Colors based on the NSMPD theme
  const colors = {
    cream: "#FFF8E7",
    creamDark: "#FFFDD0",
    white: "#FFFFFF",
    darkBrown: "#2D1A1A",
    coral: "#FF6B63",
    black: "#000000",
  };

  // Animation variants for better reusability
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: (delay = 0) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.5 } }),
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section 
        className="relative w-full" 
        style={{ backgroundColor: colors.cream }}
      >
        {/* Logo */}
        <motion.div
          initial={fadeInUp.initial}
          animate={fadeInUp.animate(0.5)}
          className="absolute top-6 sm:top-8 md:top-12 lg:top-16 left-4 sm:left-6 md:left-8 lg:left-12 z-10"
        >
          <img 
            src="images/nsmlogomin.png" 
            alt="NSMPD Logo" 
            className="w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72"
          />
        </motion.div>
        
        {/* Main content */}
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 min-h-screen pt-24 sm:pt-28 md:pt-0">
          {/* Left side - Content */}
          <div className={`${opensans.className} flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 pt-20 md:pt-32 lg:pt-36`}>
            <motion.h1
              initial={fadeInUp.initial}
              animate={fadeInUp.animate(0.55)}
              className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-2 sm:mb-3 md:mb-4"
              style={{ color: colors.darkBrown }}
            >
              Netaji Subhas Memorial Parliamentary Debate
            </motion.h1>
            
            <motion.p
              initial={fadeInUp.initial}
              animate={fadeInUp.animate(0.6)}
              className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl mb-4 sm:mb-6 md:mb-8"
              style={{ color: colors.darkBrown }}
            >
              Join us for the most prestigious parliamentary debate competition at NSUT this year!
            </motion.p>
            
            <motion.p
              initial={fadeInUp.initial}
              animate={fadeInUp.animate(0.7)}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 sm:mb-6 md:mb-8 font-extrabold"
              style={{ color: colors.darkBrown }}
            >
              April 12-14 2025
            </motion.p>
            
            <motion.button
              initial={fadeInUp.initial}
              animate={fadeInUp.animate(0.8)}
              className="self-start mt-2 sm:mt-4 px-6 py-2 sm:py-3 md:px-8 md:py-3 rounded-lg text-base sm:text-lg font-semibold transition-transform hover:scale-105"
              style={{ backgroundColor: colors.coral, color: colors.white }}
            >
              Register Now
            </motion.button>
          </div>
          
          {/* Right side - Schedule */}
          <div className={`${raleway.className} flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-0`}>
            <motion.h2
              initial={fadeInUp.initial}
              animate={fadeInUp.animate(0)}
              className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8"
              style={{ color: colors.darkBrown }}
            >
              Event Schedule
            </motion.h2>
            
            <div className="space-y-4 sm:space-y-6">
              {/* Day 1 */}
              <motion.div 
                initial={fadeInUp.initial}
                animate={fadeInUp.animate(0.1)}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start"
              >
                <div className="mb-2 sm:mb-0">
                  <div className="inline-block px-3 sm:px-4 py-2 rounded-lg" style={{ backgroundColor: colors.coral }}>
                    <h3 className="font-bold text-sm sm:text-base" style={{ color: colors.darkBrown }}>Day 1</h3>
                    <p className="text-xs sm:text-sm" style={{ color: colors.darkBrown }}>April 12</p>
                  </div>
                </div>
                <div className="flex-1 p-3 sm:p-4 rounded-lg w-full" style={{ backgroundColor: 'rgba(45, 26, 26, 0.1)' }}>
                  <h4 className="font-semibold text-sm sm:text-base" style={{ color: colors.coral }}>Opening Ceremony & Preliminary Rounds</h4>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm" style={{ color: colors.darkBrown }}>Registration, inaugural address, orientation session, and first two preliminary rounds.</p>
                </div>
              </motion.div>
              
              {/* Day 2 */}
              <motion.div 
                initial={fadeInUp.initial}
                animate={fadeInUp.animate(0.2)}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start"
              >
                <div className="mb-2 sm:mb-0">
                  <div className="inline-block px-3 sm:px-4 py-2 rounded-lg" style={{ backgroundColor: colors.coral }}>
                    <h3 className="font-bold text-sm sm:text-base" style={{ color: colors.darkBrown }}>Day 2</h3>
                    <p className="text-xs sm:text-sm" style={{ color: colors.darkBrown }}>April 13</p>
                  </div>
                </div>
                <div className="flex-1 p-3 sm:p-4 rounded-lg w-full" style={{ backgroundColor: 'rgba(45, 26, 26, 0.1)' }}>
                  <h4 className="font-semibold text-sm sm:text-base" style={{ color: colors.coral }}>Advanced Rounds & Networking Gala</h4>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm" style={{ color: colors.darkBrown }}>Preliminary rounds 3-4, octo-finals, quarter-finals, and the formal networking gala.</p>
                </div>
              </motion.div>
              
              {/* Day 3 */}
              <motion.div 
                initial={fadeInUp.initial}
                animate={fadeInUp.animate(0.3)}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start"
              >
                <div className="mb-2 sm:mb-0">
                  <div className="inline-block px-3 sm:px-4 py-2 rounded-lg" style={{ backgroundColor: colors.coral }}>
                    <h3 className="font-bold text-sm sm:text-base" style={{ color: colors.darkBrown }}>Day 3</h3>
                    <p className="text-xs sm:text-sm" style={{ color: colors.darkBrown }}>April 14</p>
                  </div>
                </div>
                <div className="flex-1 p-3 sm:p-4 rounded-lg w-full" style={{ backgroundColor: 'rgba(45, 26, 26, 0.1)' }}>
                  <h4 className="font-semibold text-sm sm:text-base" style={{ color: colors.coral }}>Finals & Closing Ceremony</h4>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm" style={{ color: colors.darkBrown }}>Semi-finals, grand finale, prize distribution, and closing ceremony.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        className={`${raleway.className} py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8`}
        style={{ backgroundColor: colors.creamDark }}
      >
        <div className="container mx-auto">
          <motion.h2
            initial={fadeInUp.initial}
            animate={fadeInUp.animate(0)}
            className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-10"
            style={{ color: colors.darkBrown }}
          >
            About NSMPD
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            <motion.p
              initial={fadeInUp.initial}
              animate={fadeInUp.animate(0.1)}
              className="text-base sm:text-lg text-center mb-4 sm:mb-6"
              style={{ color: colors.darkBrown }}
            >
              Netaji Subhas Memorial Parliamentary Debate is the flagship parliamentary debate competition hosted by Netaji Subhas University of Technology, bringing together talented debaters from across the country to engage in constructive discourse on pressing national and global issues.
            </motion.p>
            
            <motion.p
              initial={fadeInUp.initial}
              animate={fadeInUp.animate(0.2)}
              className="text-base sm:text-lg text-center mb-8 sm:mb-10"
              style={{ color: colors.darkBrown }}
            >
              With over 250 participants each year, NSMPD provides a platform for students to enhance their public speaking, critical thinking, and persuasive argumentation skills in a competitive yet collaborative environment.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <motion.div
                initial={fadeInUp.initial}
                animate={fadeInUp.animate(0.3)}
                className="p-4 sm:p-6 rounded-lg h-full"
                style={{ backgroundColor: colors.coral }}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3" style={{ color: colors.darkBrown }}>4+ Debate Formats</h3>
                <p className="text-sm sm:text-base" style={{ color: colors.darkBrown }}>From British Parliamentary to Asian Parliamentary, experience diverse debate formats</p>
              </motion.div>
              
              <motion.div
                initial={fadeInUp.initial}
                animate={fadeInUp.animate(0.4)}
                className="p-4 sm:p-6 rounded-lg h-full"
                style={{ backgroundColor: colors.coral }}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3" style={{ color: colors.darkBrown }}>250+ Participants</h3>
                <p className="text-sm sm:text-base" style={{ color: colors.darkBrown }}>Connect with passionate debaters from top universities across India</p>
              </motion.div>
              
              <motion.div
                initial={fadeInUp.initial}
                animate={fadeInUp.animate(0.5)}
                className="p-4 sm:p-6 rounded-lg h-full"
                style={{ backgroundColor: colors.coral }}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3" style={{ color: colors.darkBrown }}>₹60,000 in Prizes</h3>
                <p className="text-sm sm:text-base" style={{ color: colors.darkBrown }}>Compete for prestigious awards and cash prizes for best speakers and teams</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Slideshow Section */}
      <section className={`${raleway.className} py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-darkBrown to-transparent`}>
        <div className="container mx-auto">
          <motion.h2
            initial={fadeInUp.initial}
            animate={fadeInUp.animate(0)}
            className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16"
            style={{ color: colors.cream }}
          >
            NSMPD Highlights
          </motion.h2>

          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                {slideshowImages[currentSlide] && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-4 sm:space-y-6 flex flex-col justify-center order-2 md:order-1">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: colors.cream }}>
                        {slideshowImages[currentSlide].title}
                      </h2>
                      <p className="text-base sm:text-lg" style={{ color: colors.cream, opacity: 0.8 }}>
                        {slideshowImages[currentSlide].description}
                      </p>
                      <p className="text-sm sm:text-base" style={{ color: colors.coral }}>
                        {slideshowImages[currentSlide].date}
                      </p>
                    </div>
                    <div className="relative rounded-xl overflow-hidden h-48 sm:h-64 md:h-full order-1 md:order-2">
                      <img
                        src={slideshowImages[currentSlide].image_url}
                        alt={slideshowImages[currentSlide].title}
                        className="object-cover w-full h-full rounded-xl"
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            
            {/* Slideshow dots navigation */}
            <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
              {slideshowImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-coral' : 'bg-cream opacity-50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
         
      {/* Call to Action */}
      <section 
        className={`${raleway.className} py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 text-center`}
        style={{ backgroundColor: colors.coral }}
      >
        <div className="container mx-auto max-w-3xl">
          <motion.h2
            initial={fadeInUp.initial}
            animate={fadeInUp.animate(0)}
            className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
            style={{ color: colors.darkBrown }}
          >
            Ready to Join NSMPD 2024?
          </motion.h2>
          
          <motion.p
            initial={fadeInUp.initial}
            animate={fadeInUp.animate(0.2)}
            className="text-lg sm:text-xl mb-6 sm:mb-8"
            style={{ color: colors.darkBrown }}
          >
            Registration is now open for individual speakers and teams!
          </motion.p>
          
          <motion.button
            initial={fadeInUp.initial}
            animate={fadeInUp.animate(0.3)}
            className="px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-semibold transition-transform hover:scale-105"
            style={{ backgroundColor: colors.darkBrown, color: colors.cream }}
          >
            Register Now
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default NSMPDPage;
