"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Raleway, Open_Sans } from 'next/font/google'
import Link from 'next/link';
const raleway = Raleway({ 
  subsets: ['latin'],
  weight: ['500'], // Just the weight needed for h1
})
const opensans = Open_Sans({ 
  subsets: ['latin'],
  weight: ['500'], // Just the weight needed for h1
})

const NSUTMUNPage = () => {

  
  // Sample slideshow images - replace with your actual images
  const slideshowImages = [
    {
      id: 1,
      image_url: "/images/mainbanner.jpg",
      title: "NSUT Model United Nations 2024",
      description: "Join us for the largest MUN conference at NSUT this year!",
      date: "May 15-17, 2024"
    },
    {
      id: 2,
      image_url: "/images/nsutmunbg.jpg",
      title: "NSUTMUN Committees",
      description: "Participate in exciting committees including UNSC, UNHRC, UNGA, and more",
      date: "Registration closes April 30, 2024"
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
    // Slideshow timer for the Secretariat replacement section
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slideshowImages.length]);

  const handleVideoEnded = () => {
    setVideoPlaying(false);
  };

  

  // Colors from the image
  const colors = {
    creme: "#eae6e0",
    tangerine: "#F7931E",
    black: "#1c1c1c"
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundColor: colors.black }}
    >
       
     
      {/* Hero Section with Responsive Background */}
      <div className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-screen">
  {/* Desktop/Laptop background (hidden on small screens) */}
  <div 
    className="hidden md:block absolute inset-0 w-full h-full"
    style={{
      backgroundImage: `url("/images/mainbanner.jpg")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  />
  
  {/* Mobile background (hidden on medium and larger screens) */}
  <div 
    className="block md:hidden absolute inset-0 w-full h-full"
    style={{
      backgroundImage: `url("/images/nsutmunbg.jpg")`,
      backgroundSize: 'contain',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
      backgroundColor: colors.black
    }}
  />
        
        {/* Content for the hero section goes here */}
      </div>

      {/* About Section */}
      <div 
        className={`${raleway.className} relative py-16 px-6`}
        style={{ backgroundColor: colors.creme }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8"
          style={{ color: colors.black }}
        >
          About NSUTMUN
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg text-center mb-6"
            style={{ color: colors.black }}
          >
            NSUT Model United Nations is an annual diplomacy conference hosted by Netaji Subhas University of Technology, bringing together students from across the nation to debate pressing global issues and develop solutions through international cooperation.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            className="text-lg text-center mb-10"
            style={{ color: colors.black }}
          >
            With over 300 delegates participating each year, NSUTMUN provides a platform for students to enhance their diplomatic skills, critical thinking, and leadership abilities through simulated UN committee sessions.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              className="p-6 rounded-lg"
              style={{ backgroundColor: colors.tangerine }}
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.black }}>6+ Committees</h3>
              <p style={{ color: colors.black }}>From UNSC to DISEC, participate in exciting committees covering diverse global issues</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
              className="p-6 rounded-lg"
              style={{ backgroundColor: colors.tangerine }}
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.black }}>300+ Delegates</h3>
              <p style={{ color: colors.black }}>Connect with passionate delegates from top universities across India</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
              className="p-6 rounded-lg"
              style={{ backgroundColor: colors.tangerine }}
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.black }}>₹50,000 in Prizes</h3>
              <p style={{ color: colors.black }}>Compete for prestigious awards and cash prizes across all committees</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slideshow Section (Replacing Secretariat) */}
      <div className={`${raleway.className} relative py-20 px-6 bg-gradient-to-b from-black to-transparent`}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-16"
          style={{ color: colors.creme }}
        >
          Highlights of NSUTMUN
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
                    <h2 className="text-4xl font-bold" style={{ color: colors.creme }}>
                      {slideshowImages[currentSlide].title}
                    </h2>
                    <p className="text-lg" style={{ color: colors.creme, opacity: 0.8 }}>
                      {slideshowImages[currentSlide].description}
                    </p>
                    <p style={{ color: colors.tangerine }}>
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

          {/* Slide Indicators */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slideshowImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300`}
                style={{ 
                  backgroundColor: index === currentSlide ? colors.tangerine : colors.creme,
                  opacity: index === currentSlide ? 1 : 0.4
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div 
        className={`${raleway.className} relative py-16 px-6 text-center`}
        style={{ backgroundColor: colors.tangerine }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6"
          style={{ color: colors.black }}
        >
          Ready to Join NSUTMUN 2024?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          className="text-xl mb-8"
          style={{ color: colors.black }}
        >
          Registration is now open for delegates and International Press!
        </motion.p>
        
       <div className="flex justify-center space-x-4 mt-6">
        {/* Read Brochure Button - Opens PDF */}
        <a href="/NSUTMUN_Brochure.pdf" target="_blank" rel="noopener noreferrer">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
            className="px-8 py-3 rounded-lg text-lg font-semibold transition-transform hover:scale-105"
            style={{ backgroundColor: colors.creme, color: colors.black }}
          >
            Read Brochure
          </motion.button>
        </a>

        {/* Register Now Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
          className="px-8 py-3 rounded-lg text-lg font-semibold transition-transform hover:scale-105"
          style={{ backgroundColor: colors.black, color: colors.creme }}
        >
            <Link target='blank' href="https://linktr.ee/NSUTMUN?fbclid=PAZXh0bgNhZW0CMTEAAab1z41rxKMzK6Hy97OD43bgPMzsdyrpdZcLF6Bre_6wwKLYpudvTWeJTIg_aem_a-kq22oUb-bdQiq1np9buw">
      Register Now
    </Link>
        </motion.button>



      </div>
      <div className='py-3'>
      <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
          className="px-8 py-3 rounded-lg text-lg font-semibold transition-transform hover:scale-105"
          style={{ backgroundColor: colors.creme, color: colors.black }}
        >
            <Link target='blank' href="https://www.instagram.com/nsutmodelun/">
      Follow Us
    </Link>
        </motion.button> </div>
      </div>
    </div>
  );
};

export default NSUTMUNPage;
