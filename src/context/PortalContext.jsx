import React, { createContext, useContext, useState, useEffect } from 'react';

const PortalContext = createContext();

const INITIAL_ENROLLMENT = [
  {
    id: 'adm-001',
    full_name: 'Platform Administrator',
    email: 'admin@engtutor.com',
    password_hash: 'admin123',
    phone: '+1 (555) 019-2831',
    role: 'admin',
    video_1_watched: true,
    funded_balance: 100.00,
    video_2_watched: true,
    payment_channel: 'Stripe Corporate Vault',
    terms_accepted: true,
    is_live_on_homepage: false,
    rating: 5.0,
    total_students: 0,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    created_at: '2026-08-01 09:00',
  },
  {
    id: 'tch-201',
    full_name: 'Emma Watson',
    email: 'teacher@engtutor.com',
    password_hash: 'teacher123',
    phone: '+44 20 7946 0912',
    role: 'teacher',
    video_1_watched: true,
    funded_balance: 45.00,
    video_2_watched: true,
    payment_channel: 'PayPal (emma.watson@payments.com)',
    terms_accepted: true,
    is_live_on_homepage: true,
    rating: 4.98,
    total_students: 142,
    qualifications: 'MA TESOL • Cambridge CELTA Certified',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    created_at: '2026-08-10 14:30',
  },
  {
    id: 'tch-202',
    full_name: 'James Miller',
    email: 'james@engtutor.com',
    password_hash: 'teacher123',
    phone: '+44 20 7946 0884',
    role: 'teacher',
    video_1_watched: true,
    funded_balance: 32.50,
    video_2_watched: true,
    payment_channel: 'Direct Bank Wire (UK Barclays)',
    terms_accepted: true,
    is_live_on_homepage: true,
    rating: 5.0,
    total_students: 210,
    qualifications: 'Senior IELTS Methodology Specialist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    created_at: '2026-08-14 11:15',
  },
  {
    id: 'tch-203',
    full_name: 'Michael Davies',
    email: 'michael@engtutor.com',
    password_hash: 'teacher123',
    phone: '+1 555 342 9871',
    role: 'teacher',
    video_1_watched: true,
    funded_balance: 18.00,
    video_2_watched: true,
    payment_channel: 'Stripe Connect (michael.davies@business.com)',
    terms_accepted: true,
    is_live_on_homepage: true,
    rating: 4.9,
    total_students: 120,
    qualifications: 'Corporate English & Negotiation Coach',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    created_at: '2026-08-18 16:45',
  },
  {
    id: 'tch-204',
    full_name: 'Sarah Jenkins',
    email: 'sarah@engtutor.com',
    password_hash: 'teacher123',
    phone: '+44 20 7946 0441',
    role: 'teacher',
    video_1_watched: true,
    funded_balance: 24.00,
    video_2_watched: true,
    payment_channel: 'Wise Transfer (sarah.jenkins@wise.com)',
    terms_accepted: true,
    is_live_on_homepage: true,
    rating: 4.8,
    total_students: 160,
    qualifications: 'Phonetics & Accent Reduction Mentor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    created_at: '2026-08-20 10:00',
  },
  {
    id: 'stu-101',
    full_name: 'Alex Morgan',
    email: 'student@engtutor.com',
    password_hash: 'student123',
    phone: '+1 555 832 9942',
    role: 'learner',
    video_1_watched: false,
    funded_balance: 0.00,
    video_2_watched: false,
    payment_channel: null,
    terms_accepted: false,
    is_live_on_homepage: false,
    rating: 5.0,
    total_students: 0,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    created_at: '2026-09-01 12:00',
  }
];

