import React from 'react'
import Banner from '../components/Banner'
import TopReviews from '../components/TopReviews'
import LatestReviews from '../components/LatestReviews'
import { useLoaderData } from 'react-router';


function Home() {

  const Alldata = useLoaderData();
  console.log(Alldata);

  return (
    <div>
       <Banner/>
       <TopReviews Alldata={Alldata}/>
       
       <LatestReviews/>

    </div>
  )
}

export default Home