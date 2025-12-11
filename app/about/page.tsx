import { Circle, Check } from 'lucide-react';

export default function About() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-4xl">
        {/* Company Mission */}
        <section className="mb-16">
          <div className="glass-strong rounded-2xl p-8 md:p-12 border border-white/10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Our Mission
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              At Ultimate Mobile Apps, we are dedicated to creating premium mobile applications that enhance productivity, improve health outcomes, and connect people in meaningful ways. Our mission is to deliver secure, user-friendly tools that make a real difference in people's lives.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              We believe in building apps that are not just functional, but beautiful, intuitive, and built with the highest standards of security and privacy.
            </p>
          </div>
        </section>

        {/* Founder's Message */}
        <section className="mb-16">
          <div className="glass-strong rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Founder's Message
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Hi, I'm Nathan, the founder of Ultimate Mobile Apps. I started this company with a vision to create mobile applications that truly serve their users—apps that are thoughtfully designed, secure by default, and genuinely useful.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Every app we build is a reflection of our commitment to excellence. From health and wellness tools like VitaChoice® to productivity solutions like FreedomTek®, we're constantly pushing the boundaries of what mobile apps can do.
            </p>
          </div>
        </section>

        {/* Portfolio Overview */}
        <section className="mb-16">
          <div className="glass-strong rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Portfolio Overview
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Our portfolio spans multiple sectors, each app carefully crafted to address specific needs:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <Circle className="text-purple-400 mr-3 mt-1 flex-shrink-0" size={20} fill="currentColor" />
                <span><strong className="text-white">Health & Wellness:</strong> VitaChoice® helps users optimize their nutrition and wellness journey.</span>
              </li>
              <li className="flex items-start">
                <Circle className="text-purple-400 mr-3 mt-1 flex-shrink-0" size={20} fill="currentColor" />
                <span><strong className="text-white">Productivity:</strong> Timer for Life and FreedomTek® provide powerful tools for time management and productivity.</span>
              </li>
              <li className="flex items-start">
                <Circle className="text-purple-400 mr-3 mt-1 flex-shrink-0" size={20} fill="currentColor" />
                <span><strong className="text-white">Social:</strong> LibertySocial™ offers secure and private social networking.</span>
              </li>
              <li className="flex items-start">
                <Circle className="text-purple-400 mr-3 mt-1 flex-shrink-0" size={20} fill="currentColor" />
                <span><strong className="text-white">Legal:</strong> LegalTraker™ helps professionals manage their legal work efficiently.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Security Commitments */}
        <section className="mb-16">
          <div className="glass-strong rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Security Commitments
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Your privacy and security are paramount. We implement industry-leading security practices including:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <Check className="text-blue-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <span>End-to-end encryption where applicable</span>
              </li>
              <li className="flex items-start">
                <Check className="text-blue-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <span>Regular security audits and updates</span>
              </li>
              <li className="flex items-start">
                <Check className="text-blue-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <span>Minimal data collection principles</span>
              </li>
              <li className="flex items-start">
                <Check className="text-blue-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <span>Transparent privacy policies</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Roadmap */}
        <section>
          <div className="glass-strong rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Upcoming Releases
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              We're constantly working on new features and applications. Stay tuned for exciting updates and new releases across our app portfolio. Follow us for the latest announcements and feature releases.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

