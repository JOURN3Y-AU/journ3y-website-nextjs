
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-journey-purple to-journey-blue bg-clip-text text-transparent">
                JOURN3Y
              </span>
            </Link>
            <p className="mt-4 text-gray-600">
              The future is AI powered. Is your business?
            </p>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-heading font-medium text-lg mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products/blueprint" className="text-gray-600 hover:text-journey-purple transition-colors">
                  Blueprint
                </Link>
              </li>
              <li>
                <Link href="/products/glean" className="text-gray-600 hover:text-journey-purple transition-colors">
                  Glean
                </Link>
              </li>
              <li>
                <Link href="/products/services" className="text-gray-600 hover:text-journey-purple transition-colors">
                  Services
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-heading font-medium text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-journey-purple transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-600 hover:text-journey-purple transition-colors">
                  White Papers
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-heading font-medium text-lg mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-journey-purple transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-journey-purple transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Journey AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a 
              href="https://www.linkedin.com/company/journ3y-au" 
              target="_blank"
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-journey-purple transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
