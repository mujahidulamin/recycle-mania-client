import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

const ReportedItems = () => {
    const [deletingReport, setDeletingReport] = useState(null)
    const [loading, setLoading] = useState(true)

    const closeModal = () => {
        setDeletingReport(null);
    }



    const { data: reports, isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {

                const res = await fetch('https://recycle-mania-server.vercel.app/reports', {
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


    const handleDelete = product => {
        fetch(`https://recycle-mania-server.vercel.app/reports/${product._id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    refetch()
                    toast.success('Reported Item Deleted Successfully')
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
            <h2 className='text-4xl font-bold mb-6'>Reported Items {reports?.length}</h2>

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
                                    <th>Item Picture</th>
                                    <th>Item Name</th>
                                    <th>Seller Name</th>
                                    <th>Reported By</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reports?.map((report, i) => <tr
                                        key={report?._id}
                                    >
                                        <th>{i + 1}</th>
                                        <td><div className="avatar">
                                            <div className="w-16 rounded-full">
                                                <img alt='' src={report?.img} />
                                            </div>
                                        </div></td>
                                        <td>{report?.itemName}</td>
                                        <td>{report?.sellerName}</td>
                                        <td>{report?.reportedBy}</td>
                                        <td>
                                            <label
                                                onClick={() => setDeletingReport(report)}
                                                htmlFor="confirmation-modal" className="btn btn-error">DELETE</label>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>


            }




            {
                deletingReport && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete user. It cannot be undone`}
                    successAction={handleDelete}
                    modalData={deletingReport}
                    closeModal={closeModal}
                    deleteButtonName="DELETE"

                ></ConfirmationModal>
            }

        </div>
    );
};

export default ReportedItems;