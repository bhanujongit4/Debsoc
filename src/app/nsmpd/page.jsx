"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Raleway, Open_Sans } from 'next/font/google'
import Link from 'next/link';

const raleway = Raleway({ 
  subsets: ['latin'],
  weight: ['500'], // Just the weight needed for headings
})
const opensans = Open_Sans({ 
  subsets: ['latin'],
  weight: ['500'], // Just the weight needed for body text
})

const NSMPDPage = () => {
  // Sample slideshow images - replace with your actual images
  const slideshowImages = [
    {
      id: 1,
      image_url: "/images/nsmbanner1.jpg",
      title: "Netaji Subhas Memorial Parliamentary Debate 2024",
      description: "Join us for the premier parliamentary debate competition at NSUT this year!",
      date: "April 12-14, 2025",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSf4Ciq7ZSQ7STrwEaZnpZsPF0IDza9chGKfF7e150qzg5_CvQ/viewform"
    },
    {
      id: 2,
      image_url: "/images/iasa.jpg",
      title: "IA/SA Forms Out",
      description: "We are pleased to open the IA/SA forms for the sixth edition of the Netaji Subhas Memorial Parliamentary Debate.",
      date: "The deadline for the same is 11:59 PM, 5th April 2025.",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSdwUpOVWBQObwqRd3-axYgmh7zabzkuLG4qxYuG3wNmaY_3bg/viewform"
    },

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
    // Slideshow timer
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slideshowImages.length]);

  // Colors from the NSMPD theme
  const colors = {
    cream: "#FFF8E7",
    creamDark: "#FFFDD0",
    darkBrown: "#2D1A1A",
    coral: "#FF6B63",
    white: "#FFFFFF",
    lightbrown: '#735151'
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundColor: colors.lightbrown }}
    >
      {/* Hero Section with Responsive Background and Overlay */}
