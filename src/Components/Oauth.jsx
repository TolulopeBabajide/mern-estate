import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/user/userSlice';

// Google OAuth Component
export default function Oauth() {
  // Initialize Redux dispatch and navigation hook
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Google Sign-In Click
  const handleGoogleClick = async () => {
    try {
      // Create GoogleAuthProvider and get Auth instance
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      // Sign in with Google Popup
      const result = await signInWithPopup(auth, provider);

      // Send Google Sign-In data to the server
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
        credentials: 'include',
      });

      // Parse server response and dispatch success action
      const data = await res.json();
      dispatch(signInSuccess(data));

      // Navigate to the home page after successful sign-in
      navigate('/');
    } catch (error) {
      console.log('Could not sign in with Google', error);
    }
  };

  // Render Google Sign-In Button
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
      Continue with Google
    </button>
  );
}
