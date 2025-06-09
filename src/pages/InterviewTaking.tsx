
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Video, Mic, MicOff, VideoOff, Clock, User, FileText, HelpCircle, RotateCcw, Volume2 } from 'lucide-react';

const InterviewTaking = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showTips, setShowTips] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [isCountdownActive, setIsCountdownActive] = useState(true);

  const interview = {
    title: 'Frontend Developer Interview',
    candidate: 'John Doe',
    position: 'Senior Frontend Developer',
    duration: 60,
    timeElapsed: 25,
    questions: [
      "Tell me about your experience with React and modern frontend frameworks.",
      "How do you handle state management in large React applications?",
      "Describe your approach to performance optimization in web applications.",
      "How do you ensure code quality and maintainability in your projects?",
      "What's your experience with testing frameworks and methodologies?"
    ],
    tips: [
      "Focus on specific examples and projects you've worked on. Mention key features like hooks, context API, and component composition patterns.",
      "Discuss tools like Redux, Zustand, or Context API. Explain when you'd use each and provide real-world examples.",
      "Talk about techniques like code splitting, lazy loading, memoization, and bundle optimization. Mention tools like webpack or Vite.",
      "Discuss practices like code reviews, testing strategies, documentation, and architectural patterns you follow.",
      "Share experience with Jest, React Testing Library, Cypress, or other testing tools. Explain your testing philosophy."
    ]
  };

  const progress = ((currentQuestion + 1) / interview.questions.length) * 100;
  const timeProgress = (interview.timeElapsed / interview.duration) * 100;

  // Countdown effect
  useEffect(() => {
    if (isCountdownActive && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setIsCountdownActive(false);
    }
  }, [countdown, isCountdownActive]);

  // Reset countdown when question changes
  useEffect(() => {
    setCountdown(10);
    setIsCountdownActive(true);
    setIsRecording(false);
  }, [currentQuestion]);

  const nextQuestion = () => {
    if (currentQuestion < interview.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const startQuestionsOver = () => {
    setCurrentQuestion(0);
    setShowTips(false);
  };

  const handleVoiceOver = () => {
    // Text-to-speech functionality
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(interview.questions[currentQuestion]);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <Layout>
      <PageHeader 
        title="Interview in Progress" 
        description={`${interview.title} - ${interview.candidate}`}
      />
      
      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Interview Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Conference */}
            <Card>
              <CardContent className="p-6">
                <div className="relative bg-gray-900 rounded-lg aspect-video mb-4">
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    {videoEnabled ? (
                      <div className="text-center">
                        <Video className="h-12 w-12 mx-auto mb-2" />
                        <p>Video Conference Active</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <VideoOff className="h-12 w-12 mx-auto mb-2" />
                        <p>Video Disabled</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Candidate Video (Picture in Picture) */}
                  <div className="absolute bottom-4 right-4 w-24 h-18 bg-gray-700 rounded border-2 border-white">
                    <div className="w-full h-full flex items-center justify-center text-white text-xs">
                      Candidate
                    </div>
                  </div>
                </div>
                
                {/* Video Controls */}
                <div className="flex justify-center gap-4">
                  <Button
                    variant={audioEnabled ? "default" : "destructive"}
                    size="sm"
                    onClick={() => setAudioEnabled(!audioEnabled)}
                  >
                    {audioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant={videoEnabled ? "default" : "destructive"}
                    size="sm"
                    onClick={() => setVideoEnabled(!videoEnabled)}
                  >
                    {videoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant={isRecording ? "destructive" : "default"}
                    size="sm"
                    onClick={() => setIsRecording(!isRecording)}
                    disabled={isCountdownActive}
                  >
                    {isRecording ? "Stop Recording" : isCountdownActive ? `Recording in ${countdown}s` : "Start Recording"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Current Question */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Question {currentQuestion + 1} of {interview.questions.length}</CardTitle>
                  <Badge variant="outline">
                    {Math.floor(interview.timeElapsed / 60)}:{(interview.timeElapsed % 60).toString().padStart(2, '0')} / {interview.duration}:00
                  </Badge>
                </div>
                <Progress value={progress} className="w-full" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div className="flex justify-between items-start">
                    <p className="text-lg font-medium text-gray-900 flex-1">
                      {interview.questions[currentQuestion]}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleVoiceOver}
                      className="ml-2"
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Countdown Display */}
                {isCountdownActive && (
                  <div className="flex items-center justify-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <Clock className="h-5 w-5 text-orange-600 mr-2" />
                    <span className="text-lg font-semibold text-orange-600">
                      Recording starts in {countdown} seconds
                    </span>
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Interview Notes</label>
                  <Textarea 
                    placeholder="Add notes about the candidate's response..."
                    rows={4}
                  />
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={previousQuestion}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>
                  <Button 
                    onClick={nextQuestion}
                    disabled={currentQuestion === interview.questions.length - 1}
                  >
                    Next Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Interview Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Interview Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{interview.candidate}</p>
                    <p className="text-sm text-gray-600">{interview.position}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Duration:</span>
                    <span>{interview.duration} minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Progress:</span>
                    <span>{currentQuestion + 1}/{interview.questions.length} questions</span>
                  </div>
                  <Progress value={timeProgress} className="w-full" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  View Resume
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  Extend Time
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={startQuestionsOver}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Start Questions Over
                </Button>
                <Button variant="destructive" className="w-full">
                  End Interview
                </Button>
              </CardContent>
            </Card>

            {/* Show Tips */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <HelpCircle className="mr-2 h-5 w-5" />
                    Tips & Guidance
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowTips(!showTips)}
                  >
                    {showTips ? 'Hide' : 'Show'}
                  </Button>
                </div>
              </CardHeader>
              {showTips && (
                <CardContent>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">
                      Tip for Question {currentQuestion + 1}:
                    </h4>
                    <p className="text-sm text-green-700">
                      {interview.tips[currentQuestion]}
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewTaking;
