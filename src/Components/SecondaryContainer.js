import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store?.movies);

  if (!movies || movies.length === 0) return null;
  return (
    <div className="  bg-black ">
      <div className=" pl-17 relative top-[-250px] z-20">
        <MovieList title={"Popular"} movies={movies?.popularMovies} />
        <MovieList title={"Popular"} movies={movies?.popularMovies} />
        <MovieList title={"top Rated"} movies={movies?.topRatedMovies} />
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
