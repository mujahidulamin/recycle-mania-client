import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookingModal from './BookingModal/BookingModal';

const Categories = () => {
    const [datas, setDatas] = useState([])

//load categories data
    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => setDatas(data))
    }, [])


    return (

            <div className='container mx-auto '>
                <h2 className='text-4xl font-bold my-12'>Our Categories</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-8 lg:mx-0'>
                    {
                        datas.map(data => <div
                            key={data.id}
                            data={data}
                        >

                            <div className="card w-full bg-base-100 shadow-xl">
                                <figure><img className='w-96 h-96' src={data.img} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <p className='font-bold text-center'>{data.categoryName}</p>
                                    <div className="card-actions justify-center">
                                        <Link to={`/category/${data.id}`}>
                                            <button className="btn btn-primary">See Products</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                </div>

               
            </div>

    );
};

export default Categories;