import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OverviewIMG from '../assets/img/overview-img.jpg';
import { URL_MOVIEAPI } from '../helper/url';

function Overview() {
  const { id } = useParams();
  const [dataMovie, setDataMovie] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchId();
  }, []);

  const fetchId = async () => {
    try {
      var res = await Axios.get(`${URL_MOVIEAPI}/movies/${id}`);
      setDataMovie(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="overview-trailer">
        <div>
          <img src={OverviewIMG} alt="background" />
        </div>
        <div className="overview-trailer-text">
          <div className="text-uppercase">{dataMovie.title}</div>
          <div>{dataMovie.rating} Rating , total reviews</div>
          <div className="pt-2 overview-trailer-text-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
            asperiores earum accusantium neque quidem qui illo reprehenderit
            soluta magni, fugit eaque consequuntur enim ea totam explicabo esse
            ullam. Quis nihil accusamus quod fuga sit eveniet vel excepturi
            architecto qui esse?
          </div>
          <div className="pt-3 d-flex">
            <div className="pr-4">
              <button className="btn btn-danger">Watch Trailer</button>
            </div>
            <div>
              <button className="btn btn-outline-light">
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="overview-buttons">
        <div>
          <button
            className="btn overview-buttons-1 mr-4"
            onClick={() => setPage(0)}
          >
            Overview
          </button>
        </div>
        <div>
          <button
            className="btn overview-buttons-2 ml-4 mr-4"
            onClick={() => setPage(1)}
          >
            Characters
          </button>
        </div>
        <div>
          <button
            className="btn overview-buttons-4 ml-4"
            onClick={() => setPage(2)}
          >
            Review
          </button>
        </div>
      </div>
      {page === 1 ? (
        <div className="main-characters">Characters</div>
      ) : page === 2 ? (
        <div className="main-review">Review</div>
      ) : (
        <div className="main-overview">
          <div className="main-overview-text">Synopsis</div>
          <div className="main-overview-border mb-2"></div>
          <div>{dataMovie.synopsis}</div>
          <div className="main-overview-text pt-5">Movie Info</div>
          <div className="main-overview-border mb-2"></div>
          <div className="pb-5">
            <span className="font-weight-bold">Release Date</span> :{' '}
            {dataMovie.releaseDate} <br />
            <span className="font-weight-bold">Director</span> :{' '}
            {dataMovie.director}
            <br />
            <span className="font-weight-bold">Featured Song</span> :{' '}
            {dataMovie.featuredSong} <br />
            <span className="font-weight-bold">Budget</span> :{' '}
            {dataMovie.budget} <br />
            <span className="font-weight-bold">Genre</span> : {dataMovie.genre}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Overview;
