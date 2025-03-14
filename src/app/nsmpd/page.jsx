"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Raleway, Open_Sans } from 'next/font/google'

const raleway = Raleway({ 
  subsets: ['latin'],
  weight: ['500'], // Just the weight needed for h1
})
const opensans = Open_Sans({ 
  subsets: ['latin'],
  weight: ['500'], // Just the weight needed for h1
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
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Slideshow timer for the highlight section
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slideshowImages.length]);

  // Colors based on the NSMPD image you shared
  const colors = {
    cream: "#FFF8E7",
    creamdark: "#FFFDD0",
    white: "#FFFFFF",
    darkBrown: "#2D1A1A",
    coral: "#FF6B63",
    black:'#000000',
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundColor: colors.darkBrown }}
    >
      
      {/* Hero Section with unified background color */}
<div className="relative min-h-screen" style={{ backgroundColor: colors.cream }}>
  {/* Logo at top left */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
    className="absolute top-20 left-8 z-10"
  >
    <img src="images/nsmlogomin.png" alt="Nsm" className="w-64 md:w-96" />
  
  </motion.div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen pt-32 md:pt-0">
    {/* Left side - Content */}
    <div className={`${opensans.className} relative flex flex-col items-start justify-center p-6 sm:p-8 md:p-12`}>
  {/* Logo remains positioned absolutely in the parent container */}
  
  {/* Title below logo - positioned with responsive spacing */}
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0, transition: { delay: 0.55 } }}
    className="text-sm sm:text-base md:text-base font-bold mb-2 pt-16 sm:pt-20 md:pt-36" // Responsive padding
    style={{ color: colors.darkBrown }}
  >
    Netaji Subhas Memorial Parliamentary Debate
  </motion.h1>
  
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
    className="text-lg sm:text-xl max-w-xl mb-6 sm:mb-8 mt-3 sm:mt-4" // Responsive spacing and font size
    style={{ color: colors.darkBrown }}
  >
    Join us for the most prestigious parliamentary debate competition at NSUT this year!
  </motion.p>
  
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}
    className="text-2xl sm:text-3xl mb-6 sm:mb-8 font-extrabold" // Responsive font size and spacing
    style={{ color: colors.darkBrown }}
  >
    April 12-14 2025
  </motion.p>
  
  <motion.button
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0, transition: { delay: 0.8 } }}
    className="mt-2 sm:mt-4 px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-semibold transition-transform hover:scale-105"
    style={{ backgroundColor: colors.coral, color: colors.white }}
  >
    Register Now
  </motion.button>
