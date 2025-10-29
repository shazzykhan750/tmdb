import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constatns";
import { addPopularMovies } from "../utils/movieSlice";

const usePopularMovies = () => {
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const dispatch = useDispatch();
  const popularMovieListFetch = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_OPTIONS
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    dispatch(addPopularMovies(data?.results));
  };
  useEffect(() => {
    if (!popularMovies) popularMovieListFetch();
  }, []);
};

export default usePopularMovies;
