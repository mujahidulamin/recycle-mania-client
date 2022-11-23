
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../assets/logo.jpg'



const Header = () => {

 

    

    const menuItems = <>
        <li className='font-semibold'>
            <NavLink to={'/home'} className={({ isActive }) =>
                isActive ? 'active' : undefined
            }>
                Home
            </NavLink>
        </li>
        <li className='font-semibold'>
            <NavLink to={'/services'} >
                Services
            </NavLink>
        </li>
        {/* <li>
            {
                user?.uid ?
                    <>
                        <NavLink to={'/myReviews'} className='font-semibold'>My Reviews</NavLink>
                        <NavLink to={'/addService'} className='font-semibold'>Add Service</NavLink>
                        <button onClick={handleLogOut}
                            className='border-0 font-semibold'
                        >
                            Logout
                        </button>
                    </>
                    :
                    <>
                        <NavLink to={'/login'} className='font-semibold'>LogIn</NavLink>
                    </>
            }
        </li> */}
        <li className='font-semibold'><NavLink to={'/blog'}>Blog</NavLink></li>
        {/* <li>
            <div className="tooltip tooltip-bottom z-10" data-tip={user?.displayName}>
                {
                    user?.photoURL ?
                        <img className='rounded-full' style={{ height: '40px' }} src={user?.photoURL} alt="" /> :
                        <div className="tooltip tooltip-bottom" data-tip="Profile">
                            <FaUserAlt></FaUserAlt>
                        </div>
                }
            </div>
        </li> */}
    </>


    return (
        <div className='bg-white  text-black'>
            <div className="navbar container mx-auto">
                <div className="flex-1 ">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52 mr-auto">
                            {
                                menuItems
                            }
                        </ul>
                    </div>
                    <img className='w-8' src={logo} alt="" />
                    <Link to={'/home'} className="btn btn-ghost normal-case text-xl">Recycle Mania</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {
                            menuItems
                        }
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default Header;