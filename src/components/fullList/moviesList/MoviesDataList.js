import React from 'react'
import axios from 'axios';
import MoviesListContext from './movieStore';
import FileList from '../FileList';
import Loading from '../../../shared/loading/Loading';


const MoviesDataList = () => {
    const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
    const [pageNumber, setPageNumber] = React.useState(1);

    const axios_response = axios.create({
        baseURL: "https://api.themoviedb.org/3"
    })


    const [allMovies, setAllMovies] = React.useState([]);
    const [loader, setLoader] = React.useState(true);
    const [genreId, setGenreId] = React.useState(28);

    React.useState(() => {
        if (!localStorage.getItem('genre')) return;
        setGenreId(prev => {
            return localStorage.getItem('genre')
        })
    }, [genreId])

    const ALL_MOVIES_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${pageNumber}`;


    React.useEffect(() => {
        console.log('trigger')
        fetchGenreData(ALL_MOVIES_API_URL)
    }, [ALL_MOVIES_API_URL])



    const fetchGenreData = async (url) => {
        try {
            const response = await axios_response.get(url);
            setAllMovies(prev => {
                return [...response.data.results]
            });
            setLoader(false)
        } catch (error) {
            setLoader(false)
            return error;
        }
    }



    const updateGenreData = (data) => {
        localStorage.setItem('genre', data)
        setGenreId(data)
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
            <FileList allMovies={allMovies} type={'movies'} />
        </MoviesListContext.Provider>
    )
}

export default MoviesDataList

