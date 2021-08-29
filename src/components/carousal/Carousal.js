import React, {useEffect } from 'react'
import style from './carousal.module.scss'
import CarousalList from './carousalList/CarousalList'

const Carousal = ({ trending}) => {
  
    useEffect(()=>{
        startcarousal();
    }, [])

    const startcarousal = () => {
        let sliderContainer = document.getElementById('sliderContainerRef');
        let slideLength = 140;
        setInterval(()=>{
                sliderContainer.scrollBy({
                    top: 0,
                    left: slideLength,
                    behavior : 'smooth'
                })
            if (Math.round(sliderContainer.scrollLeft + sliderContainer.clientWidth)  === sliderContainer.scrollWidth){
                sliderContainer.scrollBy({
                    top: 0,
                    left: -sliderContainer.scrollWidth,
                    behavior: 'smooth'
                })
                }
            
        }, 3000)
    }

    return (
        <React.Fragment>
            <div className="wd_100 layout_padding" >
                <div className={`page__header ${style.movies__head}`}>
                    <h1 className={`page_flex ${style.trending__icon}`}>Trending Now</h1>
                </div>
            </div>
            <div className={`wd_100 ${style.slider__wrapper}`} >
                <div className={`wd_100 page_flex ${style.slider__container}`}  id="sliderContainerRef">
                    {trending && trending.map((movies) => <CarousalList trendingList={movies} key={movies.id} />)}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Carousal
