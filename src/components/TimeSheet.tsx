
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
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Activity types
const activityTypes = [
  { value: 'teaching', label: 'Teaching' },
  { value: 'research', label: 'Research' },
  { value: 'administrative', label: 'Administrative' },
  { value: 'mentoring', label: 'Student Mentoring' },
  { value: 'development', label: 'Professional Development' },
  { value: 'other', label: 'Other' },
];

// Define periods
const periods = [
  { id: 1, startTime: '08:30', endTime: '09:20' },
  { id: 2, startTime: '09:20', endTime: '10:10' },
  { id: 3, startTime: '10:20', endTime: '11:10' },
  { id: 4, startTime: '11:10', endTime: '12:00' },
  { id: 5, startTime: '12:50', endTime: '13:40' },
  { id: 6, startTime: '13:40', endTime: '14:30' },
  { id: 7, startTime: '14:40', endTime: '15:30' },
  { id: 8, startTime: '15:30', endTime: '16:20' },
];

// Mock timesheet entries
const mockTimeEntries = [
  {
    id: 1,
    date: new Date('2023-04-14'),
    periodId: 1,
    activityType: 'teaching',
    description: 'Conducted advanced database lecture for 3rd year students',
  },
  {
    id: 2,
    date: new Date('2023-04-14'),
    periodId: 2,
    activityType: 'mentoring',
    description: 'Student project mentoring and guidance',
  },
  {
    id: 3,
    date: new Date('2023-04-14'),
    periodId: 4,
    activityType: 'research',
    description: 'Working on research paper for upcoming conference',
  },
  {
    id: 4,
    date: new Date('2023-04-13'),
    periodId: 3,
    activityType: 'teaching',
    description: 'Prepared and delivered programming fundamentals lecture',
  },
  {
    id: 5,
    date: new Date('2023-04-13'),
    periodId: 6,
    activityType: 'administrative',
    description: 'Department meeting and curriculum planning',
  },
];

export const TimeSheet: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [timeEntries, setTimeEntries] = useState(mockTimeEntries);
  const [activeTab, setActiveTab] = useState<string>('view-entries');
  const [periodId, setPeriodId] = useState<string>('');
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
        periodId: parseInt(periodId),
        activityType,
        description,
      };
      
      setTimeEntries([newEntry, ...timeEntries]);
      
      // Reset form
      setPeriodId('');
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

  // Check if period has an entry for the selected date
  const getPeriodEntry = (periodId: number) => {
    return entriesForSelectedDate.find(entry => entry.periodId === periodId);
  };
  
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
              <TabsTrigger value="view-entries">
                <Clock className="h-4 w-4 mr-2" />
                View Periods
              </TabsTrigger>
              <TabsTrigger value="new-entry">
                <Plus className="h-4 w-4 mr-2" />
                New Entry
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="view-entries">
              <Card>
                <CardHeader>
                  <CardTitle>Timesheet Periods</CardTitle>
                  <CardDescription>
                    Your work schedule for {format(date, 'MMMM d, yyyy')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Period</TableHead>
                          {periods.map((period) => (
                            <TableHead key={period.id} className="text-center">
                              {period.id}
                              <div className="text-xs text-muted-foreground">
                                {period.startTime} - {period.endTime}
                              </div>
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Activity</TableCell>
                          {periods.map((period) => {
                            const entry = getPeriodEntry(period.id);
                            return (
                              <TableCell key={period.id} className="p-2">
                                {entry ? (
                                  <div 
                                    className="bg-primary/10 rounded-md p-2 h-20 cursor-pointer text-center flex flex-col items-center justify-center text-sm hover:bg-primary/20"
                                    onClick={() => {
                                      setPeriodId(period.id.toString());
                                      setActivityType(entry.activityType);
                                      setDescription(entry.description);
                                      setActiveTab('new-entry');
                                    }}
                                  >
                                    <div className="font-medium">
                                      {activityTypes.find(t => t.value === entry.activityType)?.label}
                                    </div>
                                    <div className="text-xs text-muted-foreground line-clamp-2">
                                      {entry.description}
                                    </div>
                                  </div>
                                ) : (
                                  <div 
                                    className="border border-dashed border-muted-foreground/20 rounded-md p-2 h-20 flex items-center justify-center cursor-pointer hover:bg-muted/30 text-muted-foreground text-sm"
                                    onClick={() => {
                                      setPeriodId(period.id.toString());
                                      setActivityType('');
                                      setDescription('');
                                      setActiveTab('new-entry');
                                    }}
                                  >
                                    + Add Activity
                                  </div>
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
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
                              Total: {entries.length} periods filled
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
            
            <TabsContent value="new-entry">
              <Card>
                <CardHeader>
                  <CardTitle>Add Timesheet Entry</CardTitle>
                  <CardDescription>
                    Record your work activity for {format(date, 'MMMM d, yyyy')}
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
                      <Label htmlFor="period">Period</Label>
                      <Select 
                        value={periodId} 
                        onValueChange={setPeriodId}
                        required
                      >
                        <SelectTrigger id="period">
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {periods.map((period) => (
                              <SelectItem key={period.id} value={period.id.toString()}>
                                Period {period.id} ({period.startTime} - {period.endTime})
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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
                      setPeriodId('');
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
          </Tabs>
        </div>
      </div>
    </div>
  );
};
