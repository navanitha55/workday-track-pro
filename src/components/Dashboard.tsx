
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Clock, FileCheck, FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

// Mock data
const appraisalTasks = [
  { id: 1, title: 'Course Completion', status: 'completed', progress: 100 },
  { id: 2, title: 'NPTEL Coordination', status: 'in-progress', progress: 60 },
  { id: 3, title: 'Research Papers', status: 'todo', progress: 25 },
  { id: 4, title: 'Seminar Attendance', status: 'in-progress', progress: 75 },
];

const recentTimesheets = [
  { id: 1, date: '2023-04-14', hours: 8, status: 'submitted' },
  { id: 2, date: '2023-04-13', hours: 7.5, status: 'submitted' },
  { id: 3, date: '2023-04-12', hours: 8, status: 'submitted' },
];

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  const isAdmin = user?.role === 'admin';
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}! Here's an overview of your work activity.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23.5</div>
            <p className="text-xs text-muted-foreground">+2.5 from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isAdmin ? '5' : '1'}</div>
            <p className="text-xs text-muted-foreground">
              {isAdmin ? 'Staff appraisals awaiting review' : 'Appraisal submitted for review'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Review</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">May 15</div>
            <p className="text-xs text-muted-foreground">30 days remaining</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Appraisal Tasks Progress</CardTitle>
            <CardDescription>Your current semester tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appraisalTasks.map(task => (
                <div key={task.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{task.title}</span>
                    <span className="text-sm text-muted-foreground">{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} />
                </div>
              ))}
              
              <Link 
                to="/appraisal" 
                className="inline-flex items-center text-sm text-primary hover:underline mt-4"
              >
                View all tasks
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Timesheets</CardTitle>
            <CardDescription>Your latest time entries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTimesheets.map(timesheet => (
                <div key={timesheet.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">
                      {new Date(timesheet.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground">{timesheet.hours} hours</p>
                  </div>
                  <div className="status-badge status-approved">
                    Submitted
                  </div>
                </div>
              ))}
              
              <Link 
                to="/timesheet" 
                className="inline-flex items-center text-sm text-primary hover:underline mt-4"
              >
                View all timesheets
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Pending Staff Appraisals
            </CardTitle>
            <CardDescription>
              Staff appraisals awaiting your review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-md card-hover">
                  <div>
                    <p className="font-medium">Staff Member {i + 1}</p>
                    <p className="text-sm text-muted-foreground">Department {['CS', 'IT', 'EC', 'ME', 'CE'][i]}</p>
                  </div>
                  <Link 
                    to="/admin" 
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Review
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
