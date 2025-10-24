"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '../lib/supabase';
import { Raleway } from 'next/font/google';

const raleway = Raleway({ 
  subsets: ['latin'],
  weight: ['500', '700'], 
});

const PDPage = () => {
  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchEvents();
    fetchMembers();

    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [events.length]);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('department', 'PD')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching events:', error);
    }
    
    if (data) setEvents(data);
  };

  const getMemberDepartment = (member) => {
    // Determine which department to use for sorting
    if (member.por === 'President' || member.por === 'Vice President' || 
        member.por === 'Treasurer' || member.por === 'Execomm') {
      return member.base_department;
    }
    return member.por_department || member.base_department;
  };

  const fetchMembers = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .or('base_department.eq.PD, por_department.eq.PD');

      if (error) throw error;

      // Define position hierarchy
      const porPriority = {
        'President': 1,
        'Vice President': 2,
        'Director': 3,
        'Deputy Director': 4,
        'Mentor': 5,
        'Treasurer': 6,
        'Execomm': 7
      };

      // Sort the members
      const sortedMembers = data.sort((a, b) => {
        // First, check if either member is in PD department
        const aIsPD = getMemberDepartment(a) === 'PD';
        const bIsPD = getMemberDepartment(b) === 'PD';

        if (aIsPD && !bIsPD) return -1;
        if (!aIsPD && bIsPD) return 1;

        // If both are PD or both are not PD, sort by position
        const posA = porPriority[a.por] || 999;
        const posB = porPriority[b.por] || 999;

        return posA - posB;
      });

      setMembers(sortedMembers);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

 const formatRole = (member) => {
    let role = member.por;
    
    // Map Treasurer to Executive Director for display
    if (member.por === 'Treasurer') {
      role = 'Executive Director';
    }
    
    // Only add department for Director/Deputy Director
    if (member.por === 'Director' || member.por === 'Deputy Director') {
      role += member.por_department ? `  ${member.por_department}` : '';
    }
    
    return role;
  };
    
    return role;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className={`${raleway.className} min-h-screen bg-black relative overflow-hidden`}>
      {/* Cursor light effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(242, 229, 231, 0.15), transparent 80%)`
        }}
      />
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-0" />

      <div className="relative z-10 container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-red-500 mb-2 sm:text-5xl">Parliamentary Debate </h1>
          <p className="max-w-2xl mx-auto mt-5 text-gray-300">
            Mastering the art of formal debate, developing persuasive arguments, and engaging in structured discourse through parliamentary procedures.
          </p>
        </motion.div>

        {/* Event Slideshow */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-6xl mx-auto relative h-[500px] mb-20"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {events[currentSlide] && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                  <div className="space-y-6 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-white">
                      {events[currentSlide].title}
                    </h2>
                    <hr className="w-24 my-4 border-red-500/40" />
                    <p className="text-gray-300 text-lg">
                      {events[currentSlide].description || "Join us for this exciting event!"}
                    </p>
                    <p className="text-red-500 font-medium">
                      {new Date(events[currentSlide].date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="relative rounded-lg overflow-hidden border border-red-500/20 shadow-lg">
                    <Image
                      src={events[currentSlide].image_url}
                      alt={events[currentSlide].title}
                      className="object-cover w-full h-full"
                      width={500}
                      height={300}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          
        </motion.div>

        {/* Members Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 mt-20"
        >
          <h2 className="text-4xl font-bold text-red-500 mb-2">Meet Our Team</h2>
          <p className="max-w-2xl mx-auto mt-5 text-gray-300">
            Dedicated debaters committed to excellence in parliamentary debate formats and public speaking.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden border border-red-500/20 shadow-lg"
            >
              <div className="relative p-6 flex justify-center">
                <Image
                  src={member.photo_url}
                  alt={member.name}
                  className="w-40 h-40 object-cover rounded-full border-4 border-red-500/40"
                  width={160}
                  height={160}
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-white">
                  {member.name}
                </h3>
                <hr className="w-16 my-3 mx-auto border-red-500/40" />
                <p className="text-red-500 font-medium">
                  {formatRole(member)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="relative z-10 text-center text-gray-500 text-sm py-8">
        <p>© 2025 Debsoc NSUT</p>
      </div>
    </div>
  );
};

export default PDPage;
