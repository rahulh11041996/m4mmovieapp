import React from 'react';
import styles from './loading.module.scss'

const Loading = () => {
    const loadingArray = 'Loading...';
    return (
        <div className={styles.loading__container}>
            <div className={styles.loader__box}></div>
            <div className={styles.loader__text}>
                {
                    [...loadingArray].map((chararcter, index) => <span key={`${chararcter}${index}`} style={{ '--i': index + 1 }}>{chararcter}</span>)
                }
            </div>
        </div>
    )
}

export default Loading
