const express = require('express');
const { supabase } = require('../supabaseClient.js');

const router = express.Router();

const AUDIT_LOG_TABLE = 'audit_logs';
const LOGIN_ATTEMPTS_TABLE = 'user_login_attempts';
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_HOURS = 1;

// Helper function for audit logging
async function logAuditEvent(action, details, email = null, userId = null) {
  try {
    const event = {
      timestamp: new Date().toISOString(),
      action,
      details: details || {},
      user_email: email,
      user_id: userId,
    };
    const { error } = await supabase.from(AUDIT_LOG_TABLE).insert(event);
    if (error) {
      console.error('Error logging audit event:', error.message, event);
    }
  } catch (e) {
    console.error('Exception in logAuditEvent:', e.message);
  }
}

// Helper function to get or create login attempt record
async function getOrCreateLoginAttemptRecord(email) {
  let { data, error } = await supabase
    .from(LOGIN_ATTEMPTS_TABLE)
    .select('*')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116: Row not found
    console.error('Error fetching login attempt record:', error.message);
    throw error;
  }

  if (!data) {
    const { data: newData, error: insertError } = await supabase
      .from(LOGIN_ATTEMPTS_TABLE)
      .insert({ email: email, failed_attempts: 0 })
      .select()
      .single();
    if (insertError) {
      console.error('Error creating login attempt record:', insertError.message);
      throw insertError;
    }
    return newData;
  }
  return data;
}

// Registration Endpoint
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  if (password.length < 8) {
    await logAuditEvent('USER_REGISTRATION_FAILURE', { reason: 'Password too short' }, email);
    return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
  }

  try {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      await logAuditEvent('USER_REGISTRATION_FAILURE', { error: signUpError.message }, email);
      return res.status(400).json({ message: signUpError.message });
    }

    // In Supabase, signUp might return a user that needs email confirmation.
    // For this issue, we'll assume direct registration or handle confirmation flow later if specified.
    // A user object is available in signUpData.user if successful.
    if (signUpData.user) {
      await logAuditEvent('USER_REGISTRATION_SUCCESS', { userId: signUpData.user.id }, email, signUpData.user.id);
      // Typically, you might not send back the full user object or session on register,
      // but a success message. The user then logs in.
      return res.status(201).json({ message: 'User registered successfully. Please check your email to confirm your account or login.' });
    } else {
      // This case might indicate an issue if user is null without an error
      await logAuditEvent('USER_REGISTRATION_FAILURE', { reason: 'No user data returned from Supabase without error.' }, email);
      return res.status(500).json({ message: 'Registration failed due to an unexpected issue.' });
    }

  } catch (error) {
    await logAuditEvent('USER_REGISTRATION_FAILURE', { error: error.message }, email);
    return res.status(500).json({ message: 'Internal server error during registration.' });
  }
});

router.get('/', (req, res) => {
  res.send('File ok' , );
});

// Login Endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const attemptRecord = await getOrCreateLoginAttemptRecord(email);

    if (attemptRecord.lockout_until && new Date(attemptRecord.lockout_until) > new Date()) {
      await logAuditEvent('USER_LOGIN_FAILURE', { reason: 'Account locked' }, email, attemptRecord.user_id);
      return res.status(403).json({
        message: 'Account is locked. Please try again later.',
        lockoutUntil: attemptRecord.lockout_until
      });
    }

    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      attemptRecord.failed_attempts += 1;
      let updateData = { failed_attempts: attemptRecord.failed_attempts, last_attempt_at: new Date().toISOString() };

      if (attemptRecord.failed_attempts >= MAX_LOGIN_ATTEMPTS) {
        const lockoutTime = new Date();
        lockoutTime.setHours(lockoutTime.getHours() + LOCKOUT_DURATION_HOURS);
        updateData.lockout_until = lockoutTime.toISOString();
        attemptRecord.lockout_until = updateData.lockout_until; // for current response
        await logAuditEvent('USER_ACCOUNT_LOCKED', { lockoutUntil: updateData.lockout_until }, email, attemptRecord.user_id);
      }

      const { error: updateError } = await supabase
        .from(LOGIN_ATTEMPTS_TABLE)
        .update(updateData)
        .eq('email', email);

      if (updateError) {
        console.error('Error updating login attempts:', updateError.message);
        // Continue to send login failed, but log this server-side issue
      }

      await logAuditEvent('USER_LOGIN_FAILURE', { reason: signInError.message }, email, attemptRecord.user_id);

      if (attemptRecord.failed_attempts >= MAX_LOGIN_ATTEMPTS) {
         return res.status(403).json({
           message: 'Too many failed login attempts. Account locked.',
           lockoutUntil: attemptRecord.lockout_until
         });
      }
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Successful login
    if (signInData.user && signInData.session) {
      const { error: resetError } = await supabase
        .from(LOGIN_ATTEMPTS_TABLE)
        .update({ failed_attempts: 0, lockout_until: null, user_id: signInData.user.id, last_attempt_at: new Date().toISOString() })
        .eq('email', email);

      if (resetError) {
        console.error('Error resetting login attempts:', resetError.message);
        // Continue with successful login, but log this server-side issue
      }

      await logAuditEvent('USER_LOGIN_SUCCESS', { userId: signInData.user.id }, email, signInData.user.id);
      return res.status(200).json({
        message: 'Login successful.',
        user: signInData.user,
        session: signInData.session
      });
    } else {
      // Should not happen if signInError is null
      await logAuditEvent('USER_LOGIN_FAILURE', { reason: 'No user or session data returned without error' }, email);
      return res.status(500).json({ message: 'Login failed due to an unexpected issue.' });
    }

  } catch (error) {
    console.error('Login endpoint error:', error.message, error.stack);
    await logAuditEvent('USER_LOGIN_FAILURE', { error: error.message }, email);
    return res.status(500).json({ message: 'Internal server error during login.' });
  }
});

module.exports = router;
