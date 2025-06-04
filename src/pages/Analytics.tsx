
import React from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Clock, Star, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Analytics = () => {
  const monthlyData = [
    { month: 'Jan', interviews: 45, hired: 12 },
    { month: 'Feb', interviews: 52, hired: 15 },
    { month: 'Mar', interviews: 48, hired: 14 },
    { month: 'Apr', interviews: 61, hired: 18 },
    { month: 'May', interviews: 55, hired: 16 },
    { month: 'Jun', interviews: 67, hired: 20 },
  ];

  const positionData = [
    { position: 'Frontend', count: 45, color: '#3B82F6' },
    { position: 'Backend', count: 32, color: '#10B981' },
    { position: 'Fullstack', count: 28, color: '#F59E0B' },
    { position: 'DevOps', count: 15, color: '#EF4444' },
    { position: 'Designer', count: 22, color: '#8B5CF6' },
  ];

  const performanceMetrics = [
    { title: 'Average Interview Duration', value: '42 min', change: '+5%', trend: 'up' },
    { title: 'Success Rate', value: '68%', change: '+12%', trend: 'up' },
    { title: 'Candidate Satisfaction', value: '4.6/5', change: '+0.3', trend: 'up' },
    { title: 'Time to Hire', value: '12 days', change: '-2 days', trend: 'down' },
  ];

  const topPerformers = [
    { name: 'Sarah Johnson', interviews: 45, rating: 4.8, hires: 12 },
    { name: 'Mike Chen', interviews: 38, rating: 4.7, hires: 10 },
    { name: 'Emily Davis', interviews: 42, rating: 4.6, hires: 11 },
  ];

  return (
    <Layout>
      <PageHeader 
        title="Analytics Dashboard" 
        description="Interview performance and insights"
        action={
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        }
      />
      
      <div className="p-6 space-y-6">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceMetrics.map((metric) => (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <TrendingUp className={`h-4 w-4 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {metric.change}
                  </span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Interview Trends</CardTitle>
                  <CardDescription>Interviews conducted vs successful hires</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="interviews" fill="#3B82F6" name="Interviews" />
                      <Bar dataKey="hired" fill="#10B981" name="Hired" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Position Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Interviews by Position</CardTitle>
                  <CardDescription>Distribution of interview types</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={positionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="count"
                      >
                        {positionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {positionData.map((item) => (
                      <div key={item.position} className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.position}: {item.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="interviews" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Interview Success Rate</CardTitle>
                  <CardDescription>Success rate over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="hired" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        name="Successful Hires"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Interview Results</CardTitle>
                  <CardDescription>Latest interview outcomes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { candidate: 'John Doe', position: 'Frontend Developer', result: 'Hired', date: '2024-01-15' },
                      { candidate: 'Jane Smith', position: 'UX Designer', result: 'Pending', date: '2024-01-14' },
                      { candidate: 'Mike Johnson', position: 'Backend Developer', result: 'Rejected', date: '2024-01-13' },
                    ].map((interview, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{interview.candidate}</p>
                          <p className="text-sm text-gray-600">{interview.position}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={
                            interview.result === 'Hired' ? 'bg-green-100 text-green-800' :
                            interview.result === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {interview.result}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{interview.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="candidates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Candidate Pipeline</CardTitle>
                <CardDescription>Current status of candidates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { stage: 'Applied', count: 245, color: 'bg-blue-500' },
                    { stage: 'Screening', count: 89, color: 'bg-yellow-500' },
                    { stage: 'Interview', count: 34, color: 'bg-purple-500' },
                    { stage: 'Final Review', count: 12, color: 'bg-orange-500' },
                    { stage: 'Hired', count: 8, color: 'bg-green-500' },
                  ].map((stage) => (
                    <div key={stage.stage} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded ${stage.color} mr-3`} />
                        <span className="font-medium">{stage.stage}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold mr-2">{stage.count}</span>
                        <Progress value={(stage.count / 245) * 100} className="w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Interviewers</CardTitle>
                <CardDescription>Interviewer performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="font-bold text-blue-600">{performer.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <p className="font-medium">{performer.name}</p>
                          <p className="text-sm text-gray-600">{performer.interviews} interviews conducted</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center mb-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-medium">{performer.rating}</span>
                        </div>
                        <p className="text-sm text-gray-600">{performer.hires} successful hires</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Analytics;
