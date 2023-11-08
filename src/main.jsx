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

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddFood from './Pages/AddFood/AddFood.jsx';


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
        loader: () => fetch('http://localhost:5000/allFood')
      },
      {
        path: "/allFood/:id",
        element: <FoodDetails></FoodDetails>,
        loader: ({ params }) => fetch(`http://localhost:5000/foodDetails/${params.id}`)
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
        loader: ({ params }) => fetch(`http://localhost:5000/addedFood/${params.email}`)
      },
      {
        path: "/addFood",
        element: <AddFood />
      },
      {
        path: "/purchase/:id",
        element: <Purchase />,
        loader: ({ params }) => fetch(`http://localhost:5000/purchase/${params.id}`)
      },
      {
        path: "/updateFood/:id",
        element: <UpdateFood />,
        loader: ({ params }) => fetch(`http://localhost:5000/updateFood/${params.id}`)
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
