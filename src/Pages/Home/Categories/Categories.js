import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import { ClipLoader } from 'react-spinners';
const Categories = () => {
    // const [datas, setDatas] = useState([])
    const [loading, setLoading] = useState(true)
    //load categories data with useQuery
    const { data: datas = [] } = useQuery({
        queryKey: ['datas'],
        queryFn: () => fetch('https://recycle-mania-server.vercel.app/categories')
            .then(res => res.json())
    })



    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 800)
    }, [])


    return (

        <div className='container mx-auto '>
            <h2 data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500" className='text-4xl font-bold my-12'>Our Categories</h2>
            {
                loading ?
                    <ClipLoader
                        color={'#32A8B3'}
                        loading={loading}
                        size={50}
                    ></ClipLoader>
                    :
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-8 lg:mx-0'>
                        {
                            datas.map(data => <div
                                key={data.id}
                                data={data}
                            >

                                <div data-aos="fade-up"
                                    data-aos-duration="3000" className="card w-full bg-base-100 shadow-xl drop-shadow-2xl">
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

            }
        </div>

    );
};

export default Categories;