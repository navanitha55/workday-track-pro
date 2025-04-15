
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AdminReview } from '../components/AdminReview';

const AdminPage: React.FC = () => {
  const { user } = useAuth();
  
  // Redirect non-admin users
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <AdminReview />;
};

export default AdminPage;
