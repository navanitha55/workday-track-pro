
import React, { useState } from 'react';
import { TimeSheet } from '../components/TimeSheet';
import { PeriodView } from '../components/PeriodView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TimeSheetPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("calendar-view");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Timesheet</h2>
        <p className="text-muted-foreground">
          Track and manage your daily work activities
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="calendar-view">Calendar View</TabsTrigger>
          <TabsTrigger value="period-view">Period View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar-view">
          <TimeSheet />
        </TabsContent>
        
        <TabsContent value="period-view">
          <PeriodView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TimeSheetPage;
