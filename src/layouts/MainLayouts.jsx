import React from 'react'
import { Outlet, useNavigation } from 'react-router';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import Footer from '../components/Footer'

function MainLayouts() {
     const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 w-11/12 mx-auto">{isLoading ? <Loading /> : <Outlet />}</div>

     <Footer/>
      </div>
  )
}

export default MainLayouts