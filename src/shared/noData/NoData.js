import React from 'react';
import styles from './noData.module.scss'

const NoData = ({ error }) => {
    return (
        <div className={`${styles.nodata__container} wd_100`}><h3>{error}</h3></div>
    )
}

export default NoData
