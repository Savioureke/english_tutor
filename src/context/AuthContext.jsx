import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePortal } from './PortalContext';
import { supabase, hashPassword, verifyPassword } from '../lib/supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const {
    enrollment,
    findUserByEmail,
    registerLearner,
    fetchPortalData,
  } = usePortal();

  const [currentUserEmail, setCurrentUserEmail] = useState(() => {
    try {
      const saved = localStorage.getItem('engtutor_auth_user_email');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [cachedUser, setCachedUser] = useState(() => {
    try {
      const saved = localStorage.getItem('engtutor_auth_user_data');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'

  // Look up live user record from enrollment list with fallback to cachedUser
  const liveUser = currentUserEmail ? findUserByEmail(currentUserEmail) : null;
  const user = liveUser || (currentUserEmail && cachedUser?.email?.toLowerCase() === currentUserEmail.toLowerCase() ? cachedUser : null);

  useEffect(() => {
    if (liveUser) {
      setCachedUser(liveUser);
      localStorage.setItem('engtutor_auth_user_data', JSON.stringify(liveUser));
    }
  }, [liveUser]);

  useEffect(() => {
    if (currentUserEmail) {
      localStorage.setItem('engtutor_auth_user_email', JSON.stringify(currentUserEmail));
    } else {
      localStorage.removeItem('engtutor_auth_user_email');
      localStorage.removeItem('engtutor_auth_user_data');
    }
  }, [currentUserEmail]);

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Standard Login (email/password against users table in Supabase)
  const login = async (email, password) => {
    const normalizedEmail = (email || '').trim().toLowerCase();

    // Fetch user record from Supabase table or local cached state
    let matched = findUserByEmail(normalizedEmail);

    if (!matched) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .ilike('email', normalizedEmail)
        .maybeSingle();

      if (error || !data) {
        return { success: false, error: 'No account found with this email address.' };
      }
      matched = data;
    }

    // Secure password verification (SHA-256 with salt)
    const isMatch = await verifyPassword(password, matched.password_hash);
    if (!isMatch) {
      return { success: false, error: 'Incorrect password.' };
    }

    setCurrentUserEmail(matched.email);
    setCachedUser(matched);
    localStorage.setItem('engtutor_auth_user_data', JSON.stringify(matched));
    closeAuthModal();
    return { success: true, user: matched };
  };

  // Registration handler (hashes password and writes directly to Supabase users table)
  const register = async ({ name, email, password, phone }) => {
    const hashedPassword = await hashPassword(password);

    const res = await registerLearner({
      full_name: name,
      email,
      password_hash: hashedPassword,
      phone,
    });

    if (!res.success) {
      return res;
    }

    setCurrentUserEmail(res.user.email);
    setCachedUser(res.user);
    localStorage.setItem('engtutor_auth_user_data', JSON.stringify(res.user));
    closeAuthModal();
    return res;
  };

  const logout = () => {
    setCurrentUserEmail(null);
    setCachedUser(null);
    localStorage.removeItem('engtutor_auth_user_email');
    localStorage.removeItem('engtutor_auth_user_data');
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

