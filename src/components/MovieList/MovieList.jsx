import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function MovieList() {
  const history = useHistory(); // history is used for switching pages via routing
  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies); // movies is an array of all the movies in the movies table in the database

  // this useEffect sends a request to the redux store to get the list of movies from the database
  useEffect(() => {dispatch({ type: 'FETCH_MOVIES' });}, []);

  // handleClick takes the ID of the chosen movie and store it, then moves the user to the MovieDetails page
  function handleClick(id) {
    dispatch({ type: "CAPTURE_MOVIE", payload: id});
    history.push('/details');
  }

  return (
    <main>
      <h1>MovieList</h1>
      <section className="movies">
        {movies.map(movie => {
          return (
            <div data-testid='movieItem' key={movie.id}>
              <h3>{movie.title}</h3>
              <img data-testid="toDetails" onClick={() => handleClick(movie.id)} src={movie.poster} alt={movie.title}/>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;
