
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FileUp, Eye, Clock, FileCheck2 } from 'lucide-react';

interface TaskProps {
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
  onTaskCompletion: (taskId: number, completed: boolean) => void;
  onFileUpload: (taskId: number) => void;
  onViewDocument: (document: string) => void;
}

export const TaskCard: React.FC<TaskProps> = ({
  id,
  title,
  category,
  description,
  compliance,
  score,
  totalMarks,
  completed,
  documents,
  deadline,
  status,
  onTaskCompletion,
  onFileUpload,
  onViewDocument,
}) => {
  return (
    <Card className={`overflow-hidden ${completed ? 'border-l-4 border-l-success' : ''}`}>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Checkbox 
              id={`task-${id}`}
              checked={completed}
              onCheckedChange={(checked) => 
                onTaskCompletion(id, checked === true)
              }
            />
            <Label 
              htmlFor={`task-${id}`}
              className={`font-medium ${completed ? 'line-through text-muted-foreground' : ''}`}
            >
              {title}
            </Label>
          </div>
          <div className="flex items-center">
            <span className={`text-xs rounded-full px-2 py-1 ${
              status === 'completed' 
                ? 'bg-success/20 text-success' 
                : status === 'in-progress'
                  ? 'bg-warning/20 text-warning'
                  : 'bg-muted-foreground/20 text-muted-foreground'
            }`}>
              {status === 'completed' 
                ? 'Completed' 
                : status === 'in-progress'
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
            <span className="font-medium">{category}</span>
          </div>
          <p className="text-sm">{description}</p>
          
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Score: </span>
              <span className="font-medium">{score}/{totalMarks}</span>
            </div>
          </div>
          
          {documents.length > 0 && (
            <div className="mt-3">
              <div className="text-xs text-muted-foreground font-medium mb-1">Attached Documents:</div>
              <div className="space-y-1">
                {documents.map((doc, index) => (
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
                      onClick={() => onViewDocument(doc)}
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
              Deadline: {deadline}
            </div>
            
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onFileUpload(id)}
            >
              <FileUp className="h-3 w-3 mr-1" />
              Upload Document
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
