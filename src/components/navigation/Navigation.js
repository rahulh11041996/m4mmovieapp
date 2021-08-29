import React, { useState, useEffect } from 'react'
//style
import style from './navigation.module.scss';

//pacjage
import { NavLink } from 'react-router-dom';
import SearchMovies from './search/SearchMovies';

const Navigation = () => {
    const [userImage, setuserImage] = useState('');
    const [scrollTriggered, setScrollTrigger] = useState(false)
    const handleImage = () => {
        setuserImage('')
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollChecker)
        return () => {
            window.removeEventListener('scroll', scrollChecker)
        };
    }, []);

    const scrollChecker = (e) => {
        if (e.target.scrollingElement.scrollTop > 200) {
            setScrollTrigger(true);
        } else {
            setScrollTrigger(false);
        }
    }
    const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9ZvyCIq-y72AGKjKwrNCuAEQRibQF6c31lw&usqp=CAU';
    return (
        <div className={`page_flex wd_100  ${style.page__header} ${scrollTriggered ? style.scroll__triggered : ''}`}>
            <div className={style.page_logo}>
                <h1>M4M</h1>
            </div>
            {/* <SearchMovies /> */}
            <div className={`page_flex ${style.navigation__list} `}>
                <NavLink to='/' exact activeClassName={style.active__navigation}>
                    <span >Home</span>
                </NavLink>
                <NavLink to='/movies' activeClassName={style.active__navigation}>
                    <span >Movies</span>
                </NavLink>
                <NavLink to='/series' activeClassName={style.active__navigation}>
                    <span >Series</span>
                </NavLink>
                <NavLink to='/search' exact activeClassName={style.active__navigation}>
                    <span >Search</span>
                </NavLink>
            </div>

            <div className={style.user__profile_avatar}>
                <img src={userImage !== '' ? userImage : defaultImage} alt="userAvatar" />
            </div>
        </div>
    )
}

export default Navigation
