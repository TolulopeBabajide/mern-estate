import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Oauth from '../Components/Oauth';

const SignUp = () => {
  // State to manage form data
  const [formData, setFormData] = useState({});

  // State to manage error
  const [error, setError] = useState(null);

  // State to manage loading state during form submission
  const [loading, setLoading] = useState(false);

  // Hook to navigate to other pages
  const navigate = useNavigate();

  // Function to handle changes in input fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Set loading state to true
      setLoading(true);

      // Send a request to sign up the user
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Parse the response
      const data = await res.json();
      console.log(data);

      // If sign-up is unsuccessful, set error and stop loading
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      // Reset error, stop loading, and navigate to the sign-in page
      setError(null);
      setLoading(false);
      navigate('/signin');
    } catch (error) {
      // Set error and stop loading if an error occurs
      setError(error.message);
      setLoading(false);
    }
  };


  return (
    <div className='max-w-lg mx-auto p-3'>

        <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>

        <form className='flex flex-col gap-4' action="" onSubmit={handleSubmit}>

            <input type="text" placeholder='username' className='border p-3 rounded-lg ' id="username" onChange={handleChange} required />
            <input type="email" placeholder='email' className='border p-3 rounded-lg ' id="email" onChange={handleChange} required/>
            <input type="password" placeholder='password' className='border p-3 rounded-lg ' id="password" onChange={handleChange} required/>

            <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase 
            hover:opacity-95 disabled:opacity-80'>{loading ? "Loading..." : "Sign Up"}</button>

            <Oauth/>
        
        </form>
        {error && <p>{error}</p>}
      
   
 
        <div className='flex gap-2 mt-5'>
            <p>Have an account?</p>
            <Link className='text-blue-700' to="/signin">Sign In</Link>
        </div>
    </div>
  )
}

export default SignUp