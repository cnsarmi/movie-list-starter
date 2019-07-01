import React from 'react';
import MovieListEntry from './MovieListEntry.jsx';

const MovieList = (props) => (
    <div className="movie-list">
      {props.movies.map(movie =>
        <MovieListEntry movie={movie} toggleWatch={props.toggleWatch}/>
        )}
    </div>
)

export default MovieList;