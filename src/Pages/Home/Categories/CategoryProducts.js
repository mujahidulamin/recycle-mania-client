
import { useState, useContext, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom'
import BookingModal from './BookingModal/BookingModal';
import { toast } from 'react-hot-toast';
import { AuthContext } from './../../../context/AuthProvider';
import { ClipLoader } from 'react-spinners';



const CategoryProducts = () => {

    const { user } = useContext(AuthContext)
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    const products = useLoaderData()
    console.log(products);

    const handleReport = product => {
        const reports = {
            itemName: product.itemName,
            resalePrice: product.resalePrice,
            originalPrice: product.originalPrice,
            location: product.location,
            sellerName: product.sellerName,
            img: product.picture,
            reportedBy: user?.email
        }


        fetch('http://localhost:5000/reports', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reports)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Reported Successfully')
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
            <h2 className='text-4xl font-bold my-6'>Category Products</h2>


            {
                loading ?
                    <ClipLoader
                    color={'#32A8B3'}
                        loading={loading}
                        size={50}
                    >
                        
                    </ClipLoader>

                    :
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-8 lg:mx-0'>

                        {
                            products.map(product => <div
                                key={product._id}
                            >
                                <div className="card w-full bg-base-100 shadow-xl">
                                    <figure><img className='w-96 h-96' src={product.picture} alt="Shoes" /></figure>
                                    <div className="card-body justify-center">
                                        <h2 className="font-bold text-xl">Band Name: {product.itemName}</h2>
                                        <p> <span className='font-bold'>Location:</span> {product.location}</p>
                                        <p> <span className='font-bold'>Resale Price:</span> {product.resalePrice} Taka</p>
                                        <p> <span className='font-bold'>Original Price:</span> {product.originalPrice} Taka</p>
                                        <p><span className='font-bold'>Years Of Use:</span> {product.yearsOfUse} Year</p>
                                        <p> <span className='font-bold'>Posted:</span> {product.time}</p>
                                        <p><span className='font-bold'>Seller: </span>{product.sellerName}</p>
                                        <div className="card-actions justify-center">
                                            <label
                                                onClick={() => setProduct(product)}
                                                htmlFor="my-modal" className="btn btn-primary">Book Now</label>
                                            <button
                                                onClick={() => handleReport(product)}
                                                className='btn btn-error'>Report To Admin</button>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
            }


            {
                product && <BookingModal
                    product={product}
                    setProduct={setProduct}
                ></BookingModal>
            }
        </div>
    );
};

export default CategoryProducts;