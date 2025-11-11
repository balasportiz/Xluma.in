import React, { useState, useEffect, useRef } from 'react';

interface PortfolioItem {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface PortfolioContent {
  headline: string;
  content: string;
  portfolio_items: PortfolioItem[];
}

interface PortfolioProps {
  content: PortfolioContent;
}

const PortfolioSection: React.FC<PortfolioProps> = ({ content }) => {
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
      { threshold: 0.1 }
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
    <section id="portfolio" className="py-20 lg:py-32 bg-secondary">
      <div ref={sectionRef} className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-4">{content.headline}</h2>
          <p className="text-text-secondary">
            {content.content}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.portfolio_items.map((item, index) => (
            <div 
              key={index} 
              className={`group bg-card-background rounded-lg overflow-hidden shadow-lg flex flex-col transition-all duration-300 hover:scale-105 glow-shadow opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold font-heading text-text-primary mb-2">{item.title}</h3>
                <p className="text-text-secondary flex-grow">{item.description}</p>
                <div className="mt-4">
                  <a 
                    href={item.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block text-primary font-semibold border border-primary/50 rounded-full px-5 py-2 text-sm hover:bg-primary hover:text-background transition-colors duration-300"
                  >
                    View Project
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;