const INITIAL_MESSAGES = [
  {
    id: 'msg-501',
    teacher_id: 'tch-201',
    teacher_name: 'Emma Watson',
    student_name: 'David Kim',
    student_email: 'david.k@gmail.com',
    student_phone: '+1 555 492 1190',
    message: 'Hello! I am preparing for IELTS Academic exam next month and would like to book 3 weekly speaking sessions.',
    lead_fee_deducted: 1.50,
    timestamp: '2026-09-14 09:20',
  },
  {
    id: 'msg-502',
    teacher_id: 'tch-201',
    teacher_name: 'Emma Watson',
    student_name: 'Elena Rostova',
    student_email: 'elena.r@outlook.com',
    student_phone: '+44 7700 900123',
    message: 'Hi Emma, I want to reduce my accent for business presentations in London. Are your afternoon slots open?',
    lead_fee_deducted: 1.50,
    timestamp: '2026-09-14 13:45',
  },
  {
    id: 'msg-503',
    teacher_id: 'tch-202',
    teacher_name: 'James Miller',
    student_name: 'Carlos Mendez',
    student_email: 'carlos.m@yahoo.com',
    student_phone: '+34 612 345 678',
    message: 'Looking for intensive Band 7.5 writing review and 1-on-1 feedback on Task 2 essays.',
    lead_fee_deducted: 1.50,
    timestamp: '2026-09-13 18:10',
  }
];

const INITIAL_DEDUCTIONS = [
  {
    id: 'ded-1',
    teacher_id: 'tch-201',
    teacher_name: 'Emma Watson',
    type: 'lead_fee_deduction',
    amount: 1.50,
    balance_after: 45.00,
    description: 'Student inquiry lead fee from Elena Rostova (elena.r@outlook.com)',
    timestamp: '2026-09-14 13:45',
  },
  {
    id: 'ded-2',
    teacher_id: 'tch-201',
    teacher_name: 'Emma Watson',
    type: 'lead_fee_deduction',
    amount: 1.50,
    balance_after: 46.50,
    description: 'Student inquiry lead fee from David Kim (david.k@gmail.com)',
    timestamp: '2026-09-14 09:20',
  },
  {
    id: 'ded-3',
    teacher_id: 'tch-201',
    teacher_name: 'Emma Watson',
    type: 'wallet_fund',
    amount: 48.00,
    balance_after: 48.00,
    description: 'Teacher wallet funding via card deposit',
    timestamp: '2026-09-10 10:00',
  }
];

