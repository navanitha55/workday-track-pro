
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
import { CheckCircle2, FileUp, SendHorizontal, FilePlus2, FileCheck2, Clock } from 'lucide-react';

// Mock appraisal categories
const taskCategories = [
  { value: 'teaching', label: 'Teaching & Learning' },
  { value: 'research', label: 'Research & Publications' },
  { value: 'professional', label: 'Professional Development' },
  { value: 'service', label: 'Institutional Service' },
  { value: 'extension', label: 'Extension Activities' },
];

// Mock appraisal tasks
const mockAppraisalTasks = [
  {
    id: 1,
    title: 'Lecture Materials',
    category: 'teaching',
    description: 'Prepare and update lecture materials for all assigned courses',
    completed: true,
    documents: ['lecture_slides.pdf'],
    deadline: '2023-05-01',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Student Feedback Analysis',
    category: 'teaching',
    description: 'Analyze student feedback from previous semester and implement improvements',
    completed: true,
    documents: ['feedback_analysis.pdf'],
    deadline: '2023-04-15',
    status: 'completed',
  },
  {
    id: 3,
    title: 'NPTEL Certification',
    category: 'professional',
    description: 'Complete at least one NPTEL certification course relevant to teaching area',
    completed: false,
    documents: [],
    deadline: '2023-06-30',
    status: 'in-progress',
  },
  {
    id: 4,
    title: 'Research Paper Publication',
    category: 'research',
    description: 'Publish at least one research paper in a recognized journal or conference',
    completed: false,
    documents: ['draft_paper.pdf'],
    deadline: '2023-07-15',
    status: 'in-progress',
  },
  {
    id: 5,
    title: 'Workshop Attendance',
    category: 'professional',
    description: 'Attend at least one professional development workshop',
    completed: false,
    documents: [],
    deadline: '2023-05-30',
    status: 'not-started',
  },
  {
    id: 6,
    title: 'Mentoring Program',
    category: 'service',
    description: "Participate in the institution's student mentoring program",
    completed: true,
    documents: ['mentoring_report.pdf'],
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
  const [newTaskDeadline, setNewTaskDeadline] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingAppraisal, setIsSubmittingAppraisal] = useState(false);
  
  const { toast } = useToast();
  
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
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="all-tasks">All Tasks</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
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
                    
                    {task.documents.length > 0 && (
                      <div className="mt-3">
                        <div className="text-xs text-muted-foreground font-medium mb-1">Attached Documents:</div>
                        <div className="space-y-1">
                          {task.documents.map((doc, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <div className="bg-accent rounded p-1">
                                <FileCheck2 className="h-3 w-3" />
                              </div>
                              <span>{doc}</span>
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
