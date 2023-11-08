import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './Pages/Home/Home/Home.jsx';
import Root from './Pages/Root.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import AllFood from './Pages/AllFood/AllFood.jsx';
import SignUp from './Pages/SignUp/SignUp.jsx';
import AuthProvider from './Providers/AuthProvider.jsx';
import SignIn from './Pages/SignIn/SignIn.jsx';
import Blog from './Pages/Blog/Blog.jsx';
import FoodDetails from './Pages/FoodDetails/FoodDetails.jsx';
import Purchase from './Pages/Purchase/Purchase.jsx';
import AddedFood from './Pages/AddedFood/AddedFood.jsx';
import UpdateFood from './Pages/UpdateFood/UpdateFood.jsx';
import AddFood from './Pages/AddFood/AddFood.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsx';
import OrderedFood from './Pages/OrderedFood/OrderedFood.jsx';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allFood",
        element: <AllFood />,
        loader: () => fetch('https://food-palace-server-obvwxtfg9-md-taiatul-islam-apons-projects.vercel.app/allFood')
      },
      {
        path: "/allFood/:id",
        element: <FoodDetails></FoodDetails>,
        loader: ({ params }) => fetch(`https://food-palace-server-obvwxtfg9-md-taiatul-islam-apons-projects.vercel.app/foodDetails/${params.id}`)
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/addedFood/:email",
        element: <AddedFood />,
        loader: ({ params }) => fetch(`https://food-palace-server-obvwxtfg9-md-taiatul-islam-apons-projects.vercel.app/addedFood/${params.email}`)
      },
      {
        path: "/ordered/:email",
        element: <OrderedFood />,
        loader: ({ params }) => fetch(`https://food-palace-server-obvwxtfg9-md-taiatul-islam-apons-projects.vercel.app/ordered/${params.email}`)
      },
      {
        path: "/addFood",
        element: <AddFood />
      },
      {
        path: "/purchase/:id",
        element: <PrivateRoute><Purchase /></PrivateRoute>,
        loader: ({ params }) => fetch(`https://food-palace-server-obvwxtfg9-md-taiatul-islam-apons-projects.vercel.app/purchase/${params.id}`)
      },
      {
        path: "/updateFood/:id",
        element: <UpdateFood />,
        loader: ({ params }) => fetch(`https://food-palace-server-obvwxtfg9-md-taiatul-islam-apons-projects.vercel.app/updateFood/${params.id}`)
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
