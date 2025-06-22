
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
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
  MessageSquare,
  Clock,
  HelpCircle,
  SkipForward,
  RotateCcw,
  Play,
  Square
} from 'lucide-react';

const InterviewTaking = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
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

  // Initialize rich text editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write your technical answer here...',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4',
      },
    },
  });

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

  const startQuestionOver = () => {
    setCountdown(10);
    setIsCountdownActive(true);
    setIsRecording(false);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">{interview.title}</h1>
          <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700">
            <Clock className="h-3 w-3 mr-1" />
            {formatTime(interview.timeElapsed)} / {formatTime(interview.duration * 60)}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Video Area */}
        <div className="flex-1 relative bg-gray-100 dark:bg-gray-800">
          {/* Main Video - Candidate focused */}
          <div className="h-full relative overflow-hidden rounded-lg m-4">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700">
              {videoEnabled ? (
                <div className="text-center text-white">
                  <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-white/20">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="text-4xl bg-blue-600 text-white">JD</AvatarFallback>
                  </Avatar>
                  <h3 className="text-2xl font-medium mb-2">{interview.candidate}</h3>
                  <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                    {audioEnabled ? <Mic className="h-3 w-3 mr-1" /> : <MicOff className="h-3 w-3 mr-1" />}
                    You
                  </Badge>
                </div>
              ) : (
                <div className="text-center text-white">
                  <VideoOff className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-xl opacity-75">Camera Off</p>
                </div>
              )}
            </div>

            {/* AI Interviewer Video (Picture-in-Picture) */}
            <div className="absolute top-4 right-4 w-48 h-36 bg-gray-700 dark:bg-gray-600 rounded-lg border-2 border-gray-300 dark:border-gray-500 overflow-hidden shadow-lg">
              <div className="h-full flex items-center justify-center relative bg-gradient-to-br from-gray-600 to-gray-800 dark:from-gray-700 dark:to-gray-900">
                <div className="text-center text-white">
                  <Avatar className="w-12 h-12 mx-auto mb-2">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="text-sm bg-gray-500">AI</AvatarFallback>
                  </Avatar>
                  <p className="text-xs font-medium">AI Interviewer</p>
                </div>
                <div className="absolute bottom-2 left-2">
                  <Badge variant="outline" className="bg-gray-800/80 text-white text-xs border-gray-600">
                    <Volume2 className="h-2 w-2 mr-1" />
                    Speaking
                  </Badge>
                </div>
              </div>
            </div>

            {/* Recording Indicator */}
            {isRecording && (
              <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600 px-3 py-1 rounded-full shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-sm font-medium text-white">Recording</span>
              </div>
            )}

            {/* Countdown Overlay */}
            {isCountdownActive && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl font-bold mb-4 animate-pulse">{countdown}</div>
                  <p className="text-xl">Question starts in...</p>
                </div>
              </div>
            )}
          </div>

          {/* Question Display */}
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 max-w-4xl w-full px-4">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Question {currentQuestion + 1} of {interview.questions.length}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleVoiceOver}
                  className="text-blue-600 dark:text-blue-400"
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">
                {interview.questions[currentQuestion]}
              </p>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 px-8 py-4 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full px-4"
                onClick={nextQuestion}
                disabled={isCountdownActive || currentQuestion === interview.questions.length - 1}
              >
                <SkipForward className="h-4 w-4 mr-2" />
                Next Question
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="rounded-full px-4"
                onClick={startQuestionOver}
                disabled={isCountdownActive}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Start Over
              </Button>

              <Button
                variant={isRecording ? "destructive" : "default"}
                size="sm"
                className="rounded-full px-4"
                onClick={toggleRecording}
                disabled={isCountdownActive}
              >
                {isRecording ? <Square className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isRecording ? "Stop Recording" : "Start Recording"}
              </Button>

              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

              <Button
                variant={audioEnabled ? "ghost" : "destructive"}
                size="sm"
                className="rounded-full w-10 h-10 p-0"
                onClick={() => setAudioEnabled(!audioEnabled)}
              >
                {audioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </Button>
              
              <Button
                variant={videoEnabled ? "ghost" : "destructive"}
                size="sm"
                className="rounded-full w-10 h-10 p-0"
                onClick={() => setVideoEnabled(!videoEnabled)}
              >
                {videoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="rounded-full w-10 h-10 p-0"
              >
                <Monitor className="h-4 w-4" />
              </Button>

              <Button
                variant="destructive"
                size="sm"
                className="rounded-full w-10 h-10 p-0"
              >
                <PhoneOff className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Question Progress */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Question Progress</h3>
            <Progress value={progress} className="mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentQuestion + 1} of {interview.questions.length} questions completed
            </p>
          </div>

          {/* Tips Section */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2 flex items-center">
                <HelpCircle className="mr-2 h-4 w-4" />
                Interview Tip
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                {interview.tips[currentQuestion]}
              </p>
            </div>
          </div>

          {/* Technical Response Editor */}
          <div className="flex-1 p-4 flex flex-col">
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Technical Response</h3>
            <div className="flex-1 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-3 py-2">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Use this space to write detailed technical answers, code snippets, or diagrams
                </p>
              </div>
              <div className="h-full overflow-auto bg-white dark:bg-gray-800">
                <EditorContent 
                  editor={editor} 
                  className="prose dark:prose-invert max-w-none prose-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewTaking;
