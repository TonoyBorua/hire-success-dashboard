
import React from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Download, 
  Share2, 
  Star, 
  AlertCircle, 
  CheckCircle, 
  TrendingUp,
  User,
  Brain,
  Target,
  Award,
  Eye,
  Heart,
  Zap,
  Users,
  Shield
} from 'lucide-react';

const InterviewReport = () => {
  const reportData = {
    candidate: "John Doe",
    position: "Senior Frontend Developer",
    interviewDate: "2024-01-15",
    duration: "45 minutes",
    overallScore: 78,
    personalityAnalysis: {
      clarity: 82,
      confidence: 75,
      relevance: 85,
      impression: 76
    },
    bigFive: [
      { trait: "Openness", score: 85, icon: Eye, description: "High creativity and openness to new experiences" },
      { trait: "Conscientiousness", score: 78, icon: Target, description: "Well-organized and goal-oriented" },
      { trait: "Extraversion", score: 65, icon: Users, description: "Moderately outgoing and social" },
      { trait: "Agreeableness", score: 72, icon: Heart, description: "Cooperative and trusting" },
      { trait: "Neuroticism", score: 45, icon: Shield, description: "Emotionally stable under pressure" }
    ],
    questions: [
      {
        id: 1,
        question: "Tell me about your experience with React and modern frontend frameworks.",
        userAnswer: "I have 4 years of experience with React. I've worked on multiple projects using hooks, context API, and Redux for state management. Recently worked on a large e-commerce platform.",
        perfectAnswer: "I have extensive experience with React, including hooks, context API, custom hooks, and performance optimization. I've built scalable applications using modern patterns like compound components and render props. I stay updated with the latest React features and best practices.",
        score: 85,
        feedback: "Good technical knowledge demonstrated. Could elaborate more on specific optimization techniques and recent projects."
      },
      {
        id: 2,
        question: "How do you handle state management in large React applications?",
        userAnswer: "I usually use Redux for global state and local state for component-specific data.",
        perfectAnswer: "For large applications, I evaluate the complexity first. I use Redux Toolkit for complex global state, Zustand for simpler cases, and React Query for server state. I also leverage React's built-in useReducer and Context API for mid-level state management.",
        score: 70,
        feedback: "Basic understanding shown. Could discuss more modern alternatives and when to use each approach."
      },
      {
        id: 3,
        question: "Describe your approach to performance optimization in web applications.",
        userAnswer: "I use code splitting with React.lazy, optimize images, and use useMemo for expensive calculations.",
        perfectAnswer: "I take a comprehensive approach: code splitting with dynamic imports, image optimization, lazy loading, memoization with React.memo and useMemo, bundle analysis with webpack-bundle-analyzer, performance monitoring with tools like Lighthouse, and implementing proper caching strategies.",
        score: 75,
        feedback: "Good foundation but could expand on monitoring and measurement techniques."
      }
    ],
    resumeCompatibility: {
      score: 82,
      strengths: [
        "Strong React experience matches job requirements",
        "Previous e-commerce experience is relevant",
        "Good educational background in Computer Science"
      ],
      gaps: [
        "Limited experience with TypeScript mentioned in resume",
        "Could benefit from more backend integration experience"
      ]
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <Layout>
      <PageHeader 
        title="Interview Report" 
        description={`${reportData.candidate} - ${reportData.position}`}
        action={
          <div className="flex gap-2">
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        }
      />
      
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overall Score</p>
                  <p className={`text-2xl font-bold ${getScoreColor(reportData.overallScore)}`}>
                    {reportData.overallScore}%
                  </p>
                </div>
                <Award className={`h-8 w-8 ${getScoreColor(reportData.overallScore)}`} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Interview Date</p>
                  <p className="text-lg font-semibold">{reportData.interviewDate}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Duration</p>
                  <p className="text-lg font-semibold">{reportData.duration}</p>
                </div>
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Questions</p>
                  <p className="text-lg font-semibold">{reportData.questions.length}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Personality Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-6 w-6 text-purple-600" />
              Personality Analysis Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(reportData.personalityAnalysis).map(([key, score]) => (
                <div key={key} className="text-center p-4 rounded-lg bg-gray-50">
                  <h3 className="font-medium text-gray-900 capitalize mb-2">{key}</h3>
                  <div className={`text-3xl font-bold ${getScoreColor(score)} mb-2`}>
                    {score}%
                  </div>
                  <Progress value={score} className="w-full" />
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Key Insights</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Strong clarity in communication - your answers were well-structured</li>
                <li>• High relevance to questions asked - you stayed on topic effectively</li>
                <li>• Room for improvement in confidence - consider speaking with more conviction</li>
                <li>• Good overall impression - you demonstrated competence</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Big Five Personality Traits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-6 w-6 text-indigo-600" />
              Big Five Personality Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {reportData.bigFive.map((trait, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
                  <div className="flex-shrink-0">
                    <trait.icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{trait.trait}</h3>
                      <span className={`font-bold ${getScoreColor(trait.score)}`}>
                        {trait.score}%
                      </span>
                    </div>
                    <Progress value={trait.score} className="mb-2" />
                    <p className="text-sm text-gray-600">{trait.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resume Compatibility */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-6 w-6 text-green-600" />
              Resume Compatibility Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Compatibility Score</span>
              <div className="flex items-center space-x-2">
                <span className={`text-2xl font-bold ${getScoreColor(reportData.resumeCompatibility.score)}`}>
                  {reportData.resumeCompatibility.score}%
                </span>
                <Badge variant="outline" className={getScoreBg(reportData.resumeCompatibility.score)}>
                  Good Match
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-green-700 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Strengths
                </h4>
                <ul className="space-y-2">
                  {reportData.resumeCompatibility.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <div className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-orange-700 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Areas for Development
                </h4>
                <ul className="space-y-2">
                  {reportData.resumeCompatibility.gaps.map((gap, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <div className="h-1.5 w-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                      {gap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question-wise Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-6 w-6 text-yellow-600" />
              Detailed Question Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {reportData.questions.map((q, index) => (
              <div key={q.id} className="border rounded-lg p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Question {index + 1}: {q.question}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.round(q.score / 20) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <Badge variant="outline" className={getScoreBg(q.score)}>
                      {q.score}%
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Your Answer:</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        {q.userAnswer}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Feedback:</h4>
                      <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                        {q.feedback}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Ideal Answer:</h4>
                    <p className="text-sm text-gray-600 bg-green-50 p-3 rounded">
                      {q.perfectAnswer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-6 w-6 text-blue-600" />
              Recommended Action Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Immediate Improvements</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                    Practice speaking with more confidence and conviction
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                    Prepare more detailed examples for technical questions
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                    Research modern state management alternatives
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Long-term Development</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                    Gain more experience with TypeScript
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                    Expand backend integration knowledge
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                    Study performance monitoring tools
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default InterviewReport;
