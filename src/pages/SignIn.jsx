import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SignIn = () => {

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
        e.preventDefault();

        try {

            setLoading(true);
    

            const res = await fetch('http://localhost:3000/api/auth/signin', 
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
            navigate('/');
            
            

        }catch(error){
            setError(error.message)
            setLoading(false);
        }; 

        
    } 
    


  return (
    <div className='max-w-lg mx-auto p-3'>

        <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>

        <form className='flex flex-col gap-4' action="" onSubmit={handleSubmit}>

            <input type="email" placeholder='email' className='border p-3 rounded-lg ' id="email" onChange={handleChange} required/>
            <input type="password" placeholder='password' className='border p-3 rounded-lg ' id="password" onChange={handleChange} required/>

            <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase 
            hover:opacity-95 disabled:opacity-80'>{loading ? "Loading..." : "Sign In"}</button>
        
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