<div className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-screen">
  {/* Desktop/Laptop background (hidden on small screens) */}
  <div 
    className="hidden md:block absolute inset-0 w-full h-full"
    style={{
      backgroundImage: `url("/images/banner1.jpg")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: colors.cream
    }}
  >
    {/* Overlay for translucency */}
    <div className="absolute inset-0 bg-amber-100 opacity-75"></div>
  </div>

  {/* Mobile background (hidden on medium and larger screens) */}
  <div 
    className="block md:hidden absolute inset-0 w-full h-full"
    style={{
      backgroundImage: `url("/images/mobbanner.jpg")`,
      backgroundSize: 'contain',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
      backgroundColor: colors.cream
    }}
  >
    {/* Overlay for translucency */}
    <div className="absolute inset-0 bg-amber-100 opacity-85"></div>
  </div>

  {/* Hero content overlay */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
    {/* Logo on top */}
    <motion.img 
      src="/images/nsmlogo75.png" 
      alt="NSMPD Logo" 
      className="w-48 md:w-96 mb-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    />

    
    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
      className={`${opensans.className} text-xl md:text-2xl mt-4`}
      
    ><div className='text-red-500'>
      APRIL 12-14, 2025</div>
    </motion.p>
  </div>
</div>


      {/* About Section */}
      <div 
        className={`${raleway.className} relative py-16 px-6`}
        style={{ backgroundColor: colors.creamDark }}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
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
      <div className={`${raleway.className} relative py-20 px-6 bg-gradient-to-b from-darkBrown to-transparent`} >
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
                    <p style={{ color: colors.white }}>
                      {slideshowImages[currentSlide].date}
                    </p>

                    <Link href={slideshowImages[currentSlide].link} className="inline-block" target='blank'>
                    <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            className="px-8 py-3 rounded-lg text-lg font-semibold transition-transform hover:scale-105 w-full sm:w-auto"
            style={{ backgroundColor: colors.darkBrown, color: colors.cream }}
          >
            Register Now
          </motion.button>
                    </Link>
                  </div>
                  <div className="relative rounded-xl overflow-hidden">
                  <div className="w-1/2 mx-auto">
                   <img
                src={slideshowImages[currentSlide].image_url}
                alt={slideshowImages[currentSlide].title}
                className="object-contain w-full h-auto rounded-xl"
                  />
                 </div>

                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slideshowImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300`}
                style={{ 
                  backgroundColor: index === currentSlide ? colors.coral : colors.cream,
                  opacity: index === currentSlide ? 1 : 0.4
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Program Highlights Section */}
      <div 
        className={`${raleway.className} relative py-16 px-6`}
        style={{ backgroundColor: colors.white }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
          style={{ color: colors.darkBrown }}
        >
          Event Schedule
        </motion.h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
            className="p-6 rounded-lg shadow-md"
            style={{ backgroundColor: 'rgba(45, 26, 26, 0.1)' }}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ color: colors.coral }}>Day 1</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 mt-1 mr-2 rounded-full" style={{ backgroundColor: colors.coral }}></span>
                <span className="flex-1" style={{ color: colors.darkBrown }}>Registration & Opening Ceremony</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 mt-1 mr-2 rounded-full" style={{ backgroundColor: colors.coral }}></span>
                <span className="flex-1" style={{ color: colors.darkBrown }}>Inaugural Address</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 mt-1 mr-2 rounded-full" style={{ backgroundColor: colors.coral }}></span>
                <span className="flex-1" style={{ color: colors.darkBrown }}>Orientation Session</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 mt-1 mr-2 rounded-full" style={{ backgroundColor: colors.coral }}></span>
                <span className="flex-1" style={{ color: colors.darkBrown }}>Preliminary Rounds 1-2</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}
            className="p-6 rounded-lg shadow-md"
            style={{ backgroundColor: 'rgba(45, 26, 26, 0.1)' }}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ color: colors.coral }}>Day 2</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 mt-1 mr-2 rounded-full" style={{ backgroundColor: colors.coral }}></span>
                <span className="flex-1" style={{ color: colors.darkBrown }}>Preliminary Rounds 3-4</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 mt-1 mr-2 rounded-full" style={{ backgroundColor: colors.coral }}></span>
                <span className="flex-1" style={{ color: colors.darkBrown }}>Octo-Finals</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 mt-1 mr-2 rounded-full" style={{ backgroundColor: colors.coral }}></span>
                <span className="flex-1" style={{ color: colors.darkBrown }}>Quarter-Finals</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 mt-1 mr-2 rounded-full" style={{ backgroundColor: colors.coral }}></span>
                <span className="flex-1" style={{ color: colors.darkBrown }}>Formal Networking Gala</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.6 } }}
            className="p-6 rounded-lg shadow-md md:col-span-2"
            style={{ backgroundColor: 'rgba(45, 26, 26, 0.1)' }}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ color: colors.coral }}>Day 3</h3>
            <ul className="space-y-3 md:columns-2 md:gap-x-8">
              <li className="flex items-start break-inside-avoid">
                <span className="inline-block w-4 h-4 mt-1 mr-2 rounded-full" style={{ backgroundColor: colors.coral }}></span>
                <span className="flex-1" style={{ color: colors.darkBrown }}>Semi-Finals</span>
              </li>
              <li className="flex items-start break-inside-avoid">
                <span className="inline-block w-4 h-4 mt-1 mr-2 rounded-full" style={{ backgroundColor: colors.coral }}></span>
                <span className="flex-1" style={{ color: colors.darkBrown }}>Grand Finale</span>
              </li>
              <li className="flex items-start break-inside-avoid">
                <span className="inline-block w-4 h-4 mt-1 mr-2 rounded-full" style={{ backgroundColor: colors.coral }}></span>
                <span className="flex-1" style={{ color: colors.darkBrown }}>Prize Distribution</span>
              </li>
              <li className="flex items-start break-inside-avoid">
                <span className="inline-block w-4 h-4 mt-1 mr-2 rounded-full" style={{ backgroundColor: colors.coral }}></span>
                <span className="flex-1" style={{ color: colors.darkBrown }}>Closing Ceremony</span>
              </li>
            </ul>
          </motion.div>
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
          Ready to Join NSMPD 2025?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          className="text-xl mb-8"
          style={{ color: colors.darkBrown }}
        >
          Registration is now open for individual speakers and teams!
        </motion.p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            className="px-8 py-3 rounded-lg text-lg font-semibold transition-transform hover:scale-105 w-full sm:w-auto"
            style={{ backgroundColor: colors.darkBrown, color: colors.cream }}
          >
            <Link target='blank' href="https://docs.google.com/forms/d/e/1FAIpQLSf4Ciq7ZSQ7STrwEaZnpZsPF0IDza9chGKfF7e150qzg5_CvQ/viewform">
      Register Now
    </Link>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default NSMPDPage;
