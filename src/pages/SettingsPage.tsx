
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '../context/AuthContext';
import { Save, User } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Settings Saved",
      description: "Your profile settings have been updated",
    });
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account preferences
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
            <CardDescription>
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={user?.name} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" defaultValue={user?.department || ''} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
                <p className="text-xs text-muted-foreground">
                  Leave blank to keep current password
                </p>
              </div>
              
              <Button type="submit" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Manage how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <div>
                  <input 
                    type="checkbox" 
                    id="email-notifications" 
                    className="h-4 w-4" 
                    defaultChecked 
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Appraisal Updates</h4>
                  <p className="text-sm text-muted-foreground">
                    Get notified about appraisal status changes
                  </p>
                </div>
                <div>
                  <input 
                    type="checkbox" 
                    id="appraisal-notifications" 
                    className="h-4 w-4" 
                    defaultChecked 
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Deadline Reminders</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive reminders for upcoming deadlines
                  </p>
                </div>
                <div>
                  <input 
                    type="checkbox" 
                    id="deadline-reminders" 
                    className="h-4 w-4" 
                    defaultChecked 
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
