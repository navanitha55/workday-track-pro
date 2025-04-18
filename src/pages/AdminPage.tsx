
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AdminReview } from '../components/AdminReview';

const AdminPage: React.FC = () => {
  const { user } = useAuth();
  
  // Allow access to admin, principal, and hod users only
  if (!user || (user.role !== 'admin' && user.role !== 'principal' && user.role !== 'hod')) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight mb-6">
        {user.role === 'principal' ? 'All Staff Review' : 
         user.role === 'hod' ? 'Department Staff Review' : 
         'Administration Review'}
      </h2>
      <AdminReview />
    </div>
  );
};

export default AdminPage;
