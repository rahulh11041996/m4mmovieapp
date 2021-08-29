import React from 'react';

//styles
import './assets/styles/styles.scss';

//components
import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';

//packages
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DetailedView from './components/detailedView/DetailedView';
import DetailContext from './store/detailViewContext';
import MoviesDataList from './components/fullList/moviesList/MoviesDataList';
import SeriesListings from './components/fullList/seriesListings/SeriesListings';
import SearchMovies from './components/navigation/search/SearchMovies';


function App() {
    const [getDetailedData, setDetailedData] = React.useState(null);
    const fetching = (data) => {
        setDetailedData(data);
        localStorage.setItem('elemData', JSON.stringify(data))
    }

    return (
        <DetailContext.Provider value={{
            detailedData: getDetailedData,
            providingData: fetching
        }}>
            <Router>
                <div className="page__navigator_container wd_100">
                    <Navigation />
                </div>
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/movies" component={MoviesDataList}></Route>
                    <Route path="/series" component={SeriesListings}></Route>
                    <Route path="/details" component={DetailedView}></Route>
                    <Route path="/search" component={SearchMovies}></Route>
                </Switch>
            </Router>
        </DetailContext.Provider>
    );
}

export default App;