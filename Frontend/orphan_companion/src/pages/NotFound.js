import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-cream-100 flex items-center justify-center">
      <div className="glass p-8 rounded-2xl max-w-md mx-auto text-center">
        <h1 className="text-6xl font-light text-cream-600 mb-6">404</h1>
        <p className="text-xl text-cream-500 mb-8">
          Oops! We couldn't find that page.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cream-300 text-cream-700 hover:bg-cream-400 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Return Home</span>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
