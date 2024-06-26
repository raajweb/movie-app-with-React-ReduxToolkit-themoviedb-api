import { useEffect, useState } from 'react'
import './App.css'
import { fetchDataFromApi } from './utils/api'
import { getApiConfiguration ,getGenres} from './store/homeSlice'
import { useDispatch, useSelector } from 'react-redux'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

import SearchResult from './pages/searchResult/SearchResult'





function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home)
  const fetchApiConfig  = () => {
    fetchDataFromApi('/configuration').then((res) => {
      //console.log('fetch api ', res)
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
    };
      dispatch(getApiConfiguration(url))
    })

  }

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    //console.log('Genres form api',data);
    data.map(({ genres }) => {
        return genres.map((item) => (allGenres[item.id] = item));
    });
    //console.log('Genres all',allGenres);

    dispatch(getGenres(allGenres));
};
  useEffect(() => {
    fetchApiConfig ();
    genresCall();
  }, [])
  useEffect(() => {setIsLoaded(true)} ,[isLoaded])
  return (
    
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
