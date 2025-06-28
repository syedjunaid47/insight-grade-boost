
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from "recharts";
import { Brain, TrendingUp, Target, Award, BookOpen, Clock, Star, ArrowLeft, Download, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Analytics = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("30days");

  const performanceData = [
    { subject: 'Mathematics', score: 85, tests: 12, improvement: +8 },
    { subject: 'Science', score: 92, tests: 8, improvement: +12 },
    { subject: 'English', score: 78, tests: 10, improvement: +3 },
    { subject: 'History', score: 88, tests: 6, improvement: +15 },
    { subject: 'Geography', score: 81, tests: 7, improvement: +5 }
  ];

  const gradeDistribution = [
    { grade: 'A+', count: 15, color: '#10B981' },
    { grade: 'A', count: 28, color: '#3B82F6' },
    { grade: 'B+', count: 22, color: '#F59E0B' },
    { grade: 'B', count: 18, color: '#EF4444' },
    { grade: 'C', count: 7, color: '#6B7280' }
  ];

  const progressOverTime = [
    { date: 'Week 1', mathematics: 75, science: 80, english: 70, overall: 75 },
    { date: 'Week 2', mathematics: 78, science: 85, english: 72, overall: 78 },
    { date: 'Week 3', mathematics: 82, science: 88, english: 75, overall: 82 },
    { date: 'Week 4', mathematics: 85, science: 92, english: 78, overall: 85 }
  ];

  const studyTimeData = [
    { day: 'Mon', hours: 2.5, tests: 3 },
    { day: 'Tue', hours: 1.8, tests: 2 },
    { day: 'Wed', hours: 3.2, tests: 4 },
    { day: 'Thu', hours: 2.1, tests: 2 },
    { day: 'Fri', hours: 2.8, tests: 3 },
    { day: 'Sat', hours: 4.1, tests: 5 },
    { day: 'Sun', hours: 3.5, tests: 4 }
  ];

  const achievements = [
    { title: "Mathematics Master", description: "Scored 90%+ in 5 consecutive math tests", icon: "🏆", earned: true },
    { title: "Science Star", description: "Perfect score in Science fundamentals", icon: "⭐", earned: true },
    { title: "Study Streak", description: "7 days of continuous learning", icon: "🔥", earned: true },
    { title: "Quick Learner", description: "Complete 10 tests in one day", icon: "⚡", earned: false },
    { title: "Knowledge Seeker", description: "Summarize 50 YouTube videos", icon: "📚", earned: false },
    { title: "Grade Improver", description: "Improve average by 20 points", icon: "📈", earned: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-edu-blue-50 via-white to-edu-orange-50">
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-edu-blue-600 mr-3" />
              <span className="text-2xl font-bold bg-gradient-to-r from-edu-blue-600 to-edu-orange-500 bg-clip-text text-transparent">
                EduBoost AI
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button onClick={() => navigate('/dashboard')} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Learning Analytics</h1>
            <p className="text-xl text-gray-600">Track your progress and identify areas for improvement</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 3 months</SelectItem>
                <SelectItem value="1year">This year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="gradient-primary text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-edu-blue-100 text-sm">Overall Average</p>
                  <p className="text-3xl font-bold">87%</p>
                  <p className="text-edu-blue-100 text-xs">+5% from last month</p>
                </div>
                <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Tests Completed</p>
                  <p className="text-3xl font-bold text-gray-900">43</p>
                  <p className="text-green-600 text-xs">+12 this week</p>
                </div>
                <div className="h-12 w-12 bg-edu-blue-100 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-edu-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Study Hours</p>
                  <p className="text-3xl font-bold text-gray-900">24.2</p>
                  <p className="text-edu-orange-600 text-xs">3.5 hrs/day avg</p>
                </div>
                <div className="h-12 w-12 bg-edu-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-edu-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Achievements</p>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                  <p className="text-purple-600 text-xs">3 new badges</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Subject Performance */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Subject Performance</CardTitle>
              <p className="text-gray-600 text-sm">Average scores and improvement across subjects</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value: any, name: string) => [
                      `${value}${name === 'score' ? '%' : name === 'improvement' ? ' points' : ' tests'}`,
                      name === 'score' ? 'Average Score' : name === 'improvement' ? 'Improvement' : 'Tests Taken'
                    ]}
                  />
                  <Bar dataKey="score" fill="#3B82F6" radius={4} />
                  <Bar dataKey="improvement" fill="#10B981" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Grade Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Grade Distribution</CardTitle>
              <p className="text-gray-600 text-sm">Your performance breakdown</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="count"
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`${value} tests`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {gradeDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-600">{item.grade}</span>
                    </div>
                    <span className="text-sm font-medium">{item.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Over Time */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Progress Over Time</CardTitle>
            <p className="text-gray-600 text-sm">Track your improvement across different subjects</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={progressOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="overall" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Line type="monotone" dataKey="mathematics" stroke="#3B82F6" strokeWidth={3} />
                <Line type="monotone" dataKey="science" stroke="#10B981" strokeWidth={3} />
                <Line type="monotone" dataKey="english" stroke="#F59E0B" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Daily Study Pattern */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Study Pattern</CardTitle>
              <p className="text-gray-600 text-sm">Your study hours and test activity by day</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={studyTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="hours" fill="#F97316" name="Study Hours" radius={4} />
                  <Bar yAxisId="right" dataKey="tests" fill="#10B981" name="Tests Completed" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <p className="text-gray-600 text-sm">Your learning milestones and badges</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg border ${
                      achievement.earned 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{achievement.icon}</span>
                        <div>
                          <h4 className={`font-medium ${
                            achievement.earned ? 'text-green-800' : 'text-gray-600'
                          }`}>
                            {achievement.title}
                          </h4>
                          <p className={`text-sm ${
                            achievement.earned ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                      {achievement.earned ? (
                        <Badge className="bg-green-100 text-green-800">Earned</Badge>
                      ) : (
                        <Badge variant="outline">Locked</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
