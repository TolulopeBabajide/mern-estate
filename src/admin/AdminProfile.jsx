import React from 'react';
import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure,
          deleteUserStart, deleteUserSuccess, deleteUserFailure ,
          signOutStart, signOutSuccess, signOutFailure} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  // Select user-related data from Redux store
  const { currentUser, loading, error } = useSelector((state) => state.user);

  // Create references and state variables
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Effect to handle file upload when 'file' changes
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
    // eslint-disable-next-line 
  }, [file]);

  // Function to handle file upload using Firebase Storage
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Event listeners for upload progress and completion
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        // On successful upload, get the download URL and update form data
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  // Function to handle changes in input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch action to start the update process
      dispatch(updateUserStart());

      // Send a request to update the user data
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Parse the response
      const data = await res.json();

      // If the update is unsuccessful, dispatch failure action
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      // Dispatch success action and set update success state
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      // Dispatch failure action if an error occurs
      dispatch(updateUserFailure(error.message));
    }
  };

  //function to handle Delete User functionality
  const handleDeleteUser = async () =>{
    try {
      // Dispatch action to start the delete process
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      });
      // Parse the response
      const data = await res.json();
      // If the deletion is unsuccessful, dispatch failure action
      if(data.success===false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data)); 
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }


  // function to handle signout functionalities
  const handleSignOut = async () =>{
    try{
      dispatch(signOutStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success===false){
        dispatch(signOutFailure(data.message))
        navigate("/adminpanel/signin")
        return;
      }
      dispatch(signOutSuccess());

    } catch(error){
      dispatch(signOutFailure(error.message));
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
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
      </div>

            <p className='text-red-700 mt-5 '>{error ? error : " "}</p>
            <p className='text-green-700 mt-5'>{updateSuccess ? "user updated succesfully" : " "}</p>

    </div>
     
 
  )
}

export default AdminProfile