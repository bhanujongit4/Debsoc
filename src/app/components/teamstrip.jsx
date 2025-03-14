"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import { Raleway } from 'next/font/google';

const raleway = Raleway({ 
  subsets: ['latin'],
  weight: ['500'],
})

const MemberSlideshow = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  // Responsive members per page based on screen size
  const getMembersPerPage = () => {
    if (windowWidth < 640) return 1; // Mobile
    if (windowWidth < 768) return 2; // Small tablets
    if (windowWidth < 1024) return 3; // Tablets
    return 4; // Desktop
  };

  const membersPerPage = getMembersPerPage();

  useEffect(() => {
    fetchMembers();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Reset to first page when screen size changes to avoid empty pages
      setCurrentPage(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getMemberDepartment = (member) => {
    if (member.por === 'President' || member.por === 'Vice President' || 
        member.por === 'Treasurer' || member.por === 'Execomm') {
      return member.base_department;
    }
    return member.por_department || member.base_department;
  };

  const fetchMembers = async () => {
    try {
      // Fetch PD members
      const { data: pdData, error: pdError } = await supabase
        .from('team_members')
        .select('*')
        .or('base_department.eq.PD, por_department.eq.PD');

      if (pdError) throw pdError;

      // Fetch MUN members
      const { data: munData, error: munError } = await supabase
        .from('team_members')
        .select('*')
        .or('base_department.eq.MUN, por_department.eq.MUN');

      if (munError) throw munError;

      // Combine and deduplicate members (in case someone is in both departments)
      const combinedMembers = [...pdData, ...munData].filter((member, index, self) =>
        index === self.findIndex((m) => m.id === member.id)
      );

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
      const sortedMembers = combinedMembers.sort((a, b) => {
        // First, check if either member is in PD or MUN department
        const aIsDept = ['PD', 'MUN'].includes(getMemberDepartment(a));
        const bIsDept = ['PD', 'MUN'].includes(getMemberDepartment(b));

        if (aIsDept && !bIsDept) return -1;
        if (!aIsDept && bIsDept) return 1;

        // If both are in relevant departments or both aren't, sort by position
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
      role += member.por_department ? ` ${member.por_department}` : '';
    }
    
    return role;
  };

  const totalPages = Math.ceil(members.length / membersPerPage);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % Math.max(1, totalPages));
    }, 5000);
    return () => clearInterval(timer);
  }, [totalPages]);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % Math.max(1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + Math.max(1, totalPages)) % Math.max(1, totalPages));
  };

  const currentMembers = members.slice(
    currentPage * membersPerPage,
    (currentPage + 1) * membersPerPage
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-white">
        Loading...
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <p className="text-center text-gray-400">
        No team members found.
      </p>
    );
  }

  return (
    <div className={`${raleway.className} relative w-full bg-transparent py-8 sm:py-12 px-4`}>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-white mb-8 sm:mb-16 relative">
        Our Team
      </h1>

      <div className="relative">
        {/* Navigation buttons */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 z-10 hidden md:block">
          <button
            onClick={prevPage}
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 z-10 hidden md:block">
          <button
            onClick={nextPage}
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="Next page"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {currentMembers.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="bg-black/40 backdrop-blur-sm rounded-lg p-4 sm:p-6 transform transition-transform duration-300"
              >
                <div className="relative mb-4 flex justify-center">
                  <img
                    src={member.photo_url}
                    alt={member.name}
                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover rounded-full border-4 border-red-400"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2">
                    {member.name}
                  </h3>
                  <p className="text-red-400 font-semibold mb-2 line-clamp-2">
                    {formatRole(member)}
                  </p>
                  {member.sub_department && (
                    <p className="text-gray-300 text-sm sm:text-base line-clamp-1">
                      {member.sub_department}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile navigation buttons */}
        <div className="flex justify-between mt-6 md:hidden">
          <button
            onClick={prevPage}
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={nextPage}
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {members.length > membersPerPage && (
          <div className="flex justify-center space-x-2 mt-6 sm:mt-8 relative z-10">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${
                  currentPage === index
                    ? "bg-red-500"
                    : "bg-gray-600"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberSlideshow;