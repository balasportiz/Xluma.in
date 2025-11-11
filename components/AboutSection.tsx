import React, { useState, useEffect, useRef } from 'react';
import CheckIcon from './icons/CheckIcon';

interface AboutContent {
  headline: string;
  content: string;
  highlights: string[];
  image: string;
}

interface AboutProps {
  content: AboutContent;
}

const AboutSection: React.FC<AboutProps> = ({ content }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="about" className="py-20 lg:py-32 bg-secondary overflow-hidden">
      <div ref={sectionRef} className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-4">
              {content.headline}
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              {content.content}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.highlights.map((highlight, index) => (
                <div 
                  key={index} 
                  className={`flex items-center space-x-3 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
                  style={{ animationDelay: `${0.5 + index * 0.2}s` }}
                >
                  <CheckIcon className="w-5 h-5 text-accent" />
                  <span className="text-text-primary">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative h-64 md:h-full w-full rounded-lg overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
             <img src={content.image} alt="About Xluma" className="w-full h-full object-cover rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500" />
             <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;