import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './../../../context/AuthProvider';
import axios from "axios"
import { Link } from 'react-router-dom';



const MyOrders = () => {

    const [orders, setOrders] = useState('')

    const { user } = useContext(AuthContext);




    //use axios to get my orders data and show to dashboard
    useEffect(() => {
        axios.get(`https://recycle-mania-server.vercel.app/bookings?email=${user?.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                console.log(res.data);
                setOrders(res.data)
            })
            .catch(err => console.error(err))
    }, [user?.email])







    return (
        <div>
            <h2 className='text-4xl font-bold mb-6'>My Orders</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Product Information</th>
                            <th>Buyer Name</th>
                            <th>Buyer Email</th>
                            <th>Purchase</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders &&
                            orders?.map(order =>
                                <tr
                                    key={order._id}
                                >
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img alt='' src={order?.img} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{order?.itemName}</div>
                                                <div className="text-sm opacity-50">{order?.price} Taka</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {order?.buyerName}
                                        <br />
                                    </td>
                                    <td>{order?.buyerEmail}</td>
                                    <td>

                                        {
                                            order.price && !order.paid && <Link to={`/dashboard/payment/${order._id}`}>
                                                <button className="btn btn-primary">Pay</button>
                                            </Link>
                                        }

                                        {
                                            order.price && order.paid && <button className='btn btn-accent'>Paid</button>
                                        }

                                    </td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;