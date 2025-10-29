import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";

import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies.nowPlayingMovies);

  if (!movies || movies.length === 0) return null; // Ensure movies exist and are not empty

  const mainMovie = movies[0]; // Get the first movie
  const { overview, original_title, id } = mainMovie; // Destructure the movie object

  return (
    <div>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
