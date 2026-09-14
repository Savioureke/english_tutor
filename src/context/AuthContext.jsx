import React, { createContext, useContext, useState, useEffect } from 'react';
import { demoUsers } from '../data/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('engtutor_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    if (user) {
      localStorage.setItem('engtutor_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('engtutor_auth_user');
    }
  }, [user]);

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // 1-Click Quick Demo Login helper
  const loginWithDemo = (role = 'student') => {
    const selectedUser = role === 'teacher' ? demoUsers.teacher : demoUsers.student;
    setUser(selectedUser);
    closeAuthModal();
    return selectedUser;
  };

  // Standard Login (email/password)
  const login = (email, password) => {
    const normalizedEmail = (email || '').trim().toLowerCase();
    
    // Check if teacher login
    if (
      normalizedEmail === demoUsers.teacher.email.toLowerCase() ||
      normalizedEmail.includes('teacher') ||
      normalizedEmail.includes('instructor')
    ) {
      const teacherUser = {
        ...demoUsers.teacher,
        email: normalizedEmail || demoUsers.teacher.email,
      };
      setUser(teacherUser);
      closeAuthModal();
      return { success: true, user: teacherUser };
    }

    // Default to student login
    const studentUser = {
      ...demoUsers.student,
      email: normalizedEmail || demoUsers.student.email,
      name: normalizedEmail ? normalizedEmail.split('@')[0].replace('.', ' ') : demoUsers.student.name,
    };
    setUser(studentUser);
    closeAuthModal();
    return { success: true, user: studentUser };
  };

  // Registration handler
  const register = ({ name, email, password, role = 'student', targetGoal = '' }) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name: name || (role === 'teacher' ? 'Instructor Demo' : 'Student Demo'),
      email: email.trim().toLowerCase(),
      role: role, // 'student' | 'teacher'
      avatar: role === 'teacher'
        ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      enrolledDate: "Just now",
      level: role === 'student' ? "B2 Upper Intermediate" : undefined,
      streakDays: 1,
      hoursLearned: 0,
      fluencyScore: "50%",
      targetExam: targetGoal || "Conversational Fluency",
      qualifications: role === 'teacher' ? "Certified Native English Tutor" : undefined,
    };

    setUser(newUser);
    closeAuthModal();
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('engtutor_auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isStudent: user?.role === 'student',
        isTeacher: user?.role === 'teacher',
        login,
        loginWithDemo,
        register,
        logout,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
