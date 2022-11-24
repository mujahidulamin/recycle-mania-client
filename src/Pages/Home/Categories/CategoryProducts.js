
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom'
import BookingModal from './BookingModal/BookingModal';



const CategoryProducts = () => {
  
    const [product, setProduct] = useState(null)


    const products = useLoaderData()
    console.log(products);

    return (
        <div>
            <h2>Category Products</h2>
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
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
            <BookingModal
                product = {product}
            ></BookingModal>
        </div>
    );
};

export default CategoryProducts;