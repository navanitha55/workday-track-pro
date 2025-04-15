
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  ClipboardList, 
  FileCheck, 
  User, 
  BookOpen, 
  FileText,
  XCircle,
  MessageSquare
} from 'lucide-react';

// Mock staff appraisal data
const mockStaffAppraisals = [
  {
    id: 1,
    staffName: 'John Smith',
    department: 'Computer Science',
    role: 'Assistant Professor',
    submittedDate: '2023-04-10',
    status: 'pending',
    tasks: [
      { 
        id: 1, 
        title: 'Lecture Materials Update', 
        category: 'teaching',
        description: 'Updated lecture materials for Java Programming course',
        status: 'completed',
        documents: ['java_lecture_slides.pdf']
      },
      { 
        id: 2, 
        title: 'Student Mentoring', 
        category: 'service',
        description: 'Mentored 10 students for their final year projects',
        status: 'completed',
        documents: ['mentoring_report.pdf', 'student_feedback.pdf']
      },
      { 
        id: 3, 
        title: 'Research Paper', 
        category: 'research',
        description: 'Published a paper on machine learning applications',
        status: 'completed',
        documents: ['research_paper.pdf', 'publication_certificate.pdf']
      },
      { 
        id: 4, 
        title: 'NPTEL Course Completion', 
        category: 'professional',
        description: 'Completed NPTEL course on Advanced Algorithms',
        status: 'completed',
        documents: ['nptel_certificate.pdf']
      }
    ]
  },
  {
    id: 2,
    staffName: 'Emily Johnson',
    department: 'Electronics',
    role: 'Associate Professor',
    submittedDate: '2023-04-12',
    status: 'pending',
    tasks: [
      { 
        id: 1, 
        title: 'Laboratory Manual Update', 
        category: 'teaching',
        description: 'Updated the Digital Electronics lab manual with new experiments',
        status: 'completed',
        documents: ['lab_manual.pdf']
      },
      { 
        id: 2, 
        title: 'FDP Attendance', 
        category: 'professional',
        description: 'Attended Faculty Development Program on IoT',
        status: 'completed',
        documents: ['fdp_certificate.pdf']
      },
      { 
        id: 3, 
        title: 'Student Project Guidance', 
        category: 'service',
        description: 'Guided students for national level technical competition',
        status: 'completed',
        documents: ['project_report.pdf', 'competition_results.pdf']
      }
    ]
  },
  {
    id: 3,
    staffName: 'Robert Williams',
    department: 'Mechanical Engineering',
    role: 'Professor',
    submittedDate: '2023-04-08',
    status: 'pending',
    tasks: [
      { 
        id: 1, 
        title: 'Research Grant', 
        category: 'research',
        description: 'Secured research grant from industry partner',
        status: 'completed',
        documents: ['grant_letter.pdf', 'proposal.pdf']
      },
      { 
        id: 2, 
        title: 'Conference Paper', 
        category: 'research',
        description: 'Presented paper at International Conference on Manufacturing',
        status: 'completed',
        documents: ['conference_paper.pdf', 'presentation.pdf']
      },
      { 
        id: 3, 
        title: 'Course Materials', 
        category: 'teaching',
        description: 'Developed new course materials for Design of Machine Elements',
        status: 'completed',
        documents: ['course_materials.pdf']
      },
      { 
        id: 4, 
        title: 'Industry Visit', 
        category: 'service',
        description: 'Organized industry visit for final year students',
        status: 'completed',
        documents: ['visit_report.pdf', 'feedback.pdf']
      }
    ]
  },
  {
    id: 4,
    staffName: 'Sarah Davis',
    department: 'Computer Science',
    role: 'Assistant Professor',
    submittedDate: '2023-04-11',
    status: 'pending',
    tasks: [
      { 
        id: 1, 
        title: 'NPTEL Coordination', 
        category: 'service',
        description: 'Coordinated NPTEL course enrollments for the department',
        status: 'completed',
        documents: ['nptel_report.pdf', 'student_list.pdf']
      },
      { 
        id: 2, 
        title: 'Workshop Organization', 
        category: 'service',
        description: 'Organized workshop on Web Development',
        status: 'completed',
        documents: ['workshop_brochure.pdf', 'attendance.pdf']
      },
      { 
        id: 3, 
        title: 'Course Completion', 
        category: 'teaching',
        description: 'Completed all assigned courses with good student feedback',
        status: 'completed',
        documents: ['feedback_analysis.pdf']
      }
    ]
  },
  {
    id: 5,
    staffName: 'Michael Brown',
    department: 'Mathematics',
    role: 'Professor',
    submittedDate: '2023-04-09',
    status: 'pending',
    tasks: [
      { 
        id: 1, 
        title: 'Textbook Publication', 
        category: 'research',
        description: 'Published a textbook on Advanced Calculus',
        status: 'completed',
        documents: ['book_cover.pdf', 'publisher_letter.pdf']
      },
      { 
        id: 2, 
        title: 'Question Bank', 
        category: 'teaching',
        description: 'Developed comprehensive question bank for all courses',
        status: 'completed',
        documents: ['question_bank.pdf']
      },
      { 
        id: 3, 
        title: 'FDP Conduction', 
        category: 'service',
        description: 'Conducted FDP on Mathematical Modeling',
        status: 'completed',
        documents: ['fdp_brochure.pdf', 'schedule.pdf']
      }
    ]
  }
];

