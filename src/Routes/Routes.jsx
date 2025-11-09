import React from 'react'
import { createBrowserRouter } from "react-router";
import Home from '../Pages/Home';
import MainLayouts from '../layouts/MainLayouts';
import Login from '../components/Login'
import Register from '../components/Register';
import AllReviews from '../Pages/AllReviews';
import AddReview from '../Pages/AddReview';
import MyReview from '../Pages/MyReview';
import Loading from '../components/Loading';
import DetailReview from '../Pages/DetailReview';
import ProtectedRoute from './ProtectedRoute';




const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    // errorElement: <ErrorPages />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch('Alldata.json'),
        hydrateFallbackElement: <Loading/>
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
        
        element: <ProtectedRoute>
          <MyReview/>
        </ProtectedRoute>,
      },
      {
        path:"all-reviews",
         
        element: <AllReviews/>,
          loader: () => fetch('Alldata.json'),
        hydrateFallbackElement: <Loading/>
      },
      {
        path:"review/:id",
        
        element: <ProtectedRoute>
          <DetailReview/>
        </ProtectedRoute>
      },
      
    ],
  },
]);

export default router;

