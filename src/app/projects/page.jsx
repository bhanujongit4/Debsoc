'use client'

import { useState, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import Footer from '../components/Footer';

// Firebase initialization (unchanged)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsRef = collection(db, 'projects');
        const querySnapshot = await getDocs(projectsRef);
        const fetchedProjects = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <section className="container px-6 py-10 mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Projects
          </h1>
          <p className="max-w-xl mx-auto mt-5 text-xl text-gray-500 dark:text-gray-400">
            Explore my latest projects and creations.
          </p>
        </div>

        {loading ? (
          <p className="text-center mt-8 text-gray-600 dark:text-gray-400">Loading projects...</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-100 dark:bg-zinc-900 rounded-lg overflow-hidden shadow-md">
                <div className="relative">
                  <img className="object-cover object-center w-full h-64 lg:h-80" src={project.imageUrl} alt={project.title} />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {project.title}
                  </h2>
                  <hr className="border-yellow-500 dark:border-yellow-400 w-16 my-4" />
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.content}
                  </p>
                  <Link 
                    href={project.Link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-yellow-500 text-black dark:bg-yellow-400 dark:text-white rounded-md hover:bg-yellow-400 dark:hover:bg-yellow-300 transition duration-300"
                  >
                    View Project
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer></Footer>
    </div>
  )
}

export default Projects
