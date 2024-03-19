import React, { useEffect, useState } from 'react'
import { FaFilter, FaTrash } from 'react-icons/fa6'
import useBlog from '../../hooks/useBlog'
import { FaEdit } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

const BlogContents = () => {
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

    const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption,setSortOption]= useState("default")


  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPage] = useState(6)

  //loading data
  useEffect(()=>{
      //fetch data
      const fetchData = async()=> {
          try{
              const response = await fetch('http://localhost:3000/blog');
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

    //filter data based on category
    const filterItems = (category) => {
      const filtered = category === 'all' ? menu : menu.filter((item)=> item.category === category)

      setFilteredItems(filtered)
      setSelectedCategory(category)

      setCurrentPage(1)
  };

  //show all data
  const showAllItems = () => {
      setFilteredItems(menu)
      setSelectedCategory('all')

      setCurrentPage(1)
  };

  //sorting based on A-Z, Z-A, Low-high Price

  const handleSortChange = (option) =>{
      setSortOption(option)
      let sortedItems = [...filteredItems];

      //logic
      switch(option){
          case "A-Z":
              sortedItems = sortedItems.sort((a,b) => a.name.localeCompare(b.name))
              break;
          case "Z-A":
              sortedItems = sortedItems.sort((a,b) => b.name.localeCompare(a.name))
              break;
          case "Low-high":
              sortedItems = sortedItems.sort((a,b) => a.price - b.price)
              break;
          case "High-low":
              sortedItems = sortedItems.sort((a,b) => b.price - a.price)
              break;
          default:
              sortedItems = sortedItems.sort((a,b) => a.name.localeCompare(b.name))
              break;
      }
      setFilteredItems(sortedItems)

      setCurrentPage(1)
  }


  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
 
  const [recipes, setRecipes] = useState([])
  useEffect(()=>{
      fetch('http://localhost:3000/like')
      .then(res => res.json())
      .then(data => {const specials = data.filter((item)=> item.category === "Зөвлөгөө")
      console.log(specials)
      setRecipes(specials)
  })
  
  },[])
  
  const handleAddCart = (recipes) =>{
    console.log("btn clicked" ,recipes)
    if(userData && userData?.email){
        const cartItem = {menuItemId: item._id, email:userData.email, creator: userData._id , quantity, name, category, description, quantity, image, price, email:userData.email}
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
            Swal.fire({
                title: name,
                text: data.message,
                imageUrl: image,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image"
              });
        })
   } else{
    Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
   }   
}

  return (
    <div>

        <div className='flex justify-around mt-4'>
                    <button onClick={showAllItems} className={selectedCategory=== 'all' ? "active" : ""}>All</button>
                    <button onClick={()=> filterItems("Мэдээ мэдээлэл")} className={selectedCategory=== 'Мэдээ мэдээлэл' ? "active" : ""}>Мэдээ мэдээлэл</button>
                    <button onClick={()=> filterItems("Зөвлөгөө")} className={selectedCategory=== 'Зөвлөгөө' ? "active" : ""}>Зөвлөгөө</button>
                    <button onClick={()=> filterItems("Үрийн мэдээлэл")} className={selectedCategory=== 'Үрийн мэдээлэл' ? "active" : ""}>Үрийн мэдээлэл</button>
                    <button onClick={()=> filterItems("Зар мэдээ")} className={selectedCategory=== 'Зар мэдээ' ? "active" : ""}>Зар мэдээ</button>
                    <button onClick={()=> filterItems("Тусламж")} className={selectedCategory=== 'Тусламж' ? "active" : ""}>Тусламж</button>
                     <div className='flex justity-end mb-4 rounded-sm'>
                      <div className='p-2'>
                            <FaFilter className='h-4 w-4 text-green'/>
                        </div>     

                        <select name='sort' id='sort' onChange={(e) => handleSortChange(e.target.value)} value={sortOption} className='px-2 py-1 rounded-sm'>
                            <option value='default'>Default</option>
                            <option value='A-Z'>A-Z</option>
                            <option value='Z-A'>Z-A</option>
                            <option value='Low-high'>Low-high</option>
                            <option value='High-low'>High-low</option>
                        </select>
                </div>
        </div>
        <div className='grid grid-cols-3'>
        {
            currentItems.map((item,i)=> (
                <div key={i}>
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <img src={item.image} alt="Shoes" className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <div className='flex justify-around w-full'>
                                <h2 className="card-title">{item.name}</h2>
                                <h2>Category : {item.category}</h2>
                            </div>
                            
                            <div className='flex w-full'>
                                <p className='text-left'>Description: {item.description}</p>
                            </div>
                            
                            <div className='w-full flex justify-between items-center bg-gray-100'>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: {item.price}</p>
                            </div>
                            <div className="w-full card-actions flex justify-around">
                            <button className='btn btn-primary' onClick={() => handleAddCart(item)}>Like</button>
                            <Link to={`/blog/${item._id}`} className='btn btn-primary'>Дэлгэрэнгүй</Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))
           }
        </div>
        <div className='flex justify-center my-8'>
            {
                Array.from({length: Math.ceil(filteredItems.length / itemPerPage)}).map((_, index)=>(
                    <button key={index+1} onClick={()=> paginate(index + 1)} className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200" }`}> 
                        {index + 1}
                    </button>
                ))
            }
        </div>
    </div>
  )
}

export default BlogContents