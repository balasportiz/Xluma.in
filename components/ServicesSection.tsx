import React, { useState, useEffect, useRef } from 'react';

interface Service {
  title: string;
  description: string;
}

interface ServicesContent {
  headline: string;
  subheadline: string;
  services_list: Service[];
}

interface ServicesProps {
  content: ServicesContent;
}

const ServicesSection: React.FC<ServicesProps> = ({ content }) => {
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
    <section id="services" className="py-20 lg:py-32">
      <div ref={sectionRef} className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-4">{content.headline}</h2>
          <p className="text-text-secondary">
            {content.subheadline}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.services_list.map((service, index) => (
            <div
              key={index}
              className={`bg-card-background p-8 rounded-xl border border-gray-800/50 transition-all duration-300 transform hover:-translate-y-2 glow-shadow opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <h3 className="text-xl font-bold font-heading text-text-primary mb-3">{service.title}</h3>
              <p className="text-text-secondary">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;