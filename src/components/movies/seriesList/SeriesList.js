import React from 'react'
import style from './seriesList.module.scss';
import { Link } from 'react-router-dom';
import DetailContext from '../../../store/detailViewContext';

function SeriesList({ moviedetails }) {
    const contextData = React.useContext(DetailContext)
    let moviePoster = '';
    if (moviedetails.poster_path === null) {
        moviePoster = `https://critics.io/img/movies/poster-placeholder.png`;
    } else {
        moviePoster = `https://image.tmdb.org/t/p/w500/${moviedetails.poster_path}`;
    }
    return (
        <Link to={
            '/details'
        }>
            <div className={style.single__movie_list} onClick={() => { contextData.providingData(moviedetails) }}>
                <div className={style.movie_list__image}>
                    {moviedetails.overview &&
                        <div className={style.movie_list__details}>
                            <p>{moviedetails.overview}</p>
                        </div>}
                    <img src={moviePoster} alt="" />
                </div>
                <h3>{moviedetails.original_name}</h3>
                <div className={`${style.movie__details} page_flex wd_100`}>
                    <h5>{moviedetails.first_air_date ? moviedetails.first_air_date.substring(0, 4) : 'NaN'}</h5>
                    <h6 className={`page_flex`}>{moviedetails.vote_average}</h6>
                </div>
            </div>
        </Link>
    )
}

export default SeriesList