</div>
    
    {/* Right side - Schedule */}
    <div className={`${raleway.className} relative p-8 md:p-12 flex flex-col justify-center`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8"
        style={{ color: colors.darkBrown }}
      >
        Event Schedule
      </motion.h2>
      
      <div className="space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
        >
          <div className="text-left">
            <div className="inline-block px-4 py-2 rounded-lg" style={{ backgroundColor: colors.coral }}>
              <h3 className="font-bold" style={{ color: colors.darkBrown }}>Day 1</h3>
              <p className="text-sm" style={{ color: colors.darkBrown }}>April 12</p>
            </div>
          </div>
          <div className="flex-1 p-4 rounded-lg" style={{ backgroundColor: 'rgba(45, 26, 26, 0.1)' }}>
            <h4 className="font-semibold" style={{ color: colors.coral }}>Opening Ceremony & Preliminary Rounds</h4>
            <p className="mt-2 text-sm" style={{ color: colors.darkBrown }}>Registration, inaugural address, orientation session, and first two preliminary rounds.</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
        >
          <div className="text-left">
            <div className="inline-block px-4 py-2 rounded-lg" style={{ backgroundColor: colors.coral }}>
              <h3 className="font-bold" style={{ color: colors.darkBrown }}>Day 2</h3>
              <p className="text-sm" style={{ color: colors.darkBrown }}>April 13</p>
            </div>
          </div>
          <div className="flex-1 p-4 rounded-lg" style={{ backgroundColor: 'rgba(45, 26, 26, 0.1)' }}>
            <h4 className="font-semibold" style={{ color: colors.coral }}>Advanced Rounds & Networking Gala</h4>
            <p className="mt-2 text-sm" style={{ color: colors.darkBrown }}>Preliminary rounds 3-4, octo-finals, quarter-finals, and the formal networking gala.</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
          className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
        >
          <div className="text-left">
            <div className="inline-block px-4 py-2 rounded-lg" style={{ backgroundColor: colors.coral }}>
              <h3 className="font-bold" style={{ color: colors.darkBrown }}>Day 3</h3>
              <p className="text-sm" style={{ color: colors.darkBrown }}>April 14</p>
            </div>
          </div>
          <div className="flex-1 p-4 rounded-lg" style={{ backgroundColor: 'rgba(45, 26, 26, 0.1)' }}>
            <h4 className="font-semibold" style={{ color: colors.coral }}>Finals & Closing Ceremony</h4>
            <p className="mt-2 text-sm" style={{ color: colors.darkBrown }}>Semi-finals, grand finale, prize distribution, and closing ceremony.</p>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
</div>

      {/* About Section */}
      <div 
        className={`${raleway.className} relative py-16 px-6`}
        style={{ backgroundColor: colors.creamdark }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8"
          style={{ color: colors.darkBrown }}
        >
          About NSMPD
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg text-center mb-6"
            style={{ color: colors.darkBrown }}
          >
            Netaji Subhas Memorial Parliamentary Debate is the flagship parliamentary debate competition hosted by Netaji Subhas University of Technology, bringing together talented debaters from across the country to engage in constructive discourse on pressing national and global issues.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            className="text-lg text-center mb-10"
            style={{ color: colors.darkBrown }}
          >
            With over 250 participants each year, NSMPD provides a platform for students to enhance their public speaking, critical thinking, and persuasive argumentation skills in a competitive yet collaborative environment.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              className="p-6 rounded-lg"
              style={{ backgroundColor: colors.coral }}
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.darkBrown }}>4+ Debate Formats</h3>
              <p style={{ color: colors.darkBrown }}>From British Parliamentary to Asian Parliamentary, experience diverse debate formats</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
              className="p-6 rounded-lg"
              style={{ backgroundColor: colors.coral }}
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.darkBrown }}>250+ Participants</h3>
              <p style={{ color: colors.darkBrown }}>Connect with passionate debaters from top universities across India</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
              className="p-6 rounded-lg"
              style={{ backgroundColor: colors.coral }}
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.darkBrown }}>₹60,000 in Prizes</h3>
              <p style={{ color: colors.darkBrown }}>Compete for prestigious awards and cash prizes for best speakers and teams</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slideshow Section */}
      <div className={`${raleway.className} relative py-20 px-6 bg-gradient-to-b from-darkBrown to-transparent`}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-16"
          style={{ color: colors.cream }}
        >
          NSMPD Highlights
        </motion.h2>

        <div className="max-w-6xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              {slideshowImages[currentSlide] && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6 flex flex-col justify-center">
                    <h2 className="text-4xl font-bold" style={{ color: colors.cream }}>
                      {slideshowImages[currentSlide].title}
                    </h2>
                    <p className="text-lg" style={{ color: colors.cream, opacity: 0.8 }}>
                      {slideshowImages[currentSlide].description}
                    </p>
                    <p style={{ color: colors.coral }}>
                      {slideshowImages[currentSlide].date}
                    </p>
                  </div>
                  <div className="relative rounded-xl overflow-hidden">
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
          </div>
          </div>
         
      {/* Call to Action */}
      <div 
        className={`${raleway.className} relative py-16 px-6 text-center`}
        style={{ backgroundColor: colors.coral }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6"
          style={{ color: colors.darkBrown }}
        >
          Ready to Join NSMPD 2024?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          className="text-xl mb-8"
          style={{ color: colors.darkBrown }}
        >
          Registration is now open for individual speakers and teams!
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
          className="px-8 py-3 rounded-lg text-lg font-semibold transition-transform hover:scale-105"
          style={{ backgroundColor: colors.darkBrown, color: colors.cream }}
        >
          Register Now
        </motion.button>

      </div>
      </div>
    
  );
};

export default NSMPDPage;