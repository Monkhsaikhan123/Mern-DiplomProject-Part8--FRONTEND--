import Navbar1 from './Navbar1'
import Footer from './Footer'
import { Button, Checkbox, Label, TextInput , Textarea, Select, FileInput} from 'flowbite-react';
import React, {useEffect, useState} from 'react';
import { useForm } from "react-hook-form"
import axios from 'axios'
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


const UpdateProduct = () => {
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
                console.log("CURRENT USER IS ADMIN", data.data.Usertype)
                setAdmin(true);
            }else{
                console.log("CURRENT USER IS USER",data.data)
            }

            setUserData(data.data)
            if(data.data ==='token expired'){
                alert("Token expired");
                window.localStorage.clear();
                window.location.href='./sign-in'
            }
        })
    }, []);


    const VITE_IMAGE_API_KEY = "fa49287413751bdc6a6637ea2328a167"
    const image_hosting_key = VITE_IMAGE_API_KEY
    console.log(image_hosting_key)
    const axiosPublic = useAxiosPublic()

    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
    console.log(image_hosting_api)
    const { register, handleSubmit,} = useForm()

    const axiosBaseURL = axios.create({
        baseURL:'http://localhost:3000/'
    });
    const onSubmit = async(data) => {
        console.log("onsubmit" ,data)
        const imageFile = { image: data.image[0] };
        const hostingImage = await axiosPublic.post(image_hosting_api, imageFile, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log("hosting image Data",hostingImage.data)
        if(hostingImage.data.success){
            console.log("image successfully added")
            const blogItem = {
                name: data.name,
                category: data.category,
                description: data.description,
                image: hostingImage.data.data.url,
                price:parseFloat(data.price),
                quantity:parseFloat(data.quantity),
                email:userData.email,
                creator:userData._id,
                Usertype:userData.Usertype
            }
            console.log("blog item", blogItem)
            const postProductItem = axiosPublic.patch(`/menu/${editproduct._id}`, blogItem)
            console.log("postMenuItem", postProductItem)
            if(postProductItem){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product Edited",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
    }

    const {id} = useParams()
    const [editproduct, setEditproduct] = useState([])
    useEffect((e)=>{
        axios.get('http://localhost:3000/menu/'+ id)
        .then(res=>{
            setEditproduct(res.data)
        })
        .catch(err=> console.log(err))
    })

    console.log("editblog",editproduct)

  return (
    <div>
        <Navbar1/>
        <div className='w-full bg-white flex justify-center items-center'>
            <div className='bg-red w-3/4 h-full flex justify-center items-center'>
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full h-full flex bg-white flex-col items-center relative">
                                <h1 className='text-8x1 font-bold tracking-tight text-gray-900 dark:text-white'>UPDATE BLOG</h1>
                                <div className='w-2/4 h-full'>
                                    <div className='mb-2 block'>
                                            <Label htmlFor="floating_email">Name</Label>
                                            <TextInput {...register("name", { required: true })} defaultValue={editproduct.name} placeholder='Enter name'className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' required/>
                                        </div>

                                        <div className='flex w-full mb-2 items-center gap-5'>
                                            <div className='w-1/2'>
                                                <Label >Price</Label>
                                                <TextInput placeholder="Price" {...register("price", { required: true })} defaultValue={editproduct.price} className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' required/>
                                            </div>

                                            <div className="w-1/2  ">
                                                <Label>Category</Label>
                                                <Select {...register("category", { required: true })} defaultValue={editproduct.category} className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' >
                                                        <option disabled value='default'>Select a Category</option>
                                                        <option value='Нарийн ногоо'>Нарийн ногоо</option>
                                                        <option value='Хүлэмжний ногоо'>Хүлэмжний ногоо</option>
                                                        <option value='Навчит ногоо'>Навчит ногоо</option>
                                                        <option value='Хүнсний ногоо'>Хүнсний ногоо</option>
                                                </Select>
                                            </div>
                                        </div>
                                        
                                        <div className='flex w-full mb-2 items-center gap-5'>
                                            
                                               
                                                <TextInput {...register("quantity", { required: true })} defaultValue={editproduct.quantity} placeholder="Quantity" type='number'  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' required/>

                                                <FileInput id="file" {...register("image", { required: true })} className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' />
                                        
                                    
                                        </div>

                                        <div className='mb-2 flex'>
                                           
                                        </div>

                                        <div className='mb-2 block'>
                                            <Label >Description</Label>
                                            <Textarea type='text' {...register("description", { required: true })} defaultValue={editproduct.description} placeholder="Enter Your Product Description...." />
                                        </div>
                                        
                                        <button className="w-full text-gray-900 bg-white border border-gray-300 flex justify-around focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Нэмэх</button>
                                     
                                </div>
                                   
                              
                            </form>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default UpdateProduct