import React from 'react'
import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import {updateUserStart, updateUserSuccess, updateUserFailure} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

const Profile = () => {
  const {currentUser, loading, error} = useSelector ((state)=>state.user)
  const fileRef = useRef(null);
  const [file, setFile]= useState(undefined)
  const [filePerc,setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});  
  const [updateSuccess, setUpdateSucess] = useState(false);
  const dispatch = useDispatch();
  // console.log(formData);


  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  
  

const handleFileUpload = (file) =>{
  const storage = getStorage(app);
  const fileName = new Date().getTime() + file.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed', 
  (snapshot)=>{
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
    setFilePerc(Math.round(progress));
  },

  (error) => {
    setFileUploadError(true);
  },
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then
    ((downloadURL)=>setFormData({...formData, avatar: downloadURL}));
  }
  );
};


const handleChange = (e)=>{
  setFormData({...formData, [e.target.id] : e.target.value})
}

const handleSubmit =async (e) =>{
  // debugger;
  e.preventDefault();
  try {
    dispatch(updateUserStart());
    const res = await fetch (`/api/user/update/${currentUser._id}`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
      
    const data = await res.json();
    if(data.success===false){
      dispatch(updateUserFailure(data.message));
      return;
    }
    dispatch(updateUserSuccess(data));
    setUpdateSucess(true);

  } catch (error) {
    dispatch(updateUserFailure(error.message));
  }
}

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e)=>setFile(e.target.files[0])}  />

        <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="avatar" 
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />

          <p className='text-sm self-center'> {fileUploadError ? 
          (<span className='text-red-700 ' >Image Upload Error(image must be less than 2mb)</span>) : filePerc > 0 && filePerc < 100 ?
        ( <span className='text-slate-700 ' >{`uploading ${filePerc}%`}</span>) : filePerc ===100 ? 
      (<span className='text-green-700'>Uploaded Successfully!</span>) : (" ") } </p>

        <input onChange={handleChange} type="text" defaultValue={currentUser.username} placeholder='username' id='username' className='border p-3 rounded-lg' />

        <input onChange={handleChange} type="email" defaultValue={currentUser.email} placeholder='email' id='email' className='border p-3 rounded-lg' />

        <input onChange={handleChange} type="password" placeholder='password' id="password" className='border p-3 rounded-lg' />

        <button disabled={loading} className='uppercase hover:opacity-95 bg-slate-700 text-white rounded-lg p-3 disabled:opacity-80'>
          {loading ? "Loading..." : "Update"}
        </button>
      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>

            <p className='text-red-700 mt-5 '>{error ? error : " "}</p>
            <p className='text-green-700 mt-5'>{updateSuccess ? "user updated succesfully" : " "}</p>

    </div>
     
 
  )
}

export default Profile