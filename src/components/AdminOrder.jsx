import React, { useEffect, useState } from 'react'
import Navbar1 from './Navbar1';
import useOrder from '../hooks/useOrder';
import { Link, useParams } from 'react-router-dom';
import { FaCheck, FaEdit } from 'react-icons/fa';
import AxiosPublic from '../hooks/useAxiosPublic';
import useAxiosPublic from '../hooks/useAxiosPublic';
import axios from 'axios'
import { GiConfirmed } from "react-icons/gi"
import { CiDeliveryTruck } from "react-icons/ci";
import Swal from 'sweetalert2';

const AdminOrder = () => {

    const AxiosPublic = useAxiosPublic()

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
    console.log("UserDetails",userData)

    const [orders, refetch] = useOrder()
    console.log("ORDERS",orders)

    const formatDate = (createdAt) => {
        const createdAtDate = new Date(createdAt)
        return createdAtDate.toLocaleDateString()
      }
      const {id} = useParams()

    const handleConfirm = async(user) => {
        console.log(user)
        await axios.patch(`http://localhost:3000/confirm/${user._id}`)
        .then(res => {
            console.log(res.data)
            window.location.reload()
            Swal.fire({
                title: "Confirmed",
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
              });
        })
    }

    const handleChecking = async(user) => {
        console.log(user)
        await axios.patch(`http://localhost:3000/check/${user._id}`)
        .then(res => {
            console.log(res.data)
            window.location.reload()
            Swal.fire({
                title: "Checking...",
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
              });

        })
    }
    const handleDevliering = async(user) => {
        console.log(user)
        await axios.patch(`http://localhost:3000/deliver/${user._id}`)
        .then(res => {
            console.log(res.data)
            window.location.reload()
            Swal.fire({
                title: "Delivering..",
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
              });

        })
    }
  return (
    <div className='w-full'>
        <Navbar1/>
        <div className='w-full flex justify-center items-center'>
            <h1 className='text-4xl mb-5 mt-5'>Fix Users Order</h1>
        </div>
        <div className='w-full flex justify-center items-center'>
        {
              (orders.length > 0) ?
        <div className='w-5/6'>
          <div className="overflow-x-auto">
                            <table className="table table-zebra w-full]">

                                    {/* head */}
                                        <thead className='bg-green text-white rounded-lg'>
                                        <tr>
                                            <th>#</th>
                                            <th>Email</th>
                                            <th>TransitionId</th>
                                            <th>Status</th>
                                            <th>Confirm</th>
                                            <th>Check</th>
                                            <th>Deliver</th>
                                            <th>price</th>
                                            <th>CreatedAt</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                orders.map((user,index)=>{
                                                    return (
                                                        <tr key={user._id}>
                                                            <td>{index+1}</td>
                                                            <td>{user.email}</td>
                                                            <td>{formatDate(user.createdAt)}</td>
                                                            <td>{user.status}</td>
                                                            <td className='gap-2'>
                                                                <button onClick={()=> handleConfirm(user)}> <GiConfirmed className='text-orange-400'/> Confirm</button>
                                                               
                                                            
                                                            </td>

                                                            <td>
                                                                <button onClick={()=> handleChecking(user)}> <FaCheck className='text-green'/> Check</button>
                                                            </td>

                                                            <td>
                                                                <button onClick={()=> handleDevliering(user)}> <CiDeliveryTruck className='text-blue' /> Deliver</button>
                                                            </td>
                                                            <td>{user.price}</td>
                                                            <td>{user.createdAt}</td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                    </div>
       </div>
       :<div className='text-center mt-20'>
       <p className='text-4xl text-center'>Order is empty.</p>
       </div>
       }
        </div>
    </div>
  )
}

export default AdminOrder