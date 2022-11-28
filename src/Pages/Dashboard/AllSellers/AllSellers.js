import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

const AllSellers = () => {

    const [deletingSeller, setDeletingSeller] = useState(null)
    const [loading, setLoading] = useState(true)
    const closeModal = () => {
        setDeletingSeller(null);
    }


    const seller = "seller"

    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch(`https://recycle-mania-server.vercel.app/buyers?role=${seller}`)
            const data = await res.json()
            return data;
        }
    })

    const handleDelete = seller => {
        fetch(`https://recycle-mania-server.vercel.app/sellers/${seller._id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    toast.success('Seller Deleted Successfully')
                }

            })
    }



    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 800)
    }, [])



    return (
        <div>
            <h2 className='text-4xl font-bold mb-6'>All Sellers</h2>

            {
                loading ? 
                <ClipLoader

                        color={'#32A8B3'}
                        loading={loading}
                        size={50}
                    >
                    </ClipLoader>
                
                    :


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
                                <td>
                                    <label
                                        onClick={() => setDeletingSeller(seller)}
                                        htmlFor="confirmation-modal" className="btn btn-error">Delete</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            }


            
            {
                deletingSeller && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete user. It cannot be undone`}
                    successAction={handleDelete}
                    modalData={deletingSeller}
                    closeModal={closeModal}
                    deleteButtonName="DELETE"
                >
                </ConfirmationModal>
            }
        </div>
    );
};

export default AllSellers;