
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, Star, Search, Filter, Eye } from 'lucide-react';

const ResumeReview = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const resumes = [
    {
      id: 1,
      name: 'John Doe',
      position: 'Frontend Developer',
      experience: '3 years',
      skills: ['React', 'TypeScript', 'Node.js'],
      rating: 4.5,
      status: 'Under Review',
      uploadDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'UX Designer',
      experience: '5 years',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      rating: 4.8,
      status: 'Approved',
      uploadDate: '2024-01-14',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      position: 'Backend Developer',
      experience: '4 years',
      skills: ['Python', 'Django', 'PostgreSQL'],
      rating: 4.2,
      status: 'Rejected',
      uploadDate: '2024-01-13',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Layout>
      <PageHeader 
        title="Resume Review" 
        description="Review and manage candidate resumes"
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

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Resumes</TabsTrigger>
            <TabsTrigger value="pending">Under Review</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <Card key={resume.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{resume.name}</CardTitle>
                        <CardDescription>{resume.position}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(resume.status)}>
                        {resume.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-medium">{resume.experience}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Rating:</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-medium">{resume.rating}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {resume.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <Eye className="mr-1 h-3 w-3" />
                        Review
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="pending">
            <div className="text-center py-8">
              <p className="text-gray-500">Pending resumes will appear here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="approved">
            <div className="text-center py-8">
              <p className="text-gray-500">Approved resumes will appear here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="rejected">
            <div className="text-center py-8">
              <p className="text-gray-500">Rejected resumes will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ResumeReview;
