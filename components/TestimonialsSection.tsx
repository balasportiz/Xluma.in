import React, { useState, useEffect, useRef } from 'react';
import QuoteIcon from './icons/QuoteIcon';

interface Testimonial {
  name: string;
  position: string;
  quote: string;
}

interface TestimonialsContent {
  headline: string;
  testimonials: Testimonial[];
}

interface TestimonialsProps {
  content: TestimonialsContent;
}

const TestimonialsSection: React.FC<TestimonialsProps> = ({ content }) => {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
      }
    );

    const currentRef = testimonialsRef.current;
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
    <section id="testimonials" className="py-20 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-4">{content.headline}</h2>
        </div>
        <div 
          ref={testimonialsRef} 
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {content.testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`bg-card-background p-8 rounded-xl border border-gray-800/50 relative transition-all duration-300 hover:scale-[1.02] glow-shadow opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <QuoteIcon className="absolute top-6 left-6 w-8 h-8 text-primary/30 animate-pulse-slow" />
              <p className="text-text-primary text-lg italic mt-8 mb-6 z-10 relative">"{testimonial.quote}"</p>
              <div className="text-right">
                <p className="font-bold font-heading text-text-primary">{testimonial.name}</p>
                <p className="text-sm text-text-secondary">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;