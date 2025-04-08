
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold">AI</span>
          </div>
          <span className="text-xl font-bold text-blue-600">AI-Solutions</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</Link>
          <Link to="/projects" className="text-gray-700 hover:text-blue-600 transition-colors">Projects</Link>
          <Link to="/testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Testimonials</Link>
          <Link to="/news" className="text-gray-700 hover:text-blue-600 transition-colors">News</Link>
          <Link to="/events" className="text-gray-700 hover:text-blue-600 transition-colors">Events</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
        </div>

        <div className="hidden md:block">
          <Button asChild className="btn-primary">
            <Link to="/contact">Get In Touch</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slide-in absolute top-16 left-0 right-0 z-50 border-t">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors py-2 border-b">Home</Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors py-2 border-b">Services</Link>
            <Link to="/projects" className="text-gray-700 hover:text-blue-600 transition-colors py-2 border-b">Projects</Link>
            <Link to="/testimonials" className="text-gray-700 hover:text-blue-600 transition-colors py-2 border-b">Testimonials</Link>
            <Link to="/news" className="text-gray-700 hover:text-blue-600 transition-colors py-2 border-b">News</Link>
            <Link to="/events" className="text-gray-700 hover:text-blue-600 transition-colors py-2 border-b">Events</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors py-2 border-b">Contact</Link>
            <Button asChild className="btn-primary w-full mt-4">
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
