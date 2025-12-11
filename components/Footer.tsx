import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/icons/icon.jpeg"
                alt="Ultimate Mobile Apps"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Ultimate Mobile Apps
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              Premium Apps. Unified Vision.
            </p>
          </div>

          {/* Apps Section */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Our Apps</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>VitaChoice®</li>
              <li>Timer for Life</li>
              <li>FreedomTek®</li>
              <li>LibertySocial™</li>
              <li>LegalTraker™</li>
            </ul>
          </div>

          {/* Links Section */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Ultimate Mobile Apps. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

