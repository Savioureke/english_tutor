import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ttmqfqqfpogjoaalnfcd.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bXFmcXFmcG9nam9hYWxuZmNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0NjY2MzAsImV4cCI6MjEwNTA0MjYzMH0.RWcpQ5ioQvyjwsE2NCYnfizpcIa0nyUgDcoB2CPyQU8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Secure client-side password hashing using SHA-256 with a salt
 */
export async function hashPassword(password) {
  if (!password) return '';
  const salt = 'eng_tutor_secure_salt_2026';
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verifies password against stored hash or fallback demo strings
 */
export async function verifyPassword(inputPassword, storedHash) {
  if (!inputPassword || !storedHash) return false;
  
  // Direct match for legacy / plain demo hashes
  if (storedHash === inputPassword) return true;
  
  // Known demo accounts fallback
  const demoPasswords = ['admin123', 'teacher123', 'student123', 'password123'];
  if (demoPasswords.includes(inputPassword) && demoPasswords.includes(storedHash)) {
    return true;
  }
  
  // SHA-256 verification
  const computedHash = await hashPassword(inputPassword);
  return computedHash === storedHash;
}
