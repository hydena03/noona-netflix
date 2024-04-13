import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../../hooks/useSearchMovie";
import { Col, Container, Row, Spinner, Alert, Form } from "react-bootstrap";
import MovieCard from "../../../common/MovieCard/MovieCard";
import "./MoviePage.style.css";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState(query.get("q"));
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const { isLoading, isError, error, data: searchData } = useSearchMovieQuery({
    keyword,
    page,
  });

  useEffect(() => {
    if (searchData) {
      const genres = new Set();
      searchData.results.forEach((movie) => {
        movie.genre_ids.forEach((genreId) => {
          genres.add(genreId);
        });
      });
      setGenreList(Array.from(genres));
      setFilteredMovies(searchData.results);
    }
  }, [searchData]);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    if (e.target.value === "") {
      setFilteredMovies(searchData.results);
    } else {
      const filtered = searchData.results.filter((movie) =>
        movie.genre_ids.includes(parseInt(e.target.value))
      );
      setFilteredMovies(filtered);
    }
  };


  const getGenreName = (genreId) => {
    switch (genreId) {
      case 28:
        return "액션";
      case 12:
        return "모험";
      case 16:
        return "애니메이션";
      case 35:
        return "코미디";
        case 99:
          return "다큐멘터리";
        case 18:
          return "드라마";
        case 10751:
          return "가족";
        case 14:
          return "판타지";
        case 36:
          return "역사";
        case 27:
          return "공포";
        case 10402:
          return "음악";
        case 9648:
          return "미스터리";
        case 10749:
          return "로맨스";
        case 878:
          return "SF";
        case 10770:
          return "TV 영화";
        case 53:
          return "스릴러";
        default:
          return "기타";
      
    }
  };
  
  const filterGenre = (genreId) => {
    const etcGenres = [28, 12, 16, 35];
    if (!etcGenres.includes(genreId)) {
      return "기타";
    }
    return getGenreName(genreId);
  };
  
  
  if (isLoading) {
    return (
      <div className="spinner-area">
        <Spinner
          animation="border"
          variant="danger"
          style={{ width: "5rem", height: "5rem" }}
        />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          <Form.Group controlId="genreSelect">
            <Form.Label>장르 선택</Form.Label>
            <Form.Control as="select" onChange={handleGenreChange} value={selectedGenre}>
              <option value="">모든 장르</option>
              {genreList.map((genreId) => (
                <option key={genreId} value={genreId}>
                  {getGenreName(genreId)}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {filteredMovies.map((movie, index) => (
              <Col lg={3} xs={6} key={index} className="movie-card-box">
                <Link to={`/movies/${movie.id}`}>
                  <MovieCard movie={movie} />
                </Link>
              </Col>
            ))}
          </Row>
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={searchData?.total_pages}
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
