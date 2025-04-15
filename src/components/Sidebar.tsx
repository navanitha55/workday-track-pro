
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Clock, 
  FileText, 
  ShieldCheck, 
  HelpCircle, 
  Settings,
  UserCircle
} from 'lucide-react';

export const AppSidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) return null;
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center py-4">
        <div className="flex flex-col items-center">
          <UserCircle className="h-12 w-12 text-sidebar-primary" />
          <div className="mt-2 text-sm font-medium">{user.name}</div>
          <div className="text-xs opacity-75">{user.role}</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild active={isActive('/dashboard')}>
                  <Link to="/dashboard">
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild active={isActive('/timesheet')}>
                  <Link to="/timesheet">
                    <Clock className="h-5 w-5" />
                    <span>Timesheet</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild active={isActive('/appraisal')}>
                  <Link to="/appraisal">
                    <FileText className="h-5 w-5" />
                    <span>Appraisal Tasks</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {user.role === 'admin' && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild active={isActive('/admin')}>
                    <Link to="/admin">
                      <ShieldCheck className="h-5 w-5" />
                      <span>Admin Review</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild active={isActive('/settings')}>
                  <Link to="/settings">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild active={isActive('/help')}>
                  <Link to="/help">
                    <HelpCircle className="h-5 w-5" />
                    <span>Help</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-xs text-center text-sidebar-foreground/60">
          WorkDay Track Pro v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
