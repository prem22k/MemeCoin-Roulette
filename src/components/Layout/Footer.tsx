import { 
  Github, 
  Twitter, 
  Linkedin, 
  Code, 
  Heart,
  Star,
  TrendingUp
} from 'lucide-react';

interface SocialLink {
  icon: React.FC<{ className?: string }>;
  label: string;
  url: string;
  username: string;
}

export const Footer = () => {
  const socialLinks: SocialLink[] = [
    {
      icon: Github,
      label: 'GitHub',
      url: 'https://github.com/prem22k',
      username: '@prem22k'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      url: 'https://x.com/premsaik22',
      username: '@premsaik22'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/premsai22k',
      username: 'Prem Sai Kota'
    }
  ];

  return (
    <footer className="relative mt-16">
      {/* Gradient Divider */}
      <div className="h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600" />

      <div className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-purple-600" />
                <span className="font-bold text-xl">MemeCoin Roulette</span>
              </div>
              <p className="text-gray-600">
                Predict the next viral meme trend and compete with other traders
                in this exciting prediction game.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="/trending" className="block text-gray-600 hover:text-purple-600">
                  Trending Memes
                </a>
                <a href="/leaderboard" className="block text-gray-600 hover:text-purple-600">
                  Leaderboard
                </a>
                <a href="/about" className="block text-gray-600 hover:text-purple-600">
                  About
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-purple-600
                      transition-colors"
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <span>Built with</span>
                <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                <span>by</span>
                <a
                  href="https://github.com/prem22k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-purple-600 hover:text-purple-700"
                >
                  Prem Sai Kota
                </a>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/prem22k/memecoin-roulette"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-purple-600
                    transition-colors"
                >
                  <Code className="h-4 w-4" />
                  <span>Source Code</span>
                </a>
                <Star className="h-4 w-4 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};