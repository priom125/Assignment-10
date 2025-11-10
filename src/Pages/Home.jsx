import React from 'react'
import Banner from '../components/Banner'
import TopReviews from '../components/TopReviews'
import LatestReviews from '../components/LatestReviews'
import { useLoaderData } from 'react-router';
import BestFood from '../components/BestFood';


function Home() {

  const Alldata = useLoaderData();
  console.log(Alldata);

  return (
    <div>
       <Banner/>
       <TopReviews Alldata={Alldata}/>
       <BestFood/>
       <LatestReviews Alldata={Alldata}/>

    </div>
  )
}

export default Home