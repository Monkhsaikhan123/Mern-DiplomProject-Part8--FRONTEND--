
import React, {Component, useState, useEffect, Route} from 'react';
import Userhome from './userhome';
import AdminHome from './adminHome';
import Loading from './Loading';


export default function UserDetails() {
        const [userData, setUserData] = useState('')
        const [Admin,setAdmin] = useState(false)
        const [loading, setLoading] = useState(false)
        useEffect(()=>{
            setLoading(true)
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
                    setLoading(false)
                }else{
                    console.log(data.data.Usertype)
                    setLoading(false)
                }

                setUserData(data.data)
                if(data.data ==='token expired'){
                    alert("Token expired");
                    window.localStorage.clear();
                    window.location.href='./sign-in'
                    setLoading(true)
                }
            })
        }, []);
        console.log("UserDetails",userData)


        if(loading){
            return <Loading/>
        }
        return(
            Admin? 
            <AdminHome userData={userData}/>
            :<Userhome userData={userData}/> 
        )
    }
    