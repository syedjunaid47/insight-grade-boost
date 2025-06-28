
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Clock, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  subject: string;
}

const TestDemo = ({ selectedGrade, setSelectedGrade }: { selectedGrade: number; setSelectedGrade: (grade: number) => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the value of x in the equation: 2x + 5 = 15?",
      options: ["x = 5", "x = 10", "x = 7.5", "x = 2.5"],
      correct: 0,
      subject: "Mathematics"
    },
    {
      id: 2,
      question: "Which of the following is a renewable source of energy?",
      options: ["Coal", "Solar", "Natural Gas", "Petroleum"],
      correct: 1,
      subject: "Science"
    },
    {
      id: 3,
      question: "What is the past tense of 'write'?",
      options: ["writed", "wrote", "written", "writes"],
      correct: 1,
      subject: "English"
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      const score = answers.filter((answer, index) => answer === questions[index].correct).length;
      toast.success(`Test completed! You scored ${score}/${questions.length}`);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const score = answers.filter((answer, index) => answer === questions[index].correct).length;

  if (showResults) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-edu-blue-600" />
              Test Results - Grade {selectedGrade}
            </CardTitle>
            <Badge className={score >= 2 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
              {score}/{questions.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-6 bg-gradient-to-r from-edu-blue-50 to-edu-orange-50 rounded-lg">
            <div className="text-3xl font-bold mb-2">
              {Math.round((score / questions.length) * 100)}%
            </div>
            <p className="text-gray-600">
              {score >= 2 ? "Great job! Keep up the excellent work!" : "Good effort! Review the topics and try again."}
            </p>
          </div>
          
          <div className="space-y-3">
            {questions.map((question, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  {answers[index] === question.correct ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                  )}
                  <span className="text-sm">Question {index + 1}</span>
                </div>
                <Badge variant="outline">{question.subject}</Badge>
              </div>
            ))}
          </div>
          
          <Button onClick={resetTest} className="w-full gradient-primary text-white">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-edu-blue-600" />
            Mock Test Demo
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">No time limit</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select value={selectedGrade.toString()} onValueChange={(value) => setSelectedGrade(parseInt(value))}>
            <SelectTrigger className="w-32">
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
          
          <Badge variant="outline">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
          
          <Badge className="bg-edu-orange-100 text-edu-orange-800">
            {questions[currentQuestion].subject}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-lg mb-4">
            {questions[currentQuestion].question}
          </h3>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full p-3 text-left rounded-lg border transition-all duration-200 ${
                  answers[currentQuestion] === index
                    ? 'border-edu-blue-500 bg-edu-blue-50 text-edu-blue-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    answers[currentQuestion] === index
                      ? 'border-edu-blue-500 bg-edu-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {answers[currentQuestion] === index && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
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
          className="w-full gradient-primary text-white"
        >
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Test'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TestDemo;
