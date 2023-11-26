import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Oauth from '../Components/Oauth';

const SignUp = () => {

    const [formData, setFormData] = useState({});
    const [error,setError ] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData({ 
            ...formData, 
            [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e)=>{
        // debugger;
        e.preventDefault();

        try {

            setLoading(true);
    

            const res = await fetch('/api/auth/signup', 
            {
                method: 'POST', 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),       
            });
            const data = await res.json();
            console.log(data);
            if (data.success===false){
                setError(data.message)
                setLoading(false);
                return; 
            }

            setLoading(false);
            setError(null);
            navigate('/signin');
            
            

        }catch(error){
            setError(error.message)
            setLoading(false);
        }; 

        
    } 
    


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