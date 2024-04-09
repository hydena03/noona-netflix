import React from "react";
import "./MovieCard.style.css";
import Badge from "react-bootstrap/Badge";
import { useNavigate } from "react-router-dom";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { data: genreData } = useMovieGenreQuery();

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreDataNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id)
      return genreObj.name;
    });
    return genreDataNameList;
  };

  return (
    <div
      className="movie-card"
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}` +
          ")",
      }}
      onClick={() => navigate(`/movies/${movie.id}`)}
    >
      <div className="overlay p-2">
        <div>
          <h1>{movie.title}</h1>
          <div>
            {showGenre(movie.genre_ids).map((genre, index) => (
              <Badge bg="danger" key={index} className="me-1">
                {genre}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mt-2">
          <img src="/IMDB.png" width={20} className="me-1" />
          {movie.popularity}
          {movie.adult ? (
            <img src={"/over18.svg"} width={20} />
          ) : (
            <img src={"/under18.svg"} width={20} className="ms-2" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;