
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, BookOpen, Mail } from 'lucide-react';

const HelpPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Help & Support</h2>
        <p className="text-muted-foreground">
          Find answers to common questions and get support
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>
              Find answers to common questions about using the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I submit my daily timesheet?</AccordionTrigger>
                <AccordionContent>
                  <p>To submit your daily timesheet, navigate to the Timesheet page from the sidebar menu. Select the date, enter the hours worked, choose an activity type, provide a description, and click "Save Entry". You can add multiple entries for a single day.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>What types of documents should I upload for appraisal tasks?</AccordionTrigger>
                <AccordionContent>
                  <p>You should upload relevant supporting documents that provide evidence of task completion. For example, certificates for courses, reports for activities, publications for research work, or any other documentation that verifies you've completed the task.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I edit a timesheet entry after submission?</AccordionTrigger>
                <AccordionContent>
                  <p>Yes, you can edit timesheet entries. Navigate to the "View Entries" tab on the Timesheet page, find the entry you wish to edit, and click on it. Make your changes and save the updated entry.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>What happens after I submit my appraisal for review?</AccordionTrigger>
                <AccordionContent>
                  <p>After submission, your appraisal will be reviewed by the HR admin. You'll receive a notification once the review is complete. If approved, your appraisal will be finalized. If rejected, you'll receive feedback and may be asked to make revisions before resubmitting.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>How do I add a new appraisal task?</AccordionTrigger>
                <AccordionContent>
                  <p>Navigate to the Appraisal Tasks page, select the "Add Task" tab, fill out the task details including title, category, description, and deadline, then click "Add Task". The new task will be added to your appraisal list.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger>What file formats are accepted for document uploads?</AccordionTrigger>
                <AccordionContent>
                  <p>The system accepts common document formats including PDF, DOC/DOCX, XLS/XLSX, PPT/PPTX, JPG, and PNG. For best results, we recommend using PDF format whenever possible to ensure compatibility.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-7">
                <AccordionTrigger>How can I reset my password?</AccordionTrigger>
                <AccordionContent>
                  <p>To reset your password, go to the Settings page accessed from the sidebar. In the Profile Settings section, you'll find a password field where you can enter a new password and save the changes.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>
              Need additional help? Reach out to our support team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium">Email Support</h4>
                  <p className="text-sm text-muted-foreground">
                    support@workdaytrackpro.edu
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Response within 24 hours
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium">User Guide</h4>
                  <p className="text-sm text-muted-foreground">
                    Download our comprehensive user guide
                  </p>
                  <a
                    href="#"
                    className="text-xs text-primary hover:underline inline-block mt-1"
                  >
                    View User Guide (PDF)
                  </a>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Support Hours</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday:</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday:</span>
                    <span>9:00 AM - 12:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpPage;
