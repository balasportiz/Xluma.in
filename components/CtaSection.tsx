import React from 'react';

interface CtaContent {
  headline: string;
  subheadline: string;
  button_text: string;
  link: string;
}

interface CtaProps {
  content: CtaContent;
}

const CtaSection: React.FC<CtaProps> = ({ content }) => {
  return (
    <section id="cta" className="py-20 lg:py-24 bg-secondary">
      <div className="container mx-auto px-6 text-center">
        <div className="bg-gradient-to-r from-primary/80 to-accent/80 p-10 md:p-16 rounded-xl shadow-2xl animate-shimmer-bg">
          <h2 className="text-3xl lg:text-4xl font-extrabold font-heading text-background mb-3">
            {content.headline}
          </h2>
          <p className="text-background/80 text-lg mb-8 max-w-2xl mx-auto">
            {content.subheadline}
          </p>
          <a
            href={content.link}
            className="bg-background text-primary font-bold py-4 px-10 rounded-lg shadow-lg hover:scale-105 hover:-translate-y-1 transform transition-all duration-300 glow-shadow"
          >
            {content.button_text}
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;