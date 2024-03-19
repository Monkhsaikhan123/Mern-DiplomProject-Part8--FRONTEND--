
import React, {useEffect, useState} from 'react';
import Swal from 'sweetalert2'
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";
import { FaPlusCircle , FaRegUser, FaLocationArrow, FaQuestionCircle} from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import './styles/adminHome.css';
import {Link} from 'react-router-dom'
import logo from '../assets/4.jpg'
import Stats from './Stats';
import { FaTrash, FaUser } from "react-icons/fa";
import axios from 'axios'
import useCart from '../hooks/useCart';
import { AgChartsReact } from 'ag-charts-react';
import CircleChart from './CircleChart';
import PieChart from './PieChart';
import DonatsChart from './DonatsChart';
import AddMenu from './AddMenu';
import BlogContentsAdmin from './BlogContentsAdmin'
import ManageLike from './ManageLike';
import image from '../image/pngwing.com.png'
import image2 from '../image/2.png'
import AddItem from './AddItem';

export default function AdminHome() {
    const [data, setData] = useState([])
    const [addSection, setAddSection] = useState(false)
    const [addSection1, setAddSection1] = useState(false)
     const [addSection2, setAddSection2] = useState(false)
     const [addSection3, setAddSection3] = useState(false)
     const [addSection4, setAddSection4] = useState(false)
     const [addSection5, setAddSection5] = useState(false)
     const [addSection6, setAddSection6] = useState(false)
     const [addSection7, setAddSection7] = useState(false)
    
    const [userData, setUserData] = useState('')
    const [cart, refetch] = useCart()
   
    const [query, setQuery] = useState("")
    
    const logOut=()=>{
        window.localStorage.clear();
        window.location.href='./sign-in'
    };
    const [UserFilter, setUserFilter] = useState([]);
 //Хэрэглэгчид
    useEffect(()=>{
        fetch('http://localhost:3000/getUser', {
            method:"GET"
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log("adminHOME USERDATA", data,userData)
            setUserData(data.data)
            setUserFilter(data.data)
        })
    },[])

    const sharedLink = (
        <>
            <li>
                <Link to='/' className='mt-3'>
                    <MdDashboard />Home
                </Link>
            </li>
            <li>
                <Link to='menu'>
                    <FaShoppingCart />
                    Menu
                </Link>
            </li>
            <li>
                <Link to='/adminorder'>
                    <FaLocationArrow/>
                    Orders Tracking
                </Link>
            </li>
            <li>
                <Link>
                    <FaQuestionCircle/>
                    Customer Support
                </Link>
            </li>
        </>
    )

    //delete user
    axios.defaults.baseURL = 'http://localhost:3000';
    const deleteUser = async(id, fname)=>{
        try {
            if(window.confirm(`Are you sure you want to delete ${fname} This user??`));
            const data = await axios.delete('/deleteUser/'+id)
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: (data.data.message),
                showConfirmButton: false,
                timer: 1500
              });
        } catch (error) {
            console.log(error)
        }
        refetch()
    }

///Product
const [menu, setMenu] = useState([]);
const [filteredItems, setFilteredItems] = useState([]);
useEffect(()=>{
    //fetch data
    const fetchData = async()=> {
        try{
            const response = await fetch('http://localhost:3000/menu2');
            const data = await response.json();
            console.log('Garden Plants',data)
            setMenu(data)
            setFilteredItems(data)
        }catch(err){
            console.log("Error fetching data", err)
    }
}
//call the function
fetchData()
},[])
//Field Product
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


