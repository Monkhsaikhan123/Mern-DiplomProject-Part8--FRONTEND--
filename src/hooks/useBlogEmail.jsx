import { useQuery } from "@tanstack/react-query";
import React ,{useState, useEffect}from 'react'

const useBlogEmail = () => {
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
    console.log("use blog email",userData);

    const { refetch, data: blog= []} = useQuery({
        queryKey: ['blog', userData?.email
    ],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/blogs?email=${userData?.email}`)
            return res.json()
          },
    })

  return [blog, refetch]
}

export default useBlogEmail