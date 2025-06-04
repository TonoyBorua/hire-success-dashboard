
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Video, Mic, MicOff, VideoOff, Clock, User, FileText } from 'lucide-react';

const InterviewTaking = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

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
    ]
  };

  const progress = ((currentQuestion + 1) / interview.questions.length) * 100;
  const timeProgress = (interview.timeElapsed / interview.duration) * 100;

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
                  >
                    {isRecording ? "Stop Recording" : "Start Recording"}
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
                  <p className="text-lg font-medium text-gray-900">
                    {interview.questions[currentQuestion]}
                  </p>
                </div>
                
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
                <Button variant="destructive" className="w-full">
                  End Interview
                </Button>
              </CardContent>
            </Card>

            {/* All Questions */}
            <Card>
              <CardHeader>
                <CardTitle>Questions Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {interview.questions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className={`w-full text-left p-2 rounded text-sm transition-colors ${
                        index === currentQuestion 
                          ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="font-medium">Q{index + 1}:</span> {question.substring(0, 50)}...
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewTaking;
