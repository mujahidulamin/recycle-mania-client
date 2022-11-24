import { createBrowserRouter } from 'react-router-dom';
import Main from '../../Layout/Main';
import Categories from '../../Pages/Home/Categories/Categories';
import CategoryProducts from '../../Pages/Home/Categories/CategoryProducts';
import Home from '../../Pages/Home/Home/Home';
import Login from '../../Pages/Login/Login';



const router = createBrowserRouter([

    {
        path: '/',
        element: <Main></Main>,
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
                path: '/category/:id',
                element: <CategoryProducts></CategoryProducts>,
                loader: ({params}) => fetch (`http://localhost:5000/category/${params.id}`)
            },
        ]
    },
])

export default router