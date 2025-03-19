import { ThemeProvider } from './components/ThemeContext';
import Header from './components/Header';
import './globals.css';
import { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}
export const metadata = {
  title: "Debsoc NSUT",
  description: "Debate",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
     <head>
        <link rel="icon" href="/images/debsoc logo 2.png" type="image/png" />
      </head>
       <body className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
        <ThemeProvider>
          <Header />
           <main className="w-full min-h-screen flex flex-col">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
