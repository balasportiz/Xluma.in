import React, { useState, useEffect, useRef } from 'react';
import MailIcon from './icons/MailIcon';
import PhoneIcon from './icons/PhoneIcon';
import LocationIcon from './icons/LocationIcon';

const iconMap = {
  email: MailIcon,
  phone: PhoneIcon,
  location: LocationIcon,
};

interface ContactContent {
  headline: string;
  subheadline: string;
  contact_methods: {
    email: string;
    phone: string;
    location: string;
  };
  form_fields: string[];
}

interface ContactProps {
  content: ContactContent;
}

const ContactSection: React.FC<ContactProps> = ({ content }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const contactDetails = [
    { icon: iconMap.email, text: content.contact_methods.email },
    { icon: iconMap.phone, text: content.contact_methods.phone },
    { icon: iconMap.location, text: content.contact_methods.location },
  ];

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
    <section id="contact" className="py-20 lg:py-32 overflow-hidden">
      <div ref={sectionRef} className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-4">{content.headline}</h2>
          <p className="text-text-secondary">{content.subheadline}</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className={`flex flex-col justify-center opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}>
            <h3 className="text-2xl font-bold font-heading mb-6">Contact Information</h3>
            <div className="space-y-4">
              {contactDetails.map((method, index) => (
                <div key={index} className="flex items-center space-x-4 group cursor-pointer">
                  <div className="bg-card-background p-3 rounded-full transition-transform duration-300 group-hover:scale-110">
                    <method.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-text-secondary text-lg group-hover:text-text-primary transition-colors duration-300">{method.text}</span>
                </div>
              ))}
            </div>
          </div>
          <form className={`space-y-6 bg-card-background p-8 rounded-lg border border-gray-800/50 opacity-0 ${isVisible ? 'animate-slide-in-right' : ''}`} style={{ animationDelay: '0.3s' }}>
            {content.form_fields.map((field, index) => (
              <div key={index}>
                <label htmlFor={field.toLowerCase().replace(' ', '')} className="block text-sm font-medium text-text-secondary mb-2">{field}</label>
                {field === "Project Details" ? (
                  <textarea id={field.toLowerCase().replace(' ', '')} rows={4} className="w-full bg-secondary border border-gray-700 rounded-md p-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary transition-all duration-300 ease-in-out"></textarea>
                ) : (
                  <input type={field === "Email" ? "email" : "text"} id={field.toLowerCase().replace(' ', '')} className="w-full bg-secondary border border-gray-700 rounded-md p-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary transition-all duration-300 ease-in-out" />
                )}
              </div>
            ))}
            <button type="submit" className="w-full bg-primary text-background font-bold py-3 px-6 rounded-lg transform hover:-translate-y-1 transition-all duration-300 glow-shadow">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;