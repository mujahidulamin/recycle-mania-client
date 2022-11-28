import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import { toast } from 'react-hot-toast';

const MyProducts = () => {
    const [deletingProduct, setDeletingProduct] = useState(null)


    const closeModal = () => {
        setDeletingProduct(null);
    }


    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {

                const res = await fetch('https://recycle-mania-server.vercel.app/products', {
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
        fetch(`https://recycle-mania-server.vercel.app/products/${product._id}`, {
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
                    toast.success('Product Deleted Successfully')
                }


            })
    }


    const date = new Date().toLocaleDateString()

    const handleAdvertise = (product) => {
        const advertise = {
            itemName: product.itemName,
            resalePrice: product.resalePrice,
            originalPrice: product.originalPrice,
            location: product.location,
            sellerName: product.sellerName,
            img: product.picture,
            yearsOfUse: product.yearsOfUse,
            time: date,
        }

        fetch('https://recycle-mania-server.vercel.app/advertise', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(advertise)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Advertised Successfully')
            })



    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h2 className='text-4xl font-bold mb-6'>My Products {products?.length}</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Image</th>
                            <th>Item Name</th>
                            <th>Resale Price</th>
                            <th>Original Price</th>
                            <th>Advertise</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map((product, i) => <tr
                                key={product._id}

                            >
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="w-16 rounded-full">
                                        <img alt='' src={product?.picture} />
                                    </div>
                                </div></td>
                                <td>{product.itemName}</td>
                                <td>{product.resalePrice}</td>
                                <td>{product.originalPrice}</td>
                                <td>
                                    <button
                                        onClick={() => handleAdvertise(product)}
                                        className='btn btn-primary'>Available</button></td>
                                <td>
                                    <label
                                        onClick={() => setDeletingProduct(product)}
                                        htmlFor="confirmation-modal" className="btn btn-error">Delete</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {
                deletingProduct && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete user. It cannot be undone`}
                    successAction={handleDelete}
                    modalData={deletingProduct}
                    closeModal={closeModal}
                    deleteButtonName="DELETE"

                ></ConfirmationModal>
            }

        </div>
    );
};

export default MyProducts;