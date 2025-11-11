import React from 'react';
import LinkedInIcon from './icons/LinkedInIcon';
import GitHubIcon from './icons/GitHubIcon';
import InstagramIcon from './icons/InstagramIcon';

interface Link {
  text: string;
  link: string;
}

interface SocialLinks {
  linkedin: string;
  github: string;
  instagram: string;
}

interface FooterContent {
  links: Link[];
  social_links: SocialLinks;
  copyright: string;
}

interface FooterProps {
  content: FooterContent;
}

const socialIconMap = [
  { key: 'linkedin', icon: LinkedInIcon },
  { key: 'github', icon: GitHubIcon },
  { key: 'instagram', icon: InstagramIcon },
]

const Footer: React.FC<FooterProps> = ({ content }) => {
  return (
    <footer className="bg-secondary border-t border-transparent bg-gradient-to-r from-primary/20 via-secondary to-secondary background-size-200">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="text-2xl font-bold font-heading text-text-primary">
            Xluma<span className="text-primary">.</span>in
          </div>
          <div className="flex space-x-6">
            {content.links.map((item) => (
              <a key={item.text} href={item.link} className="text-text-secondary hover:text-primary transform hover:-translate-y-0.5 transition-all duration-300">
                {item.text}
              </a>
            ))}
          </div>
          <div className="flex space-x-4">
            {socialIconMap.map((social) => (
              <a key={social.key} href={content.social_links[social.key as keyof SocialLinks]} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary transform hover:scale-110 hover:-translate-y-1 transition-all duration-300">
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-12 text-center text-text-secondary border-t border-gray-800/50 pt-8">
          <p>{content.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
