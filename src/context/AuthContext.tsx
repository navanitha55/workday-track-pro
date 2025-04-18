
import React, { createContext, useState, useContext, useEffect } from 'react';

// User roles
export type UserRole = 'staff' | 'hod' | 'principal' | 'admin';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  canAccessUserDetails: (userToAccess: User) => boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Abirami',
    email: 'staff@example.com',
    role: 'staff',
    department: 'Computer Science'
  },
  {
    id: '2',
    name: 'Nandhini',
    email: 'hod@example.com',
    role: 'hod',
    department: 'Computer Science'
  },
  {
    id: '3',
    name: 'Muruganandham',
    email: 'principal@example.com',
    role: 'principal'
  },
  {
    id: '4',
    name: 'Aruna',
    email: 'admin@example.com',
    role: 'admin'
  },
  {
    id: '5',
    name: 'Kavitha',
    email: 'kavitha@example.com',
    role: 'staff',
    department: 'Computer Science'
  },
  {
    id: '6',
    name: 'Priya',
    email: 'priya@example.com',
    role: 'staff',
    department: 'Information Technology'
  },
  {
    id: '7',
    name: 'Sumitha',
    email: 'sumitha@example.com',
    role: 'staff',
    department: 'Electronics'
  },
  {
    id: '8',
    name: 'Santhosh',
    email: 'santhosh@example.com',
    role: 'staff',
    department: 'Mechanical'
  },
  {
    id: '9',
    name: 'Vinith',
    email: 'vinith@example.com',
    role: 'staff',
    department: 'Civil'
  },
  {
    id: '10',
    name: 'Suresh',
    email: 'suresh@example.com',
    role: 'staff',
    department: 'Electrical'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user session
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function - simulates authentication
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simple validation
    if (!email || !password) {
      setIsLoading(false);
      throw new Error('Email and password are required');
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email (in a real app, this would be an API call)
    const foundUser = MOCK_USERS.find(u => u.email === email);
    
    if (foundUser && password === 'password') {  // Simple password check for demo
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setIsLoading(false);
    } else {
      setIsLoading(false);
      throw new Error('Invalid email or password');
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Function to check if current user can access details of another user
  const canAccessUserDetails = (userToAccess: User) => {
    if (!user) return false;
    
    switch (user.role) {
      case 'admin':
        // Admin can access all users
        return true;
      case 'principal':
        // Principal can access all users
        return true;
      case 'hod':
        // HOD can access staff in their department
        return (
          userToAccess.role === 'staff' && 
          userToAccess.department === user.department
        );
      case 'staff':
        // Staff can only access their own details
        return userToAccess.id === user.id;
      default:
        return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        canAccessUserDetails
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
