
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, BookOpen, Youtube, BarChart3, Trophy, Clock, Star, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const recentActivity = [
    { subject: "Mathematics", score: 85, date: "2 hours ago", type: "test" },
    { subject: "Science", score: 92, date: "1 day ago", type: "test" },
    { subject: "History", score: 78, date: "2 days ago", type: "summary" }
  ];

  const upcomingTests = [
    { subject: "English", questions: 15, difficulty: "Medium", estimatedTime: "20 min" },
    { subject: "Geography", questions: 12, difficulty: "Easy", estimatedTime: "15 min" },
    { subject: "Physics", questions: 20, difficulty: "Hard", estimatedTime: "30 min" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-edu-blue-50 via-white to-edu-orange-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-edu-blue-600 mr-3" />
              <span className="text-2xl font-bold bg-gradient-to-r from-edu-blue-600 to-edu-orange-500 bg-clip-text text-transparent">
                EduBoost AI
              </span>
            </div>
            <nav className="flex items-center space-x-6">
              <Button variant="ghost" onClick={() => navigate('/tests')}>
                <BookOpen className="h-4 w-4 mr-2" />
                Tests
              </Button>
              <Button variant="ghost" onClick={() => navigate('/summarizer')}>
                <Youtube className="h-4 w-4 mr-2" />
                Summarizer
              </Button>
              <Button variant="ghost" onClick={() => navigate('/analytics')}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button onClick={() => navigate('/')} variant="outline">
                Sign Out
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, Student! 👋
          </h1>
          <p className="text-xl text-gray-600">Ready to boost your learning today?</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="gradient-primary text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-edu-blue-100 text-sm">Overall Score</p>
                  <p className="text-3xl font-bold">87%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-edu-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Tests Completed</p>
                  <p className="text-3xl font-bold text-gray-900">43</p>
                </div>
                <BookOpen className="h-8 w-8 text-edu-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Study Streak</p>
                  <p className="text-3xl font-bold text-gray-900">7 days</p>
                </div>
                <Trophy className="h-8 w-8 text-edu-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Time Saved</p>
                  <p className="text-3xl font-bold text-gray-900">24h</p>
                </div>
                <Clock className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-edu-blue-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button 
                    className="h-20 gradient-primary text-white text-left justify-start p-6"
                    onClick={() => navigate('/tests')}
                  >
                    <div>
                      <BookOpen className="h-6 w-6 mb-2" />
                      <div className="font-semibold">Start a Test</div>
                      <div className="text-sm text-edu-blue-100">Practice with MCQs</div>
                    </div>
                  </Button>
                  
                  <Button 
                    className="h-20 gradient-secondary text-white text-left justify-start p-6"
                    onClick={() => navigate('/summarizer')}
                  >
                    <div>
                      <Youtube className="h-6 w-6 mb-2" />
                      <div className="font-semibold">Summarize Video</div>
                      <div className="text-sm text-edu-orange-100">AI-powered summaries</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="h-20 text-left justify-start p-6 border-edu-blue-200 hover:bg-edu-blue-50"
                    onClick={() => navigate('/analytics')}
                  >
                    <div>
                      <BarChart3 className="h-6 w-6 mb-2 text-edu-blue-600" />
                      <div className="font-semibold text-gray-900">View Analytics</div>
                      <div className="text-sm text-gray-600">Track your progress</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="h-20 text-left justify-start p-6 border-green-200 hover:bg-green-50"
                  >
                    <div>
                      <Trophy className="h-6 w-6 mb-2 text-green-600" />
                      <div className="font-semibold text-gray-900">Achievements</div>
                      <div className="text-sm text-gray-600">View your badges</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                          activity.type === 'test' ? 'bg-edu-blue-100' : 'bg-edu-orange-100'
                        }`}>
                          {activity.type === 'test' ? (
                            <BookOpen className={`h-5 w-5 ${activity.type === 'test' ? 'text-edu-blue-600' : 'text-edu-orange-600'}`} />
                          ) : (
                            <Youtube className="h-5 w-5 text-edu-orange-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.subject}</p>
                          <p className="text-sm text-gray-600">{activity.date}</p>
                        </div>
                      </div>
                      <Badge variant={activity.score >= 85 ? "default" : "secondary"}>
                        {activity.score}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Tests */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recommended Tests</CardTitle>
                <p className="text-sm text-gray-600">Based on your progress</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTests.map((test, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{test.subject}</h4>
                        <Badge 
                          variant={test.difficulty === 'Easy' ? 'default' : test.difficulty === 'Medium' ? 'secondary' : 'destructive'}
                          className="text-xs"
                        >
                          {test.difficulty}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        <p>{test.questions} questions • {test.estimatedTime}</p>
                      </div>
                      <Button size="sm" className="w-full" onClick={() => navigate('/tests')}>
                        Start Test
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
