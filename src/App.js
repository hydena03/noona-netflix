import { Routes, Route } from 'react-router-dom';
import AppLayout from "./layout/AppLayout";
import Homepage from "./layout/pages/Homepage/Homepage"; 
import MoviePage from "./layout/pages/Movies/MoviePage";
import MovieDetailPage from "./layout/pages/MovieDetail/MovieDetailPage";
import NotFoundPage from "./layout/pages/NotFoundPage/NotFoundPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";


//홈페이지 /
//영화전체 페이지(서치가능) /movies
//영화 디테일 페이지 /movies/:id
//추천영화 / movies/:id?/recommandation
//리뷰 /movies/:id/reviews

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>  
        <Route index element={<Homepage />} />
        <Route path="movies">
          <Route index element={<MoviePage/>}/>
          <Route path=":id" element={<MovieDetailPage/>}/>
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage/>}/> 
    </Routes>
  );
}

export default App;
