import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from './../Pages/Shared/Navbar/Navbar';
import { AuthContext } from './../context/AuthProvider';
import useAdmin from './../hooks/useAdmin';
import useSeller from './../hooks/useSeller';
import useBuyer from './../hooks/UseBuyer';

const DashboardLayout = () => {


    const { user } = useContext(AuthContext)
    const [isAdmin] = useAdmin(user?.email)

    const [isSeller] = useSeller(user?.email)
    const [isBuyer] = useBuyer(user?.email)



    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile bg-base-100">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side ">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content bg-base-100">
                        {
                            isBuyer &&
                            < li > <Link to={'/dashboard'}>My Orders</Link></li>
                        }

                    {
                        isSeller && <>
                            <li><Link to={'/dashboard/addProduct'}>Add Product</Link></li>
                            <li><Link to={'/dashboard/myProduct'}>My Products</Link></li>
                        </>
                    }

                    {
                        isAdmin && <>
                            <li><Link to={'/dashboard/buyers'}>All Buyers</Link></li>
                            <li><Link to={'/dashboard/sellers'}>All Sellers</Link></li>
                            <li><Link to={'/dashboard/reported'}>Reported Items</Link></li>
                        </>
                    }




                </ul>

            </div>
        </div>
        </div >
    );
};

export default DashboardLayout;