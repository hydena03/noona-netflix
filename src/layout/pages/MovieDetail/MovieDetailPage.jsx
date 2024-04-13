import React from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row, Spinner, Alert } from "react-bootstrap";
import "./MovieDetailPage.style.css";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";

const MovieDetailPage = () => {
  const { id } = useParams();
  const apiKey = process.env.REACT_APP_API_KEY;
  const queryClient = new QueryClient(); // QueryClient 대문자로 수정

  const { data, isLoading, isError, error } = useQuery(["movie", id], () =>
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`).then((res) => res.json())
  );

  if (isLoading) {
    return (
      <div className="spinner-area">
        <Spinner animation="border" variant="danger" style={{ width: "5rem", height: "5rem" }} />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Container>
      <Row>
        <Col xs={12} lg={6}>
          <img className="w-80" src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${data.poster_path}`} alt={data.title} />
        </Col>
        <Col xs={12} lg={6}>
          <div className="d-flex mb-4">
            {data?.genres.map((genre, index) => (
              <div className="movie-badge me-2" key={index}>
                {genre.name}
              </div>
            ))}
          </div>
          <h1 className="movie-title">{data.title}</h1>
          <h3>{data.tagline}</h3>
          <div className="py-4 movie-number border-bottom border-white">
            <span>
              <img src="/IMDB.png" width={30} className="me-1" alt="IMDB" />
              {data.vote_average}
            </span>
            <span>
              <img src="/people4.png" width={30} className="ms-3 me-1" alt="popularity" />
              {data.popularity}
            </span>
            <span>
              {data.adult ? <img src={"/over18.svg"} width={30} className="ms-2" alt="adult" /> : <img src={"/under18.svg"} width={30} className="ms-2" alt="not adult" />}
            </span>
          </div>
          <div className="py-4 border-bottom border-white">{data.overview}</div>
          <div className="py-4">
            <div className="d-flex align-items-center mb-2">
              <div className="movie-detail-badge me-2">Budget</div>
              <div>$ {new Intl.NumberFormat().format(data.budget)}</div>
            </div>
            <div className="d-flex align-items-center mb-2">
              <div className="movie-detail-badge me-2">Revenue</div>
              <div>$ {new Intl.NumberFormat().format(data.revenue)}</div>
            </div>
            <div className="d-flex align-items-center mb-2">
              <div className="movie-detail-badge me-2">Release Date</div>
              <div>{data.release_date}</div>
            </div>
            <div className="d-flex align-items-center mb-2">
              <div className="movie-detail-badge me-2">Run time</div>
              <div>{data.runtime}분</div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const MovieDetailPageWithQueryClient = () => (
  <QueryClientProvider client={QueryClient}>
    <MovieDetailPage />
  </QueryClientProvider>
);

export default MovieDetailPageWithQueryClient;
