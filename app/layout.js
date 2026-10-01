import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata = {
  title: 'ITZFIZZ | Scroll-Driven Hero Animation',
  description: 'High-performance automotive scroll-driven experience built with Next.js, Tailwind, and GSAP.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#08080a] text-white antialiased">
        {children}
      </body>
    </html>
  );
}