
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Youtube, BarChart3, Users, Shield, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Smart MCQ Tests",
      description: "Grade-specific practice tests with 500+ questions across all subjects. Get instant feedback and detailed explanations.",
      badge: "500+ Questions",
      color: "edu-blue"
    },
    {
      icon: Youtube,
      title: "YouTube Summarizer",
      description: "Transform any educational YouTube video into concise, actionable summaries. Save time and focus on key concepts.",
      badge: "AI-Powered",
      color: "edu-orange"
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Track your progress with detailed charts and insights. Identify strengths and areas for improvement.",
      badge: "Visual Reports",
      color: "green"
    },
    {
      icon: Users,
      title: "Grade-Based Learning",
      description: "Content automatically adapts to your grade level (5-10). Personalized learning paths for better outcomes.",
      badge: "Grades 5-10",
      color: "purple"
    },
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "Safe and secure student accounts with grade-specific access. Your data is protected and private.",
      badge: "Secure",
      color: "red"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get immediate feedback on tests and summaries. No waiting - accelerate your learning journey.",
      badge: "Real-time",
      color: "yellow"
    }
  ];

  return (
    <section id="features" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-edu-blue-100 text-edu-blue-800 hover:bg-edu-blue-200">
            Powerful Features
          </Badge>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-edu-blue-600 to-edu-orange-500 bg-clip-text text-transparent">
            Everything You Need to Excel
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform combines cutting-edge technology with proven educational methods 
            to help students achieve their academic goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 hover:from-edu-blue-50 hover:to-edu-orange-50"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`h-12 w-12 rounded-xl bg-${feature.color === 'edu-blue' ? 'edu-blue' : feature.color === 'edu-orange' ? 'edu-orange' : feature.color}-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-edu-blue-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
