import React, { useState, useRef } from 'react';
import styles from './searchMovies.module.scss';
import axios from 'axios';
import SearchList from './searchList/SearchList';
import SeriesList from '../../movies/seriesList/SeriesList';
import MoviesList from '../../movies/moviesList/MoviesList';
import NoData from '../../../shared/noData/NoData';

const SearchMovies = () => {
    const [searchList, setSearchList] = useState([]);
    const searchQueryInput = useRef(null)
    const [noData, setNoData] = useState(false);
    const [errorData, setErrorData] = useState(' ')

    const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;


    const axios_response = axios.create({
        baseURL: "https://api.themoviedb.org/3"
    })


    const fetchSearchData = async (url) => {
        try {
            setNoData(false)
            const response = await axios_response.get(url);
            setSearchList(response.data.results);
            console.log(response.data.results);
            if (response.data.results.length === 0) {
                setNoData(true)
                setErrorData(`No search result found for "${searchQueryInput.current.value}"`)
            } else {
                setNoData(false)
            }
        } catch (error) {
            setNoData(true)
            if (error.response) {
                setErrorData(error.response.data.errors)
            } else {
                setErrorData("oops !! Error occured")
            }
            return error;
        }
    }


    const searchMovieData = () => {
        setSearchList([])
        if (searchQueryInput.current.value === '') return;
        let search_url = `/search/multi?api_key=${API_KEY}&language=en-US&query=${(searchQueryInput.current.value).trim()}& page=1&include_adult=false`;
        console.log(search_url)
        fetchSearchData(search_url);
    }

    // const clearSearch = () => {
    //     setSearchList([]);
    //     searchQueryInput.current.value = '';
    // }

    const onEnterSearch = (e) => {
        const key = e.keyCode || e.which;
        if (key === 13) {
            e.preventDefault();
            searchMovieData()
        }
    }

    const checkMediaType = (results) => {
        if (results.media_type === 'movie') {
            return <MoviesList key={`${results.id}${results.id}`} moviedetails={results} />
        }
        if (results.media_type === 'tv') {
            return <SeriesList moviedetails={results} key={`${results.id}${results.id}`} />;
        }
        return;
    }

    const clearSearchData = () => {
        if (searchQueryInput.current.value.trim() !== '' && !!searchList) return;
        setSearchList([])
    }
    return (
        <div className={styles.search_page}>
            <div className={`${styles.search__container} page_flex wd_100`}>
                <input type="search" onKeyPress={onEnterSearch} placeholder="Search Movies / Series" ref={searchQueryInput} spellCheck="false" onBlur={clearSearchData} />
                <button onClick={searchMovieData} className={styles.navigation__search_button}></button>
                {/* <div className={`${styles.search__results} ${searchList.length === 0 ? styles.no__search : styles.search__active}`}>
                    {searchList && searchList.map((data) => (
                        <SearchList key={`${data.id}${data.backdrop_path}`} searchData={data} clearField={clearSearch} />
                    ))}
                </div> */}
            </div >
            {(searchList && searchList.length !== 0) &&
                <>
                    <div className={`${styles.serach_head_title} page_flex wd_100`}>
                        <h3>Search Result For <b>{searchQueryInput.current.value}</b></h3>
                    </div>
                    <div className={`page_grid ${styles.movies_list} wd_100`}>
                        {searchList && searchList.map((results) => checkMediaType(results))}
                    </div>
                </>
            }
            {noData && <div className={`${styles.nodata_container} wd_100`}><NoData error={errorData} /></div>}
        </div>
    )
}

export default SearchMovies
