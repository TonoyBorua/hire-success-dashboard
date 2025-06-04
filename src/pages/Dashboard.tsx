
import React from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, Video, TrendingUp, Calendar, Clock } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Interviews',
      value: '1,234',
      change: '+12%',
      icon: Video,
      color: 'text-blue-600',
    },
    {
      title: 'Resumes Reviewed',
      value: '856',
      change: '+8%',
      icon: FileText,
      color: 'text-green-600',
    },
    {
      title: 'Active Candidates',
      value: '432',
      change: '+15%',
      icon: Users,
      color: 'text-purple-600',
    },
    {
      title: 'Success Rate',
      value: '87%',
      change: '+3%',
      icon: TrendingUp,
      color: 'text-orange-600',
    },
  ];

  const recentInterviews = [
    { id: 1, candidate: 'John Doe', position: 'Frontend Developer', time: '10:00 AM', status: 'Scheduled' },
    { id: 2, candidate: 'Jane Smith', position: 'UX Designer', time: '2:00 PM', status: 'In Progress' },
    { id: 3, candidate: 'Mike Johnson', position: 'Backend Developer', time: '4:00 PM', status: 'Completed' },
  ];

  return (
    <Layout>
      <PageHeader 
        title="Dashboard" 
        description="Overview of your interview platform"
        action={
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Interview
          </Button>
        }
      />
      
      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Interviews */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Interviews</CardTitle>
              <CardDescription>Today's interview schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInterviews.map((interview) => (
                  <div key={interview.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{interview.candidate}</p>
                      <p className="text-sm text-gray-600">{interview.position}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{interview.time}</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        interview.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                        interview.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {interview.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you can perform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Video className="mr-2 h-4 w-4" />
                Start New Interview
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Review Resumes
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Manage Candidates
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
