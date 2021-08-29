import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Banner from '../banner/Banner';
import Carousal from '../carousal/Carousal';
import Movies from '../movies/Movies';
import Loading from '../../shared/loading/Loading';

const Home = () => {
    const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
    const TRENDING_MOVIES_API_URL = `/movie/top_rated?api_key=${API_KEY}`;
    const TRENDING_SERIES_API_URl = `/trending/tv/day?api_key=${API_KEY}`;
    const TRENDING_LIST_API_URL = `/trending/all/day?api_key=${API_KEY}`;
    const NETFLIX_SERIES = `/discover/tv?api_key=${API_KEY}&with_networks=213`;
    const axios_response = axios.create({
        baseURL: "https://api.themoviedb.org/3"
    })
    const [movies, getMovies] = useState();
    const [tvSeries, getSeries] = useState();
    const [trending, getTrending] = useState();
    const [netflixSeries, setNetflixSeries] = useState();
    const [loader1, setLoader1] = useState(true);
    const [loader2, setLoader2] = useState(true);
    const [loader3, setLoader3] = useState(true);
    const [loader4, setLoader4] = useState(true);
    useEffect(() => {
        fetchData(TRENDING_MOVIES_API_URL);
        fetchSeries(TRENDING_SERIES_API_URl);
        fetchTrending(TRENDING_LIST_API_URL);
        fetchNetflix(NETFLIX_SERIES);
    }, []);

    const fetchData = async (url) => {
        try {
            const response = await axios_response.get(url);
            getMovies(response.data.results);
            setLoader1(false)
        } catch (error) {
            setLoader1(false)
            return error;
        }
    }

    const fetchSeries = async (url) => {
        try {
            const response = await axios_response.get(url);
            getSeries(response.data.results);
            setLoader2(false)
        } catch (error) {
            setLoader2(false)
            return error;
        }
    }

    const fetchTrending = async (url) => {
        try {
            const response = await axios_response.get(url);
            getTrending(response.data.results);
            setLoader3(false)
        } catch (error) {
            setLoader3(false)
            return error;
        }
    }

    const fetchNetflix = async (url) => {
        try {
            const response = await axios_response.get(url);
            setNetflixSeries(response.data.results);
            setLoader4(false)
        } catch (error) {
            setLoader4(false)
            return error;
        }
    }
    if (loader1 || loader2 || loader3 || loader4) {
        return <Loading />;
    } else {
        return (
            < >
                <Banner bannerImage={trending[1]} />
                <Carousal trending={trending} />
                <Movies type={'Netflix Originals'} movies={netflixSeries} />
                <Movies type={'Top Movies'} movies={movies} />
                <Movies type={'Top Series'} movies={tvSeries} />
            </>
        );
    }
}

export default Home
