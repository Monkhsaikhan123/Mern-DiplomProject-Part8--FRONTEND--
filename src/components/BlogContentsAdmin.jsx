import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa6'
import useBlog from '../hooks/useBlog'
import { FaEdit } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import Stats from './Stats'
import axios from 'axios'

const BlogContentsAdmin = () => {
    const [userData, setUserData] = useState('')
    useEffect(()=>{
        fetch('http://localhost:3000/getUser', {
            method:"GET"
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log("getUSERDATA", data,userData)
            setUserData(data.data)
        })
    },[])
    //get blogs
    const [blog, refetch] = useBlog()
    const [blogCategory, setBlogCategory] = useState('')

    ///post like 

    const [like, setLike] = useState([])
    useEffect(()=>{
        fetch('http://localhost:3000/like')
        .then(res => res.json())
        .then(data => {
        console.log(data)
        setLike(data)
    })
    },[])
    console.log("LIKED BLOG",like)

    const handleAddLike = (like,item) =>{
        console.log("LIKED BLOG",like)
        console.log("USERDATA", userData)
        console.log("USERDAT EMAIL", like?.email)
        console.log("ITEM" , item)
        if(userData && like?.email){
           
            const cartItem = {like:like, item:item}
            console.log(cartItem)
            fetch('http://localhost:3000/like',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cartItem)
                
            })
            .then(res=>res.json())
            .then((data)=> {
                console.log(data)
            })
       } else{
            
       }  
    }


    axios.defaults.baseURL = 'http://localhost:3000';
    const deleteBlog = async(id, name)=>{
        try {
            if(window.confirm(`Are you sure you want to delete ${name} This user??`));
            const data = await axios.delete('/blog/'+id)
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: (data.data.message),
                showConfirmButton: false,
                timer: 1500
              });
              window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

  return (

    <div className="overflow-x-auto">
        <table className="table table-zebra w-full">

            {/* head */}
                <thead className='bg-green text-white rounded-lg'>
                <tr>
                    <th>#</th>
                    <th>Blog Name</th>
                    <th>Blog Image</th>
                    <th>Blog Category</th>
                    <th>Blog Description</th>
                    <th>Blog Author</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>

                    {
                        blog.map((item,index)=>{
                            return (
                                <tr key={item._id}>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <img className='w-10 h-10'src={item.image}/>
                                    </td>
                                    <td>{item.category}</td>
                                    <td>{item.description}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <Link to={`/update-blog/${item._id}`} className='btn btn-xs bg-orange-500 text-white'><FaEdit/></Link>
                                    </td>
                                    <td>
                                        <button onClick={()=> deleteBlog(item._id, item.name)} className='btn btn-xs bg-orange-500 text-white'>
                                            <FaTrash/>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
         </div>
      
  )
}

export default BlogContentsAdmin