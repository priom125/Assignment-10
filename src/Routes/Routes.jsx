import React from 'react'
import { createBrowserRouter } from "react-router";
import Home from '../Pages/Home';
import MainLayouts from '../layouts/MainLayouts';
import Login from '../components/Login'
import Register from '../components/Register';
import AllReviews from '../Pages/AllReviews';



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    // errorElement: <ErrorPages />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path:"login",
        
        element: <Login/>
      },
      {
        path:"register",
        
        element: <Register/>
      },
      {
        path:"add-review",
        
        element: <Register/>
      },
      {
        path:"my-reviews",
        
        element: <Register/>
      },
      {
        path:"all-reviews",
        
        element: <AllReviews/>
      },
      
    ],
  },
]);

export default router;

