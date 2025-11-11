import React, { useState, useEffect } from 'react';

interface NavLink {
  text: string;
  link: string;
}

interface HeaderContent {
  navLinks: NavLink[];
  cta: {
    text: string;
    link: string;
  };
}

interface HeaderProps {
  content: HeaderContent;
}

const Header: React.FC<HeaderProps> = ({ content }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-gray-800' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold font-heading text-text-primary opacity-0 animate-fade-in-down">
          Xluma<span className="text-primary">.</span>in
        </a>
        <nav className="hidden md:flex items-center space-x-8">
          {content.navLinks.map((item, index) => (
            <a 
              key={item.text} 
              href={item.link} 
              className="text-text-secondary hover:text-primary transform hover:-translate-y-0.5 transition-all duration-300 opacity-0 animate-fade-in-down"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              {item.text}
            </a>
          ))}
        </nav>
        <a 
          href={content.cta.link} 
          className="hidden md:inline-block bg-primary text-background font-bold py-2 px-5 rounded-md transform hover:-translate-y-1 transition-all duration-300 opacity-0 animate-fade-in-down glow-shadow"
          style={{ animationDelay: '0.7s' }}
        >
          {content.cta.text}
        </a>
        <button className="md:hidden text-text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;