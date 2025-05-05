
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link to="/" className="flex items-center">
            <ArrowLeft className="mr-2" size={16} />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
