import React from 'react';
import MoviesList from '../movies/moviesList/MoviesList';
import styles from './fileList.module.scss'
import GenreTab from './genreTab/GenreTab';
import ListingBanner from './listingBanner/ListingBanner';
import SeriesList from '../movies/seriesList/SeriesList';
import CardLoader from '../../shared/cardLoader/CardLoader';

const FileList = ({ allMovies, type, updatePage, scrollLoader }) => {

    const [loader, setLoader] = React.useState();

    React.useEffect(() => {
        setLoader(scrollLoader)
    }, [scrollLoader])

    const observer = React.useRef()
    const lastMovie = React.useCallback(node => {
        if (loader) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entires => {
            if (entires[0].isIntersecting) {
                updatePage();
            }
        })
        if (node) observer.current.observe(node);
    }, [loader])

    return (
        <div className='wd_100'>
            <ListingBanner bannerData={allMovies} />
            {type === 'movies' && <GenreTab type={'movies'} />}
            <div className={`page_grid ${styles.movies_list}`}>
                {type === 'movies' ?
                    allMovies && allMovies.map((results) => <MoviesList key={`${results.id}${results.id}`} moviedetails={results} />) :
                    allMovies && allMovies.map((results, index) => {
                        if (allMovies.length === index + 1) {
                            return <span ref={lastMovie} key={`${results.id}${results.id}`} ><SeriesList moviedetails={results} /></span>;
                        } else {
                            return <span key={`${results.id}${results.id}`}><SeriesList moviedetails={results} /></span>;
                        }
                    })}
                {loader && <CardLoader />}
            </div>
        </div>
    )
}

export default FileList
