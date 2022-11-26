import React from 'react';
import { useQuery } from '@tanstack/react-query';

const AllSellers = () => {


    const seller = "seller"

    const { data: sellers = [] } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/buyers?role=${seller}`)
            const data = await res.json()
            return data;
        }
    })




    return (
        <div>
            <h2 className='text-4xl font-bold mb-6'>All Sellers</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers &&
                            sellers?.map((seller, i) => <tr
                                key={seller._id}
                            >
                                <th>{i + 1}</th>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>{seller.role}</td>
                                <td><button className='btn btn-primary'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default AllSellers;