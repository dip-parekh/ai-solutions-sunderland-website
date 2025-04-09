
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-blue-600 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <span className="text-blue-600 font-bold">AI</span>
              </div>
              <span className="text-xl font-bold">AI-Solutions</span>
            </div>
            <p className="mb-6">
              Empowering businesses with AI-powered solutions to enhance digital employee experiences.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-teal-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="hover:text-teal-300 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-teal-300 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-teal-300 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-teal-300 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal-300 transition-colors">About</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-teal-300 transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-teal-300 transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-teal-300 transition-colors">Testimonials</Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-teal-300 transition-colors">News & Articles</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-teal-300 transition-colors">Events</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-teal-300 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services#ai-assistance" className="hover:text-teal-300 transition-colors">AI Virtual Assistance</Link>
              </li>
              <li>
                <Link to="/services#workflow" className="hover:text-teal-300 transition-colors">Workflow Automation</Link>
              </li>
              <li>
                <Link to="/services#data-analytics" className="hover:text-teal-300 transition-colors">Predictive Analytics</Link>
              </li>
              <li>
                <Link to="/services#sentiment" className="hover:text-teal-300 transition-colors">Sentiment Analysis</Link>
              </li>
              <li>
                <Link to="/services#chatbots" className="hover:text-teal-300 transition-colors">Conversational AI</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="flex-shrink-0 mt-1" />
                <span>123 Tech Park, Sunderland, SR1 1AA, United Kingdom</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} />
                <span>+44 191 123 4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} />
                <a href="mailto:info@ai-solutions.com" className="hover:text-teal-300 transition-colors">
                  info@ai-solutions.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-500 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {currentYear} AI-Solutions. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy-policy" className="hover:text-teal-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-teal-300 transition-colors">Terms of Service</Link>
            <Link to="/admin" className="hover:text-teal-300 transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
