import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LearnerGateDashboard from './LearnerGateDashboard';
import TeacherMonetizationDashboard from './TeacherMonetizationDashboard';

export default function Dashboard() {
  const { user, isAuthenticated, isTeacher, isAdmin } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin || user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  if (isTeacher || user.role === 'teacher') {
    return <TeacherMonetizationDashboard />;
  }

  return <LearnerGateDashboard />;
}
