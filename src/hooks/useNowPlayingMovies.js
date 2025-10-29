import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constatns";
import { addNowPlayingMovies } from "../utils/movieSlice";

const useNowPlayingMovies = () => {
  const nowPalyingMovie = useSelector((store) => store.movies.nowPlayingMovies);
  const dispatch = useDispatch();
  const movieListFetch = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      API_OPTIONS
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    dispatch(addNowPlayingMovies(data.results));
  };
  useEffect(() => {
    if (!nowPalyingMovie) movieListFetch();
  }, []);
};

export default useNowPlayingMovies;
