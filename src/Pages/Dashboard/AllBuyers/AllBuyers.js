import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const AllBuyers = () => {

    const [deletingBuyer, setDeletingBuyer] = useState(null)


    const closeModal = () => {
        setDeletingBuyer(null);
    }




    const buyer = "buyer"

    const { data: buyers = [], refetch } = useQuery({
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
                if (data.modifiedCount > 0) {
                    toast.success('Make Admin Successfully')
                }
            })
    }


    const handleDelete = doctor => {
        fetch(`http://localhost:5000/buyers/${doctor._id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    toast.success('Buyer Deleted Successfully')
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
                                <td>

                                    <label
                                        onClick={() => setDeletingBuyer(buyer)}
                                        htmlFor="confirmation-modal" className="btn btn-error">Delete</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {
                deletingBuyer && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete user. It cannot be undone`}
                    successAction={handleDelete}
                    modalData={deletingBuyer}
                    closeModal={closeModal}
                    deleteButtonName="DELETE"
                >



                </ConfirmationModal>
            }

        </div>
    );
};

export default AllBuyers;