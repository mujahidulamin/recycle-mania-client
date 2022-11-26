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
                loader: ({ params }) => fetch(`http://localhost:5000/category/${params.id}`)
            },
        ]
    },

    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/buyers',
                element: <AllBuyers></AllBuyers>
            },
            {
                path: '/dashboard/sellers',
                element: <AllSellers></AllSellers>
            },
        ]
    }


])

export default router