export const AdminReview: React.FC = () => {
  const [appraisals, setAppraisals] = useState(mockStaffAppraisals);
  const [selectedAppraisal, setSelectedAppraisal] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('pending');
  const [remarks, setRemarks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  
  const handleApprove = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (selectedAppraisal !== null) {
        setAppraisals(appraisals.map(appraisal => 
          appraisal.id === selectedAppraisal
            ? { ...appraisal, status: 'approved' }
            : appraisal
        ));
        
        toast({
          title: "Appraisal Approved",
          description: "The appraisal has been successfully approved",
        });
        
        setSelectedAppraisal(null);
        setRemarks('');
      }
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  const handleReject = () => {
    if (!remarks.trim()) {
      toast({
        title: "Remarks Required",
        description: "Please provide feedback before rejecting the appraisal",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (selectedAppraisal !== null) {
        setAppraisals(appraisals.map(appraisal => 
          appraisal.id === selectedAppraisal
            ? { ...appraisal, status: 'rejected' }
            : appraisal
        ));
        
        toast({
          title: "Appraisal Rejected",
          description: "The appraisal has been rejected with comments",
          variant: "destructive",
        });
        
        setSelectedAppraisal(null);
        setRemarks('');
      }
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  // Filter appraisals based on active tab
  const filteredAppraisals = appraisals.filter(
    appraisal => {
      if (activeTab === 'all') return true;
      return appraisal.status === activeTab;
    }
  );
  
  const currentAppraisal = selectedAppraisal !== null
    ? appraisals.find(a => a.id === selectedAppraisal)
    : null;
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Review</h2>
        <p className="text-muted-foreground">
          Review and manage staff appraisal submissions
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Appraisal Submissions
              </CardTitle>
              <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredAppraisals.length > 0 ? (
                  filteredAppraisals.map(appraisal => (
                    <div 
                      key={appraisal.id}
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedAppraisal === appraisal.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-accent'
                      }`}
                      onClick={() => setSelectedAppraisal(appraisal.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{appraisal.staffName}</div>
                          <div className="text-xs opacity-90">{appraisal.department}</div>
                        </div>
                        <div className={`text-xs rounded-full px-2 py-1 ${
                          appraisal.status === 'approved' 
                            ? 'bg-success/20 text-success' 
                            : appraisal.status === 'rejected'
                              ? 'bg-destructive/20 text-destructive'
                              : 'bg-muted-foreground/20 text-muted-foreground'
                        }`}>
                          {appraisal.status === 'approved' 
                            ? 'Approved' 
                            : appraisal.status === 'rejected'
                              ? 'Rejected'
                              : 'Pending'
                          }
                        </div>
                      </div>
                      <div className="text-xs mt-1 opacity-75">
                        Submitted: {appraisal.submittedDate}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <FileCheck className="h-10 w-10 mx-auto text-muted-foreground/50" />
                    <p className="mt-2 text-muted-foreground">
                      No {activeTab} appraisals found
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          {currentAppraisal ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        {currentAppraisal.staffName}
                      </CardTitle>
                      <CardDescription>
                        {currentAppraisal.department} - {currentAppraisal.role}
                      </CardDescription>
                    </div>
                    <div className={`text-xs rounded-full px-2.5 py-1 font-medium ${
                      currentAppraisal.status === 'approved' 
                        ? 'bg-success/20 text-success' 
                        : currentAppraisal.status === 'rejected'
                          ? 'bg-destructive/20 text-destructive'
                          : 'bg-muted-foreground/20 text-muted-foreground'
                    }`}>
                      {currentAppraisal.status === 'approved' 
                        ? 'Approved' 
                        : currentAppraisal.status === 'rejected'
                          ? 'Rejected'
                          : 'Pending Review'
                      }
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Submission Date:</span>
                      <span>{currentAppraisal.submittedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Tasks:</span>
                      <span>{currentAppraisal.tasks.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Completed Tasks:</span>
                      <span>{currentAppraisal.tasks.filter(t => t.status === 'completed').length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Appraisal Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {currentAppraisal.tasks.map((task, index) => (
                      <div key={task.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              Category: {task.category}
                            </p>
                          </div>
                          <div className="bg-success/20 text-success text-xs rounded-full px-2 py-1">
                            {task.status}
                          </div>
                        </div>
                        
                        <p className="text-sm mt-2">{task.description}</p>
                        
                        {task.documents.length > 0 && (
                          <div className="mt-4">
                            <div className="text-xs font-medium mb-2">Supporting Documents:</div>
                            <div className="space-y-2">
                              {task.documents.map((doc, i) => (
                                <div key={i} className="flex items-center gap-2 p-2 bg-accent rounded-md text-sm">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  <span>{doc}</span>
                                  <Button size="sm" variant="ghost" className="ml-auto h-7 text-xs">
                                    View
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {currentAppraisal.status === 'pending' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Review Decision
                    </CardTitle>
                    <CardDescription>
                      Approve or reject this appraisal submission
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="remarks">Remarks/Feedback</Label>
                        <Textarea
                          id="remarks"
                          placeholder="Enter your remarks or feedback (required for rejection)"
                          rows={4}
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="destructive"
                      onClick={handleReject}
                      disabled={isSubmitting}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button 
                      variant="default"
                      onClick={handleApprove}
                      disabled={isSubmitting}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[400px] border border-dashed rounded-xl p-8">
              <div className="text-center">
                <FileCheck className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium">No Appraisal Selected</h3>
                <p className="text-muted-foreground mt-2">
                  Select an appraisal from the list to view details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
