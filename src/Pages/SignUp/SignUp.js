import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './../../context/AuthProvider';
import toast from 'react-hot-toast'
import useToken from './../../hooks/useToken';
import { ClipLoader } from 'react-spinners';


const SignUp = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(true)
    const { createUser, updateUserProfile } = useContext(AuthContext)

    const [signUpError, setSignUpError] = useState('')
    const [createdUserEmail, setCreatedUserEmail] = useState('')

    const [token] = useToken(createdUserEmail)
    const navigate = useNavigate();

    if (token) {
        navigate('/')
    }


    const handleSignUp = data => {
        console.log(data);
        setSignUpError('')
        //user created
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('User Created Successfully')
                //userUpdateProfile
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        saveUSer(data.name, data.email, data.role);
                    })
                    .catch(err => console.error(err))
            })
            .catch(err => {
                console.error(err)
                setSignUpError(err.message)
            })
    }

    const saveUSer = (name, email, role) => {
        const user = { name, email, role }
        fetch('https://recycle-mania-server.vercel.app/users', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email)

            })
    }

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 800)
    }, [])






    return (
        <div className='h-[700px] flex justify-center items-center '>
            {
                loading ?
                    <ClipLoader
                        color={'#32A8B3'}
                        loading={loading}
                        size={50}

                    ></ClipLoader>
                    :
                    <div className='w-96 p-5 border'>
                        <h2 className='text-5xl font-semibold text-center'>Sign Up</h2>
                        <form onSubmit={handleSubmit(handleSignUp)}>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text"
                                    {...register("name", { required: "Name is required" })}
                                    className="input input-bordered w-full " />
                                {errors.name && <p className='text-red-500' role="alert">{errors.name?.message}</p>}

                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"
                                    {...register("email", { required: "Email is required" })}
                                    className="input input-bordered w-full " />
                                {errors.email && <p className='text-red-500' role="alert">{errors.email?.message}</p>}

                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"
                                    {...register("password",
                                        {
                                            required: 'Password is required',
                                            minLength: { value: 6, message: 'password must be atleast 6 digit' }
                                        })}
                                    className="input input-bordered w-full " />
                                {errors.password && <p className='text-red-500' role="alert">{errors.password?.message}</p>}
                            </div>

                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text"
                                    {...register("photoURL")}
                                    className="input input-bordered w-full " />
                            </div>


                            <div className='mt-5 grid gap-2'>
                                <p>Select User Type</p>
                                <select className=' p-3 bg-slate-300 rounded' {...register("role")}>
                                    <option value="buyer">Buyer</option>
                                    <option value="seller">Seller</option>
                                </select>
                            </div>
                            <input className='btn btn-primary w-full my-5' value='Sign Up' type="submit" />
                            {
                                signUpError && <p className='text-red-500'>{signUpError}</p>
                            }
                        </form>
                        <p className='text-center'>Already have an account? <Link to='/login'><span className='text-primary font-semibold'>Login</span></Link></p>
                    </div>
            }
        </div>
    );
};

export default SignUp;