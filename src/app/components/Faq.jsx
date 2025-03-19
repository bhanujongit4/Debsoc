"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Raleway } from 'next/font/google';

const raleway = Raleway({ 
  subsets: ['latin'],
  weight: ['500'],
})

const TestimonialSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const testimonials = [
    {
      name: "Mehak Kala",
      role: "President",
      image: "images/Mehak.jpg",
      text: "My journey with DebSoc NSUT has been an incredible ride, one I never quite imagined. It started with me as a nervous first-year, just eager to learn the ropes of debating. I remember those initial debates, the shaky voice, the frantic research – it was all so new and exciting. But everyone was so welcoming, and I quickly found myself drawn to the energy and passion of the society.",
    },
    {
      name: "Aman Kumar Jha",
      role: "President",
      image: "images/aman.jpg",
      text: "My journey with DebSoc NSUT has been an incredible ride, one I never quite imagined. It started with me as a nervous first-year, just eager to learn the ropes of debating. I remember those initial debates, the shaky voice, the frantic research – it was all so new and exciting. But everyone was so welcoming, and I quickly found myself drawn to the energy and passion of the society.",
    },
    {
      name: "Mudit Maheshwari",
      role: "Vice President",
      image: "images/mudit.jpg",
      text: "My time at DebSoc has been nothing short of transformative. From being a shy kid from a small city to becoming a confident person interacting with international delegates, it has shaped my life far more than I had ever imagined. The sleepless nights with the friends I've made here, scrambling for last-minute event permissions, are some of the chaotic, memorable moments I'll cherish forever. DebSoc has truly been a huge part of my college life, with its ups and downs, and I wouldn’t change a thing about it. A part of me will definitely stay here, always.",
    },
    {
      name: "Vishwangi",
      role: "Vice President",
      image: "images/vishwangi.jpg",
      text: "My journey with DebSoc NSUT has been an incredible ride, one I never quite imagined. It started with me as a nervous first-year, just eager to learn the ropes of debating. I remember those initial debates, the shaky voice, the frantic research – it was all so new and exciting. But everyone was so welcoming, and I quickly found myself drawn to the energy and passion of the society.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className={`${raleway.className} relative w-full bg-transparent py-8 px-4`}>
    
      
     

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-white mb-16 relative"
      >
        Journey So Far
      </motion.h2>
        
      <div className="relative max-w-6xl mx-auto">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                <motion.div 
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={testimonials[currentSlide].image}
                    alt={testimonials[currentSlide].name}
                    className="w-48 h-48 rounded-full object-cover border-4 border-red-500/40"
                  />
                </motion.div>
                <div className="flex-1">
                  <p className="text-lg text-gray-300 italic mb-6 leading-relaxed">
                    "{testimonials[currentSlide].text}"
                  </p>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {testimonials[currentSlide].name}
                    </h3>
                    <p className="text-red-400 font-semibold">
                      {testimonials[currentSlide].role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-red-500/80 p-2 rounded-full text-white hover:bg-red-400 transition-colors duration-200 z-10"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-red-500/80 p-2 rounded-full text-white hover:bg-red-400 transition-colors duration-200 z-10"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="flex justify-center space-x-2 mt-8 relative z-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentSlide === index
                  ? "bg-red-500"
                  : "bg-gray-600"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlideshow;
