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
import ErrorPage from '../Pages/ErrorPage';




const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    // errorElement: <ErrorPages />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch('http://localhost:5000/all-review'),
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
        path:"/*",
        
        element: 
          <ErrorPage/>
        
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
          loader: () => fetch('http://localhost:5000/all-review'),
        hydrateFallbackElement: <Loading/>
      },
      {
        path:"review/:id",
        loader: ({params}) => fetch(`http://localhost:5000/all-review/${params.id}`),
        element: <ProtectedRoute>
          <DetailReview/>
        </ProtectedRoute>
      },
      
    ],
  },
]);

export default router;

