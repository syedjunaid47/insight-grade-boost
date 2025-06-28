
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, BookOpen, Clock, ArrowLeft, CheckCircle, XCircle, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Tests = () => {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState("8");
  const [selectedSubject, setSelectedSubject] = useState("mathematics");
  const [currentTest, setCurrentTest] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const subjects = [
    { id: "mathematics", name: "Mathematics", icon: "📊", color: "edu-blue" },
    { id: "science", name: "Science", icon: "🔬", color: "green" },
    { id: "english", name: "English", icon: "📚", color: "purple" },
    { id: "history", name: "History", icon: "🏛️", color: "yellow" },
    { id: "geography", name: "Geography", icon: "🌍", color: "edu-orange" }
  ];

  const testQuestions = {
    mathematics: [
      {
        question: "What is the value of x in the equation: 3x - 7 = 14?",
        options: ["x = 7", "x = 21", "x = 5", "x = 3"],
        correct: 0
      },
      {
        question: "Which of the following is a prime number?",
        options: ["15", "21", "17", "25"],
        correct: 2
      },
      {
        question: "What is the area of a circle with radius 5 units?",
        options: ["25π", "10π", "15π", "20π"],
        correct: 0
      }
    ],
    science: [
      {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correct: 2
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
      },
      {
        question: "What is the process by which plants make their food?",
        options: ["Respiration", "Photosynthesis", "Digestion", "Transpiration"],
        correct: 1
      }
    ]
  };

  const startTest = (subject: string) => {
    const questions = testQuestions[subject as keyof typeof testQuestions] || testQuestions.mathematics;
    setCurrentTest({ subject, questions });
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < currentTest.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      const score = answers.filter((answer, index) => answer === currentTest.questions[index].correct).length;
      toast.success(`Test completed! You scored ${score}/${currentTest.questions.length}`);
    }
  };

  const resetTest = () => {
    setCurrentTest(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  if (currentTest && showResults) {
    const score = answers.filter((answer, index) => answer === currentTest.questions[index].correct).length;
    const percentage = Math.round((score / currentTest.questions.length) * 100);
    
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
              <Button onClick={() => navigate('/dashboard')} variant="outline">
                Back to Dashboard
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <Card className="w-full">
            <CardHeader className="text-center">
              <div className="h-16 w-16 bg-gradient-to-r from-edu-blue-500 to-edu-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl">Test Results</CardTitle>
              <p className="text-gray-600">{currentTest.subject.charAt(0).toUpperCase() + currentTest.subject.slice(1)} - Grade {selectedGrade}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-8 bg-gradient-to-r from-edu-blue-50 to-edu-orange-50 rounded-lg">
                <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-edu-blue-600 to-edu-orange-500 bg-clip-text text-transparent">
                  {percentage}%
                </div>
                <p className="text-xl text-gray-700 mb-2">
                  You scored {score} out of {currentTest.questions.length}
                </p>
                <p className="text-gray-600">
                  {percentage >= 80 ? "Excellent work! 🎉" : percentage >= 60 ? "Good job! Keep practicing 👍" : "Keep studying and try again! 💪"}
                </p>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Question Review</h3>
                {currentTest.questions.map((question: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      {answers[index] === question.correct ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mr-3" />
                      )}
                      <span className="text-sm">Question {index + 1}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {answers[index] === question.correct ? "Correct" : "Incorrect"}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-4">
                <Button onClick={resetTest} className="flex-1 gradient-primary text-white">
                  Take Another Test
                </Button>
                <Button onClick={() => navigate('/analytics')} variant="outline" className="flex-1">
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentTest) {
    const question = currentTest.questions[currentQuestion];
    
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
              <Button onClick={resetTest} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Exit Test
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-edu-blue-600" />
                  {currentTest.subject.charAt(0).toUpperCase() + currentTest.subject.slice(1)} Test
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">No time limit</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Badge variant="outline">
                  Question {currentQuestion + 1} of {currentTest.questions.length}
                </Badge>
                <Badge className="bg-edu-orange-100 text-edu-orange-800">
                  Grade {selectedGrade}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-xl mb-6">
                  {question.question}
                </h3>
                
                <div className="space-y-3">
                  {question.options.map((option: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                        answers[currentQuestion] === index
                          ? 'border-edu-blue-500 bg-edu-blue-50 text-edu-blue-700'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border-2 mr-4 ${
                          answers[currentQuestion] === index
                            ? 'border-edu-blue-500 bg-edu-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {answers[currentQuestion] === index && (
                            <div className="w-3 h-3 bg-white rounded-full mx-auto mt-0.5"></div>
                          )}
                        </div>
                        {option}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={nextQuestion}
                disabled={answers[currentQuestion] === undefined}
                className="w-full gradient-primary text-white py-3"
                size="lg"
              >
                {currentQuestion < currentTest.questions.length - 1 ? 'Next Question' : 'Finish Test'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
            <Button onClick={() => navigate('/dashboard')} variant="outline">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Practice Tests</h1>
          <p className="text-xl text-gray-600">Choose your grade and subject to start practicing</p>
        </div>

        {/* Grade and Subject Selection */}
        <div className="flex space-x-4 mb-8">
          <Select value={selectedGrade} onValueChange={setSelectedGrade}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 6, 7, 8, 9, 10].map((grade) => (
                <SelectItem key={grade} value={grade.toString()}>
                  Grade {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subject Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Card key={subject.id} className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="text-4xl">{subject.icon}</div>
                  <Badge variant="secondary">Grade {selectedGrade}</Badge>
                </div>
                <CardTitle className="group-hover:text-edu-blue-600 transition-colors">
                  {subject.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-gray-600">
                    <p>• 10+ practice questions</p>
                    <p>• Instant feedback</p>
                    <p>• Detailed explanations</p>
                  </div>
                  <Button 
                    onClick={() => startTest(subject.id)}
                    className="w-full gradient-primary text-white"
                  >
                    Start Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tests;
