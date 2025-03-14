'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Raleway } from 'next/font/google';
import { supabase } from '../../lib/supabase';

const raleway = Raleway({ 
  subsets: ['latin'],
  weight: ['500', '700'], 
});

const BlogPost = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const params = useParams();
  const id = params?.id;
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        if (data) {
          setBlog(data);
        } else {
          console.log("No such blog!");
        }
      } catch (error) {
        console.error("Error fetching blog: ", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className={`${raleway.className} min-h-screen bg-black flex items-center justify-center relative overflow-hidden`}>
        {/* Cursor light effect */}
        <div
          className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(242, 229, 231, 0.15), transparent 80%)`
          }}
        />
        
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-0" />
        
        <div className="relative z-10 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className={`${raleway.className} min-h-screen bg-black flex items-center justify-center text-white relative overflow-hidden`}>
        {/* Cursor light effect */}
        <div
          className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(242, 229, 231, 0.15), transparent 80%)`
          }}
        />
        
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-0" />
        
        <div className="relative z-10 bg-black/40 backdrop-blur-sm rounded-lg p-8 border border-red-500/20 shadow-lg">
          Blog not found
        </div>
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
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-red-500 mb-2 sm:text-5xl sm:tracking-tight lg:text-6xl">
            {blog.title}
          </h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mt-10"
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-red-500/20 shadow-lg w-full max-w-4xl">
            <Image
              className="object-contain w-full rounded-lg"
              src={blog.image_url}
              alt={blog.title}
              width={800}
              height={500}
            />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 max-w-4xl mx-auto text-lg text-gray-300 bg-black/40 backdrop-blur-sm rounded-lg p-8 border border-red-500/20 shadow-lg"
        >
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {blog.content}
          </div>
        </motion.div>
      </div>
      
      <div className="relative z-10 text-center text-gray-500 text-sm py-8">
        <p>© 2025 Debsoc NSUT</p>
      </div>
    </div>
  );
};

export default BlogPost;