import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

const PortalContext = createContext();

export function PortalProvider({ children }) {
  const [enrollment, setEnrollment] = useState([]);
  const [platformSettings, setPlatformSettings] = useState({
    lead_fee: 1.50,
    min_funding: 10.00,
    training_video_1_url: 'https://www.youtube.com/embed/Jm-3M4iS_5g',
    training_video_1_title: 'Mastering the PPP English Teaching Methodology (Presentation, Practice, Production)',
    training_video_1_description: 'Step-by-step masterclass on conducting structured 45-minute communicative English lessons, error correction, and student speaking drills.',
    training_video_2_url: 'https://www.youtube.com/embed/yP5JtL1S8mQ',
    training_video_2_title: 'Teacher Monetization & 1-on-1 Online English Coaching Strategy',
    training_video_2_description: 'How to structure 1-on-1 online speaking lessons, handle student inquiries, and collect payments directly.',
  });
  const [teacherMessages, setTeacherMessages] = useState([]);
  const [deductionLogs, setDeductionLogs] = useState([]);
  const [lessonBookings, setLessonBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inquiryModalTeacher, setInquiryModalTeacher] = useState(null);

  // Compute live teachers for homepage & directory display
  const liveTeachers = enrollment.filter(
    (u) => u.role === 'teacher' && u.is_live_on_homepage
  );

  // Fetch all initial live data from Supabase backend
  const fetchPortalData = useCallback(async () => {
    try {
      setIsLoading(true);

      // Fetch users / enrollment
      const { data: usersData, error: usersErr } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (!usersErr && usersData) {
        const formattedUsers = usersData.map((u) => ({
          ...u,
          funded_balance: parseFloat(u.funded_balance) || 0,
          hourly_rate: parseFloat(u.hourly_rate) || 25.00,
          rating: parseFloat(u.rating) || 5.0,
          total_students: parseInt(u.total_students, 10) || 0,
        }));
        setEnrollment(formattedUsers);
      }

      // Fetch platform settings
      const { data: settingsData, error: settingsErr } = await supabase
        .from('platform_settings')
        .select('*')
        .eq('id', 'global')
        .maybeSingle();

      if (!settingsErr && settingsData) {
        setPlatformSettings({
          lead_fee: parseFloat(settingsData.lead_fee) || 1.50,
          min_funding: parseFloat(settingsData.min_funding) || 10.00,
          training_video_1_url: settingsData.training_video_1_url || 'https://www.youtube.com/embed/Jm-3M4iS_5g',
          training_video_1_title: settingsData.training_video_1_title || 'Mastering the PPP English Teaching Methodology (Presentation, Practice, Production)',
          training_video_1_description: settingsData.training_video_1_description || 'Step-by-step masterclass on conducting structured 45-minute communicative English lessons, error correction, and student speaking drills.',
          training_video_2_url: settingsData.training_video_2_url || 'https://www.youtube.com/embed/yP5JtL1S8mQ',
          training_video_2_title: settingsData.training_video_2_title || 'Teacher Monetization & 1-on-1 Online English Coaching Strategy',
          training_video_2_description: settingsData.training_video_2_description || 'How to structure 1-on-1 online speaking lessons, handle student inquiries, and collect payments directly.',
        });
      }

      // Fetch teacher messages
      const { data: messagesData, error: msgErr } = await supabase
        .from('teacher_messages')
        .select('*')
        .order('timestamp', { ascending: false });

      if (!msgErr && messagesData) {
        setTeacherMessages(
          messagesData.map((m) => ({
            ...m,
            lead_fee_deducted: parseFloat(m.lead_fee_deducted) || 1.50,
          }))
        );
      }

      // Fetch deduction logs
      const { data: logsData, error: logsErr } = await supabase
        .from('deduction_logs')
        .select('*')
        .order('timestamp', { ascending: false });

      if (!logsErr && logsData) {
        setDeductionLogs(
          logsData.map((l) => ({
            ...l,
            amount: parseFloat(l.amount) || 0,
            balance_after: parseFloat(l.balance_after) || 0,
          }))
        );
      }

      // Fetch lesson bookings
      const { data: bookingsData, error: bookErr } = await supabase
        .from('lesson_bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (!bookErr && bookingsData) {
        setLessonBookings(
          bookingsData.map((b) => ({
            ...b,
            hourly_rate: parseFloat(b.hourly_rate) || 25.00,
            amount_paid: parseFloat(b.amount_paid) || 0.00,
          }))
        );
      }
    } catch (err) {
      console.error('Error fetching data from Supabase:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortalData();
  }, [fetchPortalData]);

  // Helpers
  const findUserById = (id) => enrollment.find((u) => u.id === id);
  const findUserByEmail = (email) =>
    enrollment.find((u) => (u.email || '').toLowerCase() === (email || '').toLowerCase().trim());

  // Register learner in Supabase table
  const registerLearner = async ({ full_name, email, password_hash, phone }) => {
    const normalizedEmail = (email || '').trim().toLowerCase();

    // Check existing in Supabase or local state
    const { data: existingUser } = await supabase
      .from('users')
      .select('id, email')
      .ilike('email', normalizedEmail)
      .maybeSingle();

    if (existingUser || findUserByEmail(normalizedEmail)) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      full_name: (full_name || '').trim(),
      email: normalizedEmail,
      password_hash: password_hash || 'password123',
      phone: phone ? phone.trim() : '',
      role: 'learner',
      video_1_watched: false,
      funded_balance: 0.00,
      video_2_watched: false,
      payment_channel: null,
      terms_accepted: false,
      is_live_on_homepage: false,
      rating: 5.0,
      total_students: 0,
      qualifications: null,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      created_at: new Date().toISOString(),
    };

    const { error: insertErr } = await supabase
      .from('users')
      .insert(newUser);

    if (insertErr) {
      console.error('Supabase user insert error:', insertErr);
      return { success: false, error: insertErr.message || 'Failed to create user in database.' };
    }

    setEnrollment((prev) => [newUser, ...prev]);
    return { success: true, user: newUser };
  };

  // Video 1 Watch Action
  const completeVideo1 = async (userId) => {
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

    try {
      await supabase
        .from('users')
        .update({ video_1_watched: true })
        .eq('id', userId);
    } catch (e) {
      console.error('Error updating video 1 in Supabase:', e);
    }

    return updatedUser;
  };

  // Wallet Funding Action
  const fundWallet = async (userId, amount) => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return { success: false, error: 'Invalid funding amount' };

    const currentUser = findUserById(userId);
    if (!currentUser) return { success: false, error: 'User not found' };

    const newBal = (currentUser.funded_balance || 0) + numAmount;
    const updatedUser = { ...currentUser, funded_balance: newBal };

    setEnrollment((prev) =>
      prev.map((u) => (u.id === userId ? updatedUser : u))
    );

    const newLog = {
      id: `ded-${Date.now()}`,
      teacher_id: updatedUser.id,
      teacher_name: updatedUser.full_name,
      type: 'wallet_fund',
      amount: numAmount,
      balance_after: newBal,
      description: `Account deposit (+$${numAmount.toFixed(2)}) via payment gateway`,
      timestamp: new Date().toISOString(),
    };
    setDeductionLogs((prev) => [newLog, ...prev]);

    try {
      await supabase
        .from('users')
        .update({ funded_balance: newBal })
        .eq('id', userId);

      await supabase
        .from('deduction_logs')
        .insert(newLog);
    } catch (e) {
      console.error('Error recording wallet fund in Supabase:', e);
    }

    return { success: true, user: updatedUser };
  };

  // Video 2 Watch Action
  const completeVideo2 = async (userId) => {
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

    try {
      await supabase
        .from('users')
        .update({ video_2_watched: true })
        .eq('id', userId);
    } catch (e) {
      console.error('Error updating video 2 in Supabase:', e);
    }

    return updatedUser;
  };

  // Payment Channel Setting Action
  const updatePaymentChannel = async (userId, channelString) => {
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

    try {
      await supabase
        .from('users')
        .update({ payment_channel: channelString })
        .eq('id', userId);
    } catch (e) {
      console.error('Error updating payment channel in Supabase:', e);
    }

    return updatedUser;
  };

  // Final Gate Step: Accept T&Cs & Upgrade to Teacher
  const acceptTermsAndUpgrade = async (userId) => {
    let updatedUser = null;
    const currentUser = findUserById(userId);
    if (!currentUser) return null;

    const isEligible =
      currentUser.video_1_watched &&
      currentUser.funded_balance >= platformSettings.min_funding &&
      currentUser.video_2_watched &&
      Boolean(currentUser.payment_channel);

    if (isEligible) {
      updatedUser = {
        ...currentUser,
        terms_accepted: true,
        role: 'teacher',
        is_live_on_homepage: true,
      };
    } else {
      updatedUser = { ...currentUser, terms_accepted: true };
    }

    setEnrollment((prev) =>
      prev.map((u) => (u.id === userId ? updatedUser : u))
    );

    try {
      await supabase
        .from('users')
        .update({
          terms_accepted: true,
          role: updatedUser.role,
          is_live_on_homepage: updatedUser.is_live_on_homepage,
        })
        .eq('id', userId);
    } catch (e) {
      console.error('Error upgrading teacher in Supabase:', e);
    }

    return updatedUser;
  };

  // Student Inquiry & Lead Fee Deduction Flow
  const submitStudentInquiry = async ({
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

    if ((teacher.funded_balance || 0) < currentFee) {
      return {
        success: false,
        error: "This teacher's account cannot receive new messages right now.",
      };
    }

    const newBal = (teacher.funded_balance || 0) - currentFee;

    setEnrollment((prev) =>
      prev.map((u) => (u.id === teacher_id ? { ...u, funded_balance: newBal } : u))
    );

    const newMsg = {
      id: `msg-${Date.now()}`,
      teacher_id,
      teacher_name: teacher.full_name,
      student_name: (student_name || '').trim(),
      student_email: (student_email || '').trim(),
      student_phone: student_phone ? student_phone.trim() : '',
      message: (message || '').trim(),
      lead_fee_deducted: currentFee,
      timestamp: new Date().toISOString(),
    };
    setTeacherMessages((prev) => [newMsg, ...prev]);

    const newLog = {
      id: `ded-${Date.now()}`,
      teacher_id,
      teacher_name: teacher.full_name,
      type: 'lead_fee_deduction',
      amount: currentFee,
      balance_after: newBal,
      description: `Student inquiry lead fee from ${student_name} (${student_email})`,
      timestamp: new Date().toISOString(),
    };
    setDeductionLogs((prev) => [newLog, ...prev]);

    try {
      await supabase
        .from('users')
        .update({ funded_balance: newBal })
        .eq('id', teacher_id);

      await supabase
        .from('teacher_messages')
        .insert(newMsg);

      await supabase
        .from('deduction_logs')
        .insert(newLog);
    } catch (e) {
      console.error('Error submitting inquiry to Supabase:', e);
    }

    return { success: true, message: newMsg };
  };

  // Submit Contact Form Inquiry
  const submitContactInquiry = async ({ name, email, phone, subject, message }) => {
    const inquiryRecord = {
      id: `inq-${Date.now()}`,
      name: (name || '').trim(),
      email: (email || '').trim(),
      subject: subject ? subject.trim() : '',
      message: (message || '').trim(),
      created_at: new Date().toISOString(),
    };

    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .insert(inquiryRecord);

      if (error) {
        console.error('Supabase contact insert error:', error);
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err) {
      console.error('Failed to submit contact inquiry:', err);
      return { success: false, error: err.message };
    }
  };

  // ADMIN ACTIONS
  const updateLeadFee = async (newFee) => {
    const feeNum = parseFloat(newFee);
    if (isNaN(feeNum) || feeNum < 0) return false;
    setPlatformSettings((prev) => ({ ...prev, lead_fee: feeNum }));

    try {
      await supabase
        .from('platform_settings')
        .upsert({ id: 'global', lead_fee: feeNum, updated_at: new Date().toISOString() });
    } catch (e) {
      console.error('Error updating lead fee in Supabase:', e);
    }

    return true;
  };

  const adjustTeacherWallet = async (teacherId, type, amount, reason) => {
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
      timestamp: new Date().toISOString(),
    };
    setDeductionLogs((prev) => [newLog, ...prev]);

    try {
      await supabase
        .from('users')
        .update({ funded_balance: newBal })
        .eq('id', teacherId);

      await supabase
        .from('deduction_logs')
        .insert(newLog);
    } catch (e) {
      console.error('Error adjusting wallet in Supabase:', e);
    }

    return { success: true, balance: newBal };
  };

  const toggleTeacherLiveStatus = async (teacherId) => {
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

    if (updated) {
      try {
        await supabase
          .from('users')
          .update({ is_live_on_homepage: updated.is_live_on_homepage })
          .eq('id', teacherId);
      } catch (e) {
        console.error('Error toggling teacher live status in Supabase:', e);
      }
    }

    return updated;
  };

  const changeUserRole = async (userId, newRole) => {
    let updated = null;
    setEnrollment((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          updated = {
            ...u,
            role: newRole,
            is_live_on_homepage: newRole === 'teacher' ? u.is_live_on_homepage : false,
          };
          return updated;
        }
        return u;
      })
    );

    if (updated) {
      try {
        await supabase
          .from('users')
          .update({
            role: newRole,
            is_live_on_homepage: updated.is_live_on_homepage,
          })
          .eq('id', userId);
      } catch (e) {
        console.error('Error changing user role in Supabase:', e);
      }
    }
  };

  // Teacher Hourly Rate Update
  const updateHourlyRate = async (userId, newRate) => {
    const rateNum = parseFloat(newRate);
    if (isNaN(rateNum) || rateNum < 0) return { success: false, error: 'Invalid hourly rate' };

    let updatedUser = null;
    setEnrollment((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          updatedUser = { ...u, hourly_rate: rateNum };
          return updatedUser;
        }
        return u;
      })
    );

    try {
      await supabase
        .from('users')
        .update({ hourly_rate: rateNum })
        .eq('id', userId);
    } catch (e) {
      console.error('Error updating hourly rate in Supabase:', e);
    }

    return { success: true, user: updatedUser };
  };

  // Admin Training Video Update
  const updateAdminTrainingVideo = async (videoData) => {
    const updated = {
      ...platformSettings,
      ...videoData,
      updated_at: new Date().toISOString(),
    };
    setPlatformSettings(updated);

    try {
      await supabase
        .from('platform_settings')
        .upsert({ id: 'global', ...videoData, updated_at: new Date().toISOString() });
    } catch (e) {
      console.error('Error updating training video in Supabase:', e);
    }

    return { success: true, settings: updated };
  };

  // Student Lesson Booking & Transaction Flow
  const createLessonBooking = async ({
    teacher_id,
    teacher_name,
    student_name,
    student_email,
    student_phone,
    hourly_rate,
    lesson_topic,
    message,
  }) => {
    const teacher = findUserById(teacher_id);
    if (!teacher) return { success: false, error: 'Teacher not found' };

    const currentFee = platformSettings.lead_fee || 1.50;
    if ((teacher.funded_balance || 0) < currentFee) {
      return { success: false, error: "This teacher's account cannot receive new bookings right now." };
    }

    const rate = hourly_rate ? parseFloat(hourly_rate) : (teacher.hourly_rate || 25.00);
    const newBal = (teacher.funded_balance || 0) - currentFee;

    // Deduct lead fee from teacher
    setEnrollment((prev) =>
      prev.map((u) => (u.id === teacher_id ? { ...u, funded_balance: newBal } : u))
    );

    const bookingId = `book-${Date.now()}`;
    const newBooking = {
      id: bookingId,
      teacher_id,
      teacher_name: teacher_name || teacher.full_name,
      student_name: (student_name || '').trim(),
      student_email: (student_email || '').trim(),
      student_phone: student_phone ? student_phone.trim() : '',
      hourly_rate: rate,
      amount_paid: 0.00,
      payment_status: 'pending',
      lesson_status: 'inquiry',
      lesson_topic: lesson_topic || '1-on-1 Spoken English Practice',
      session_notes: message ? message.trim() : '',
      created_at: new Date().toISOString(),
    };
    setLessonBookings((prev) => [newBooking, ...prev]);

    // Also add to teacher_messages for inbox view
    const newMsg = {
      id: `msg-${Date.now()}`,
      teacher_id,
      teacher_name: teacher.full_name,
      student_name: (student_name || '').trim(),
      student_email: (student_email || '').trim(),
      student_phone: student_phone ? student_phone.trim() : '',
      message: message ? message.trim() : `Booking request for ${lesson_topic || 'Spoken English'} at $${rate}/hr`,
      lead_fee_deducted: currentFee,
      timestamp: new Date().toISOString(),
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
      description: `Student lesson booking lead fee from ${student_name} (${student_email})`,
      timestamp: new Date().toISOString(),
    };
    setDeductionLogs((prev) => [newLog, ...prev]);

    try {
      await supabase.from('users').update({ funded_balance: newBal }).eq('id', teacher_id);
      await supabase.from('lesson_bookings').insert(newBooking);
      await supabase.from('teacher_messages').insert(newMsg);
      await supabase.from('deduction_logs').insert(newLog);
    } catch (e) {
      console.error('Error creating lesson booking in Supabase:', e);
    }

    return { success: true, booking: newBooking };
  };

  // Teacher confirms booking from Inbox
  const confirmLessonBooking = async (bookingId) => {
    let updatedBooking = null;
    setLessonBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          updatedBooking = { ...b, lesson_status: 'confirmed' };
          return updatedBooking;
        }
        return b;
      })
    );

    try {
      await supabase
        .from('lesson_bookings')
        .update({ lesson_status: 'confirmed' })
        .eq('id', bookingId);
    } catch (e) {
      console.error('Error confirming booking in Supabase:', e);
    }

    return { success: true, booking: updatedBooking };
  };

  // Student pays teacher rate for lesson
  const payLessonBooking = async (bookingId, amount) => {
    const payNum = parseFloat(amount) || 0;
    let updatedBooking = null;
    setLessonBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          updatedBooking = {
            ...b,
            payment_status: 'paid',
            amount_paid: payNum,
            lesson_status: 'in_progress',
          };
          return updatedBooking;
        }
        return b;
      })
    );

    try {
      await supabase
        .from('lesson_bookings')
        .update({
          payment_status: 'paid',
          amount_paid: payNum,
          lesson_status: 'in_progress',
        })
        .eq('id', bookingId);
    } catch (e) {
      console.error('Error processing lesson payment in Supabase:', e);
    }

    return { success: true, booking: updatedBooking };
  };

  // Teacher/Student completes live lesson
  const completeLessonBooking = async (bookingId, notes = '') => {
    let updatedBooking = null;
    const completionTime = new Date().toISOString();
    setLessonBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          updatedBooking = {
            ...b,
            lesson_status: 'completed',
            session_notes: notes || b.session_notes,
            completed_at: completionTime,
          };
          return updatedBooking;
        }
        return b;
      })
    );

    try {
      await supabase
        .from('lesson_bookings')
        .update({
          lesson_status: 'completed',
          session_notes: notes || undefined,
          completed_at: completionTime,
        })
        .eq('id', bookingId);
    } catch (e) {
      console.error('Error completing lesson booking in Supabase:', e);
    }

    return { success: true, booking: updatedBooking };
  };

  return (
    <PortalContext.Provider
      value={{
        enrollment,
        isLoading,
        platformSettings,
        teacherMessages,
        deductionLogs,
        lessonBookings,
        liveTeachers,
        fetchPortalData,
        findUserById,
        findUserByEmail,
        registerLearner,
        completeVideo1,
        fundWallet,
        completeVideo2,
        updatePaymentChannel,
        updateHourlyRate,
        acceptTermsAndUpgrade,
        submitStudentInquiry,
        submitContactInquiry,
        updateLeadFee,
        updateAdminTrainingVideo,
        createLessonBooking,
        confirmLessonBooking,
        payLessonBooking,
        completeLessonBooking,
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

