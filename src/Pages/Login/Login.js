import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from './../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import useToken from './../../hooks/useToken';
import { GoogleAuthProvider } from 'firebase/auth';
import { ClipLoader } from 'react-spinners';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(true)
    const { signIn, signInWithGoogle } = useContext(AuthContext)
    const [loginError, setLoginError] = useState('')

    const [logUserEmail, setLoginUserEmail] = useState('')

    const [token] = useToken(logUserEmail)




    const location = useLocation();

    const navigate = useNavigate()

    const from = location.state?.from.pathname || '/'

    if (token) {
        navigate(from, { replace: true });
    }


    const handleLogin = data => {
        console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserEmail(data.email)
            })
            .catch(err => {
                console.log(err.message);
                setLoginError(err.message)
            })
    }

    const googleProvider = new GoogleAuthProvider()

    const handleGoogleSignIn = () => {
        signInWithGoogle(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                const buyer = "buyer"
                saveUSer(user.displayName, user.email, buyer)
            })
            .catch(err => console.error(err))
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
                setLoginUserEmail(email)

            })
    }


    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 800)
    }, [])




    return (
        <div data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500" className='h-[600px] flex justify-center items-center '>
            {
                loading ?
                    <ClipLoader
                        color={'#32A8B3'}
                        loading={loading}
                        size={50}

                    ></ClipLoader>
                    :
                    <div className='w-96 p-5 border'>
                        <h2 className='text-5xl font-semibold text-center'> Login</h2>
                        <form onSubmit={handleSubmit(handleLogin)}>
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
                            <input className='btn btn-primary w-full my-5' value='Login' type="submit" />

                            {
                                loginError && <p className='text-red-500'>{loginError}</p>
                            }

                        </form>
                        <p className='text-center'>New to Recycle Mania? <Link to='/signup'><span className='text-primary font-semibold'>Create New Account</span></Link></p>
                        <div className="divider">OR</div>
                        <button onClick={handleGoogleSignIn} className='btn w-full btn-outline btn-primary'>Continue With Google</button>
                    </div>
            }
        </div>
    );
};

export default Login;