
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Target, Award, BookOpen } from "lucide-react";

const Analytics = () => {
  const performanceData = [
    { subject: 'Math', score: 85, tests: 12 },
    { subject: 'Science', score: 92, tests: 8 },
    { subject: 'English', score: 78, tests: 10 },
    { subject: 'History', score: 88, tests: 6 },
    { subject: 'Geography', score: 81, tests: 7 }
  ];

  const gradeDistribution = [
    { grade: 'A+', count: 15, color: '#10B981' },
    { grade: 'A', count: 28, color: '#3B82F6' },
    { grade: 'B+', count: 22, color: '#F59E0B' },
    { grade: 'B', count: 18, color: '#EF4444' },
    { grade: 'C', count: 7, color: '#6B7280' }
  ];

  const weeklyProgress = [
    { week: 'Week 1', completed: 12, accuracy: 75 },
    { week: 'Week 2', completed: 18, accuracy: 82 },
    { week: 'Week 3', completed: 15, accuracy: 88 },
    { week: 'Week 4', completed: 22, accuracy: 91 }
  ];

  return (
    <section id="analytics" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
            Performance Analytics
          </Badge>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-edu-blue-600 to-edu-orange-500 bg-clip-text text-transparent">
            Track Your Progress
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive analytics and insights to help you understand your learning patterns and improve your performance
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="h-12 w-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">87%</div>
              <div className="text-gray-600 text-sm">Average Score</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">43</div>
              <div className="text-gray-600 text-sm">Tests Completed</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="h-12 w-12 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
              <div className="text-gray-600 text-sm">Achievements</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="h-12 w-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">156</div>
              <div className="text-gray-600 text-sm">Study Hours</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Subject Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance</CardTitle>
              <p className="text-gray-600 text-sm">Average scores across different subjects</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value: any, name: string) => [
                      `${value}${name === 'score' ? '%' : ' tests'}`,
                      name === 'score' ? 'Average Score' : 'Tests Taken'
                    ]}
                  />
                  <Bar dataKey="score" fill="#3B82F6" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Grade Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Grade Distribution</CardTitle>
              <p className="text-gray-600 text-sm">Distribution of grades across all tests</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
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
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {gradeDistribution.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {item.grade} ({item.count})
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress Tracking</CardTitle>
            <p className="text-gray-600 text-sm">Tests completed and accuracy trends over time</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip />
                <Bar yAxisId="left" dataKey="completed" fill="#F97316" name="Tests Completed" radius={4} />
                <Bar yAxisId="right" dataKey="accuracy" fill="#10B981" name="Accuracy %" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Analytics;
