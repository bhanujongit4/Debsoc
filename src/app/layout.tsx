import { ThemeProvider } from './components/ThemeContext';
import Header from './components/Header';
import './globals.css';
import { ReactNode } from 'react';
import DarkModeProvider from './components/DarkModeProvider';

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Debsoc NSUT",
  description: "Debate n shi",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/debsoc logo 2.png" type="image/png" />
      </head>
      <body className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
        <DarkModeProvider />
        <ThemeProvider>
          <Header />
          <main className="container mx-auto ">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
