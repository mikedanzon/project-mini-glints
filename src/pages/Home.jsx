import React, { useEffect, useState } from 'react';
import Caraousel from '../components/Caraousel';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { Link } from 'react-router-dom';
import { URL_MOVIEAPI } from '../helper/url';

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
  const [dataPage, setDataPage] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
    fetchPage();
  }, []);

  const fetchData = async () => {
    try {
      var res = await Axios.get(`${URL_MOVIEAPI}/movies`);
      setDataMovie(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPage = async () => {
    try {
      var res = await Axios.get(`${URL_MOVIEAPI}/movies`);
      setDataPage(Math.ceil(res.data.totalItems / 15));
    } catch (error) {
      console.log(error);
    }
  };

  const pageChange = async (event, value) => {
    setPage(value);
    try {
      let res = await Axios.get(`${URL_MOVIEAPI}/movies?page=${value}`);
      setDataMovie(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderGenre = async (gen) => {
    try {
      let res = await Axios.get(`${URL_MOVIEAPI}/movies?genre=${gen}`);
      setDataMovie(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderMovie = () => {
    return dataMovie.map((val, index) => {
      return (
        <div className={`render-movie-list`} key={index}>
          <Link to={`/movie/${val.id}`}>
            <img
              src={`${URL_MOVIEAPI}/${val.posterUrl}`}
              alt="poster"
              className="pr-3"
            />
          </Link>
          <div className="font-weight-bold">{val.title}</div>
          <div>{val.genre.join()}</div>
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
          <div className="main-content-genre-all" tabIndex="1">
            <button className="btn" onClick={fetchData}>
              All
            </button>
          </div>
          <div className="main-content-genre-action" tabIndex="2">
            <button className="btn" onClick={() => renderGenre(1)}>
              Action
            </button>
          </div>
          <div className="main-content-genre-superhero" tabIndex="3">
            <button className="btn" onClick={() => renderGenre(2)}>
              Super Hero
            </button>
          </div>
          <div className="main-content-genre-adventure" tabIndex="4">
            <button className="btn" onClick={() => renderGenre(3)}>
              Adventure
            </button>
          </div>
          <div className="main-content-genre-fantasy" tabIndex="5">
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
        <Pagination
          count={dataPage}
          page={page}
          onChange={pageChange}
          variant="outlined"
          color="secondary"
        />
      </div>
      <Footer />
    </>
  );
}

export default Home;
