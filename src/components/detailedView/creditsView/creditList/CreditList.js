import React from 'react'
import styles from './creditList.module.scss';

const CreditList = ({ casting }) => {
    let castImage = '';
    if (casting.profile_path === null || undefined) {
        castImage = 'https://www.x-innovations.se/wp-content/uploads/dummy-prod-1.jpg';
    } else {
        castImage = `https://image.tmdb.org/t/p/w300/${casting.profile_path}`;
    }
    return (
        <div className={`${styles.single__cast} page_flex`}>
            <div className={styles.cast__avatar} style={{ 'background': "url(" + castImage + ") center / cover no-repeat" }}></div>
            <div className={styles.cast__details}>
                <h3>{casting.name}</h3>
                <h5>{casting.character}</h5>
            </div>
        </div>
    )
}

export default CreditList
