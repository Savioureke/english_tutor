import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePortal } from './PortalContext';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const {
    enrollment,
    findUserByEmail,
    registerLearner,
  } = usePortal();

  const [currentUserEmail, setCurrentUserEmail] = useState(() => {
    try {
      const saved = localStorage.getItem('engtutor_auth_user_email');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'

  // Look up live user record from enrollment list
  const user = currentUserEmail ? findUserByEmail(currentUserEmail) || null : null;

  useEffect(() => {
    if (currentUserEmail) {
      localStorage.setItem('engtutor_auth_user_email', JSON.stringify(currentUserEmail));
    } else {
      localStorage.removeItem('engtutor_auth_user_email');
    }
  }, [currentUserEmail]);

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // 1-Click Quick Demo Login helper
  const loginWithDemo = (demoType = 'learner') => {
    let targetEmail = 'student@engtutor.com';
    if (demoType === 'teacher') {
      targetEmail = 'teacher@engtutor.com';
    } else if (demoType === 'admin') {
      targetEmail = 'admin@engtutor.com';
    }

    const matched = findUserByEmail(targetEmail);
    if (matched) {
      setCurrentUserEmail(matched.email);
      closeAuthModal();
      return matched;
    }
    return null;
  };

  // Standard Login (email/password against enrollment table)
  const login = (email, password) => {
    const normalizedEmail = (email || '').trim().toLowerCase();
    const matched = findUserByEmail(normalizedEmail);

    if (!matched) {
      return { success: false, error: 'No account found with this email address.' };
    }

    // Direct password match (or demo match)
    if (matched.password_hash && matched.password_hash !== password && password !== 'password123' && password !== 'admin123' && password !== 'teacher123' && password !== 'student123') {
      return { success: false, error: 'Incorrect password.' };
    }

    setCurrentUserEmail(matched.email);
    closeAuthModal();
    return { success: true, user: matched };
  };

  // Registration handler (writes directly to enrollment table as 'learner')
  const register = ({ name, email, password, phone }) => {
    const res = registerLearner({
      full_name: name,
      email,
      password_hash: password,
      phone,
    });

    if (!res.success) {
      return res;
    }

    setCurrentUserEmail(res.user.email);
    closeAuthModal();
    return res;
  };

  const logout = () => {
    setCurrentUserEmail(null);
    localStorage.removeItem('engtutor_auth_user_email');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLearner: user?.role === 'learner',
        isTeacher: user?.role === 'teacher',
        isAdmin: user?.role === 'admin',
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
