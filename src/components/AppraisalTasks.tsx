
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '../context/AuthContext';
import { 
  CheckCircle2, 
  FileUp, 
  SendHorizontal, 
  FilePlus2, 
  FileCheck2, 
  Clock, 
  Eye,
  X
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';

// Updated appraisal categories based on the document
const taskCategories = [
  { value: 'students-related-external', label: 'Students Related - External' },
  { value: 'faculty-related-internal', label: 'Faculty Related - Internal' },
  { value: 'faculty-related-external', label: 'Faculty Related - External' },
];

// Mock appraisal tasks based on the document
const mockAppraisalTasks = [
  {
    id: 1,
    title: 'Arrange Internship',
    category: 'students-related-external',
    description: "To arrange Internship (Minimum 20 students)",
    compliance: "1 / Semester",
    score: 15,
    completed: true,
    documents: ['internship_report.pdf'],
    deadline: '2023-05-01',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Value Added Courses',
    category: 'students-related-external',
    description: "To organize core related Value Added Courses",
    compliance: "1 / Semester",
    score: 15,
    completed: true,
    documents: ['vac_report.pdf'],
    deadline: '2023-04-15',
    status: 'completed',
  },
  {
    id: 3,
    title: 'Course File Preparation',
    category: 'faculty-related-internal',
    description: 'Preparation of the Course File',
    compliance: 'One Week prior to the commencement of classes',
    score: 30,
    completed: false,
    documents: [],
    deadline: '2023-06-30',
    status: 'in-progress',
  },
  {
    id: 4,
    title: 'Final Year Project Guidance',
    category: 'faculty-related-internal',
    description: 'Final Year Project Guidance',
    compliance: 'Minimum two/year',
    score: 20,
    completed: false,
    documents: ['project_guide.pdf'],
    deadline: '2023-07-15',
    status: 'in-progress',
  },
  {
    id: 5,
    title: 'Book/Book Chapter Publications',
    category: 'faculty-related-external',
    description: 'Publish Book or Book Chapter',
    compliance: '1 / Year',
    score: 30,
    completed: false,
    documents: [],
    deadline: '2023-05-30',
    status: 'not-started',
  },
  {
    id: 6,
    title: 'NPTEL Certification',
    category: 'faculty-related-external',
    description: "Complete NPTEL & Other approved institutions certification",
    compliance: '1 / Semester',
    score: 20,
    completed: true,
    documents: ['nptel_certificate.pdf'],
    deadline: '2023-04-30',
    status: 'completed',
  },
];

export const AppraisalTasks: React.FC = () => {
  const [tasks, setTasks] = useState(mockAppraisalTasks);
  const [activeTab, setActiveTab] = useState<string>('all-tasks');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskCompliance, setNewTaskCompliance] = useState('');
  const [newTaskScore, setNewTaskScore] = useState<number>(0);
  const [newTaskDeadline, setNewTaskDeadline] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingAppraisal, setIsSubmittingAppraisal] = useState(false);
  const [viewingDocument, setViewingDocument] = useState<string | null>(null);
  
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Calculate progress
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate saving with a delay
    setTimeout(() => {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        category: newTaskCategory,
        description: newTaskDescription,
        compliance: newTaskCompliance,
        score: newTaskScore,
        completed: false,
        documents: [] as string[],
        deadline: newTaskDeadline,
        status: 'not-started',
      };
      
      setTasks([...tasks, newTask]);
      
      // Reset form
      setNewTaskTitle('');
      setNewTaskCategory('');
      setNewTaskDescription('');
      setNewTaskCompliance('');
      setNewTaskScore(0);
      setNewTaskDeadline('');
      
      toast({
        title: "Task Added",
        description: "Your appraisal task has been added",
      });
      
      setActiveTab('all-tasks');
      setIsSubmitting(false);
    }, 800);
  };
  
  const handleTaskCompletion = (taskId: number, completed: boolean) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { 
          ...task, 
          completed, 
          status: completed ? 'completed' : task.documents.length > 0 ? 'in-progress' : 'not-started' 
        } 
        : task
    ));
  };
  
  const handleFileUpload = (taskId: number) => {
    // Simulate file upload
    const mockFileName = `file_${Date.now()}.pdf`;
    
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { 
          ...task, 
          documents: [...task.documents, mockFileName],
          status: task.completed ? 'completed' : 'in-progress'
        } 
        : task
    ));
    
    toast({
      title: "Document Uploaded",
      description: "Your document has been attached to the task",
    });
  };
  
  const handleViewDocument = (document: string) => {
    setViewingDocument(document);
  };
  
  const handleSubmitAppraisal = () => {
    setIsSubmittingAppraisal(true);
    
    // Simulate submission delay
    setTimeout(() => {
      toast({
        title: "Appraisal Submitted",
        description: "Your appraisal has been submitted for review",
        variant: "default",
      });
      
      setIsSubmittingAppraisal(false);
    }, 2000);
  };
  
  const filteredTasks = activeTab === 'all-tasks' 
    ? tasks 
    : tasks.filter(task => 
        activeTab === 'completed' 
          ? task.completed 
          : activeTab === 'pending' 
            ? !task.completed 
            : activeTab === 'students-related-external'
            ? task.category === 'students-related-external'
            : activeTab === 'faculty-related-internal'
            ? task.category === 'faculty-related-internal'
            : activeTab === 'faculty-related-external'
            ? task.category === 'faculty-related-external'
            : true
      );
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Appraisal Tasks</h2>
        <p className="text-muted-foreground">
          Manage your semester appraisal tasks and track progress
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Appraisal Progress</CardTitle>
          <CardDescription>
            Your current completion status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{completedTasks} of {totalTasks} tasks completed</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
          
          <div className="mt-6 flex gap-4">
            <Button 
              onClick={handleSubmitAppraisal} 
              className="flex gap-2" 
              disabled={progress < 100 || isSubmittingAppraisal}
            >
              {isSubmittingAppraisal ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <SendHorizontal className="h-4 w-4" />
                  Submit for Appraisal Review
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setActiveTab('add-task')}
            >
              <FilePlus2 className="h-4 w-4 mr-2" />
              Add New Task
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-7">
          <TabsTrigger value="all-tasks">All Tasks</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="students-related-external">Students External</TabsTrigger>
          <TabsTrigger value="faculty-related-internal">Faculty Internal</TabsTrigger>
          <TabsTrigger value="faculty-related-external">Faculty External</TabsTrigger>
          <TabsTrigger value="add-task">Add Task</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-tasks" className="space-y-4 mt-6">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <Card key={task.id} className={`overflow-hidden ${task.completed ? 'border-l-4 border-l-success' : ''}`}>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={(checked) => 
                          handleTaskCompletion(task.id, checked === true)
                        }
                      />
                      <Label 
                        htmlFor={`task-${task.id}`}
                        className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                      >
                        {task.title}
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-xs rounded-full px-2 py-1 ${
                        task.status === 'completed' 
                          ? 'bg-success/20 text-success' 
                          : task.status === 'in-progress'
                            ? 'bg-warning/20 text-warning'
                            : 'bg-muted-foreground/20 text-muted-foreground'
                      }`}>
                        {task.status === 'completed' 
                          ? 'Completed' 
                          : task.status === 'in-progress'
                            ? 'In Progress'
                            : 'Not Started'
                        }
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Category: </span>
                      <span className="font-medium">
                        {taskCategories.find(c => c.value === task.category)?.label || task.category}
                      </span>
                    </div>
                    <p className="text-sm">{task.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Compliance: </span>
                        <span className="font-medium">{task.compliance}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Score: </span>
                        <span className="font-medium">{task.score}</span>
                      </div>
                    </div>
                    
                    {task.documents.length > 0 && (
                      <div className="mt-3">
                        <div className="text-xs text-muted-foreground font-medium mb-1">Attached Documents:</div>
                        <div className="space-y-1">
                          {task.documents.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between text-sm bg-accent/30 rounded-md p-2">
                              <div className="flex items-center gap-2">
                                <div className="bg-accent rounded p-1">
                                  <FileCheck2 className="h-3 w-3" />
                                </div>
                                <span>{doc}</span>
                              </div>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => handleViewDocument(doc)}
                                className="h-7 px-2"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Deadline: {task.deadline}
                      </div>
                      
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleFileUpload(task.id)}
                      >
                        <FileUp className="h-3 w-3 mr-1" />
                        Upload Document
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center p-12">
              <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-medium">No tasks found</h3>
              <p className="text-sm text-muted-foreground">
                Add some tasks to start tracking your appraisal progress
              </p>
            </div>
          )}
        </TabsContent>
        
        {/* Document Viewer Dialog */}
        <Dialog open={!!viewingDocument} onOpenChange={(open) => !open && setViewingDocument(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>Document: {viewingDocument}</span>
                <DialogClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </DialogClose>
              </DialogTitle>
              <DialogDescription>
                Viewing uploaded document
              </DialogDescription>
            </DialogHeader>
            <div className="bg-muted p-4 rounded-md min-h-[400px] flex flex-col items-center justify-center">
              <div className="max-w-full mx-auto bg-card p-4 rounded-lg shadow-lg">
                <img 
                  src="/lovable-uploads/788cbcd8-5b61-4411-ad67-9ec3ca04142a.png" 
                  alt="Appraisal Document" 
                  className="w-full h-auto object-contain max-h-[500px]"
                />
                <div className="text-center mt-4">
                  <h2 className="text-xl font-semibold">{viewingDocument}</h2>
                  <p className="text-muted-foreground text-sm">Faculty Semester Performance Report</p>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button className="w-full">Download Document</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <TabsContent value="completed" className="space-y-4 mt-6">
          {/* This tab uses filteredTasks which is handled by the activeTab state */}
          {filteredTasks.length === 0 && (
            <div className="text-center p-12">
              <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-medium">No completed tasks</h3>
              <p className="text-sm text-muted-foreground">
                Tasks you complete will appear here
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4 mt-6">
          {/* This tab uses filteredTasks which is handled by the activeTab state */}
          {filteredTasks.length === 0 && (
            <div className="text-center p-12">
              <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-medium">No pending tasks</h3>
              <p className="text-sm text-muted-foreground">
                All of your tasks have been completed
              </p>
            </div>
          )}
        </TabsContent>
        
        {/* Category specific tabs */}
        <TabsContent value="students-related-external" className="space-y-4 mt-6">
          {/* This tab uses filteredTasks which is handled by the activeTab state */}
          {filteredTasks.length === 0 && (
            <div className="text-center p-12">
              <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-medium">No Students Related - External tasks</h3>
              <p className="text-sm text-muted-foreground">
                Add tasks in this category to see them here
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="faculty-related-internal" className="space-y-4 mt-6">
          {/* This tab uses filteredTasks which is handled by the activeTab state */}
          {filteredTasks.length === 0 && (
            <div className="text-center p-12">
              <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-medium">No Faculty Related - Internal tasks</h3>
              <p className="text-sm text-muted-foreground">
                Add tasks in this category to see them here
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="faculty-related-external" className="space-y-4 mt-6">
          {/* This tab uses filteredTasks which is handled by the activeTab state */}
          {filteredTasks.length === 0 && (
            <div className="text-center p-12">
              <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-medium">No Faculty Related - External tasks</h3>
              <p className="text-sm text-muted-foreground">
                Add tasks in this category to see them here
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="add-task">
          <Card>
            <CardHeader>
              <CardTitle>Add New Appraisal Task</CardTitle>
              <CardDescription>
                Create a new task for your semester appraisal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="task-form" onSubmit={handleAddTask} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="task-title">Task Title</Label>
                  <Input
                    id="task-title"
                    placeholder="Enter task title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="task-category">Category</Label>
                  <Select 
                    value={newTaskCategory} 
                    onValueChange={setNewTaskCategory}
                    required
                  >
                    <SelectTrigger id="task-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {taskCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="task-description">Description</Label>
                  <Textarea
                    id="task-description"
                    placeholder="Describe the task requirements"
                    rows={4}
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="task-compliance">Compliance</Label>
                    <Input
                      id="task-compliance"
                      placeholder="e.g. 1 / Semester"
                      value={newTaskCompliance}
                      onChange={(e) => setNewTaskCompliance(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="task-score">Score</Label>
                    <Input
                      id="task-score"
                      type="number"
                      placeholder="Enter score points"
                      value={newTaskScore || ''}
                      onChange={(e) => setNewTaskScore(parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="task-deadline">Deadline</Label>
                  <Input
                    id="task-deadline"
                    type="date"
                    value={newTaskDeadline}
                    onChange={(e) => setNewTaskDeadline(e.target.value)}
                    required
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => {
                  setNewTaskTitle('');
                  setNewTaskCategory('');
                  setNewTaskDescription('');
                  setNewTaskCompliance('');
                  setNewTaskScore(0);
                  setNewTaskDeadline('');
                }}
              >
                Clear
              </Button>
              <Button 
                type="submit" 
                form="task-form" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                    Saving...
                  </>
                ) : (
                  'Add Task'
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
