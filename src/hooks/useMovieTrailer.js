import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constatns";
import { addMovieTrailer } from "../utils/movieSlice";
import { useDispatch } from "react-redux";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const getMovieVideo = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );

    const data = await response.json();

    const filterData = data?.results?.filter(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    const trailer = filterData.length ? filterData[0] : data?.results[0];

    dispatch(addMovieTrailer(trailer));
  };
  useEffect(() => {
    getMovieVideo();
  }, []);
};

export default useMovieTrailer;
