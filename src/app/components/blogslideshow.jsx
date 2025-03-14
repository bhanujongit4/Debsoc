"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Raleway } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from "../lib/supabase";

const raleway = Raleway({ 
  subsets: ['latin'],
  weight: ['500'],
})

const BlogSlideshow = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const blogsPerPage = 3;

  useEffect(() => {
    fetchBlogs();
    
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalPages]);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentBlogs = blogs.slice(
    currentPage * blogsPerPage,
    (currentPage + 1) * blogsPerPage
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-white">
        Loading...
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <p className="text-center text-gray-400">
        No blogs found.
      </p>
    );
  }

  return (
    <div className={`${raleway.className} relative w-full bg-transparent py-4 px-4`}>
     <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.7)_20%,rgba(0,0,0,0.5)_80%,rgba(0,0,0,0.1)_100%)]"></div>
      

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-white mb-16 relative"
      >
        Latest Blogs
      </motion.h2>

      <div className="relative max-w-6xl mx-auto">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {currentBlogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={blog.image_url}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4 line-clamp-2">
                      {blog.title}
                    </h3>
                    <div className="space-y-4">
                      <hr className="border-red-500/40" />
                      <Link 
                        href={`/blogs/${blog.id}`}
                        className="inline-block text-red-400 hover:text-red-300 transition-colors duration-200"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {blogs.length > blogsPerPage && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-red-500/80 p-2 rounded-full text-white hover:bg-red-400 transition-colors duration-200 z-10"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-red-500/80 p-2 rounded-full text-white hover:bg-red-400 transition-colors duration-200 z-10"
              aria-label="Next page"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center space-x-2 mt-8 relative z-10">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    currentPage === index
                      ? "bg-red-500"
                      : "bg-gray-600"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogSlideshow;