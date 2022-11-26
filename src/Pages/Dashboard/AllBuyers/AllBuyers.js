import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const AllBuyers = () => {

    const buyer = "buyer"

    const { data: buyers = [] } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/buyers?role=${buyer}`)
            const data = await res.json()
            return data;
        }
    })

    const handleMakeAdmin = id => {
        fetch(`http://localhost:5000/buyers/admin/${id}`, {
            method: "PUT",
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data.modifiedCount > 0){
                    toast.success('Make Admin Successfully')
                }
            })
    }



    return (
        <div>
            <h2 className='text-4xl font-bold mb-6'>All Buyers</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>ACtion</th>
                            <th>ACtion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyers &&
                            buyers?.map((buyer, i) => <tr
                                key={buyer._id}
                            >
                                <th>{i + 1}</th>
                                <td>{buyer.name}</td>
                                <td>{buyer.email}</td>
                                <td>{
                                    <button onClick={() => handleMakeAdmin(buyer._id)} className='btn  btn-primary'>Make Admin</button>}</td>
                                <td><button className='btn btn-error'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyers;