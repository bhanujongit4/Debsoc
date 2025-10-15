'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import FAQComponent from "../components/Faq";
import Team from "../components/teamstrip";
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Blog from "../components/blogslideshow";
import { Raleway, Open_Sans } from 'next/font/google';
import Footer from "../components/footer";

// Using the same font configuration as the NSMPD page
const raleway = Raleway({ 
  subsets: ['latin'],
  weight: ['500'],
});

const opensans = Open_Sans({ 
  subsets: ['latin'],
  weight: ['300'],
});



const HomePage = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [currentDept, setCurrentDept] = useState(0);
  


  const departments = [
    {
      title: "Parliamentary Debating",
      tagline: "An abode for the spirited and the bold who wish to question everything",
      description: "The Parliamentary Debating Team at NSUT is the epitome of tenacity and dedication. Having been around for more than five years, it has moulded ardent thinkers and dynamic speakers. Weekly debates, training sessions and active participation in tournaments are some key essentials of it.",
      image: "/images/manzarg.jpg",
      link: "/pd"
    },
    {
      title: "Model United Nations",
      tagline: "Ponder, propose, parley, persuade and procure with prudence",
      description: "Being adjudged as the best delegation in over half the conferences it attends, the MUN dept. provides one with a chance to not only experience moments of victory but to organize conferences, learning to work with your peers, juniors and seniors alike, voicing your opinions, moulding and adapting ideas, analyzing, strategizing and optimizing the solutions to problems.",
      image: "/images/card1.jpg",
      link: "/mun"
    },
    {
      title: "Literary Department",
      tagline: "Literature is the art of discovering something extraordinary about ordinary people, and saying with ordinary words something extraordinary",
      description: "Founded in 2015, As a member of the Literary Department, you are not just a participant in debates; you are a storyteller, a rhetorician, and a curator of the written and spoken word. We conduct activities and events throughout the year while also maintaining a stream of great literary content through our online channels. We are a vital part of DebSoc with some of the best events of the colloquium organized by us.",
      image: "/images/lit_card.png",
      link: "/"
    },
    {
      title: "General Debating",
      tagline: "Mastering the art of persuasion through open discourse",
      description: "The General Department has always stood by the students, especially the freshers', helping them get a grip over their language skills and fluency, and improving their spontaneity and creativity. Our doors are always open to anybody who is willing to learn and grow. With events like Thursdays At DebSoc, we train willing debaters and give them a chance to try out new formats of debating each week to hone their skills.",
      image: "/images/gd_card.png",
      link: "/"
    },
    {
      title: "Tech & Design",
      tagline: "Where creativity meets technology",
      description: "We work on designing the user interface and experience of the society's online platforms, aiming to make them intuitive and accessible by keeping the technological infrastructure robust and user-friendly. From tabby teams to social media handling, we ensure the smooth handling of various aspects of The Debating Society's operation",
      image: "/images/tnd_card.jpg",
      link: "/"
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const deptTimer = setInterval(() => {
      setCurrentDept((prev) => (prev + 1) % departments.length);
    }, 4000);
    return () => clearInterval(deptTimer);
  }, []);

  return (
    <div>

    <div className="overflow-x-hidden min-h-screen relative bg-center" 
      style={{
        backgroundImage: "url('/images/bg.jpeg')",
        backgroundSize: "contain",
        backgroundPosition: "top center",
        backgroundRepeat: "repeat",
      }}
    >
      {/* Different opacity for mobile (95%) and desktop (90%) */}
      <div className="absolute inset-0 bg-zinc-950 md:opacity-90 opacity-95"></div>
      
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="mb-4 text-center">
        <h1 className="font-sequel text-6xl md:text-8xl text-white mb-2">
        Deb<span className="text-white">Soc</span><span className="text-red-500"> NSUT</span>
        </h1>

          {/* Added tagline */}
          <p className="text-lg md:text-xl text-gray-300 italic mt-2">Möge Gott diese Charge segnen</p>
        </div>
    
        {/* Social Icons */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-4 md:space-x-6">
          {[
            { icon: FaLinkedin, href: "https://www.linkedin.com/company/debating-society-of-nsut/posts/?feedView=all" },
            { icon: FaTwitter, href: "https://twitter.com/yourusername" },
            { icon: FaInstagram, href: "https://www.instagram.com/debsocnsut/?hl=en" }
          ].map(({ icon: Icon, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white transition-colors duration-300"
            >
              <Icon size={28} className="md:size-10" />
            </a>
          ))}
        </div>
      </div>
   
    

      {/* Departments Section */}
      <div className="relative py-16 z-10">
        {/* Overlay that darkens the section and fades out */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black/10"></div>

        {/* Content inside the Department Section */}
        <div className="relative z-10">
          <h1 className={`text-3xl ${opensans.className} md:text-5xl text-white text-center mb-8`}>Our Departments</h1>
          <div className="max-w-6xl mx-auto px-4 md:h-[600px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDept}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                className="md:absolute inset-0 flex items-center"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl md:text-4xl text-red-500">{departments[currentDept].title}</h3>
                    <p className="text-lg md:text-xl italic text-gray-400">"{departments[currentDept].tagline}"</p>
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">{departments[currentDept].description}</p>
                    <Link href={departments[currentDept].link} className="inline-block">
                      <span className="text-emerald-600 hover:text-emerald-300 transition-colors">
                        Learn more
                      </span>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="relative h-[250px] md:h-[400px] rounded-xl overflow-hidden"
                  >
                    <Image
                      src={departments[currentDept].image}
                      alt={departments[currentDept].title}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Department navigation dots */}
            <div className="mt-8 md:absolute md:bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {departments.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDept(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentDept ? 'bg-red-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Section with proper spacing for mobile */}
      <div className="mt-16 md:mt-0">
        <Blog />
      </div>
      
      {/* Team Section */}
      <div className="mt-8">
        <Team />
      </div>
      
      {/* FAQ Section */}
      <div className="mt-8">
        <FAQComponent />
      </div>
      
    </div>
    <Footer />
    </div>
  );
};

export default HomePage;
