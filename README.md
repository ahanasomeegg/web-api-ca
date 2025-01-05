# Assignment 2 - Web API.

Name: Duan Li

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
 + nowPlaying movies 
 + toprated movies 
 + login and register in the front end
 + Front and back end integration

## Setup requirements.

npm install axios in react-movies folder 

## API Configuration

______________________
//back end
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb+srv://......
retryWrites=true&w=majority&appName=tasky
TMDB_KEY=...
SECRET=...
______________________

//front end
REACT_APP_TMDB_KEY=myKey
FAST_REFRESH=false
REACT_APP_API_BASE_URL=http://localhost:8080/api
## API Design


- /api/movies | GET | Gets a list of movies 
- /api/movies/{movieid} | GET | Gets a single movie 
- /api/movies/{movieid}/reviews | GET | Get all reviews for movie 
- /api/movies/{movieid}/reviews | POST | Create a new review for Movie 
- /api/movies/tmdb/upcoming | GET | get upcoming movies
- /api/movies/tmdb/topRated | GET | get topRated movies
- /api/movies/tmdb/nowPlaying | GET | get nowPlaying movies
- /api/movies/mongo/:id   GET | get id from mongo

## Security and Authentication

Give details of authentication/security implemented on the API (e.g. passport/sessions). Indicate which routes are protected.

## Integrating with React App

Describe how you integrated your React app with the API. List the views that use your Web API instead of the TMDB API. 
1.homepage    
${process.env.REACT_APP_API_BASE_URL}/movies

2.upcoming    
${process.env.REACT_APP_API_BASE_URL}/movies/tmdb/upcoming

3.nowplaying
${process.env.REACT_APP_API_BASE_URL}/movies/tmdb/nowPlaying

4.toprated
${process.env.REACT_APP_API_BASE_URL}/movies/tmdb/topRated

## Independent learning (if relevant)

Briefly explain any non-standard features developed for the app.   
