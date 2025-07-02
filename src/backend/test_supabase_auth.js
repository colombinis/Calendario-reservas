// Supabase Auth Examples Server
//
// This file demonstrates basic Supabase authentication functionalities using Express.
//
// Prerequisites for running these examples:
// 1. A Supabase project.
// 2. A `.env` file in the project root with:
//    SUPABASE_URL=your_supabase_project_url
//    SUPABASE_ANON_KEY=your_supabase_anon_key
// 3. In your Supabase project settings (Authentication -> Providers):
//    - Ensure 'Email' provider is enabled.
//    - For `/auth-signup` to create a session immediately without email confirmation,
//      you might need to disable "Confirm email" under Auth Settings. Otherwise,
//      sign-up will create a user, but they'll need to confirm their email before signing in.
//      The examples handle this by informing the user.
// 4. (Optional) For `/auth-getuser` and `/auth-signout`, you'll need a valid JWT (access token)
//    obtained from a successful sign-in.
// 5. (Optional) For `/auth-refresh`, you'll need a valid refresh token obtained from a session.

// Load environment variables from .env file located at the project root
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.AUTH_PORT || 3002; // Using a different port than the other test file

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY; // Using SUPABASE_ANON_KEY as seen in existing project setup

let supabase;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: SUPABASE_URL and SUPABASE_ANON_KEY environment variables are required.");
  console.error("Auth examples will not work without these variables.");
  // We can still start the server, but Supabase-dependent routes will fail.
} else {
  supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false, // Recommended for server-side
      persistSession: false,   // Recommended for server-side
      detectSessionInUrl: false // Recommended for server-side, typically for OAuth
    }
  });
  console.log("Supabase client initialized for Auth examples.");
}

// Simple root endpoint
app.get('/', (req, res) => {
  res.send('Supabase Auth Examples Server is running!');
});

// Placeholder for Supabase client status (can be more elaborate)
app.get('/auth-status', (req, res) => {
  if (supabase) {
    res.status(200).json({ message: 'Supabase client appears to be initialized.' });
  } else {
    res.status(500).json({ error: 'Supabase client is not initialized. Check environment variables SUPABASE_URL and SUPABASE_ANON_KEY.' });
  }
});

// Endpoints for auth examples will be added below

// User Sign-Up
app.post('/auth-signup', async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase client not initialized.' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      // You can add options here, for example, to redirect the user
      // options: {
      //   emailRedirectTo: 'http://localhost:3000/welcome' // Example redirect URL
      // }
    });

    if (error) {
      console.error('Sign-up error:', error.message);
      return res.status(error.status || 400).json({ error: error.message });
    }

    // data.user contains the user object.
    // data.session is null initially if email confirmation is required.
    // If email confirmation is disabled, data.session might be populated.
    let responseMessage = 'Sign-up successful.';
    if (data.user && data.user.identities && data.user.identities.length > 0 && data.user.identities[0].identity_data?.email_verified === false) {
        responseMessage = 'Sign-up successful. Please check your email to verify your account.';
    } else if (data.user && !data.session) {
        // This case can happen if "Confirm email" is ON in Supabase project settings.
        // The user object is returned, but no session until email is confirmed.
        responseMessage = 'Sign-up successful. Please check your email to confirm your account.';
    } else if (data.user && data.session) {
        // This case can happen if "Confirm email" is OFF.
        responseMessage = 'Sign-up successful and session created.';
    }


    res.status(201).json({ message: responseMessage, user: data.user, session: data.session });

  } catch (err) {
    console.error('Unexpected error during sign-up:', err.message);
    res.status(500).json({ error: 'Internal server error during sign-up.' });
  }
});

// User Sign-In
app.post('/auth-signin', async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase client not initialized.' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Sign-in error:', error.message);
      // Common errors: Invalid login credentials (400), Email not confirmed (400)
      return res.status(error.status || 400).json({ error: error.message });
    }

    // On successful sign-in, data contains user and session objects
    res.status(200).json({ message: 'Sign-in successful.', user: data.user, session: data.session });

  } catch (err) {
    console.error('Unexpected error during sign-in:', err.message);
    res.status(500).json({ error: 'Internal server error during sign-in.' });
  }
});

// Get User (requires JWT)
app.get('/auth-getuser', async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase client not initialized.' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header with Bearer token is required.' });
  }

  const jwt = authHeader.split(' ')[1];
  if (!jwt) {
    return res.status(401).json({ error: 'Bearer token is missing.' });
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(jwt);

    if (error) {
      console.error('Get User error:', error.message);
      // Common errors: Invalid JWT (401), Token expired
      return res.status(error.status || 401).json({ error: error.message });
    }

    if (!user) {
      // This case might happen if the token is valid but somehow user is null (e.g., user deleted after token issuance)
      return res.status(404).json({ error: 'User not found for the provided token.' });
    }

    res.status(200).json({ user });

  } catch (err) {
    console.error('Unexpected error during getUser:', err.message);
    res.status(500).json({ error: 'Internal server error while fetching user.' });
  }
});

// User Sign-Out (requires JWT to invalidate session on server)
app.post('/auth-signout', async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase client not initialized.' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header with Bearer token is required to sign out.' });
  }

  const jwt = authHeader.split(' ')[1];
  if (!jwt) {
    return res.status(401).json({ error: 'Bearer token is missing.' });
  }

  try {
    // Passing the JWT to signOut will attempt to invalidate the user's session on the server.
    // More specifically, it revokes all refresh tokens for the user associated with the JWT.
    const { error } = await supabase.auth.signOut(jwt);

    if (error) {
      console.error('Sign-out error:', error.message);
      // Common errors: Invalid JWT (401)
      return res.status(error.status || 401).json({ error: error.message });
    }

    res.status(200).json({ message: 'Successfully signed out.' });

  } catch (err) {
    console.error('Unexpected error during sign-out:', err.message);
    res.status(500).json({ error: 'Internal server error during sign-out.' });
  }
});

// Refresh Session (requires a valid refresh token)
app.post('/auth-refresh', async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase client not initialized.' });
  }

  const { refreshToken } = req.body; // Expecting a key named refreshToken in the body

  if (!refreshToken) {
    return res.status(400).json({ error: 'refreshToken is required in the request body.' });
  }

  try {
    // The method expects an object with a refresh_token property
    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });

    if (error) {
      console.error('Refresh session error:', error.message);
      // Common errors: Invalid refresh token (401 or other status)
      return res.status(error.status || 401).json({ error: error.message });
    }

    // On successful refresh, data contains user and new session objects
    // The new session will have a new access_token. The refresh_token might be the same or new
    // depending on Supabase project's token rotation settings.
    res.status(200).json({ message: 'Session refreshed successfully.', user: data.user, session: data.session });

  } catch (err) {
    console.error('Unexpected error during session refresh:', err.message);
    res.status(500).json({ error: 'Internal server error during session refresh.' });
  }
});

app.listen(port, () => {
  console.log(`Supabase Auth Examples server listening on port ${port}`);
  if (!supabaseUrl || !supabaseKey) {
    console.warn("WARNING: SUPABASE_URL or SUPABASE_ANON_KEY are not set. Supabase auth endpoints will likely fail.");
  }
});

module.exports = app; // Export app for potential testing or modular use, though run directly for now
