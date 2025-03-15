"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Raleway , Oxanium ,Open_Sans } from 'next/font/google'

const raleway = Raleway({ 
 subsets: ['latin'],
 weight: ['500'], // Just the weight needed for h1
})

const MUNPage = () => {
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
      .eq('department', 'MUN')
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
        .or('base_department.eq.MUN, por_department.eq.MUN');

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
        // First, check if either member is in MUN department
        const aIsMUN = getMemberDepartment(a) === 'MUN';
        const bIsMUN = getMemberDepartment(b) === 'MUN';

        if (aIsMUN && !bIsMUN) return -1;
        if (!aIsMUN && bIsMUN) return 1;

        // If both are MUN or both are not MUN, sort by position
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
    
    // Only add department for Director/Deputy Director
    if (member.por === 'Director' || member.por === 'Deputy Director') {
      role += member.por_department ? `  ${member.por_department}` : '';
    }
    
    return role;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-dark relative overflow-hidden">
      
      {/* Cursor light effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(242, 229, 231, 0.15), transparent 80%)`
        }}
      />

      {/* Hero Section with Event Slideshow */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/90 to-black" />
        
        <div className="relative pt-4 font-extrabold px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl text-center mb-12 text-red-500"
          >
            Model United Nations
          </motion.h1>

          {/* Event Slideshow */}
          <div className="max-w-6xl mx-auto relative h-[500px] mb-20">
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
                      <h2 className="text-4xl font-bold text-white">
                        {events[currentSlide].title}
                      </h2>
                      <p className="text-gray-300 text-lg">
                        {events[currentSlide].description || "Join us for this exciting event!"}
                      </p>
                      <p className="text-red-400">
                        {new Date(events[currentSlide].date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="relative rounded-xl overflow-hidden">
                      <img
                        src={events[currentSlide].image_url}
                        alt={events[currentSlide].title}
                        className="object-cover w-full h-full rounded-xl"
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentSlide ? 'bg-red-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Members Section */}
      <div className={`${raleway.className} relative py-20 px-6 bg-gradient-to-b from-black to-transparent`}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-16 text-white"
        >
          Meet Our Team
        </motion.h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/40 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative mb-4 flex justify-center">
                <img
                  src={member.photo_url}
                  alt={member.name}
                  className="w-48 h-48 object-cover rounded-full border-4 border-red-500/40"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-red-400 font-semibold mb-2">
                  {formatRole(member)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MUNPage;
