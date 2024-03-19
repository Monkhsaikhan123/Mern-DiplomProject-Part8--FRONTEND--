import React, {Component, useState, useEffect, Route} from 'react';
import { useForm } from "react-hook-form"
import axios from 'axios'
import useAxiosPublic from '../hooks/useAxiosPublic';

const AddMenu = () => {
    const [userData, setUserData] = useState('')
    const [Admin,setAdmin] = useState(false)

    useEffect(()=>{
        fetch('http://localhost:3000/userData',{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type" : 'application/json',
                Accept: 'appilcation/json',
                'Access-Control-Allow-Origin' : '*',
            },
            body:JSON.stringify({
                token:window.localStorage.getItem("token")
            })
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data,'userData')
            
            if(data.data.Usertype==="Admin"){
                console.log(data.data.Usertype)
                setAdmin(true);
                
            }else{
                console.log(data.data.Usertype)
            }

            setUserData(data.data)
            if(data.data ==='token expired'){
                alert("Token expired");
                window.localStorage.clear();
                window.location.href='./sign-in'
            }
        })
    }, []);
    console.log("UserDetails AddMenu",userData)

    const axiosPublic = useAxiosPublic()
    const VITE_IMAGE_API_KEY = "fa49287413751bdc6a6637ea2328a167"
    const image_hosting_key = VITE_IMAGE_API_KEY
    console.log(image_hosting_key)

    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
    console.log(image_hosting_api)
    const { register, handleSubmit,} = useForm()

    const axiosBaseURL = axios.create({
        baseURL:'http://localhost:3000/'
    });
    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = {image: data.image[0]}
        console.log(imageFile)
        const hostingImage = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(hostingImage)
          if(hostingImage.data.success){
             const menuItem = {
                name: data.name,
                category: data.category,
                description: data.description,
                price: parseFloat(data.price),
                quantity: parseFloat(data.quantity),
                image: hostingImage.data.data.url,
             }
             console.log(menuItem)

             const postMenuItem = axiosBaseURL.post('/menu', menuItem)
            
             console.log("postMenuItem",postMenuItem)
             if(postMenuItem){
                alert('successfully added product')
                window.location.reload()
            }
          }
    }

  return (
        <div className='w-2/3 h-screen'>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                            {/* Name*/}
                                            <div className="form-control w-full my-6">
                                                <label className="label">
                                                    <span className="label-text">Product name</span>
                                                    
                                                </label>
                                                <input type="text" {...register("name", { required: true })} placeholder="Product name" className="input input-bordered w-full" />
                                            </div>

                                            {/* Categories and price */}
                                            <div className='flex items-center gap-4'>
                                                <div className="form-control w-full max-w-xs">
                                                    <label className="label">
                                                        <span className="label-text">Category</span>
                                                    </label>
                                                    <select  {...register("category", { required: true })} className="select select-bordered">
                                                        <option disabled value='default'>Select a Category</option>
                                                        <option value='Нарийн ногоо'>Нарийн ногоо</option>
                                                        <option value='Хүлэмжний ногоо'>Хүлэмжний ногоо</option>
                                                        <option value='Навчит ногоо'>Навчит ногоо</option>
                                                        <option value='Хүнсний ногоо'>Хүнсний ногоо</option>
                                                    </select>
                                                </div>

                                                <div className="form-control w-full">
                                                <label className="label">
                                                    <span className="label-text">Price</span>
                                                </label>
                                                <input  type="number" {...register("price", { required: true })} placeholder="Price" className="input input-bordered w-full" />
                                                </div>

                                                <div className="form-control w-full">
                                                <label className="label">
                                                    <span className="label-text">Quantity</span>
                                                </label>
                                                <input  type="number" {...register("quantity", { required: true })} placeholder="Quantity" className="input input-bordered w-full" />
                                                </div>
                                            </div>

                                            {/* text area */}
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Description</span>
                                                </label>
                                                <textarea  {...register("description", { required: true })} className="textarea textarea-bordered h-24" placeholder="Description..."></textarea>
                                            </div>

                                            {/* fileinput */}
                                            <div className="form-control w-full my-6">
                                                <input type="file"  {...register("image", { required: true })} className="file-input w-full max-w-xs" />
                                            </div>

                                            <button className='bg-primary text-white px-6'>Add Product</button>
                                    </form>
                                </div>
    
  )
}

export default AddMenu