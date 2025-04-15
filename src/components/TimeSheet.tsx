
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Plus, Save, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Activity types
const activityTypes = [
  { value: 'teaching', label: 'Teaching' },
  { value: 'research', label: 'Research' },
  { value: 'administrative', label: 'Administrative' },
  { value: 'mentoring', label: 'Student Mentoring' },
  { value: 'development', label: 'Professional Development' },
  { value: 'other', label: 'Other' },
];

// Mock timesheet entries
const mockTimeEntries = [
  {
    id: 1,
    date: new Date('2023-04-14'),
    hours: 3,
    activityType: 'teaching',
    description: 'Conducted advanced database lecture for 3rd year students',
  },
  {
    id: 2,
    date: new Date('2023-04-14'),
    hours: 2,
    activityType: 'mentoring',
    description: 'Student project mentoring and guidance',
  },
  {
    id: 3,
    date: new Date('2023-04-14'),
    hours: 3,
    activityType: 'research',
    description: 'Working on research paper for upcoming conference',
  },
  {
    id: 4,
    date: new Date('2023-04-13'),
    hours: 4,
    activityType: 'teaching',
    description: 'Prepared and delivered programming fundamentals lecture',
  },
  {
    id: 5,
    date: new Date('2023-04-13'),
    hours: 3.5,
    activityType: 'administrative',
    description: 'Department meeting and curriculum planning',
  },
];

export const TimeSheet: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [timeEntries, setTimeEntries] = useState(mockTimeEntries);
  const [activeTab, setActiveTab] = useState<string>('new-entry');
  const [hours, setHours] = useState<string>('');
  const [activityType, setActivityType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  
  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate saving with a delay
    setTimeout(() => {
      const newEntry = {
        id: Date.now(),
        date: new Date(date),
        hours: parseFloat(hours),
        activityType,
        description,
      };
      
      setTimeEntries([newEntry, ...timeEntries]);
      
      // Reset form
      setHours('');
      setActivityType('');
      setDescription('');
      
      toast({
        title: "Entry Added",
        description: "Your timesheet entry has been saved",
      });
      
      setActiveTab('view-entries');
      setIsSubmitting(false);
    }, 800);
  };
  
  // Filter entries by current date
  const entriesForSelectedDate = timeEntries.filter(
    entry => format(entry.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
  );
  
  // Group entries by date for history view
  const entriesByDate = timeEntries.reduce((groups, entry) => {
    const date = format(entry.date, 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(entry);
    return groups;
  }, {} as Record<string, typeof timeEntries>);
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Timesheet</h2>
        <p className="text-muted-foreground">
          Track and manage your daily work activities
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-80 flex-shrink-0">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>Choose a date to view or add entries</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="border rounded-md p-3"
            />
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">
              {format(date, 'EEEE, MMMM d, yyyy')}
            </div>
          </CardFooter>
        </Card>
        
        <div className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="new-entry">
                <Plus className="h-4 w-4 mr-2" />
                New Entry
              </TabsTrigger>
              <TabsTrigger value="view-entries">
                <Clock className="h-4 w-4 mr-2" />
                View Entries
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="new-entry">
              <Card>
                <CardHeader>
                  <CardTitle>Add Timesheet Entry</CardTitle>
                  <CardDescription>
                    Record your work activities for {format(date, 'MMMM d, yyyy')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form id="timesheet-form" onSubmit={handleAddEntry} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(date, 'PPP')}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(date) => date && setDate(date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="hours">Hours</Label>
                      <Input
                        id="hours"
                        type="number"
                        step="0.5"
                        min="0.5"
                        max="12"
                        placeholder="Enter hours worked"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="activity-type">Activity Type</Label>
                      <Select 
                        value={activityType} 
                        onValueChange={setActivityType}
                        required
                      >
                        <SelectTrigger id="activity-type">
                          <SelectValue placeholder="Select activity type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {activityTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your work activity"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setHours('');
                      setActivityType('');
                      setDescription('');
                    }}
                  >
                    Clear
                  </Button>
                  <Button 
                    type="submit" 
                    form="timesheet-form" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Entry
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="view-entries">
              <Card>
                <CardHeader>
                  <CardTitle>Timesheet Entries</CardTitle>
                  <CardDescription>
                    Your work activities for {format(date, 'MMMM d, yyyy')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {entriesForSelectedDate.length > 0 ? (
                    <div className="space-y-4">
                      {entriesForSelectedDate.map((entry) => (
                        <div key={entry.id} className="border rounded-md p-4 card-hover">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">
                                {activityTypes.find(t => t.value === entry.activityType)?.label}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {entry.description}
                              </p>
                            </div>
                            <div className="bg-primary/10 text-primary font-medium px-2 py-1 rounded-md">
                              {entry.hours} hrs
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-end pt-2 font-medium">
                        Total: {entriesForSelectedDate.reduce((sum, entry) => sum + entry.hours, 0)} hours
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <h3 className="text-lg font-medium">No entries for this date</h3>
                      <p className="text-sm text-muted-foreground">
                        Switch to "New Entry" tab to add a timesheet entry.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Recent History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(entriesByDate)
                      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
                      .slice(0, 5)
                      .map(([date, entries]) => (
                        <div key={date} className="space-y-2">
                          <h4 className="font-medium">
                            {format(new Date(date), 'EEEE, MMMM d, yyyy')}
                          </h4>
                          <div className="pl-4 border-l-2 border-muted">
                            <p className="text-sm">
                              Total: {entries.reduce((sum, entry) => sum + entry.hours, 0)} hours
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {entries.length} activities
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
