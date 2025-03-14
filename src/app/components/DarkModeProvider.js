// components/DarkModeProvider.js
'use client';

import { useEffect } from 'react';

export function DarkModeProvider({ children }) {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return children;
}
