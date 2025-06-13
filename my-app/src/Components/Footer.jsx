import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white text-sm px-4 py-10">
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3">
        {/* Logo and Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              YourBrand
            </h2>
          </div>
          <p className="text-gray-400 max-w-xs">
            Building innovative solutions to empower and delight users worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-gray-300">
              {['About', 'Careers', 'Blog', 'Contact'].map(item => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="hover:text-white transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-gray-300">
              {['Docs', 'API', 'Help', 'Status'].map(item => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="hover:text-white transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social and Newsletter */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-semibold mb-2">Stay Updated</h3>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 rounded-md bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition">
                Subscribe
              </button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Follow us</h3>
            <div className="flex gap-3">
              {['Twitter', 'GitHub', 'LinkedIn'].map((platform, i) => (
                <a
                  key={platform}
                  href="#"
                  aria-label={platform}
                  className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d={
                      i === 0 ? 'M23 3a10.9 10.9 0 01-3.14 1.53...' :
                      i === 1 ? 'M9 19c-5 1.5-5-2.5-7-3m14 6...' :
                                'M16 8a6 6 0 016 6v7h-4v-7...'
                    } />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-10 border-t border-white/10 pt-6 text-center text-gray-400">
        <p>© 2024 YourBrand. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          {['Privacy', 'Terms', 'Cookies'].map(item => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="hover:text-white transition"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
