import { motion } from 'framer-motion';
import { 
  Brain,
  Github,
  Twitter,
  Linkedin,
  Code,
  Globe,
  Mail,
  LineChart,
  Target,
  Trophy,
  Zap,
  ArrowRight
} from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const CreatorSection = () => {
  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      url: 'https://github.com/prem22k',
      username: '@prem22k',
      color: 'hover:text-gray-900'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      url: 'https://x.com/premsaik22',
      username: '@premsaik22',
      color: 'hover:text-blue-500'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/premsai22k',
      username: 'Kota Prem Sai',
      color: 'hover:text-blue-700'
    }
  ];

  return (
    <motion.section 
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-purple-600 to-blue-600">
          {/* Decorative Elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black opacity-10" />
            <div className="absolute -bottom-1/2 left-1/4 w-96 h-96 bg-white/10 
              rounded-full blur-3xl transform -translate-x-1/2" />
            <div className="absolute -bottom-1/2 right-1/4 w-96 h-96 bg-white/10 
              rounded-full blur-3xl transform translate-x-1/2" />
          </div>
        </div>

        <div className="relative px-8 sm:px-12 pb-12">
          {/* Profile Image */}
          <div className="relative -mt-24 mb-8 flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative"
            >
              <img
                src="https://avatars.githubusercontent.com/prem22k"
                alt="Kota Prem Sai"
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl
                  object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 
                rounded-full border-4 border-white" />
            </motion.div>
          </div>

          {/* Creator Info */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold mb-4">Meet the Creator</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              MemeCoin Roulette is created by Kota Prem Sai, a passionate developer 
              and meme enthusiast. With this platform, he aims to combine the worlds 
              of technology, entertainment, and betting in a way that is fun and 
              interactive.
            </p>
            
            {/* Tech Stack */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Code className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-500">Built with:</span>
              <div className="flex gap-2">
                {['React', 'TypeScript', 'Tailwind CSS'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm 
                      text-gray-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-full
                  bg-gray-100 text-gray-600 transition-all duration-300
                  hover:shadow-md ${link.color}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon className="h-4 w-4" />
                <span className="font-medium">{link.username}</span>
              </motion.a>
            ))}
          </div>

          {/* Contact Button */}
          <motion.div 
            className="mt-8 text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="mailto:premsai224k@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 
                text-white rounded-full font-medium hover:bg-purple-700 
                transition-colors duration-300"
            >
              <Mail className="h-4 w-4" />
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export const About = () => {
  const features = [
    {
      icon: LineChart,
      title: "Real-Time Analytics",
      description: "Track meme popularity with dynamic charts and advanced analytics tools to help you stay on top of the latest trends.",
      gradient: "from-purple-600 to-purple-400"
    },
    {
      icon: ArrowRight,
      title: "Easy to Start",
      description: "Begin predicting trends with our intuitive interface and helpful guides. Whether you're new to meme prediction or a seasoned pro, we make it easy to jump in and start betting.",
      gradient: "from-blue-600 to-blue-400"
    }
  ];

  const howItWorks = [
    {
      icon: LineChart,
      title: "Tracking Memes",
      description: "Our real-time analytics track the hottest memes based on mentions across social media platforms, providing you with up-to-date insights into viral content.",
      color: "text-blue-500",
      gradient: "from-blue-500/20 to-blue-500/5"
    },
    {
      icon: Target,
      title: "Betting on Memes",
      description: "Place bets on memes you predict will go viral next. The more accurate your predictions, the bigger your rewards!",
      color: "text-purple-500",
      gradient: "from-purple-500/20 to-purple-500/5"
    },
    {
      icon: Trophy,
      title: "Leaderboards and Rewards",
      description: "Compete with other users for the top spot on our leaderboard and earn rewards for your successful predictions.",
      color: "text-amber-500",
      gradient: "from-amber-500/20 to-amber-500/5"
    }
  ];

  const coreValues = [
    {
      icon: Brain,
      title: "Innovation",
      description: "We are constantly evolving to bring new features and ideas to the platform, ensuring that MemeCoin Roulette stays at the cutting edge of meme prediction gaming."
    },
    {
      icon: Zap,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from the user experience to the accuracy of our predictions and the reliability of our platform."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div 
        className="text-center mb-16"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r 
          from-purple-600 to-blue-600 text-transparent bg-clip-text">
          About MemeCoin Roulette
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          MemeCoin Roulette combines meme culture with the excitement of betting. 
          Predict and bet on the next viral meme trend, track your wins, and join 
          a community of meme enthusiasts. Our mission is to bring people together 
          around memes and give them a way to bet on their favorite trends. Whether 
          you're a meme lover, a trend predictor, or a gamer, MemeCoin Roulette is 
          the place for you.
        </p>
      </motion.div>

      {/* Chill Guy Meme Section */}
      <motion.div 
        className="mb-16 text-center"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div className="relative inline-block">
          <img
            src="https://indianmemetemplates.com/wp-content/uploads/chill-guy.png"
            alt="Chill guy meme"
            className="rounded-lg shadow-xl max-w-sm mx-auto"
          />
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2
            bg-white px-6 py-2 rounded-full shadow-lg">
            <p className="text-gray-600 font-medium">
              Just a chill platform for meme lovers
            </p>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose MemeCoin Roulette?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-xl bg-gradient-to-br ${feature.gradient} 
                text-white shadow-lg hover:shadow-xl transition-shadow`}
              whileHover={{ scale: 1.02 }}
            >
              <feature.icon className="h-8 w-8 mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-white/90">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="space-y-8">
          {howItWorks.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className={`p-6 relative overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient}`} />
                <div className="relative flex items-start gap-6">
                  <div className={`p-3 rounded-xl bg-white shadow-md ${item.color}`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section className="mb-16">
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl 
          text-white p-8 sm:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <Globe className="h-12 w-12 mx-auto mb-6 text-white/80" />
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg leading-relaxed mb-8">
              Our mission is to connect meme lovers from around the world and create 
              an exciting platform where users can predict, bet, and track the most 
              viral memes. We believe memes are more than just content; they are part 
              of the digital culture. MemeCoin Roulette aims to bring this culture to 
              life through fun, interaction, and rewards.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {coreValues.map((value, index) => (
                <div
                  key={index}
                  className="bg-white/10 rounded-xl p-6 backdrop-blur-sm"
                >
                  <value.icon className="h-8 w-8 mb-4 mx-auto" />
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-white/80">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Creator Section */}
      <CreatorSection />
    </div>
  );
};

export default About;