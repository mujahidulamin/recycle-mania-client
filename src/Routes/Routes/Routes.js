import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../../Layout/DashboardLayout';
import Main from '../../Layout/Main';
import Blog from '../../Pages/Blog/Blog';
import AllBuyers from '../../Pages/Dashboard/AllBuyers/AllBuyers';
import MyOrders from '../../Pages/Dashboard/MyOrders/MyOrders';
import CategoryProducts from '../../Pages/Home/Categories/CategoryProducts';
import Home from '../../Pages/Home/Home/Home';
import ErrorPage from '../../Pages/Shared/ErrorPage/ErrorPage';
import SignUp from '../../Pages/SignUp/SignUp';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Login from './../../Pages/Login/Login';
import AllSellers from './../../Pages/Dashboard/AllSellers/AllSellers';
import AdminRoute from '../AdminRoute/AdminRoute';
import AddProduct from './../../Pages/Dashboard/Dashboard/AddProduct/AddProduct';
import MyProducts from '../../Pages/Dashboard/MyProducts/MyProducts';
import ReportedItems from './../../Pages/Dashboard/ReportedItems/ReportedItems';
import Payment from '../../Pages/Dashboard/Payment/Payment';
import SellerRoute from '../SellerRoute/SellerRoute';




const router = createBrowserRouter([

    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/category/:id',
                element: <CategoryProducts></CategoryProducts>,
                loader: ({ params }) => fetch(`https://recycle-mania-server.vercel.app/category/${params.id}`)
            },
        ]
    },

    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard/myOrders',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/buyers',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/dashboard/sellers',
                element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
            },
            {
                path: '/dashboard/reported',
                element: <AdminRoute><ReportedItems></ReportedItems></AdminRoute>
            },
            {
                path: '/dashboard/addProduct',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: '/dashboard/myProduct',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`https://recycle-mania-server.vercel.app/bookings/${params.id}`)
            },
        ]
    }


])

export default router