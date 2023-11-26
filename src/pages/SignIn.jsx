import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import Oauth from '../Components/Oauth';

const SignIn = () => {
  // State to manage form data
  const [formData, setFormData] = useState({});

  // Select user-related data from Redux store
  const { loading, error } = useSelector((state) => state.user);

  // Hook to navigate to other pages
  const navigate = useNavigate();

  // Redux dispatch hook
  const dispatch = useDispatch();

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
      // Dispatch action to start the sign-in process
      dispatch(signInStart());

      // Send a request to sign in the user
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Parse the response
      const data = await res.json();
      console.log(data);

      // If the sign-in is unsuccessful, dispatch failure action
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      // Dispatch success action and navigate to the home page
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      // Dispatch failure action if an error occurs
      dispatch(signInFailure(error.message));
    }
  };
    


  return (
    <div className='max-w-lg mx-auto p-3'>

        <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>

        <form className='flex flex-col gap-4' action="" onSubmit={handleSubmit}>

            <input type="email" placeholder='email' className='border p-3 rounded-lg ' id="email" onChange={handleChange} required/>
            <input type="password" placeholder='password' className='border p-3 rounded-lg ' id="password" onChange={handleChange} required/>

            <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase 
            hover:opacity-95 disabled:opacity-80'>{loading ? "Loading..." : "Sign In"}</button>
            <Oauth/>
        
        </form>
        {error && <p>{error}</p>}
      
   
 
        <div className='flex gap-2 mt-5'>
            <p>Dont have an account?</p>
            <Link className='text-blue-700' to="/signup">Sign Up</Link>
        </div>
    </div>
  )
}

export default SignIn