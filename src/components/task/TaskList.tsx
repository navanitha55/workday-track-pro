
import React from 'react';
import { TaskCard } from './TaskCard';
import { CheckCircle2 } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  category: string;
  description: string;
  compliance: string;
  score: number;
  totalMarks: number;
  completed: boolean;
  documents: string[];
  deadline: string;
  status: string;
}

interface TaskListProps {
  tasks: Task[];
  onTaskCompletion: (taskId: number, completed: boolean) => void;
  onFileUpload: (taskId: number) => void;
  onViewDocument: (document: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskCompletion,
  onFileUpload,
  onViewDocument,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center p-12">
        <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
        <h3 className="text-lg font-medium">No tasks found</h3>
        <p className="text-sm text-muted-foreground">
          Add some tasks to start tracking your appraisal progress
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          {...task}
          onTaskCompletion={onTaskCompletion}
          onFileUpload={onFileUpload}
          onViewDocument={onViewDocument}
        />
      ))}
    </div>
  );
};
