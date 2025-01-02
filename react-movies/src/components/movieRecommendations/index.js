import React from "react";
import { useQuery } from "react-query";
import { getMovieRecommendations } from "../../api/tmdb-api";
import Spinner from "../spinner";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

const RecommendationList = ({ movieId }) => {
  const {
    data: recommendations,
    error,
    isLoading,
    isError,
  } = useQuery(["recommendations", { id: movieId }], getMovieRecommendations);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography variant="h6" color="error">
      {error.message}
    </Typography>;
  }

  const limitedRecommendations = recommendations?.results?.slice(0, 2 * 4) || [];

  return (
    <div style={{ marginTop: "2rem", padding: "1rem" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Recommended Movies
      </Typography>
      {limitedRecommendations.length > 0 ? (
        <Grid container spacing={3}>
          {limitedRecommendations.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="300"
                    image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {movie.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Release Date: {movie.release_date}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">
          No recommendations available for this movie.
        </Typography>
      )}
    </div>
  );
};

export default RecommendationList;
