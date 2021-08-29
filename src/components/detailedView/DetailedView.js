import React, { useState, useEffect } from 'react';
import DetailContext from '../../store/detailViewContext';
import CreditsView from './creditsView/CreditsView';
import styles from './detailedView.module.scss';
import { genres } from './genres';
const DetailedView = () => {

    const [genreType, setGenreType] = useState([])
    const cntx = React.useContext(DetailContext);
    const [detailedView, setDetailedView] = useState(JSON.parse(localStorage.getItem('elemData')));
    const [genreArray, setGenreArray] = useState(JSON.parse(localStorage.getItem('elemData')).genre_ids)

    useEffect(() => {
        setDetailedView(JSON.parse(localStorage.getItem('elemData')));
        getGenreList()
    }, [cntx])


    const getGenreList = () => {
        setGenreType([])
        setGenreArray(JSON.parse(localStorage.getItem('elemData')).genre_ids)
        genreArray.map((gen) => {
            for (let i = 0; i < genres.length; i++) {
                if (gen === genres[i].id) {
                    setGenreType((prev) => {
                        return [...prev, genres[i].name]
                    })
                }
            }
        })
    }

    return (

        <div className={`${styles.detailed__container} wd_100`}>
            <div className={styles.detailed__banner} style={{ 'background': "url(" + `https://image.tmdb.org/t/p/original${detailedView.backdrop_path}` + ") center / cover no-repeat" }}></div>
            <div className={styles.transilte__view}>
                <div className={`${styles.detailed__contain} page_flex wd_100`}>
                    <div className={styles.detailed__poster}>
                        <img src={`https://image.tmdb.org/t/p/w500/${detailedView.poster_path}`} alt="" />
                    </div>
                    <div className={styles.detailed__movie_details}>
                        <h1>{detailedView.media_type === 'tv' ? detailedView.original_name : detailedView.original_title === undefined ? detailedView.name : detailedView.original_title}</h1>
                        <h2>{detailedView.media_type === 'tv' ? detailedView.first_air_date : detailedView.release_date === undefined ? detailedView.first_air_date : detailedView.release_date || 'Release Date Not Available'}</h2>
                        <div className={`${styles.genre__wrapper} page_flex`}>
                            {detailedView && genreType.map((genres, index) => (
                                <h3 key={`genere${index}`}>{genres}</h3>
                            ))}
                        </div>
                        <p>{detailedView.overview}</p>
                        <div className={`${styles.review__details_container} page_flex`}>
                            <div className={`${styles.review__details} page_flex`}>
                                <h6 className={`page_flex`}>{detailedView.vote_average}</h6>
                                <span>Audiance Rating</span>
                            </div>
                            <div className={`${styles.popularity__wrapper} page_flex`}>
                                <h6 className={`page_flex`}>{detailedView.popularity.toFixed(1)}</h6>
                                <span>Popularity</span>
                            </div>
                        </div>
                    </div>
                </div>
                <CreditsView movieID={detailedView} />
            </div>
        </div>
    )
}

export default DetailedView
