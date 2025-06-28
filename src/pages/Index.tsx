
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, BarChart3, Youtube, Users, Trophy, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import TestDemo from "@/components/TestDemo";
import YoutubeDemo from "@/components/YoutubeDemo";
import Analytics from "@/components/Analytics";

const Index = () => {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState<number>(8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-edu-blue-50 via-white to-edu-orange-50">
      <Header />
      <Hero />
      <Features />
      
      {/* Demo Sections */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-edu-blue-100 text-edu-blue-800 hover:bg-edu-blue-200">
              Interactive Demo
            </Badge>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-edu-blue-600 to-edu-orange-500 bg-clip-text text-transparent">
              Experience Our Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Try our features with real examples and see how AI can transform your learning experience
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <TestDemo selectedGrade={selectedGrade} setSelectedGrade={setSelectedGrade} />
            <YoutubeDemo />
          </div>
        </div>
      </section>

      <Analytics />

      {/* Call to Action */}
      <section className="py-20 px-6 gradient-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Learning Journey?
          </h2>
          <p className="text-xl text-edu-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already improving their grades with our AI-powered platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-edu-blue-600 hover:bg-edu-blue-50 font-semibold px-8 py-3"
              onClick={() => navigate('/signup')}
            >
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-edu-blue-600 font-semibold px-8 py-3"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <Brain className="h-8 w-8 text-edu-blue-400 mr-3" />
            <span className="text-2xl font-bold">EduBoost AI</span>
          </div>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Empowering students with AI-driven education tools for better learning outcomes and academic success.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
            <a href="#" className="hover:text-white transition-colors">Help Center</a>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            © 2024 EduBoost AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
