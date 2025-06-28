
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-edu-blue-600 mr-3" />
            <span className="text-2xl font-bold bg-gradient-to-r from-edu-blue-600 to-edu-orange-500 bg-clip-text text-transparent">
              EduBoost AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-edu-blue-600 font-medium transition-colors">
              Features
            </a>
            <a href="#demo" className="text-gray-700 hover:text-edu-blue-600 font-medium transition-colors">
              Demo
            </a>
            <a href="#analytics" className="text-gray-700 hover:text-edu-blue-600 font-medium transition-colors">
              Analytics
            </a>
            <Button 
              variant="outline" 
              className="border-edu-blue-600 text-edu-blue-600 hover:bg-edu-blue-50"
              onClick={() => navigate('/signin')}
            >
              Sign In
            </Button>
            <Button 
              className="gradient-primary text-white"
              onClick={() => navigate('/signup')}
            >
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-700 hover:text-edu-blue-600 font-medium">
                Features
              </a>
              <a href="#demo" className="text-gray-700 hover:text-edu-blue-600 font-medium">
                Demo
              </a>
              <a href="#analytics" className="text-gray-700 hover:text-edu-blue-600 font-medium">
                Analytics
              </a>
              <div className="flex flex-col space-y-2 pt-2">
                <Button 
                  variant="outline" 
                  className="border-edu-blue-600 text-edu-blue-600 hover:bg-edu-blue-50"
                  onClick={() => navigate('/signin')}
                >
                  Sign In
                </Button>
                <Button 
                  className="gradient-primary text-white"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
