import React from 'react';
import style from './movies.module.scss';
import MoviesList from './moviesList/MoviesList';
import SeriesList from './seriesList/SeriesList';

function Movies({ type, movies }) {
    return (
        <div className="wd_100 layout_padding">
            <div className={`page__header ${style.movies__head}`}>
                <h1 className={`page_flex ${type === 'Top Movies' ? style.movies__icon : ''} ${type === 'Top Series' ? style.series__icon : ''} ${type === 'Netflix Originals' ? style.netflix__icon : ''}`}>{type}</h1>
            </div>
            <div className={`page_grid ${style.movies_list}`}>
                {type === 'Top Movies' ?
                    movies && movies.map((results) => <MoviesList key={results.id} moviedetails={results} />)
                    : type === 'Top Series' ?
                        movies && movies.map((results) => <SeriesList key={results.id} moviedetails={results} />) :
                        type === 'Netflix Originals' ? movies && movies.map((results) => <SeriesList key={results.id} moviedetails={results} />) : ''
                }
            </div>
        </div>
    )
}

export default Movies
