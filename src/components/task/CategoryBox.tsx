
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { CheckCircle2, Clock, ListTodo } from 'lucide-react';

interface CategoryBoxProps {
  title: string;
  color: string;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  onClick: () => void;
}

export const CategoryBox: React.FC<CategoryBoxProps> = ({
  title,
  color,
  totalTasks,
  completedTasks,
  pendingTasks,
  onClick,
}) => {
  return (
    <Card 
      className="cursor-pointer transition-all hover:scale-[1.02]"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg">{title}</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <ListTodo className="h-4 w-4" />
            <span>Total Tasks: {totalTasks}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-success">
            <CheckCircle2 className="h-4 w-4" />
            <span>Completed: {completedTasks}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-warning">
            <Clock className="h-4 w-4" />
            <span>Pending: {pendingTasks}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
