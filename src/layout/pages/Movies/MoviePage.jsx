import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../../hooks/useSearchMovie";
import { Col, Container, Row, Spinner, Alert } from "react-bootstrap";
import MovieCard from "../../../common/MovieCard/MovieCard";
import "./MoviePage.style.css";
import api from "../../../utils/api";


//경로 2가지
// navbar클릭 => popularMovie 보여줌
//keyword입력 => 관련영화 보여줌

//페이지네이션 설치
//  page state 만들기
// page 값이 바뀔때마다 useSearchMovie에 page까지 넣어서  fetch

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");


  const { isLoading, isError, error, data: searchData } = useSearchMovieQuery({ keyword });

  if (isLoading) {
    return (
      <div className="spinner-area">
        <Spinner 
        animation="border" 
        variant="danger" 
        style={{ width: "5rem", height: "5rem" }} />
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
          {" "}
          필터{" "}
        </Col>

        <Col lg={8} xs={12}>
          <Row>
          {searchData?.result && searchData.result.map((movie, index) => (
  <Col key={index} lg={4} xs={12}>
    <MovieCard movie={movie} />
  </Col>
))}

          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