export function PortalProvider({ children }) {
  // Enrollment Table State
  const [enrollment, setEnrollment] = useState(() => {
    try {
      const saved = localStorage.getItem('engtutor_enrollment_table');
      return saved ? JSON.parse(saved) : INITIAL_ENROLLMENT;
    } catch (e) {
      return INITIAL_ENROLLMENT;
    }
  });

  // Platform Settings State
  const [platformSettings, setPlatformSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('engtutor_platform_settings');
      return saved ? JSON.parse(saved) : { lead_fee: 1.50, min_funding: 10.00 };
    } catch (e) {
      return { lead_fee: 1.50, min_funding: 10.00 };
    }
  });

  // Teacher Messages State
  const [teacherMessages, setTeacherMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('engtutor_teacher_messages');
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch (e) {
      return INITIAL_MESSAGES;
    }
  });

  // Deduction & Wallet Logs State
  const [deductionLogs, setDeductionLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('engtutor_deduction_logs');
      return saved ? JSON.parse(saved) : INITIAL_DEDUCTIONS;
    } catch (e) {
      return INITIAL_DEDUCTIONS;
    }
  });

  // Active Inquiry Modal State
  const [inquiryModalTeacher, setInquiryModalTeacher] = useState(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('engtutor_enrollment_table', JSON.stringify(enrollment));
  }, [enrollment]);

  useEffect(() => {
    localStorage.setItem('engtutor_platform_settings', JSON.stringify(platformSettings));
  }, [platformSettings]);

  useEffect(() => {
    localStorage.setItem('engtutor_teacher_messages', JSON.stringify(teacherMessages));
  }, [teacherMessages]);

  useEffect(() => {
    localStorage.setItem('engtutor_deduction_logs', JSON.stringify(deductionLogs));
  }, [deductionLogs]);

  // Helpers
  const findUserById = (id) => enrollment.find((u) => u.id === id);
  const findUserByEmail = (email) =>
    enrollment.find((u) => (u.email || '').toLowerCase() === (email || '').toLowerCase().trim());

  // Register learner
  const registerLearner = ({ full_name, email, password_hash, phone }) => {
    const existing = findUserByEmail(email);
    if (existing) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      full_name: full_name.trim(),
      email: email.trim().toLowerCase(),
      password_hash: password_hash || 'password123',
      phone: phone ? phone.trim() : '',
      role: 'learner', // Default role
      video_1_watched: false,
      funded_balance: 0.00,
      video_2_watched: false,
      payment_channel: null,
      terms_accepted: false,
      is_live_on_homepage: false,
      rating: 5.0,
      total_students: 0,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };

    setEnrollment((prev) => [newUser, ...prev]);
    return { success: true, user: newUser };
  };

  // Video 1 Watch Action
  const completeVideo1 = (userId) => {
    let updatedUser = null;
    setEnrollment((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          updatedUser = { ...u, video_1_watched: true };
          return updatedUser;
        }
        return u;
      })
    );
    return updatedUser;
  };

  // Wallet Funding Action
  const fundWallet = (userId, amount) => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return { success: false, error: 'Invalid funding amount' };

    let updatedUser = null;
    setEnrollment((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newBal = (u.funded_balance || 0) + numAmount;
          updatedUser = { ...u, funded_balance: newBal };
          return updatedUser;
        }
        return u;
      })
    );

    if (updatedUser) {
      const newLog = {
        id: `ded-${Date.now()}`,
        teacher_id: updatedUser.id,
        teacher_name: updatedUser.full_name,
        type: 'wallet_fund',
        amount: numAmount,
        balance_after: updatedUser.funded_balance,
        description: `Account deposit (+$${numAmount.toFixed(2)}) via payment gateway`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      };
      setDeductionLogs((prev) => [newLog, ...prev]);
    }

    return { success: true, user: updatedUser };
  };

  // Video 2 Watch Action
  const completeVideo2 = (userId) => {
    let updatedUser = null;
    setEnrollment((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          updatedUser = { ...u, video_2_watched: true };
          return updatedUser;
        }
        return u;
      })
    );
    return updatedUser;
  };

  // Payment Channel Setting Action
  const updatePaymentChannel = (userId, channelString) => {
    let updatedUser = null;
    setEnrollment((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          updatedUser = { ...u, payment_channel: channelString };
          return updatedUser;
        }
        return u;
      })
    );
    return updatedUser;
  };

  // Final Gate Step: Accept T&Cs & Upgrade to Teacher
  const acceptTermsAndUpgrade = (userId) => {
    let updatedUser = null;
    setEnrollment((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const isEligible =
            u.video_1_watched &&
            u.funded_balance >= platformSettings.min_funding &&
            u.video_2_watched &&
            Boolean(u.payment_channel);

          if (isEligible) {
            updatedUser = {
              ...u,
              terms_accepted: true,
              role: 'teacher',
              is_live_on_homepage: true,
            };
            return updatedUser;
          } else {
            updatedUser = { ...u, terms_accepted: true };
            return updatedUser;
          }
        }
        return u;
      })
    );
    return updatedUser;
  };

  // Student Inquiry & Lead Fee Deduction Flow
  const submitStudentInquiry = ({
    teacher_id,
    student_name,
    student_email,
    student_phone,
    message,
  }) => {
    const teacher = findUserById(teacher_id);
    if (!teacher) {
      return { success: false, error: 'Selected teacher was not found.' };
    }

    const currentFee = platformSettings.lead_fee || 1.50;

    // Check teacher funded balance
    if ((teacher.funded_balance || 0) < currentFee) {
      return {
        success: false,
        error: "This teacher's account cannot receive new messages right now.",
      };
    }

    // Deduct lead fee from teacher's funded balance
    const newBal = (teacher.funded_balance || 0) - currentFee;
    setEnrollment((prev) =>
      prev.map((u) => (u.id === teacher_id ? { ...u, funded_balance: newBal } : u))
    );

    // Record inquiry in teacher_messages
    const newMsg = {
      id: `msg-${Date.now()}`,
      teacher_id,
      teacher_name: teacher.full_name,
      student_name: student_name.trim(),
      student_email: student_email.trim(),
      student_phone: student_phone ? student_phone.trim() : '',
      message: message.trim(),
      lead_fee_deducted: currentFee,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setTeacherMessages((prev) => [newMsg, ...prev]);

    // Record deduction log
    const newLog = {
      id: `ded-${Date.now()}`,
      teacher_id,
      teacher_name: teacher.full_name,
      type: 'lead_fee_deduction',
      amount: currentFee,
      balance_after: newBal,
      description: `Student inquiry lead fee from ${student_name} (${student_email})`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setDeductionLogs((prev) => [newLog, ...prev]);

    return { success: true, message: newMsg };
  };

  // ADMIN ACTIONS
  const updateLeadFee = (newFee) => {
    const feeNum = parseFloat(newFee);
    if (isNaN(feeNum) || feeNum < 0) return false;
    setPlatformSettings((prev) => ({ ...prev, lead_fee: feeNum }));
    return true;
  };

  const adjustTeacherWallet = (teacherId, type, amount, reason) => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return { success: false, error: 'Invalid adjustment amount.' };

    const teacher = findUserById(teacherId);
    if (!teacher) return { success: false, error: 'Teacher not found.' };

    let newBal = teacher.funded_balance || 0;
    if (type === 'credit') {
      newBal += numAmount;
    } else if (type === 'debit') {
      newBal = Math.max(0, newBal - numAmount);
    }

    setEnrollment((prev) =>
      prev.map((u) => (u.id === teacherId ? { ...u, funded_balance: newBal } : u))
    );

    const newLog = {
      id: `ded-${Date.now()}`,
      teacher_id: teacher.id,
      teacher_name: teacher.full_name,
      type: type === 'credit' ? 'manual_credit' : 'manual_debit',
      amount: numAmount,
      balance_after: newBal,
      description: `Admin manual ${type}: ${reason || 'Admin wallet adjustment'}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setDeductionLogs((prev) => [newLog, ...prev]);

    return { success: true, balance: newBal };
  };

  const toggleTeacherLiveStatus = (teacherId) => {
    let updated = null;
    setEnrollment((prev) =>
      prev.map((u) => {
        if (u.id === teacherId) {
          updated = { ...u, is_live_on_homepage: !u.is_live_on_homepage };
          return updated;
        }
        return u;
      })
    );
    return updated;
  };

  const changeUserRole = (userId, newRole) => {
    setEnrollment((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            role: newRole,
            is_live_on_homepage: newRole === 'teacher' ? u.is_live_on_homepage : false,
          };
        }
        return u;
      })
    );
  };

  // Get live teachers for homepage carousel / directory
  const liveTeachers = enrollment.filter(
    (u) => u.role === 'teacher' && u.is_live_on_homepage
  );

  return (
    <PortalContext.Provider
      value={{
        enrollment,
        platformSettings,
        teacherMessages,
        deductionLogs,
        liveTeachers,
        findUserById,
        findUserByEmail,
        registerLearner,
        completeVideo1,
        fundWallet,
        completeVideo2,
        updatePaymentChannel,
        acceptTermsAndUpgrade,
        submitStudentInquiry,
        updateLeadFee,
        adjustTeacherWallet,
        toggleTeacherLiveStatus,
        changeUserRole,
        inquiryModalTeacher,
        setInquiryModalTeacher,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal() {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
}
