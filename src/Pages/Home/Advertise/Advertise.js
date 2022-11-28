import React from 'react';
import { useQuery } from '@tanstack/react-query';

const Advertise = () => {

    const { data: advertises, isLoading, refetch } = useQuery({
        queryKey: ['advertises'],
        queryFn: async () => {
            try {

                const res = await fetch('http://localhost:5000/advertise', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (err) {

            }
        }
    })






    return (
        <div className='container mx-auto'>
            <h2 className='text-4xl font-bold my-12'>Advertise</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-8 lg:mx-0'>

                    {
                        advertises?.map(advertise => 

                        <div className="card w-full bg-base-100 shadow-xl">
                        <figure><img className='w-96 h-96' src= {advertise.img} alt="advertise product" /></figure>
                        <div className="card-body justify-center">
                            <h2 className="font-bold text-xl">Band Name:{advertise.itemName} </h2>
                            <p> <span className='font-bold'>Location: {advertise.location}</span> </p>
                            <p> <span className='font-bold'>Resale Price:</span> {advertise.resalePrice}  Taka</p>
                            <p> <span className='font-bold'>Original Price:</span> {advertise.originalPrice}  Taka</p>
                            <p><span className='font-bold'>Years Of Use:</span> {advertise.yearsOfUse} Year</p>
                            <p> <span className='font-bold'>Posted: {advertise.time}</span> </p>
                            <p><span className='font-bold'>Seller: {advertise.sellerName}</span></p>
                        </div>
                    </div>)
                    }
                
                
                    </div>
                
            </div>




    );
};

export default Advertise;