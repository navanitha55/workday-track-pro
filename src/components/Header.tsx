
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Menu } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const getUserRoleText = () => {
    switch (user?.role) {
      case 'admin':
        return 'Admin (HR)';
      case 'principal':
        return 'Principal';
      case 'hod':
        return 'HOD';
      case 'staff':
        return 'Staff';
      default:
        return '';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center">
        <SidebarTrigger>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </SidebarTrigger>
        <h1 className="text-xl font-semibold">
          WorkDay Track Pro
        </h1>
      </div>

      <div className="ml-auto flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <div className="text-sm text-muted-foreground">
                Logged in as:
              </div>
              <div className="font-medium">
                {user.name} ({getUserRoleText()})
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={logout} title="Logout">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
