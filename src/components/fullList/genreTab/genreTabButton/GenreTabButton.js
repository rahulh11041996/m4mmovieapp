import React from 'react'
import MoviesListContext from '../../moviesList/movieStore';
import styles from './genreTabButton.module.scss';

const GenreTabButton = ({ genreType }) => {
    const context = React.useContext(MoviesListContext)
    return (
        <div className={styles.genre_button__container}>
            <input type="radio" id={genreType.name} name='genreTabs' value={genreType.id} checked={+context.selectedGenre === +genreType.id ? true : false} onChange={() => { context.updatedGenreId(genreType.id) }} />
            <label className={styles.genre_tab__button} htmlFor={genreType.name}>
                {genreType.name}
            </label>
        </div>
    )
}

export default GenreTabButton
