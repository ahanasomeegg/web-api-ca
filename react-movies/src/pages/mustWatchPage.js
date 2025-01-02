import React, { useContext } from "react";
import { getMovie} from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from 'react-query';
import Spinner from '../components/spinner';
import RemoveFromMustWatch from "../components/cardIcons/removeFromMustWatch";


const MustWatchPage = () => {
    const {mustWatch: movieIds } = useContext(MoviesContext);
  
    // Create an array of queries and run in parallel.
    const mustWatchMovieQueries = useQueries(
      movieIds.map((movieId) => {
        return {
          queryKey: ["movie", { id: movieId }],
          queryFn: getMovie,
        };
      })
    );
    // Check if any of the parallel queries is still loading.
    const isLoading = mustWatchMovieQueries.find((m) => m.isLoading === true);
  
    if (isLoading) {
      return <Spinner />;
    }
  
    const movies = mustWatchMovieQueries.map((q) => {
      q.data.genre_ids = q.data.genres.map(g => g.id)
      return q.data
    });
  
    const toDo = () => true;
  
    return (
      <PageTemplate
        title="Must Watch"
        movies={movies}
        action={(movie) => {
          return <RemoveFromMustWatch movie={movie} />
        }}
      />
    );
  };
  
  export default MustWatchPage ;