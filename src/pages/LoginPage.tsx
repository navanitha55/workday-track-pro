
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoginForm } from '../components/LoginForm';

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Sri Shanmugha Educational Institutions</h1>
        <p className="text-muted-foreground">Staff Timesheet & Appraisal Management</p>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
