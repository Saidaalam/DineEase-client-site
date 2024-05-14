import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import AllFood from "../pages/AllFood";
import AddFoodItem from "../pages/AddFoodItem";
import ErrorPage from "../pages/ErrorPage";
import MyAddedFood from "../pages/MyAddedFood";
import SingleFood from "../pages/SingleFood";
import Gallery from "../pages/Gallery";
import UpdatedFood from "../pages/UpdatedFood";
import PrivateRoutes from "./PrivateRoute";
import FoodPurchasePage from "../pages/FoodPurchasePage";
import MyOrder from "../pages/MyOrder";

const router = createBrowserRouter([
    {
        path : '/',
        element : <Main/>,
        errorElement: <ErrorPage/>,
        children : [
        {
            index : true,
            element : <Home/>
        },
        {
            path : '/allFood',
            element : <AllFood/>,
            loader : () => fetch('https://dineease-bdserver.vercel.app/foods')
        },
        {
            path : '/foods',
            element : <AddFoodItem/>
        },
        {
            path : '/gallery',
            element : <Gallery/>
        },
        {
            path: '/purchase/:id', 
            element: <FoodPurchasePage />,
            loader: ({ params }) => fetch(`https://dineease-bdserver.vercel.app/purchase/${params.id}`),
        },
          
        {
            path : '/updatedFood/:id',
            element : <UpdatedFood/>,
            loader : ({params}) => fetch(`https://dineease-bdserver.vercel.app/updatedFood/${params.id}`)

        },
        {
            path : '/singleFood/:id',
            element : <PrivateRoutes><SingleFood/></PrivateRoutes>

        },
        {
            path : '/addedFoods',
            element : <MyAddedFood/>
        },
        {
            path : '/myOrder',
            element : <MyOrder/>,
            loader : () => fetch('https://dineease-bdserver.vercel.app/purchase')
        },
        {
            path : '/login',
            element : <Login/>
        },
        {
            path : '/register',
            element : <Register/>
        },

        ],
    }
])

export default router;