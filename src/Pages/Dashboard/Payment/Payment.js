import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const Payment = () => {

    const booking = useLoaderData()
    console.log(booking);

    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);


    return (
        <div>
            <h2 className='text-4xl font-bold mb-6'>Payment for {booking.itemName}</h2>
            <p className='text-xl'>Please Pay {booking.price} for your product</p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm 
                        booking = {booking}
                    
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;