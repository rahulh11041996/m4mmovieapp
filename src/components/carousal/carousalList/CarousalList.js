import React from 'react';
import MoviesList from '../../movies/moviesList/MoviesList';
import SeriesList from '../../movies/seriesList/SeriesList';

const CarousalList = ({ trendingList}) => {
    return (
        <div >
            {trendingList.media_type === 'movie' ? 
                <MoviesList moviedetails={trendingList}/>
                : trendingList.media_type === 'tv' ? 
                <SeriesList moviedetails={trendingList} />
                : ''
        }
        </div>
    )
}

export default CarousalList
