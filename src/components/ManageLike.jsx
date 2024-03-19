import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'
import {Link} from 'react-router-dom'

const ManageLike = () => {
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
    <div className="overflow-x-auto">
    <table className="table">
        {/* head */}
      <thead className='bg-primary text-white rounded-sm'>
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
            like.map((item,index)=> (
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
                            <Link><FaEdit/></Link>
                        </td>
                        <td>
                            <button className='btn btn-xs bg-orange-500 text-white' onClick={()=>handleDelete()}>
                            <FaTrash/>
                            </button>
                        </td>
                      
                </tr>
              ))
            }
        </tbody>
      </table>
</div>     
  )
}

export default ManageLike