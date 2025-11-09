import React from 'react'
import { createBrowserRouter } from "react-router";
import Home from '../Pages/Home';
import MainLayouts from '../layouts/MainLayouts';
import Login from '../components/Login'
import Register from '../components/Register';
import AllReviews from '../Pages/AllReviews';
import AddReview from '../Pages/AddReview';
import MyReview from '../Pages/MyReview';




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
        
        element: 
          <AddReview/>
        
      },
      {
        path:"my-reviews",
        
        element: <MyReview/>
      },
      {
        path:"all-reviews",
        
        element: <AllReviews/>
      },
      
    ],
  },
]);

export default router;

