import React from 'react'
import { Outlet, useNavigation } from 'react-router';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import Footer from '../components/Footer'
import { ToastContainer } from 'react-toastify';

function MainLayouts() {
     const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1  mx-auto">{isLoading ? <Loading /> : <Outlet />}</div>
      <ToastContainer position="top-center" autoClose={5000} />

     <Footer/>
      </div>
  )
}

export default MainLayouts