'use client';

import { useTheme } from './ThemeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';



export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className="p-2 rounded-md bg-gray-50 dark:bg-zinc-950 text-zinc-950 dark:text-white"
    >
{theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}

    </button>
  );
}