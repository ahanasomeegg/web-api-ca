import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [releaseYearFilter, setReleaseYearFilter] = useState(""); 
  const [ratingSort, setRatingSort] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      // by year
      const releaseYear = m.release_date ? m.release_date.split("-")[0] : null;
      return releaseYearFilter ? releaseYear === releaseYearFilter : true;
    })
    .sort((a, b) => {
      // by rating
      if (ratingSort === "high") return b.vote_average - a.vote_average; 
      if (ratingSort === "low") return a.vote_average - b.vote_average; 
      return 0; 
    });

    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const paginatedMovies = displayedMovies.slice(startIndex, endIndex);

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "releaseYear") setReleaseYearFilter(value); 
    else if (type === "rating") setRatingSort(value); 
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            releaseYearFilter={releaseYearFilter} 
            ratingFilter={ratingSort}
          />
        </Grid>
        <MovieList action={action} movies={paginatedMovies}></MovieList>
        <Pagination
            count={Math.ceil(displayedMovies.length / moviesPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{
              position: "fixed", 
              bottom: "20px", 
              left: "50%", 
              transform: "translateX(-50%)", 
              zIndex: 1000, 
            }}
          />
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;