import React from 'react';
import styles from './smallBanner.module.scss';
import { Link } from 'react-router-dom';
import DetailContext from '../../../../store/detailViewContext';
import placeHolderImage from '../../../../assets/images/no_image_placeholder.jpg'

const SmallBanner = ({ bannerData }) => {
    const cntx = React.useContext(DetailContext);
    let bannerImage = '';
    if (bannerData.backdrop_path === null) {
        bannerImage = placeHolderImage;
    } else {
        bannerImage = `https://image.tmdb.org/t/p/original/${bannerData.backdrop_path}`
    }
    return (
        <div className={`${styles.banner__container}`}>
            <img src={bannerImage} alt="" />
            <div className={`${styles.banner__content} page_flex`}>
                <h1>{bannerData.media_type === 'tv' ? bannerData.original_name : bannerData.original_title === undefined ? bannerData.name : bannerData.original_title}</h1>
                <p>{bannerData.overview}</p>
                <Link to={
                    '/details'
                }>
                    <span onClick={() => { cntx.providingData(bannerData) }}>View details</span>
                </Link>
            </div>
        </div>
    )
}

export default SmallBanner
