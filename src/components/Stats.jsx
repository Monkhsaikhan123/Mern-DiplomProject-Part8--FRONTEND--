import React, { useEffect, useState } from 'react'
import useBlog from '../hooks/useBlog';
import useOrder from '../hooks/useOrder';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { FaBlog, FaCartPlus, FaDollarSign, FaJediOrder, FaProcedures, FaUsers } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { PiPlantFill } from "react-icons/pi";
import { GiCarrot } from "react-icons/gi";



const Stats = ({userData}) => {
  const [menu, setMenu] = useState([]);
const [filteredItems, setFilteredItems] = useState([]);
useEffect(()=>{
    //fetch data
    const fetchData = async()=> {
        try{
            const response = await fetch('http://localhost:3000/menu2');
            const data = await response.json();
            console.log(data)
            setMenu(data)
            setFilteredItems(data)
        }catch(err){
            console.log("Error fetching data", err)
    }
}
//call the function
fetchData()
},[])
  const [menu2, setMenu2] = useState([]);
const [filteredItems2, setFilteredItems2] = useState([]);
  useEffect(()=>{
    //fetch data
    const fetchData = async()=> {
        try{
            const response = await fetch('http://localhost:3000/menu');
            const data = await response.json();
            console.log('field plants', data)
            setMenu2(data)
            setFilteredItems2(data)
        }catch(err){
            console.log("Error fetching data", err)
    }
}
//call the function
fetchData()
},[])

const [getallcarts, setGetallcarts] = useState([]);
useEffect(()=>{
  //fetch data
  const fetchData = async()=> {
      try{
          const response = await fetch('http://localhost:3000/getallcarts');
          const data = await response.json();
          console.log('field plants', data)
          setGetallcarts(data)
      }catch(err){
          console.log("Error fetching data", err)
  }
}
//call the function
fetchData()
},[])

//get BLOG
const [blog] = useBlog()

const [orders] = useOrder()



const axiosPublic = useAxiosPublic();
const {data: stats = [], isPending : loading, refetch} = useQuery({
    queryKey: ['stats'],
    queryFn: async() => {
        const res = await axiosPublic.get('/stats');
        console.log('Stats', res.data)
        return res.data
    }


})


  return (
    <div>
        <div className="stats stats-vertical lg:stats-horizontal shadow">


        <div className="stat">
              <div className="stat-title">Revenue</div>
              <div className="stat-value">{stats.revenue}</div>
              <div className="stat-desc">↘︎ 96 (14%)</div>
              <div className='stat-figure text-secondary text-3xl'>
                <FaDollarSign className='h-5 w-5 cursor-pointer'/>
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Total Blog</div>
              <div className="stat-value">{blog.length}</div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
              <div className='stat-figure text-secondary text-3xl'>
                <FaBlog className='h-5 w-5 cursor-pointer'/>
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Total All Users Number</div>
              <div className="stat-value">{userData.length}</div>
              <div className="stat-desc">↗︎ 400 (22%)</div>
              <div className='stat-figure text-secondary text-3xl'>
                <FaUsers/>
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Total in Cart Product</div>
              <div className="stat-value">{getallcarts.length}</div>
              <div className="stat-desc">↗︎ 400 (22%)</div>
              <div className='stat-figure text-secondary text-3xl'>
                <FaCartShopping/>
              </div>
            </div>
            
            <div className="stat">
              <div className="stat-title">Total Items Agriculture</div>
              <div className="stat-value">{menu.length}</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
              <div className='stat-figure text-secondary text-3xl'>
              <GiCarrot/>
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Total Orders</div>
              <div className="stat-value">{orders.length}</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
              <div className='stat-figure text-secondary text-3xl'>
                <FaJediOrder/>
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">Total Field Products</div>
              <div className="stat-value">{menu2.length}</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
              <div className='stat-figure text-secondary text-3xl'>
                <PiPlantFill />
              </div>
            </div>
            
          </div>
    </div>
  )
}

export default Stats