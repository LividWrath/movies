import React, {useState, useEffect } from "react";
import Snuggle from "react-snuggle";
import {Link } from "react-router-dom";
import axios from "axios";

export default function LandingPage() {
  const initialState = {
    movies: []
  };
  const [data, setData] = useState(initialState);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const popularMoviesUrl = `http://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
    const convertImageNameToUrl = imageName => {
      return `http://image.tmdb.org/t/p/w185/${imageName}`;
    };
    const getMoviesData = async () => {
      const { data } = await axios(popularMoviesUrl);
      return data;
    };

    getMoviesData().then(result => {
      let movies = result.results.map(movieData => {
        movieData.poster_path = convertImageNameToUrl(movieData.poster_path);
        movieData.backdrop_path = convertImageNameToUrl(
          movieData.backdrop_path
        );
        return movieData;
      });
      setData({ movies: movies });
    });
  }, []);

  const { movies } = data;

  const movieTiles = movies.map((movie, index) => {
    return (
      <Link to={`/movie/${movie.id}`}>
        <div className="fillparent">
          <img className="fillparent" src={movie.poster_path} alt="poster" />
        </div>
      </Link>
    );
  });
  return (
    <div className="padding-five background-black">
      <div>
        <h1 className="white sans">Popular movies</h1>
      </div>
      <Snuggle rowGap={7} columnWidth={100}>
        {movieTiles}
      </Snuggle>
    </div>
  );
}
