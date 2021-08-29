import React from 'react'
import styles from './listingBanner.module.scss';
import SmallBanner from './smallBanner/SmallBanner';

const ListingBanner = ({ bannerData }) => {
    return (
        <div className={`${styles.listing__banner} wd_100 page_grid`}>
            <div className={`${styles.listing__banner_large}`}>
                <SmallBanner bannerData={bannerData[0]} />
            </div>
            <div className={`${styles.listing__banner_small}`}>
                <SmallBanner bannerData={bannerData[1]} />
            </div>
            <div className={`${styles.listing__banner_small}`}>
                <SmallBanner bannerData={bannerData[2]} />
            </div>
        </div>
    )
}

export default ListingBanner
