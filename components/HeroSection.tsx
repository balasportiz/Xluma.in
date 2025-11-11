import React, { useState, useEffect } from 'react';

interface Cta {
  text: string;
  link: string;
}

interface HeroContent {
  headline: string;
  subheadline: string;
  cta_primary: Cta;
  cta_secondary: Cta;
}

interface HeroProps {
  content: HeroContent;
}

const HeroSection: React.FC<HeroProps> = ({ content }) => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-background animate-shimmer-bg z-0"
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      ></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Cpath%20d%3D%22M0%2050H100M50%200V100%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.05)%22%20stroke-width%3D%221%22%2F%3E%3C%2Fsvg%3E')] opacity-50 z-10" style={{ transform: `translateY(${offsetY * 0.4}px)` }}></div>
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      
      <div className="container mx-auto px-6 relative z-20">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-heading text-text-primary leading-tight mb-4 opacity-0 animate-fade-in-up"
          dangerouslySetInnerHTML={{ __html: content.headline.replace('Elevate', '<span class="text-primary">Elevate</span>') }}
        >
        </h1>
        <p 
          className="text-lg md:text-xl max-w-3xl mx-auto text-text-secondary mb-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          {content.subheadline}
        </p>
        <div 
          className="flex justify-center items-center space-x-4 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          <a
            href={content.cta_primary.link}
            className="bg-primary text-background font-bold py-3 px-8 rounded-lg shadow-lg shadow-primary/20 hover:scale-105 hover:-translate-y-1 transform transition-all duration-300 glow-shadow"
          >
            {content.cta_primary.text}
          </a>
          <a
            href={content.cta_secondary.link}
            className="border-2 border-text-secondary text-text-secondary font-bold py-3 px-8 rounded-lg hover:border-primary hover:text-primary hover:bg-primary/10 transform transition-all duration-300"
          >
            {content.cta_secondary.text}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;