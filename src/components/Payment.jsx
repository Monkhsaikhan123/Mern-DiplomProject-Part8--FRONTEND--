import React from 'react'
import Navbar1 from './Navbar1'
import Footer from './Footer'
import CheckOutForm from './CheckOutForm'
import { Elements } from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js';
import useCart from '../hooks/useCart'

const stripePromise = loadStripe('pk_test_51OvXuPRuPT5jtrc87UnoFMLcdRLGxXdPRkuCMJYCh8Q2RCm4WIaC2yCNK1g0dJQRX0GsJzdlDHoJPXijxeFOz59B00EPoLRqMR');



const Payment = () => {
    console.log(stripePromise)
    const [cart] = useCart()
    console.log("Cart",cart)
    //calculate price 
    const cartTotal = cart.reduce((total, item) => total + item.price,0)

    console.log("Cart Total",cartTotal)
    const TotalPrice = parseFloat(cartTotal.toFixed(2));
    console.log(TotalPrice)
  return (
    
    <div>
        <Navbar1/>
        <div className='max-w-screen-2x1 container flexmx-auto xl:px-24 px-4 py-28 '>
            <Elements stripe={stripePromise}>
                <CheckOutForm cart={cart} price={TotalPrice}/>
            </Elements>
        </div>
        <Footer/>
    </div>
  )
}

export default Payment