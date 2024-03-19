import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import { FaPaypal } from 'react-icons/fa';
import useAxiosPublic from '../hooks/useAxiosPublic';

const CheckOutForm = ({price, cart}) => {

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
    const stripe = useStripe();
    const elements = useElements();

    const [cardError, setCardError] = useState('')

    const [clientSecret, setClientSecret] = useState('')
    const axiosPublic = useAxiosPublic()

    useEffect(()=>{
        if(typeof price !== "number" || price < 1){
            console.log("Price is not a number less than 1")
            return
        }
        axiosPublic.post('/create-payment-intent', {price})
        .then(res => {
            console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        })
    },[price, axiosPublic])

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          return;
        }
    
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);
    
        if (card == null) {
          return;
        }
    
        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card,
        });
    
        if (error) {
          console.log('[error]', error);
          setCardError(error.message);
        } else {
            setCardError('Success')
          console.log('[PaymentMethod]', paymentMethod);
            
        }
        const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
            clientSecret, 
            {
                payment_method: {
                    card: card,
                    billing_details : {
                        name: userData?.fname || 'anonymouse',
                        email: userData?.email || "unknown"
                    }
                }
            }
        )
        if(confirmError) {
            console.log('[Confirm]', confirmError);
        }
        console.log(paymentIntent)
        if(paymentIntent.status === 'succeeded'){
            console.log("Payment Success")
            console.log(paymentIntent.id)
            setCardError(`Your transition id ${paymentIntent.id}`)
            /// order section
            const paymentInfo = {
                email: userData.email,
                transitionId: paymentIntent.id,
                price,
                quantity: cart.length,
                status:"Order Pending",
                cartItems : cart.map(item => item._id),
                menuItems: cart.map(item => item.menuItemId)
            }
            console.log(paymentInfo)

            axiosPublic.post('/payment', paymentInfo)
            .then(res => {
                console.log(res.data)
                alert('Successfully Done! Check your order')
            })
        }
      };
  return (
    <div className='flex flex-col sm:flex-row justify-around items-start gap-8 bg-white rounded'>
        <div className='md:w-1/2 w-full space-y-3 card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8'>
            <h4 className='text-lg font-semibold'>Order Summary</h4>
            <p>Total Price: ${price}</p>
            <p>Number of Items: {cart.length}</p>
        </div>

        <div className='md:w-1/3 w-full space-y-5 card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8'>
            <h4 className='text-lg font-semibold'>Process your payment</h4>
            <h5 className='font-medium'>Credit/Debit Cart</h5> 
            
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                    style: {
                        base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                        },
                        invalid: {
                        color: '#9e2146',
                        },
                    },
                    }}
                />
                <button type="submit" disabled={!stripe} className='btn btn-primary mt-5 w-full'>
                    Pay
                </button>
            </form>
            {
                cardError && (
                    <p className='text-red text-xl italic'>{cardError}</p>
                )
            }

            <div className='mt-5 text-center'>
                <hr/>
                <button type="submit" className='btn btn-primary mt-5 w-full'>
                    <FaPaypal/> Pay with Paypal
                </button>  
            </div>
        </div>
    </div>
  )
}

export default CheckOutForm