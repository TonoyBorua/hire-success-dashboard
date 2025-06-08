
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CalendarIcon, Plus, X, Upload, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';

const interviewFormSchema = z.object({
  title: z.string().min(1, 'Interview title is required'),
  position: z.string().min(1, 'Position is required'),
  description: z.string().optional(),
  interviewType: z.enum(['practice', 'professional']),
  duration: z.string().min(1, 'Duration is required'),
  schedulingType: z.enum(['immediate', 'scheduled']),
  scheduledDate: z.date().optional(),
  useResume: z.boolean().default(false),
  selectedResume: z.string().optional(),
  questions: z.array(z.string().min(1, 'Question cannot be empty')).min(1, 'At least one question is required'),
  difficulty: z.string().min(1, 'Difficulty level is required'),
});

type InterviewFormData = z.infer<typeof interviewFormSchema>;

// Mock function to fetch user's resumes
const fetchUserResumes = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: '1', name: 'John Doe Resume.pdf', uploadDate: '2024-01-15' },
    { id: '2', name: 'Jane Smith CV.pdf', uploadDate: '2024-01-10' },
    { id: '3', name: 'Updated Resume 2024.pdf', uploadDate: '2024-01-08' },
  ];
};

const CreateInterview = () => {
  const [questions, setQuestions] = useState<string[]>(['']);
  
  const form = useForm<InterviewFormData>({
    resolver: zodResolver(interviewFormSchema),
    defaultValues: {
      title: '',
      position: '',
      description: '',
      interviewType: 'practice',
      duration: '',
      schedulingType: 'immediate',
      useResume: false,
      questions: [''],
      difficulty: '',
    },
  });

  const { data: resumes, isLoading: resumesLoading } = useQuery({
    queryKey: ['user-resumes'],
    queryFn: fetchUserResumes,
  });

  const watchSchedulingType = form.watch('schedulingType');
  const watchUseResume = form.watch('useResume');

  const addQuestion = () => {
    const currentQuestions = form.getValues('questions');
    const newQuestions = [...currentQuestions, ''];
    setQuestions(newQuestions);
    form.setValue('questions', newQuestions);
  };

  const removeQuestion = (index: number) => {
    const currentQuestions = form.getValues('questions');
    const newQuestions = currentQuestions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
    form.setValue('questions', newQuestions);
  };

  const updateQuestion = (index: number, value: string) => {
    const currentQuestions = form.getValues('questions');
    const newQuestions = [...currentQuestions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
    form.setValue('questions', newQuestions);
  };

  const onSubmit = (data: InterviewFormData) => {
    console.log('Form submitted:', data);
    // Handle form submission
  };

  return (
    <Layout>
      <PageHeader 
        title="Create Interview" 
        description="Set up a new interview session"
      />
      
      <div className="p-6 max-w-4xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Interview Details</CardTitle>
                    <CardDescription>Basic information about the interview</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Interview Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Frontend Developer Interview" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="position"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Position</FormLabel>
                            <FormControl>
                              <Input placeholder="Senior Frontend Developer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Brief description of the interview and role requirements..."
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="interviewType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interview Type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-row space-x-6"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="practice" id="practice" />
                                <Label htmlFor="practice">Practice</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="professional" id="professional" />
                                <Label htmlFor="professional">Professional</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="schedulingType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Schedule</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-2"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="immediate" id="immediate" />
                                  <Label htmlFor="immediate">Start Immediately</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="scheduled" id="scheduled" />
                                  <Label htmlFor="scheduled">Schedule for Later</Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {watchSchedulingType === 'scheduled' && (
                        <FormField
                          control={form.control}
                          name="scheduledDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Interview Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                    className="p-3"
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>

                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="30">30 minutes</SelectItem>
                              <SelectItem value="45">45 minutes</SelectItem>
                              <SelectItem value="60">60 minutes</SelectItem>
                              <SelectItem value="90">90 minutes</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Interview Questions</CardTitle>
                    <CardDescription>Add questions for the interview</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {questions.map((question, index) => (
                      <div key={index} className="flex gap-2">
                        <Textarea
                          placeholder={`Question ${index + 1}`}
                          value={question}
                          onChange={(e) => updateQuestion(index, e.target.value)}
                          rows={2}
                          className="flex-1"
                        />
                        {questions.length > 1 && (
                          <Button 
                            type="button"
                            variant="outline" 
                            size="sm"
                            onClick={() => removeQuestion(index)}
                            className="self-start mt-1"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addQuestion} className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Question
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Resume for Reference</CardTitle>
                    <CardDescription>Optional: Use a resume to guide the interview</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="useResume"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="w-4 h-4"
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Use resume for reference
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    {watchUseResume && (
                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name="selectedResume"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Select Resume</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Choose from existing resumes" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {resumesLoading ? (
                                    <SelectItem value="loading" disabled>Loading resumes...</SelectItem>
                                  ) : (
                                    resumes?.map((resume) => (
                                      <SelectItem key={resume.id} value={resume.id}>
                                        {resume.name}
                                      </SelectItem>
                                    ))
                                  )}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="text-center">
                          <span className="text-sm text-gray-500">or</span>
                        </div>
                        
                        <Button type="button" variant="outline" className="w-full">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload New Resume
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Interview Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulty Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select difficulty" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Button type="submit" className="w-full" size="lg">
                  Create Interview
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default CreateInterview;
