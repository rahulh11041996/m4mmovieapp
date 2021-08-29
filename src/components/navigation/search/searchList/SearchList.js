import React from 'react'
import styles from './searchList.module.scss';
import { Link } from 'react-router-dom';
import DetailContext from '../../../../store/detailViewContext';
import placeHolderImage from '../../../../assets/images/no_image_placeholder.jpg';

const SearchList = ({ searchData, clearField }) => {

    const context = React.useContext(DetailContext)

    let moviePoster = '';

    if (searchData.poster_path) {
        moviePoster = `https://image.tmdb.org/t/p/w500/${searchData.poster_path}`;
    } else {
        moviePoster = placeHolderImage;
    }

    const viewData = () => {
        context.providingData(searchData);
        clearField()
    }

    return (
        <Link to={
            '/details'
        }>
            <div className={`${styles.search__field_list} page_flex`} onClick={viewData}>
                <div className={styles.search__logo} style={{ 'background': "url(" + `${moviePoster}` + ") center / cover no-repeat" }}></div>
                <div className={styles.serch__data}>
                    <h2>{searchData.media_type === 'tv' ? searchData.original_name : searchData.original_title === undefined ? searchData.name : searchData.original_title}</h2>
                    <h4>{searchData.media_type === 'tv' ? searchData.first_air_date : searchData.release_date === undefined ? searchData.first_air_date : searchData.release_date || 'Release Date Not Found'}</h4>
                </div>
            </div>
        </Link>
    )
}

export default SearchList
