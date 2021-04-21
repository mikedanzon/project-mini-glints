import React, { useEffect, useState } from 'react';
import Caraousel from '../components/Caraousel';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Home(props) {
  const classes = useStyles();
  const [dataMovie, setDataMovie] = useState([]);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      var res = await Axios.get('https://septian.dev/movie-api/movies');
      setDataMovie(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderGenre = async (gen) => {
    try {
      let res = await Axios.get(
        `https://septian.dev/movie-api/movies?category=${gen}`
      );
      setDataMovie(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderMovie = () => {
    return dataMovie.map((val, index) => {
      return (
        <div className={`render-movie-list`} key={index}>
          <img
            src={`https://septian.dev/movie-api/${val.posterUrl}`}
            alt="poster"
            className="pr-3"
          />
          <div className="font-weight-bold">{val.title}</div>
          <div>{val.category[0]}</div>
        </div>
      );
    });
  };

  return (
    <>
      <Header />
      <Caraousel />
      <div className={`main-content ${classes.root}`}>
        <div className="main-content-category">Browse by category</div>
        <div className="main-content-genre">
          <div className="main-content-genre-all mr-4" tabIndex="1">
            <button className="btn" onClick={fetchdata}>
              All
            </button>
          </div>
          <div className="main-content-genre-superpower mr-4" tabIndex="2">
            <button className="btn" onClick={() => renderGenre(1)}>
              Super Power
            </button>
          </div>
          <div className="main-content-genre-horror mr-4" tabIndex="3">
            <button className="btn" onClick={() => renderGenre(2)}>
              Horror
            </button>
          </div>
          <div className="main-content-genre-action mr-4" tabIndex="4">
            <button className="btn" onClick={() => renderGenre(3)}>
              Action
            </button>
          </div>
          <div className="main-content-genre-fantasy mr-4" tabIndex="5">
            <button className="btn" onClick={() => renderGenre(4)}>
              Fantasy
            </button>
          </div>
          <div className="main-content-genre-harem" tabIndex="6">
            <button className="btn" onClick={() => renderGenre(5)}>
              Harem
            </button>
          </div>
        </div>
      </div>
      <div className="render-movie">{renderMovie()}</div>
      <div className="main-pagination">
        <Pagination count={10} variant="outlined" color="secondary" />
      </div>
      <Footer />
    </>
  );
}

export default Home;
