import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from './../../context/AuthProvider';
import useAdmin from './../../hooks/useAdmin';



const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)
    const location = useLocation()
    if (loading || isAdminLoading) {
        return <p className='flex justify-center items-center my-80 text-4xl'>Loading...</p>
    }

    if (user && isAdmin) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace />
}

export default AdminRoute
