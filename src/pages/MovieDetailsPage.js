import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Card } from "antd";

export default function MovieDetailsPage(props) {
  const initialMovieState = {
    movie: {},
    loading: true
  };
  const [movie, setMovie] = useState(initialMovieState);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const composeThumbnail = imageName =>
      `http://image.tmdb.org/t/p/w185/${imageName}`;
    const getMovieData = async () => {
      const { data } = await axios(
        `https://api.themoviedb.org/3/movie/${
          props.match.params.id
        }?api_key=${apiKey}`
      );
      data.poster_path = composeThumbnail(data.poster_path);
      data.backdrop_path = composeThumbnail(data.backdrop_path);
      setMovie(data);
    };
    getMovieData();
  }, []);

  return movie.loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div className="background-black padding-five">
        <Link to="/" className="white sans">
          <h2 className="white sans"> &#8592; Movie Details </h2>
        </Link>
      </div>
      <div className="movie-header padding-five">
        <span>{movie.title}</span>
      </div>
      <div className="movie-body padding-five">
        <div className="poster float-left">
          <img className="poster-img fillparent" src={movie.poster_path} alt="poster" />
        </div>
        <Card style={{ maxWidth: "48%", float: "right" }}>
          <Card.Grid className="gridStyle">
            {new Date(movie.release_date).getFullYear()}
          </Card.Grid>
          <Card.Grid className="gridStyle"> {movie.runtime} min</Card.Grid>
          <Card.Grid className="gridStyle"> {movie.vote_average}/10</Card.Grid>
        </Card>
        <Button
          type="primary"
          size="large"
          style={{ width:"48%", fontSize: "1em" ,maxWidth: "48%", float: "right" }}
        >
          MARK AS FAVORITE
        </Button>
        <div style={{ clear: "both" }}> </div>
        <div>
          <Card title="Overview" bordered={true} style={{ width: "100%" }}>
            <p>{movie.overview}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
