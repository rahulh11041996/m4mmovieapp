import React from 'react';
import Loading from '../../shared/loading/Loading';
import NoData from '../../shared/noData/NoData';
import styles from './trailer.module.scss';

const Trailer = ({ videoUrl, loading }) => {
    if (loading) {
        return <div className="loading__box"><Loading /> </div>;
    }
    return (
        <>
            {videoUrl === undefined ?
                <NoData error="No Trailer Available" />
                : <div className={`${styles.video__player} wd_100`}>
                    <object object className="wd_100" data={`https://www.youtube.com/embed/${videoUrl}`} > </object>
                </div >
            }
        </>
    )
}

export default Trailer
