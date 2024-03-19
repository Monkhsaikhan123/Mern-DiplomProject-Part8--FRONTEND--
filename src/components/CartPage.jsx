import React ,{useState, useEffect}from 'react'
import useCart from '../hooks/useCart';
import { FiDelete } from "react-icons/fi";
import Swal from 'sweetalert2'
import Footer from './Footer'
import { Link } from 'react-router-dom';


const CartPage = () => {
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
            console.log("userDATANII DATA", data)
            setUserData(data.data)
        })
    }, []);
    const [cart, refetch] = useCart()

    //delete
    const handleDelete = (item) => {
      Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`http://localhost:3000/carts/${item._id}`,{
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json'
              }
            }).then(res => res.json()).then(data => {
              if(data.deletedCount > 0){
                 
                  Swal.fire({
                      title: "Deleted!",
                      text: "Your file has been deleted.",
                      icon: "success"
                    });
                    /* console.log("HELLO", item) */
              }
              refetch()
            })
            
          }
        });


  }


    const [cartItems, setCartItems] = useState([])

    const calculatePrice = (item) => {
      return item.price * item.quantity
    }
    
    const handleDecrease = (item) => {
      fetch(`http://localhost:3000/carts/${item._id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({quantity: item.quantity - 1})
      })
     .then(res => res.json())
     .then(data => {
       console.log(data)
       const updatedCart = cartItems.map((cartItem) => {
         if(cartItem.id === item.id){
           return {...cartItem, quantity: cartItem.quantity - 1}
         }
          return cartItem
       })
       
       setCartItems(updatedCart)
     })
     refetch()
    }

        const handleIncrease = (item)=>{
          fetch(`http://localhost:3000/carts/${item._id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({quantity: item.quantity + 1})
          })
         .then(res => res.json())
         .then(data => {
           console.log(data)
           const updatedCart = cartItems.map((cartItem) => {
             if(cartItem.id === item.id){
               return {...cartItem, quantity: cartItem.quantity + 1}
             }
             return cartItem
           })
           
           setCartItems(updatedCart)
         })
         refetch()
        }

        const cartSubTotal = cart.reduce((total, item) =>{
          return total + calculatePrice(item)
      },0)
  
      const orderTotal = cartSubTotal
  return (
    <div className='flex flex-col justify-items-center'>
          <ul className="steps">
            <li data-content="?" className="step step-neutral">Step 1</li>
            <li data-content="!" className="step step-neutral">Step 2</li>
            <li data-content="✓" className="step step-neutral">Step 3</li>
            <li data-content="✕" className="step step-neutral">Step 4</li>
            <li data-content="★" className="step step-neutral">Step 5</li>
            <li data-content="" className="step step-neutral">Step 6</li>
            <li data-content="●" className="step step-neutral">Step 7</li>
          </ul>
        
          {
              (cart.length > 0) ? 
        <div>
            <div className='w-full justify-center flex items-center'>
            
            <div className="overflow-x-auto w-5/6">
                <table className="table bg-white">
                  
                  {/* head */}
                  <thead className='bg-green text-white rounded-sm'>
                    <tr>
                      <th>#</th>
                      <th>Food</th>
                      <th>Item name</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                      {/* row 1 */}
                    {
                      cart.map((item, index)=>(
                        <tr key={index}>
                      <td>{index+1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={item.image} alt="" />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <h1>{item.name}</h1>
                      </td>
                      <td>{item.description}</td>
                      <td>{item.category}</td>
                      <td>
                        <button className='btn btn-xs bg-green' onClick={()=> handleDecrease(item)}>-</button>
                        <input type='number' value={item.quantity} onChange={()=> console.log(item.quantity)} className='w-10 mx-3 text-center overflow-hidden appearance-none'/>
                        <button className='btn btn-xs bg-green' onClick={()=> handleIncrease(item)}>+</button>
                      </td>
                      <td>${calculatePrice(item).toFixed(2)}</td>
                      <th>
                        <button onClick={()=> handleDelete(item)} className='btn btn-ghost'><FiDelete className='text-red'/></button>
                      </th>
                    </tr>
                      ))
                    }
                  </tbody >
                  
                          
                </table>
            </div > 
        </div>
        

        <div className='flex justify-center items-center'>
          <div className='my-1 flex flex-col md:flex-row justify between items-stretch bg-white w-5/6'>
            <div className='md:w-1/2 space-y-3'>
                  <h3 className='font-medium'>Customer Details</h3>
                  <p>Name: {userData.lname} {userData.fname}</p>
                  <p>Email:  {userData.email}</p>
                  <p>User_id: {userData._id}</p>
            </div>
            <div className='md:w/12 space-y-3 bg-white'>
            <h3 className='font-medium'>Shopping Details</h3>
                  <p>Total Items : {cart.length}</p>
                  <p>Total Price: ${orderTotal.toFixed(2)}</p>
                  <Link to='/proceed-checkout' orderTotal={orderTotal}><button className='btn bg-green text-white'>Proceed Checkout</button></Link>
            </div>
          </div>
        </div>
        </div>
        :<div className='text-center mt-20 h-2/3 bg-white py-10'>
        <p className='text-4xl'>Cart is empty. Please add Products</p>
        <Link to='/'><button className='btn bg-green text-white mt-3'>Back to Menu</button></Link>
      </div>
      }
        
        
        <Footer/>    
    </div>
  )
}

export default CartPage