
import Navbar1 from './Navbar1'
import Footer from './Footer'
import React ,{useState, useEffect}from 'react'
import Swal from 'sweetalert2'
import { FaHeart } from 'react-icons/fa6'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'

const ProductDetails = ({item}) => {
    const [isHeartFilled, setIsHeartFilled] = useState(false)

    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled)
    }
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
            console.log(data)
            setUserData(data.data)
        })
    }, []);

    const {id} = useParams()
    const [post, setPost] = useState(null)
    
    useEffect(()=>{
        const getPost = async()=>{
          try {
            const response = await axios.get(`http://localhost:3000/menu/${id}`)
            setPost(response.data)
            console.log("response data",response.data)
          } catch (error) {
            console.log(error)
          }
        }
      },[])
      console.log("POST DETAILS",post)
      console.log("item", item)

  
  return (
    <div className='w-full h-screen bg-gray-100'>
        <div>
            <Navbar1/>
        </div>
        <div className='w-full h-full flex justify-center'>
            <div className='w-3/5 bg-white'>
                <div className='container post-detail__container'>
                    <div className='post-detail_thumbnail'>
                        <img alt=''/>
                    </div>
                    <div className='flex justify-around bg-gray-100 mt-5'>
                        <h2 className='bg-green text-white'>Category:  </h2>
                        <h2 className='bg-green text-white'>Name: </h2>
                        <h3 className='bg-green text-white'>Price:  </h3>
                    </div>
                    <div className='mt-5'>
                        <h2 className='bg-primary text-white'>Name: </h2>
                        <h2 className='bg-primary text-white'>Description: </h2>
                    </div>
                </div>
            </div>
           
            
        </div>
    </div>
  )
}

export default ProductDetails