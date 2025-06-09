import React from 'react';
import Layout from '@/components/Layout';
import ProtectedPage from '@/components/ProtectedPage';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Download, 
  Share2, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Target,
  Award,
  Eye,
  Zap,
  Users,
  Clock,
  BarChart3
} from 'lucide-react';

const ResumeReport = () => {
  const reportData = {
    fileName: "John_Doe_Resume.pdf",
    uploadDate: "2024-01-15",
    atsScore: 78,
    overallGrade: "B+",
    wordCount: 342,
    sections: {
      contact: { score: 95, status: "excellent" },
      summary: { score: 72, status: "good" },
      experience: { score: 85, status: "excellent" },
      skills: { score: 65, status: "needs_improvement" },
      education: { score: 90, status: "excellent" },
      formatting: { score: 70, status: "good" }
    },
    keywords: {
      matched: 18,
      total: 25,
      missing: ["TypeScript", "Docker", "AWS", "Agile", "CI/CD", "Testing", "GraphQL"]
    },
    improvements: [
      {
        category: "Keywords",
        severity: "high",
        issue: "Missing 7 critical keywords",
        suggestion: "Add TypeScript, Docker, AWS, Agile, CI/CD, Testing, GraphQL to your skills and experience sections"
      },
      {
        category: "Skills Section",
        severity: "medium", 
        issue: "Skills are not categorized",
        suggestion: "Organize skills into Technical Skills, Soft Skills, and Tools/Technologies"
      },
      {
        category: "Experience",
        severity: "low",
        issue: "Limited quantifiable achievements",
        suggestion: "Add more metrics and numbers to demonstrate impact (e.g., 'Improved performance by 40%')"
      },
      {
        category: "Formatting",
        severity: "medium",
        issue: "Inconsistent bullet point styles",
        suggestion: "Use consistent bullet points throughout the document"
      }
    ],
    strengths: [
      "Strong technical experience in React and frontend development",
      "Clear and concise work history with relevant positions",
      "Good educational background",
      "Proper contact information included",
      "Appropriate length for experience level"
    ],
    atsCompatibility: {
      fileFormat: "PDF - Good",
      fonts: "Standard fonts used - Excellent", 
      sections: "All major sections present - Good",
      keywords: "72% keyword match - Needs improvement",
      formatting: "Clean structure - Good"
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

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "high": return "text-red-600 bg-red-100";
      case "medium": return "text-yellow-600 bg-yellow-100";
      case "low": return "text-blue-600 bg-blue-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch(severity) {
      case "high": return <XCircle className="h-4 w-4" />;
      case "medium": return <AlertTriangle className="h-4 w-4" />;
      case "low": return <Eye className="h-4 w-4" />;
      default: return <Eye className="h-4 w-4" />;
    }
  };

  const reportContent = (
    <Layout>
      <PageHeader 
        title="Resume Analysis Report" 
        description={`${reportData.fileName} - Uploaded ${reportData.uploadDate}`}
        action={
          <div className="flex gap-2">
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download Report
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
                  <p className="text-sm font-medium text-gray-600">ATS Score</p>
                  <p className={`text-3xl font-bold ${getScoreColor(reportData.atsScore)}`}>
                    {reportData.atsScore}%
                  </p>
                  <p className="text-sm text-gray-500">Grade: {reportData.overallGrade}</p>
                </div>
                <Award className={`h-8 w-8 ${getScoreColor(reportData.atsScore)}`} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Keywords Matched</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {reportData.keywords.matched}/{reportData.keywords.total}
                  </p>
                  <p className="text-sm text-gray-500">72% match rate</p>
                </div>
                <Target className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Word Count</p>
                  <p className="text-2xl font-bold text-purple-600">{reportData.wordCount}</p>
                  <p className="text-sm text-gray-500">Optimal range</p>
                </div>
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Improvements</p>
                  <p className="text-2xl font-bold text-indigo-600">{reportData.improvements.length}</p>
                  <p className="text-sm text-gray-500">Action items</p>
                </div>
                <TrendingUp className="h-8 w-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section Scores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-6 w-6 text-blue-600" />
              Section Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(reportData.sections).map(([section, data]) => (
                <div key={section} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 capitalize">
                      {section.replace('_', ' ')}
                    </h3>
                    <Badge className={getSeverityColor(data.status)}>
                      {data.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Score</span>
                      <span className={`font-bold ${getScoreColor(data.score)}`}>
                        {data.score}%
                      </span>
                    </div>
                    <Progress value={data.score} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Keyword Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-6 w-6 text-green-600" />
              Keyword Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Keyword Match Rate</span>
              <div className="flex items-center space-x-2">
                <span className={`text-2xl font-bold ${getScoreColor((reportData.keywords.matched / reportData.keywords.total) * 100)}`}>
                  {Math.round((reportData.keywords.matched / reportData.keywords.total) * 100)}%
                </span>
                <Badge variant="outline" className={getScoreBg((reportData.keywords.matched / reportData.keywords.total) * 100)}>
                  {reportData.keywords.matched}/{reportData.keywords.total} matched
                </Badge>
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-medium text-red-900 mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Missing Keywords ({reportData.keywords.missing.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {reportData.keywords.missing.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="bg-white text-red-700 border-red-300">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Improvements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-6 w-6 text-yellow-600" />
              Recommended Improvements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reportData.improvements.map((improvement, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getSeverityColor(improvement.severity)}>
                        {getSeverityIcon(improvement.severity)}
                        <span className="ml-1 capitalize">{improvement.severity} Priority</span>
                      </Badge>
                      <span className="font-medium text-gray-900">{improvement.category}</span>
                    </div>
                    <h4 className="font-medium text-gray-800 mb-1">{improvement.issue}</h4>
                    <p className="text-sm text-gray-600">{improvement.suggestion}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Strengths */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-6 w-6 text-green-600" />
              Resume Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {reportData.strengths.map((strength, index) => (
                <li key={index} className="flex items-start text-sm text-gray-600">
                  <div className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  {strength}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* ATS Compatibility */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-6 w-6 text-purple-600" />
              ATS Compatibility Check
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(reportData.atsCompatibility).map(([check, result]) => (
                <div key={check} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700 capitalize">
                    {check.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <Badge variant="outline" className={
                    result.includes('Excellent') ? 'bg-green-100 text-green-800' :
                    result.includes('Good') ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }>
                    {result}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-6 w-6 text-orange-600" />
              30-Day Action Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-medium text-red-700">Week 1 - Critical Issues</h4>
                <p className="text-sm text-gray-600">Add missing keywords to skills and experience sections</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-medium text-yellow-700">Week 2 - Organization</h4>
                <p className="text-sm text-gray-600">Reorganize skills section and fix formatting inconsistencies</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-blue-700">Week 3-4 - Enhancement</h4>
                <p className="text-sm text-gray-600">Add quantifiable achievements and metrics to experience section</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );

  return (
    <ProtectedPage feature="resume-report">
      {reportContent}
    </ProtectedPage>
  );
};

export default ResumeReport;
