'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-black min-h-screen relative">
      <main className="relative">
        {/* Desktop background */}
        <div className="absolute inset-0 w-full h-full hidden sm:block">
          <Image
            src="/images/Frame"
            alt="Desktop background"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            quality={100}
            priority
            className="w-full h-full"
          />
        </div>

        {/* Mobile background */}
        <div className="absolute inset-0 w-full h-full sm:hidden">
          <div
            className="bg-cover bg-top h-screen"
            style={{
              backgroundImage: "url('images/theme.jpg')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top",
            }}
          >
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl lg:text-5xl">
              About DebSoc NSUT
            </h1>
            
            <div className="mt-6 max-w-3xl mx-auto text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
              <p className="mb-4">
                DebSoc NSUT is a premier debate society dedicated to fostering critical thinking, eloquence, and intellectual discourse. Our mission is to empower students with the skills of articulate communication and persuasive argumentation.
              </p>
              <p className="mb-4">
                Founded with the vision of creating a platform for intellectual growth, we organize debates, workshops, and competitions that challenge perspectives and broaden horizons. Our society is more than just a club—it's a community of passionate thinkers and communicators.
              </p>
              <p>
                We believe in the power of dialogue to bridge differences, challenge assumptions, and drive meaningful conversations that can transform perspectives and society.
              </p>
            </div>

            <div className="flex justify-center space-x-6 mt-8 mb-8">
              <a href="https://github.com/bhanujongit4" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-white hover:text-yellow-500 dark:hover:text-yellow-400">
                <FaGithub size={32} />
              </a>
              <a href="https://www.linkedin.com/in/aarohi-bhanuj-chowdhary-43636420a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-white hover:text-yellow-500 dark:hover:text-yellow-400">
                <FaLinkedin size={32} />
              </a>
              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-white hover:text-yellow-500 dark:hover:text-yellow-400">
                <FaTwitter size={32} />
              </a>
              <a href="https://www.instagram.com/bhanujchowdhary?igsh=Ynh6anEzMWpycm0=" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-white hover:text-yellow-500 dark:hover:text-yellow-400">
                <FaInstagram size={32} />
              </a>
            </div>

            <div className="mt-5 flex flex-col space-y-3 sm:flex-row sm:justify-center sm:space-x-3 sm:space-y-0">
              <Link href="/contact" className="rounded-md shadow w-full sm:w-auto">
                <span className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-red-500 hover:bg-red-400 dark:text-white dark:bg-red-550 dark:hover:bg-red-400">
                  Contact Us
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;