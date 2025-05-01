
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Save, Clock } from 'lucide-react';

// Activity types
const activityTypes = [
  { value: 'teaching', label: 'Teaching' },
  { value: 'research', label: 'Research' },
  { value: 'administrative', label: 'Administrative' },
  { value: 'mentoring', label: 'Student Mentoring' },
  { value: 'development', label: 'Professional Development' },
  { value: 'other', label: 'Other' },
];

// Define periods with customizable start and end times
const defaultPeriods = [
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
    periodId: 1,
    activityType: 'teaching',
    description: 'Conducted advanced database lecture for 3rd year students',
  },
  {
    id: 2,
    periodId: 2,
    activityType: 'mentoring',
    description: 'Student project mentoring and guidance',
  },
  {
    id: 4,
    periodId: 4,
    activityType: 'research',
    description: 'Working on research paper for upcoming conference',
  },
];

export const PeriodView: React.FC = () => {
  const [periods, setPeriods] = useState(defaultPeriods);
  const [timeEntries, setTimeEntries] = useState(mockTimeEntries);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null);
  const [activityType, setActivityType] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  
  const handlePeriodClick = (periodId: number) => {
    const period = periods.find(p => p.id === periodId);
    const entry = timeEntries.find(e => e.periodId === periodId);
    
    if (period) {
      setSelectedPeriod(periodId);
      setStartTime(period.startTime);
      setEndTime(period.endTime);
      
      if (entry) {
        setActivityType(entry.activityType);
        setDescription(entry.description);
      } else {
        setActivityType('');
        setDescription('');
      }
      
      setIsDialogOpen(true);
    }
  };
  
  const handleSave = () => {
    if (!selectedPeriod) return;
    
    setIsSubmitting(true);
    
    // Update period times
    setPeriods(periods.map(p => 
      p.id === selectedPeriod 
        ? { ...p, startTime, endTime } 
        : p
    ));
    
    // Save or update entry if activity is provided
    if (activityType) {
      const existingEntry = timeEntries.find(e => e.periodId === selectedPeriod);
      
      if (existingEntry) {
        setTimeEntries(timeEntries.map(e => 
          e.periodId === selectedPeriod 
            ? { ...e, activityType, description }
            : e
        ));
      } else {
        setTimeEntries([
          ...timeEntries, 
          { 
            id: Date.now(),
            periodId: selectedPeriod,
            activityType,
            description
          }
        ]);
      }
      
      toast({
        title: "Entry Saved",
        description: "Your timesheet entry has been saved",
      });
    }
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDialogOpen(false);
    }, 500);
  };
  
  const getEntryForPeriod = (periodId: number) => {
    return timeEntries.find(entry => entry.periodId === periodId);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Daily Periods</CardTitle>
          <CardDescription>
            View and manage all periods for today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {periods.map((period) => {
              const entry = getEntryForPeriod(period.id);
              const hasEntry = !!entry;
              
              return (
                <div 
                  key={period.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    hasEntry 
                      ? 'bg-primary/10 hover:bg-primary/15' 
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => handlePeriodClick(period.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Period {period.id}</h3>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-3">
                    {period.startTime} - {period.endTime}
                  </div>
                  
                  {hasEntry ? (
                    <div>
                      <div className="font-medium text-sm">
                        {activityTypes.find(t => t.value === entry.activityType)?.label}
                      </div>
                      <p className="text-xs line-clamp-2 text-muted-foreground mt-1">
                        {entry.description}
                      </p>
                    </div>
                  ) : (
                    <div className="text-sm text-center py-2 border border-dashed rounded-md">
                      + Add Activity
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      {/* Period Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedPeriod ? `Period ${selectedPeriod}` : 'Edit Period'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="end-time">End Time</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="activity-type">Activity Type</Label>
              <Select 
                value={activityType} 
                onValueChange={setActivityType}
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
                placeholder="Describe your activity"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
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
                  Save
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
