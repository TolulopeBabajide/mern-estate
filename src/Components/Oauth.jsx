import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import {app} from '../firebase';



const Oauth = () => {

  const handleGoogleClick =async ()=>{
    try {

      const provider= new GoogleAuthProvider();
      const auth = getAuth(app)

      const result = await signInWithPopup(auth,provider);
      console.log(result);
      
    } catch (error) {
      console.log("Could not sign in with google", error);
    }
  };

  return (
    <button type="button" onClick={handleGoogleClick} className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Continue with google</button>
  )
}

export default Oauth