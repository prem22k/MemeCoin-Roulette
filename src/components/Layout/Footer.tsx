import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Heart, Twitter, Linkedin } from 'lucide-react';
import { Container } from './Container';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 mt-auto">
      <Container>
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright and Signature */}
            <div className="flex flex-col items-center md:items-start space-y-2">
              <div className="flex items-center space-x-2">
                <span>© {new Date().getFullYear()} MemeCoin Roulette</span>
                <span>•</span>
                <span className="flex items-center">
                  Made with <Heart className="h-4 w-4 text-red-500 mx-1 hover:animate-pulse" /> by{' '}
                  <a 
                    href="https://github.com/premsaik" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ml-1 font-medium text-transparent bg-clip-text bg-gradient-to-r 
                      from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-500 
                      transition-all"
                  >
                    Prem sai k
                  </a>
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Building the future of meme prediction markets
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              {[
                { icon: Github, label: 'GitHub', url: 'https://github.com/premsaik' },
                { icon: Twitter, label: 'Twitter', url: 'https://twitter.com/premsaik' },
                { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/premsaik' }
              ].map(({ icon: Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center space-x-2 group"
                >
                  <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:block">{label}</span>
                </a>
              ))}
            </div>

            {/* Quick Links */}
            <div className="flex items-center space-x-6">
              {['About', 'Terms', 'Privacy'].map((link) => (
                <Link
                  key={link}
                  to={`/${link.toLowerCase()}`}
                  className="hover:text-white transition-colors text-sm"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};