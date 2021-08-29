import React from 'react';


import styles from './genreTab.module.scss';
import GenreTabButton from './genreTabButton/GenreTabButton';
import { genreTabList } from './genreTabButton/genreTabList';

const GenreTab = ({ type }) => {

    return (
        <div className={`wd_100 ${styles.genre_tab__container}`}>
            <div className={styles.genre_tab__wrapper}>
                {genreTabList.map((singleGenre) => (
                    <GenreTabButton key={`${singleGenre.name}${singleGenre.id}`} genreType={singleGenre} />
                ))}
            </div>
        </div>
    )
}

export default GenreTab
