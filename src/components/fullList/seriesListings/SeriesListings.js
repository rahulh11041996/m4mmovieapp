import React from 'react';
import axios from 'axios';
import FileList from '../FileList';
import MoviesListContext from '../moviesList/movieStore';
import Loading from '../../../shared/loading/Loading';

const SeriesListings = () => {
    const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
    const [pageNumber, setPageNumber] = React.useState(1);


    const [allMovies, setAllMovies] = React.useState([]);
    const [loader, setLoader] = React.useState(true);
    const [genreId, setGenreId] = React.useState(28);
    const [scrollLoader, setScrollLoader] = React.useState(false)


    React.useState(() => {
        if (!localStorage.getItem('genre')) return;
        setGenreId(prev => {
            return localStorage.getItem('genre')
        })
    }, [genreId])

    // const ALL_MOVIES_API_URL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${pageNumber}`;
    const ALL_MOVIES_API_URL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`;



    React.useEffect(() => {
        fetchGenreData(ALL_MOVIES_API_URL)
    }, [pageNumber])

    const fetchGenreData = (url) => {
        axios({
            method: 'GET',
            url: url,
            params: { page: pageNumber },
        }).then(response => {
            setAllMovies(prev => {
                return [...prev, ...response.data.results]
            });
            setLoader(false)
            setScrollLoader(false)
        }).catch(e => {
            setLoader(false)
            setScrollLoader(false)
            return e;
        })
    }

    const updateGenreData = (data) => {
        localStorage.setItem('genre', data)
        setGenreId(data)
    }

    const updatePage = () => {
        setScrollLoader(true)
        setTimeout(() => {
            setPageNumber(prev => prev + 1);
        }, 1000)

    }

    if (loader) {
        return <Loading />
    }
    return (
        <MoviesListContext.Provider value={
            {
                selectedGenre: genreId,
                updatedGenreId: updateGenreData
            }
        }>
            <FileList allMovies={allMovies} type={'series'} updatePage={updatePage} scrollLoader={scrollLoader} />
        </MoviesListContext.Provider>
    )
}

export default SeriesListings
