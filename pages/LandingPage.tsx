import React from 'react';
import { initialContent } from '../data';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import PortfolioSection from '../components/PortfolioSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CtaSection from '../components/CtaSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  const content = initialContent;

  return (
    <>
      <Header content={content.header} />
      <main>
        <HeroSection content={content.hero} />
        <AboutSection content={content.about} />
        <ServicesSection content={content.services} />
        <PortfolioSection content={content.portfolio} />
        <TestimonialsSection content={content.testimonials} />
        <CtaSection content={content.cta} />
        <ContactSection content={content.contact} />
      </main>
      <Footer content={content.footer} />
    </>
  );
};

export default LandingPage;
