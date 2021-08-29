import React, { useEffect, useState } from 'react'
import styles from './creditsView.module.scss';
import axios from 'axios';
import CreditList from './creditList/CreditList';
import Loading from '../../../shared/loading/Loading';
import Trailer from '../../trailer/Trailer';
import NoData from '../../../shared/noData/NoData';

const CreditsView = ({ movieID }) => {
    const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
    const axios_response = axios.create({
        baseURL: "https://api.themoviedb.org/3"
    })

    const [credits, setCredits] = useState();
    const [loader, setLoader] = useState(true);
    const [movieKey, setMovieKey] = useState(movieID.id)
    let CREDITS_VIEW = `/movie/${movieKey}/credits?api_key=${API_KEY}&language=en-US`;
    let MOVIE_TRAILER = `/movie/${movieKey}/videos?api_key=${API_KEY}&language=en-US`;
    const [videoPlayerLoader, setVideoPlayerLoader] = useState(true)

    const [videoUrl, setVideoUrl] = useState()


    useEffect(() => {
        setMovieKey(movieID.id);
        getCredtits(CREDITS_VIEW);
        getTrailer(MOVIE_TRAILER);
    }, [movieID, CREDITS_VIEW, MOVIE_TRAILER]);

    const getTrailer = async (url) => {
        try {
            const response = await axios_response.get(url);
            setVideoUrl(response.data.results[0].key);
            setVideoPlayerLoader(false);
        } catch (error) {
            setVideoPlayerLoader(false);
            return error;
        }
    }

    const getCredtits = async (url) => {
        try {
            const response = await axios_response.get(url);
            if (response.data.cast.length > 30) {
                response.data.cast.length = 30;
            }
            setCredits(response.data.cast);
            setLoader(false)
        } catch (error) {
            setLoader(false)
            return error;
        }
    }

    const HeaderText = ({ title }) => {
        return <div className={styles.crew__heading}>
            <h3><span>{title}</span></h3>
        </div>;
    }



    let creditLoaded = false;
    if (credits !== undefined) {
        if (credits.length === 0 || credits.length === undefined) {
            creditLoaded = true;
        }
    }
    if (loader) {
        return <>
            <HeaderText title="Cast & Crew" />
            <div className="loading__box"><Loading /> </div>
        </>;
    }

    return (
        <>
            <HeaderText title="Trailer" />
            <Trailer videoUrl={videoUrl} loading={videoPlayerLoader} />
            <HeaderText title="Cast & Crew" />
            {!credits && <NoData error="No Cast Details Available" />}
            {(creditLoaded) && <NoData error="No Cast Details Available" />}
            <div className={`${styles.casts__list} page_grid`}>
                {
                    credits && credits.map((cast) => (
                        <CreditList key={cast.credit_id} casting={cast} />
                    ))
                }

            </div>
        </>
    )
}

export default CreditsView
