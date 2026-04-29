import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Pages/Home/Home.jsx";
import Root from "./Pages/Root.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import AllFood from "./Pages/AllFood/AllFood.jsx";
import SignUp from "./Pages/SignUp/SignUp.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import SignIn from "./Pages/SignIn/SignIn.jsx";
import Blog from "./Pages/Blog/Blog.jsx";
// import FoodDetails from "./Pages/FoodDetails/FoodDetails.jsx";
import Purchase from "./Pages/Purchase/Purchase.jsx";
import AddedFood from "./Pages/AddedFood/AddedFood.jsx";
import UpdateFood from "./Pages/UpdateFood/UpdateFood.jsx";
import AddFood from "./Pages/AddFood/AddFood.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import OrderedFood from "./Pages/OrderedFood/OrderedFood.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FoodDetails from "./Pages/FoodDetails/FoodDetails.jsx";
import BlogDetails from "./Pages/Blog/BlogDetails.jsx";
import CartSteps from "./Pages/Cart/CartSteps.jsx";
import Wishlist from "./Pages/Wishlist/Wishlist.jsx";

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
      },
      {
        path: "/allFood/:id",
        element: <FoodDetails />,
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
        path: "/blog/:id",
        element: <BlogDetails />,
      },
      {
        path: "/cart",
        element: <CartSteps />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/addedFood/:email",
        element: <AddedFood />,
      },
      {
        path: "/ordered/:email",
        element: (
          <PrivateRoute>
            <OrderedFood />,
          </PrivateRoute>
        ),
      },
      {
        path: "/addFood",
        element: <AddFood />,
      },
      {
        path: "/purchase/:id",
        element: (
          <PrivateRoute>
            <Purchase />
          </PrivateRoute>
        ),
      },
      {
        path: "/updateFood/:id",
        element: <UpdateFood />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
