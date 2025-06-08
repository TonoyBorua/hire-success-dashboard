
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, Search, Filter, Eye, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface ResumeReview {
  id: string;
  fileName: string;
  uploadDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  atsScore?: number;
  matchedKeywords?: number;
  totalKeywords?: number;
  suggestions?: number;
  processingTime?: string;
  errorMessage?: string;
}

// Mock function to fetch resume reviews
const fetchResumeReviews = async (): Promise<ResumeReview[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    {
      id: '1',
      fileName: 'John_Doe_Resume.pdf',
      uploadDate: '2024-01-15',
      status: 'completed',
      atsScore: 85,
      matchedKeywords: 12,
      totalKeywords: 15,
      suggestions: 3,
      processingTime: '2 minutes',
    },
    {
      id: '2',
      fileName: 'Jane_Smith_CV.pdf', 
      uploadDate: '2024-01-14',
      status: 'in-progress',
      processingTime: '1 minute remaining',
    },
    {
      id: '3',
      fileName: 'Mike_Johnson_Resume.pdf',
      uploadDate: '2024-01-13',
      status: 'error',
      errorMessage: 'Unable to parse PDF format',
    },
    {
      id: '4',
      fileName: 'Sarah_Wilson_Resume.docx',
      uploadDate: '2024-01-12',
      status: 'pending',
    },
    {
      id: '5',
      fileName: 'Updated_Resume_2024.pdf',
      uploadDate: '2024-01-11',
      status: 'completed',
      atsScore: 92,
      matchedKeywords: 18,
      totalKeywords: 20,
      suggestions: 1,
      processingTime: '1.5 minutes',
    },
  ];
};

const ResumeReview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const { data: resumes = [], isLoading, error } = useQuery({
    queryKey: ['resume-reviews'],
    queryFn: fetchResumeReviews,
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredResumes = resumes.filter(resume => {
    const matchesSearch = resume.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || resume.status === activeTab;
    return matchesSearch && matchesTab;
  });

  if (isLoading) {
    return (
      <Layout>
        <PageHeader title="Resume Review" description="ATS analysis and review of your resumes" />
        <div className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-500">Loading resume reviews...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <PageHeader title="Resume Review" description="ATS analysis and review of your resumes" />
        <div className="p-6">
          <div className="text-center py-8">
            <p className="text-red-500">Error loading resume reviews</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader 
        title="Resume Review" 
        description="ATS analysis and review of your resumes"
        action={
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Upload Resume
          </Button>
        }
      />
      
      <div className="p-6 space-y-6">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search resumes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Reviews</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="error">Error</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredResumes.map((resume) => (
                <Card key={resume.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg truncate">{resume.fileName}</CardTitle>
                        <CardDescription>
                          Uploaded {new Date(resume.uploadDate).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge className={`${getStatusColor(resume.status)} flex items-center gap-1`}>
                        {getStatusIcon(resume.status)}
                        {resume.status.charAt(0).toUpperCase() + resume.status.slice(1).replace('-', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resume.status === 'completed' && (
                      <>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">ATS Score:</span>
                          <span className={`font-bold text-lg ${getScoreColor(resume.atsScore!)}`}>
                            {resume.atsScore}%
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Keywords Matched:</span>
                          <span className="font-medium">
                            {resume.matchedKeywords}/{resume.totalKeywords}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Suggestions:</span>
                          <span className="font-medium">{resume.suggestions} items</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Processing Time:</span>
                          <span className="font-medium">{resume.processingTime}</span>
                        </div>
                      </>
                    )}
                    
                    {resume.status === 'in-progress' && (
                      <div className="text-center py-4">
                        <div className="text-sm text-gray-600 mb-2">Processing resume...</div>
                        <div className="text-xs text-gray-500">{resume.processingTime}</div>
                      </div>
                    )}
                    
                    {resume.status === 'error' && (
                      <div className="text-center py-4">
                        <div className="text-sm text-red-600 mb-2">Processing failed</div>
                        <div className="text-xs text-gray-500">{resume.errorMessage}</div>
                      </div>
                    )}
                    
                    {resume.status === 'pending' && (
                      <div className="text-center py-4">
                        <div className="text-sm text-gray-600">Waiting to be processed</div>
                      </div>
                    )}
                    
                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        disabled={resume.status !== 'completed'}
                      >
                        <Eye className="mr-1 h-3 w-3" />
                        View Results
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredResumes.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No resumes found matching your criteria</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ResumeReview;
