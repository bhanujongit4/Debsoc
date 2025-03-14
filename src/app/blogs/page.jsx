'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Raleway } from 'next/font/google';
import { supabase } from '../lib/supabase';

const raleway = Raleway({ 
  subsets: ['latin'],
  weight: ['500', '700'], 
});

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);

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
          <h1 className="text-4xl font-bold text-red-500 mb-2 sm:text-5xl">Blogs 📝</h1>
          <p className="max-w-2xl mx-auto mt-5 text-gray-300">
          Delving into complex issues, fostering critical thinking, and shaping informed perspectives through the power of structured debate.
          </p>
        </motion.div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {blogs.map((blog, index) => (
              <motion.div 
                key={blog.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden border border-red-500/20 shadow-lg"
              >
                <div className="relative">
                  <Image
                    className="object-cover object-center w-full h-64"
                    src={blog.image_url}
                    alt={blog.title}
                    width={500}
                    height={300}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white">
                    {blog.title}
                  </h2>
                  <hr className="w-24 my-4 border-red-500/40" />
                  <Link 
                    href={`/blogs/${blog.id}`} 
                    className="text-lg font-medium text-red-500 hover:text-red-400 transition-colors duration-300"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      
      <div className="relative z-10 text-center text-gray-500 text-sm py-8">
        <p>© 2025 Debsoc NSUT</p>
      </div>
    </div>
  );
};

export default Blogs;