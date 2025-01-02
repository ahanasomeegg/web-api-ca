import React from "react";
import { useQuery } from "react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const CreditsList = ({ movieId }) => {
  const {data: credits, error, isLoading, isError,} = 
  useQuery(["credits", { id: movieId }], getMovieCredits);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <Typography variant="h6" color="error">
        {error.message}
      </Typography>
    );
  }

  return (
    <div style={{ marginTop: "2rem", padding: "1rem" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Cast & Crew
      </Typography>
      <Typography variant="h6" component="h3" style={{ marginTop: "1rem" }}>
        Cast
      </Typography>
      <Grid container spacing={3}>
        {credits?.cast?.slice(0, 6).map((cast) => (
          <Grid item key={cast.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                alt={cast.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                <Link to={`/actor/${cast.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  {cast.name}
                </Link>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Character: {cast.character}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h6" component="h3" style={{ marginTop: "2rem" }}>
        Crew
      </Typography>
      <Grid container spacing={3}>
        {credits?.crew?.slice(0, 6).map((crew) => (
          <Grid item key={crew.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {crew.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Job: {crew.job}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CreditsList;