///delete product
const deleteFieldProduct = async(id, name)=>{
    console.log(menu2)
    try {
        if(window.confirm(`Are you sure you want to delete ${name} This user??`));
        const data = await axios.delete('/menu/'+id)
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



///delete item menu2 
const deleteGardenProduct = async(id, name)=>{
    console.log(menu)
    try {
        if(window.confirm(`Are you sure you want to delete ${name} This user??`));
        const data = await axios.delete('/menu2/'+id)
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

///delete blog


return(
    
    <div className='w-full bg-white flex'> 
            <div className='w-1/6 h-auto bg-white flex'>
                    <div className="drawer lg:drawer-open z-10">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col items-center justify-center">
                            {/* Page content here */}
                            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                        
                        </div> 
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                            {/* Sidebar content here */}
                            <div className='flex justify-start mb-3'>
                                <h1 className='font-bold text-4xl'>Green<span className='text-green'>Garden</span></h1>
                                <span><div className="badge badge-primary">Admin</div></span>
                            </div>
                            
                            <button type="button" className="text-gray-900  bg-white border flex items-center justify-start gap-3 border-gray-300   focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> <FaRegUserCircle />USER EMAIL</button>
                            <button type="button"  onClick={()=> setAddSection(true)} className="text-gray-900 flex items-center  bg-white border border-gray-300 justify-start gap-3  focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><MdDashboard />Dashboard</button>
                            <button type="button"  onClick={()=> setAddSection1(true)} className="text-gray-900 flex items-center bg-white border border-gray-300 justify-start gap-3 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><FaUsers />All Users</button>
            
                            <button type="button" onClick={()=> setAddSection2(true)} className="text-gray-900 flex items-center bg-white border border-gray-300 justify-start gap-3 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><FaEdit />Manage Items Agriculture</button>

                            <button type="button" onClick={()=> setAddSection3(true)} className="text-gray-900 flex items-center bg-white border border-gray-300 justify-start gap-3 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><FaEdit />Manage Field Products</button>
                            
                            <button type="button" onClick={()=> setAddSection4(true)} className="text-gray-900 flex items-center bg-white border border-gray-300 justify-start gap-3 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><FaPlusCircle />Add Vegetables</button>
                            
                            <button type="button" onClick={()=> setAddSection7(true)} className="text-gray-900 flex items-center bg-white border border-gray-300 justify-start gap-3 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><FaPlusCircle />Add Items Agriculture</button>
                
                          
                            <button type="button" onClick={()=> setAddSection5(true)} className="text-gray-900 flex items-center bg-white border border-gray-300  justify-start gap-3 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><FaShoppingBag />Manage Blogs</button>

                            <button type="button" onClick={()=> setAddSection6(true)} className="text-gray-900 flex items-center bg-white border border-gray-300  justify-start gap-3 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><FaPlusCircle />Manage Like</button>
                        
                           
                            {
                                sharedLink
                            }


                             <button onClick={logOut} type="button" className="text-gray-900 mt-5 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Log Out</button>
                            <img src={image}/>
                            </ul>
                        </div>
                </div>   
            </div>

{/*Dashboard section*/}
            {
              addSection &&(
                      
                        <div className='flex absolute w-full bg-gray-100'>
                            <div className='w-1/6 bg-red z-0'>hello world 1</div>
                            <div className='w-5/6 bg-green z-10 h-screen'>
                                <div className='flex justify-around items-center w-full bg-gray-100 h-1/6'>
                                    <h1 className='text-lg font-bold'>Dashboard</h1>
                                    <Stats userData={userData}/>
                                    <button className="text-gray-900 bg-white border-4 border-gray-300 flex justify-around focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={()=> setAddSection(false)}>Гарах</button>
                                </div>
                                
                                <div className='h-5/6 bg-white flex'>
                                     <div className='w-1/2 h-full bg-orange-200'>
                                                <DonatsChart/>
                                            </div>
                                            <div className='w-1/2 h-full bg-orange-400'>
                                                <div className='h-1/2 bg-orange-500'>
                                                    <CircleChart/>
                                                </div>
                                                <div className='h-1/2 bg-orange-500'>
                                                    <PieChart/>
                                                </div>
                                            </div>
                                </div>    
                            </div>
                        </div>         
                        )
                }
{/*USERS section*/}
            {
                    
                    addSection1 &&(
                      
                        <div className='flex absolute w-full bg-gray-100'>
                            <div className='w-1/6 bg-red z-0'>hello world 1</div>
                            <div className='w-5/6 bg-green z-10 h-screen'>
                                <div className='flex justify-around items-center w-full bg-gray-100 h-1/6'>
                                    <h1 className='text-lg font-bold'>All users</h1>
                                    <Stats userData={userData}/>
                                    <button className="text-gray-900 bg-white border-4 border-gray-300 flex justify-around focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={()=> setAddSection1(false)}>Гарах</button>
                                </div>
                                <div className='h-5/6 bg-white'>
                                <div className="overflow-x-auto">
                            <table className="table table-zebra w-full]">

                                    {/* head */}
                                        <thead className='bg-green text-white rounded-lg'>
                                        <tr>
                                            <th>#</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>UserType</th>
                                            <th>Email</th>
                                            <th>CreatedAt</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                userData.map((user,index)=>{
                                                    return (
                                                        <tr key={user._id}>
                                                            <td>{index+1}</td>
                                                            <td>{user.fname}</td>
                                                            <td>{user.lname}</td>
                                                            <td>{user.Usertype}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.createdAt}</td>
                                                            <td>
                                                                <button  onClick={()=> deleteUser(user._id, user.fname)} className='btn btn-xs bg-orange-500 text-white'>
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
                                </div>    
                            </div>
                        </div>         
                        )
                }
{/*MANAGE ITEMS section*/}
                 {
                    
                    addSection2 &&(
                      
                        <div className='flex absolute w-full bg-gray-100'>
                            <div className='w-1/6 bg-red z-0'>hello world 1</div>
                            <div className='w-5/6 bg-green z-10 h-screen'>
                                <div className='flex flex-col'>
                                    <div className='flex justify-around items-center w-full bg-gray-100 h-1/6'>
                                        <h1 className='text-lg font-bold'>Manage Items Agriculture</h1>
                                        <Stats userData={userData}/>
                                        <button className="text-gray-900 bg-white border-4 border-gray-300 flex justify-around focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={()=> setAddSection2(false)}>Гарах</button>
                                    </div>
                                  
                                </div>
                                
                                <div className='h-5/6 bg-white'>
                                        <div className="overflow-x-auto">
                                            <table className="table table-zebra w-full]">
                                            {/* head */}
                                                <thead className='bg-green text-white rounded-lg'>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Product Name</th>
                                                    <th>Product Image</th>
                                                    <th>Category</th>
                                                    <th>Description</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Edit</th>
                                                    <th>Delete</th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        menu.map((product,index)=>{
                                                            return (
                                                                <tr key={product._id}>
                                                                    <td>{index+1}</td>
                                                                    <td>{product.name}</td>
                                                                    <td> <img className='w-10 h-10 rounded-full'src={product.image} alt="" /></td>
                                                                    <td>{product.category}</td>
                                                                    <td>{product.description}</td>
                                                                    <td>{product.price}</td>
                                                                    <td>{product.quantity}</td>
                                                                    <td>
                                                                        <Link to={`/updateitem/${product._id}`} className='btn btn-xs bg-orange-500 text-white'>
                                                                            <FaEdit/>
                                                                        </Link>
                                                                    </td>
                                                                    <td>
                                                                        <button onClick={()=>deleteGardenProduct(product._id, product.name)}className='btn btn-xs bg-orange-500 text-white'>
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
                                </div>    
                            </div>
                        </div>         
                        )
                }

{/*MANAGE FIELD PRODUCTS section*/}
{
                    
                    addSection3 &&(
                      
                        <div className='flex absolute w-full bg-gray-100'>
                            <div className='w-1/6 bg-red z-0'>hello world 1</div>
                            <div className='w-5/6 bg-white z-10 h-screen'>
                                <div className='flex flex-col'>
                                    <div className='flex justify-around items-center w-full bg-gray-100 h-1/6'>
                                        <h1 className='text-lg font-bold'>Manage Field Products</h1>
                                        <Stats userData={userData}/>
                                        <button className="text-gray-900 bg-white border-4 border-gray-300 flex justify-around focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={()=> setAddSection3(false)}>Гарах</button>
                                    </div>
                                  
                                </div>
                                
                                <div className='h-5/6 bg-white'>
                                        <div className="overflow-x-auto">
                                            <table className="table table-zebra w-full]">
                                            {/* head */}
                                                <thead className=' text-white rounded-lg'>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Product Name</th>
                                                    <th>Product Image</th>
                                                    <th>Category</th>
                                                    <th>Description</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Edit</th>
                                                    <th>Delete</th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        menu2.map((product,index)=>{
                                                            return (
                                                                <tr key={product._id}>
                                                                    <td>{index+1}</td>
                                                                    <td>{product.name}</td>
                                                                    <td><img src={product.image} className='w-10 h-10 rounded-full'/></td>
                                                                    <td>{product.category}</td>
                                                                    <td>{product.description}</td>
                                                                    <td>{product.price}</td>
                                                                    <td>{product.quantity}</td>
                                                                    <td>
                                                                        <Link to={`/updateproduct/${product._id}`} className='btn btn-xs bg-orange-500 text-white'>
                                                                            <FaEdit/>
                                                                        </Link>
                                                                    </td>
                                                                    <td>
                                                                        <button onClick={()=> deleteFieldProduct(product._id, product.name)} className='btn btn-xs bg-orange-500 text-white'>
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
                                </div>    
                            </div>
                        </div>         
                        )
                }

{/*ADD VEGETABLES section*/}
{
    addSection4 &&(
        <div className='flex absolute w-full bg-gray-100'>
                            <div className='w-1/6 bg-red z-0'>hello world 1</div>
                            <div className='w-5/6 bg-primary z-10 h-screen'>
                                <div className='flex flex-col'>
                                    <div className='flex justify-around items-center w-full bg-gray-100 h-1/6'>
                                        <h1 className='text-lg font-bold'>Add Menu</h1>
                                        <Stats userData={userData}/>
                                        <button className="text-gray-900 bg-white border-4 border-gray-300 flex justify-around focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={()=> setAddSection4(false)}>Гарах</button>
                                    </div>
                                  
                                </div>
                                
                                <div className='h-5/6 bg-white'>
                                    <AddMenu/>
                                </div>    
                            </div>
                        </div>         
    )
}

{/*ADD ITEMS AGRICULTURE section*/}
{
    addSection7 &&(
        <div className='flex absolute w-full bg-gray-100'>
                            <div className='w-1/6 bg-red z-0'>hello world 1</div>
                            <div className='w-5/6 bg-primary z-10 h-screen'>
                                <div className='flex flex-col'>
                                    <div className='flex justify-around items-center w-full bg-gray-100 h-1/6'>
                                        <h1 className='text-lg font-bold'>Add Menu</h1>
                                        <Stats userData={userData}/>
                                        <button className="text-gray-900 bg-white border-4 border-gray-300 flex justify-around focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={()=> setAddSection7(false)}>Гарах</button>
                                    </div>
                                  
                                </div>
                                
                                <div className='h-5/6 bg-white'>
                                    <AddItem/>
                                </div>    
                            </div>
                        </div>         
    )
}
{/*MANAGE BLOGS section*/}
{
    addSection5 &&(
        <div className='flex absolute w-full bg-gray-100'>
                            <div className='w-1/6 bg-red z-0'>Manage BLOGS</div>
                            <div className='w-5/6 bg-green z-10 h-screen'>
                                <div className='flex flex-col'>
                                    <div className='flex justify-around items-center w-full bg-gray-100 h-1/6'>
                                        <h1 className='text-lg font-bold'>Manage All Blogs</h1>
                                        <Stats userData={userData}/>
                                        <button className="text-gray-900 bg-white border-4 border-gray-300 flex justify-around focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={()=> setAddSection5(false)}>Гарах</button>
                                    </div>
                                  
                                </div>
                                
                                <div className='w-full bg-white'>
                                    <BlogContentsAdmin/>
                                </div>    
                            </div>
                        </div>         
    )
}
{/*MANAGE LIKE section*/}
{
    addSection6 &&(
        <div className='flex absolute w-full bg-gray-100'>
                            <div className='w-1/6 bg-red z-0'>hello world 1</div>
                            <div className='w-5/6 bg-green z-10 h-screen'>
                                <div className='flex flex-col'>
                                    <div className='flex justify-around items-center w-full bg-gray-100 h-1/6'>
                                        <h1 className='text-lg font-bold'>Manage ALL LIKES</h1>
                                        <Stats userData={userData}/>
                                        <button className="text-gray-900 bg-white border-4 border-gray-300 flex justify-around focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={()=> setAddSection6(false)}>Гарах</button>
                                    </div>
                                  
                                </div>
                                
                                <div className='h-5/6 bg-white'>
                                    <ManageLike/>
                                </div>    
                            </div>
                        </div>         
    )
}
 
            <div className='w-5/6 h-auto flex flex-col bg-green relative'>
                    <div className='w-full bg-white flex justify-center'>
                        <h1>{userData.email}</h1>
                    </div>
                    
                <div className='w-full h-screen flex flex-col'>
                    <h1 className='text-lg text-center bg-green font-bold'>SECURY DASHBOARD TO MANAGE USER ACCESS</h1>
                    <div className='flex w-full h-full flex-col bg-white'>
                        <div className='h-1/5 w-full flex justify-center items-center'>
                            <Stats userData={userData}/>
                        </div>
                        
                        <div className='h-4/5 w-full bg-white flex'>
                            <div className='w-1/2 h-full bg-green'>
                                <DonatsChart/>
                            </div>
                            <div className='w-1/2 h-full bg-green'>
                                <div className='h-1/2 bg-green'>
                                    <CircleChart/>
                                </div>
                                <div className='h-1/2 bg-green'>
                                    <PieChart/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>   
    )
}