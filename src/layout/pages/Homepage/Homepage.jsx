import React from 'react'
import Banner from './component/Banner/Banner'
import PopularMovieSlide from './component/PopularMovieSlide/PopularMovieSlide'

//1.배너 => popular 영화의 첫번째 아이템
//2. popular movie
//3. top rated movie
//4. upcoming movie

const Homepage = () => {
  return (
    <div>
        <Banner />
        <PopularMovieSlide/>
    </div>
  )
}

export default Homepage