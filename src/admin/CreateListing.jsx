import { uploadBytesResumable, getStorage, ref, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import React, { useState } from 'react'

const CreateListing = () => {


    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls : [],
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const imageUploadHandler = (e) =>{
        // code to handle the upload of an image.
        setFiles(e.target.files);
    }

    const handleImageSubmit = (e) =>{
        if (files.length > 0 && files.length + formData.imageUrls.length < 7){
            setUploading(true);
            setImageUploadError(false);
            const promises = [];

            for (let i=0;i<files.length;i++){
                promises.push(storeImage(files[i]));
            }

            Promise.all(promises).then((urls)=>{
                setFormData({...formData, imageUrls: [...formData.imageUrls, ...urls]});

                setImageUploadError(false);
                setUploading(false);
                 
            }).catch((err) =>{
                setImageUploadError("Image upload failed(2mb max per image)");
                setUploading(false);
            });
        } else {
            setImageUploadError("You can only add up to 6 images  per listing.");
            setUploading(false);
        }
    }

        const storeImage = async (file) =>{
            return new Promise((resolve, reject) =>{
                const storage = getStorage(app);
                const fileName = new Date().getTime() + file.name;
                const storageRef = ref(storage,fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on(
                    'state_changed', 
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100;
                        console.log("Upload is " + progress + "% done");
                    },
                    (error) => {
                        reject(error);
                    },
                    ()=>{
                        getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL)=>{
                            resolve(downloadURL);
                        })
                    }
                )
            })
        }

        const handleRemoveImage = (index) => {
            setFormData({
                ...formData,imageUrls: formData.imageUrls.filter((_, i)=> i !==index),
            })
        }
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type="text" placeholder='name' className='p-3 rounded-lg border' id='name' max-length='62' minLength='10' required />
                <textarea type="text" placeholder='description' className='p-3 rounded-lg border' id='description' max-length='62' minLength='10' required />
                <input type="text" placeholder='address' className='p-3 rounded-lg border' id='address' max-length='62' minLength='10' required />
                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='sale' className='w-5' />
                        <span>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='rent' className='w-5' />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='parking' className='w-5' />
                        <span>Parking spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='furnished' className='w-5' />
                        <span>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='offer' className='w-5' />
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-6'>
                    <div className='flex items-center gap-2'>
                        <input required type="number" id='bedrooms' min='1' max='10' className='p-3 border border-gray-300 rounded-lg' />
                        <p>Beds</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input required type="number" id='bathrooms' min='1' max='10' className='p-3 border border-gray-300 rounded-lg' />
                        <p>Baths</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input required type="number" id='regularPrice' min='1' max='10' className='p-3 border border-gray-300 rounded-lg' />
                        <div className='flex flex-col items-center'>
                            <p>Regular Price</p>
                            <span className='text-xs'>($ / month)</span>
                        </div>
                        
                    </div>
                    <div className='flex items-center gap-2'>
                        <input required type="number" id='discountedPrice' min='1' max='10' className='p-3 border border-gray-300 rounded-lg' />
                        <div className='flex flex-col items-center'>
                            <p>Discounted Price</p>
                            <span className='text-xs'>($ / month)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>Images:
                    <span className='font-normal text-gray-600 ml-2 '>The first image will be the cover(max 6)</span>
                </p>

                <div className='flex gap-4'>
                    <input onChange={imageUploadHandler} type="file" className='p-3 border border-gray-300 rounded w-full' id='images' accept='image/*' multiple />
                    <button disabled={uploading} type='button' onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 uppercase rounded hover:shadow-lg disabled:opacity-80'>
                        {uploading ? "Uploading..." : "Upload" }
                    </button>
                </div>
                <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
                {
                    formData.imageUrls.length > 0 && formData.imageUrls.map((url, index)=>(
                        <div key={url}  className='flex justify-between p-3 items-center border'>
                            <img  src={url}  className='w-40 h-40 object-contain rounded-lg' alt="listing image" />
                            <button type='button' onClick={()=>handleRemoveImage(index)} className='text-red-700 rounded-lg uppercase hover:opacity-75 '>Delete</button>
                        </div>
                    ))
                }

                <button className='p-3 text-white bg-slate-700 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>

            </div>
        </form>
    </main>
  )
}

export default CreateListing