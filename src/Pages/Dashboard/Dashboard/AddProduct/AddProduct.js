import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from './../../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const { user } = useContext(AuthContext)
    const date = new Date().toLocaleDateString()
    const { register, formState: { errors }, handleSubmit } = useForm();

    const imageHostKey = process.env.REACT_APP_imgbb_key

    const navigate = useNavigate()


    const handleAddProduct = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const product = {
                        id:data.category,
                        email: user.email,
                        itemName: data.productName,
                        picture: imgData.data.url,
                        location: data.location,
                        resalePrice: data.resalePrice,
                        originalPrice: data.originalPrice,
                        yearsOfUse: data.purchase,
                        time: date,
                        sellerName: data.seller,
                        phoneNumber: data.phone,
                        description: data.description
                    }

                    //save product information to the database
                    fetch('http://localhost:5000/products', {
                        method: "POST",
                        headers: {
                        'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                    .then(res => res.json())
                    .then(result => {
                        console.log(result);
                        toast.success('Added Product Successfully')
                        navigate('/dashboard/myProduct')
                    })
                }
            })
        }



    return (
        <div className='w-96 p-7'>
            <h2 className='text-4xl font-bold mb-6'>Add Product</h2>
            <form onSubmit={handleSubmit(handleAddProduct)}>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Product Name</span>
                    </label>
                    <input type="text" {...register("productName", { required: 'Name is required' })} className="input input-bordered w-full max-w-xs" />
                </div>

                {errors.name && <p className='text-rose-600 mt-2'>{errors.name?.message}</p>}

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Seller Name</span>
                    </label>
                    <input type="text" {...register("seller", { required: 'Name is required' })} className="input input-bordered w-full max-w-xs" />
                </div>

                {errors.name && <p className='text-rose-600 mt-2'>{errors.name?.message}</p>}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Resale Price</span>
                    </label>
                    <input type="text" {...register("resalePrice", { required: 'Name is required' })} className="input input-bordered w-full max-w-xs" />
                </div>

                {errors.name && <p className='text-rose-600 mt-2'>{errors.name?.message}</p>}

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Original Price</span>
                    </label>
                    <input type="text" {...register("originalPrice", { required: 'Name is required' })} className="input input-bordered w-full max-w-xs" />
                </div>

                {errors.name && <p className='text-rose-600 mt-2'>{errors.name?.message}</p>}

                {/* <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register("email", {
                        required: "Email Address is required",

                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.email && <p className='text-rose-600 mt-2'>{errors.email?.message}</p>}
                </div> */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Condition Type</span>
                    </label>

                    <select className=' p-3 bg-slate-300 rounded' {...register("condition")}>
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                    </select>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Category</span>
                    </label>

                    <select className=' p-3 bg-slate-300 rounded' {...register("category")}>
                        <option value="01">Gaming Laptop</option>
                        <option value="02">NetBook</option>
                        <option value="03">Laptop</option>
                    </select>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Phone Number</span>
                    </label>
                    <input type="number" {...register("phone", { required: 'Name is required' })} className="input input-bordered w-full max-w-xs" />
                </div>

                {errors.name && <p className='text-rose-600 mt-2'>{errors.name?.message}</p>}

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Location</span>
                    </label>
                    <input type="text" {...register("location", { required: 'Name is required' })} className="input input-bordered w-full max-w-xs" />
                </div>

                {errors.name && <p className='text-rose-600 mt-2'>{errors.name?.message}</p>}

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input type="text" {...register("description", { required: 'Name is required' })} className="input input-bordered w-full max-w-xs" />
                </div>

                {errors.name && <p className='text-rose-600 mt-2'>{errors.name?.message}</p>}

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Years of Purchase</span>
                    </label>
                    <input type="text" {...register("purchase", { required: 'Name is required' })} className="input input-bordered w-full max-w-xs" />
                </div>

                {errors.name && <p className='text-rose-600 mt-2'>{errors.name?.message}</p>}


                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="file" {...register("image", { required: 'Photo is required' })} className="input input-bordered w-full max-w-xs" />
                </div>

                {errors.img && <p className='text-rose-600 mt-2'>{errors.img?.message}</p>}
                <input className='btn btn-accent w-full mt-5' type="submit" value="Add Product" />
            </form>
        </div>
    );
};

export default AddProduct;