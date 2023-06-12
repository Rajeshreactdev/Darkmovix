import { useState } from 'react'

import { fetchDataFromApi } from './utils/api'
import { useEffect } from 'react'
import { getApiConfiguration, getGenres } from './store/homeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import SearchResultsfce from './pages/searchResults/SearchResults'
import SearchResults from './pages/searchResults/SearchResults'
import Explore from './pages/explore/Explore'
import PageNotFound from './pages/404/PageNotFound'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'





function App() {

const dispatch = useDispatch()
const url = useSelector((state) => state.home)
console.log(url)


  useEffect(() => {
fetchApiConfig();
genresCall()
  },[])
 
  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
        console.log(res);
const url = {
  backdrop: res.images.secure_base_url + "original",
  poster: res.images.secure_base_url + "original",
  profile: res.images.secure_base_url + "original",
}

        dispatch(getApiConfiguration(url))
    })
  }

const genresCall = async () => {
  let promises = []
  let endpoint = ["tv", "movie"]
  let allGenres = {}

  endpoint.forEach((url) => {
    promises.push(fetchDataFromApi(`/genre/${url}/list`))
  })
const data = await Promise.all(promises)
data.map(({genres})=> {
  return genres.map((item) => (allGenres[item.id] = item))
})

dispatch(getGenres(allGenres))
}



  return ( 
  
  <BrowserRouter>
  <Header />
  <Routes>
  <Route path="/" element={<Home />} />
                <Route path="/:mediaType/:id" element={<Details />} />
                <Route path="/search/:query" element={<SearchResults />} />
                <Route path="/explore/:mediaType" element={<Explore />} />
                <Route path="*" element={<PageNotFound />} />

  </Routes>
  <Footer />
  </BrowserRouter>
  
    )
  
}

export default App
