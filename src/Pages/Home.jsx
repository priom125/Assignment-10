import React from 'react'
import Banner from '../components/Banner'
import TopReviews from '../components/TopReviews'
import LatestReviews from '../components/LatestReviews'


function Home() {
  return (
    <div>
       <Banner/>
       <TopReviews/>
       
       <LatestReviews/>

    </div>
  )
}

export default Home