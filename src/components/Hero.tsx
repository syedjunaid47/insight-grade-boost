
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Trophy, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <Badge className="mb-6 bg-edu-blue-100 text-edu-blue-800 hover:bg-edu-blue-200 inline-flex items-center">
              <Star className="h-4 w-4 mr-1" />
              AI-Powered Learning Platform
            </Badge>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Boost Your{" "}
              <span className="bg-gradient-to-r from-edu-blue-600 to-edu-orange-500 bg-clip-text text-transparent">
                Grades
              </span>{" "}
              with AI
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Master subjects for grades 5-10 with personalized MCQ tests, YouTube video summaries, 
              and detailed performance analytics powered by artificial intelligence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button 
                size="lg" 
                className="gradient-primary text-white font-semibold px-8 py-3 hover:shadow-lg transition-all duration-300"
                onClick={() => navigate('/signup')}
              >
                Start Learning Free
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-edu-blue-600 text-edu-blue-600 hover:bg-edu-blue-50 font-semibold px-8 py-3"
              >
                Watch Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-edu-blue-600 mb-1">500+</div>
                <div className="text-gray-600 text-sm">Practice Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-edu-orange-500 mb-1">6</div>
                <div className="text-gray-600 text-sm">Grade Levels</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">95%</div>
                <div className="text-gray-600 text-sm">Success Rate</div>
              </div>
            </div>
          </div>
          
          {/* Visual */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 gradient-primary rounded-full flex items-center justify-center mr-4">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Math Quiz - Grade 8</h3>
                    <p className="text-gray-600 text-sm">Question 3 of 10</p>
                  </div>
                </div>
                <div className="text-gray-800 mb-4">
                  What is the value of x in the equation: 2x + 5 = 15?
                </div>
                <div className="space-y-2">
                  <div className="p-3 bg-green-100 border-l-4 border-green-500 rounded text-green-800">
                    ✓ x = 5
                  </div>
                  <div className="p-3 bg-gray-100 rounded text-gray-600">x = 10</div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-edu-orange-500 rounded-full p-4 animate-float">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-edu-blue-500 rounded-full p-4 animate-float" style={{animationDelay: '1s'}}>
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </div>
            
            {/* Background Gradient */}
            <div className="absolute inset-0 gradient-card rounded-3xl transform -rotate-6 scale-110"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
