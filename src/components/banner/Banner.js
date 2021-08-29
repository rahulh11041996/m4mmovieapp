import styles from './banner.module.scss';

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import DetailContext from '../../store/detailViewContext';

function Banner({ bannerImage }) {
    const [bannerHeight, setBannerHeight] = useState(0);
    const [bannerImages, setBannerImage] = useState('')

    useEffect(() => {
        setBannerImage(bannerImage)

        window.addEventListener('scroll', bannerHeightcalculator);
        return () => {
            window.removeEventListener('scroll', bannerHeightcalculator);
        }
    }, [bannerHeight]);

    const bannerHeightcalculator = (e) => {
        if (e.target.scrollingElement.scrollTop > window.innerHeight * 0.45) return;
        setBannerHeight(Math.round(e.target.scrollingElement.scrollTop));
    }

    const cntx = React.useContext(DetailContext);
    return (
        <div className={`wd_100 ${styles.page__banner}`} style={{
            '--banner': bannerHeight, 'background': "url(" + `https://image.tmdb.org/t/p/original${bannerImages.backdrop_path}` + ") center / cover no-repeat"
        }}>
            <div className={`page_flex ${styles.banner__content} layout_padding`}>
                <div className={`${styles.banner__rating_wrapper}  page_flex`}>
                    <h2>{bannerImage.media_type === 'movie' ? bannerImage.original_title : bannerImage.original_name}</h2>
                    <h4 className="page_flex">{bannerImages.vote_average}</h4>
                </div>
                <p >{bannerImage.overview}</p>
                <Link to={
                    '/details'
                }>
                    <button className={`${styles.banner__button} page_button`} onClick={() => { cntx.providingData(bannerImage) }}>View More</button>
                </Link>
            </div>
        </div>
    )
}

export default Banner
