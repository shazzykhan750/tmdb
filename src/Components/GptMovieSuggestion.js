import React from "react";
import { useSelector } from "react-redux";
import { IMG_CDN_URL } from "../utils/constatns";

const GptMovieSuggestion = () => {
  const gptSuggestedMovies = useSelector(
    (store) => store?.gpt?.tmdbMovieResults
  );

  const flattenedMovies = gptSuggestedMovies?.flat() || [];

  if (!flattenedMovies || flattenedMovies.length === 0) return null;

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Movie Suggestions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {flattenedMovies
          .filter((movie) => movie.poster_path) // Only show movies with a poster
          .map((movie) => (
            <div
              key={movie.id}
              className="w-full  rounded-lg overflow-hidden shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              <div
                className="w-full 
               relative"
              >
                <img
                  src={IMG_CDN_URL + movie.poster_path}
                  alt={movie.title}
                  className="w-full h-[190%] object-cover "
                />
              </div>
              <div className="p-4 ">
                <h2 className="text-white  text-xl font-bold ">
                  {movie.title || "Untitled"}
                </h2>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
