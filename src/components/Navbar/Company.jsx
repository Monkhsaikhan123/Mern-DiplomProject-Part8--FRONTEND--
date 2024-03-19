import React, { useState, useEffect} from 'react'
import useBlogEmail from '../../hooks/useBlogEmail';
import { FaTrash } from 'react-icons/fa6';
import Footer from '../Footer'
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Company = () => {
  const [userData, setUserData] = useState('')

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
          console.log("cartItems",data)
          setUserData(data.data)
      })
  }, []);
  console.log(userData);

  const [blog, refetch] = useBlogEmail()
  console.log("BLOG", blog)


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
  
  
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      
        <h1>Tanii Oruulsan Medeelel</h1>
         <div className='flex w-2/6 justify-between'>
          <button className='btn bg-green text-white'>Inserted Blogs</button>
          <button className='btn btn-primary text-white'>Liked Blogs</button>
         </div>
        
        <div className='w-full gap-1 justify-around bg-white'>
          <div className="overflow-x-auto">
              <table className="table">
                  {/* head */}
                <thead className='bg-green text-white rounded-sm'>
                  <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Image</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Quantity</th>
                      <th>Phone Number</th>
                      <th>Edit</th>
                      <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                      blog.map((item,index)=> (
                          <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>
                                    {item.name}
                                  </td>
                                  <td>
                                    <img className='w-10 h-10'src={item.image} alt="" />
                                  </td>
                                  <td>
                                    {item.description}
                                  </td>
                                  <td>
                                    {item.price}
                                  </td>
                                  <td>
                                    {item.category}
                                  </td>
                                  <td>
                                    {item.quantity}
                                  </td>
                                  <td>
                                    {item.email}
                                  </td>
                                  <td>
                                    <Link to={`/update-blog/${item._id}`} className='btn btn-xs bg-orange-500 text-white'> <FaEdit/></Link>
                                   
                                  </td>
                                  <td>
                                    <button onClick={()=>handleDelete()}>
                                      <FaTrash className=' text-red'/>
                                    </button>
                                  </td>
                          </tr>
                        ))
                      }
                  </tbody>
                </table>
          </div>

        </div>
       
        <Footer/>
      

    </div>
  )
}

export default Company