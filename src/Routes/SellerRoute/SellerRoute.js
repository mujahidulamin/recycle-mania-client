import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from './../../context/AuthProvider';
import useSeller from './../../hooks/useSeller';



const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isSeller, isSellerLoading] = useSeller(user?.email)
    const location = useLocation()
    if (loading || isSellerLoading) {
        return <p className='flex justify-center items-center my-80 text-4xl'>Loading...</p>
    }

    if (user && isSeller) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace />
}

export default SellerRoute