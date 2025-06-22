import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Monitor, 
  Settings, 
  MoreVertical,
  Volume2,
  VolumeX,
  MessageSquare,
  Users,
  Clock,
  FileText,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

const InterviewTaking = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [countdown, setCountdown] = useState(10);
  const [isCountdownActive, setIsCountdownActive] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

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

  useEffect(() => {
    if (isCountdownActive && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setIsCountdownActive(false);
    }
  }, [countdown, isCountdownActive]);

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

  const handleVoiceOver = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(interview.questions[currentQuestion]);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">{interview.title}</h1>
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            {formatTime(interview.timeElapsed)} / {formatTime(interview.duration * 60)}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Video Area */}
        <div className="flex-1 relative">
          {/* Main Video */}
          <div className="h-full bg-gray-800 relative overflow-hidden">
            {/* Interviewer Video */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Avatar className="w-32 h-32 mx-auto mb-4">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="text-4xl bg-blue-600">AI</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-medium mb-2">AI Interviewer</h3>
                <Badge variant="outline" className="bg-gray-700 text-gray-300">
                  {audioEnabled ? <Mic className="h-3 w-3 mr-1" /> : <MicOff className="h-3 w-3 mr-1" />}
                  Speaking
                </Badge>
              </div>
            </div>

            {/* Candidate Video (Picture-in-Picture) */}
            <div className="absolute top-4 right-4 w-64 h-48 bg-gray-700 rounded-lg border-2 border-gray-600 overflow-hidden">
              <div className="h-full flex items-center justify-center relative">
                {videoEnabled ? (
                  <div className="text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-2">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="text-lg bg-green-600">JD</AvatarFallback>
                    </Avatar>
                    <p className="text-sm">{interview.candidate}</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <VideoOff className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-400">Camera Off</p>
                  </div>
                )}
                <div className="absolute bottom-2 left-2">
                  <Badge variant="outline" className="bg-gray-800 text-gray-300 text-xs">
                    You
                  </Badge>
                </div>
              </div>
            </div>

            {/* Recording Indicator */}
            {isRecording && (
              <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-sm font-medium">Recording</span>
              </div>
            )}

            {/* Countdown Overlay */}
            {isCountdownActive && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold mb-4">{countdown}</div>
                  <p className="text-xl">Recording starts in...</p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-4 bg-gray-800 px-6 py-3 rounded-full border border-gray-700">
              <Button
                variant={audioEnabled ? "ghost" : "destructive"}
                size="sm"
                className="rounded-full w-12 h-12"
                onClick={() => setAudioEnabled(!audioEnabled)}
              >
                {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>
              
              <Button
                variant={videoEnabled ? "ghost" : "destructive"}
                size="sm"
                className="rounded-full w-12 h-12"
                onClick={() => setVideoEnabled(!videoEnabled)}
              >
                {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="rounded-full w-12 h-12"
                onClick={() => setShowChat(!showChat)}
              >
                <MessageSquare className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="rounded-full w-12 h-12"
              >
                <Monitor className="h-5 w-5" />
              </Button>

              <Button
                variant="destructive"
                size="sm"
                className="rounded-full w-12 h-12"
              >
                <PhoneOff className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
          {/* Question Panel */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Question {currentQuestion + 1} of {interview.questions.length}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVoiceOver}
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
            
            <Progress value={progress} className="mb-4" />
            
            <div className="bg-blue-600 bg-opacity-20 p-4 rounded-lg border border-blue-500 mb-4">
              <p className="text-sm leading-relaxed">
                {interview.questions[currentQuestion]}
              </p>
            </div>

            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button 
                size="sm"
                onClick={nextQuestion}
                disabled={currentQuestion === interview.questions.length - 1}
              >
                Next Question
              </Button>
            </div>
          </div>

          {/* Notes Section */}
          <div className="flex-1 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Interview Notes</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotes(!showNotes)}
              >
                <FileText className="h-4 w-4" />
              </Button>
            </div>
            
            {showNotes && (
              <Textarea 
                placeholder="Add notes about the candidate's response..."
                className="bg-gray-700 border-gray-600 text-white resize-none h-32 mb-4"
                rows={6}
              />
            )}

            {/* Quick Actions */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                View Resume
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Clock className="mr-2 h-4 w-4" />
                Extend Time
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                size="sm"
                onClick={() => setCurrentQuestion(0)}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Restart Questions
              </Button>
            </div>
          </div>

          {/* Tips Section */}
          <div className="p-4 border-t border-gray-700">
            <div className="bg-green-600 bg-opacity-20 p-3 rounded-lg border border-green-500">
              <h4 className="font-medium text-green-300 mb-2 flex items-center">
                <HelpCircle className="mr-2 h-4 w-4" />
                Interview Tip
              </h4>
              <p className="text-sm text-green-100 leading-relaxed">
                {interview.tips[currentQuestion]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewTaking;
