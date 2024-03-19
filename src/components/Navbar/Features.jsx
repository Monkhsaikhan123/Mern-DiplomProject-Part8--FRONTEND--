
import { useQuery } from '@tanstack/react-query';
import { Button, Checkbox, Label, TextInput , Textarea, Select, FileInput} from 'flowbite-react';
import React, {useEffect, useState} from 'react';

const Features = () => {
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
          console.log("FEATURES",data)
          setUserData(data.data)
      })
  }, []);
  console.log("FEATURES",userData);


  const { refetch, data:orders=[]} = useQuery({
    queryKey: ['orders', userData?.email
],
    queryFn: async () => {
        const res = await fetch(`http://localhost:3000/payment?email=${userData?.email}`)
        return res.json()
      },
})
console.log(orders)

const formatDate = (createdAt) => {
  const createdAtDate = new Date(createdAt)
  return createdAtDate.toLocaleDateString()
}
  return (
    <div className='w-full bg-gray-100 flex flex-col justify-center items-center'>
       <div className='w-4/5 flex justify-center bg-white space-y-5'>
            <h1 className='text-4xl'>Track your Orders</h1>
       </div>
       


       {
              (orders.length > 0) ?
       <div className='w-4/5'>
          <div className="overflow-x-auto">
                            <table className="table table-zebra w-full]">

                                    {/* head */}
                                        <thead className='bg-green text-white rounded-lg'>
                                        <tr>
                                            <th>#</th>
                                            <th>Email</th>
                                            <th>TransitionId</th>
                                            <th>Status</th>
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
  )
}

export default Features