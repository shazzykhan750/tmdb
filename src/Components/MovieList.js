import React, { useState } from "react";
import MovieCard from "./MovieCard";

import { Link } from "react-router-dom";

const MovieList = ({ title, movies }) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!movies || movies.length === 0) return null;

  // Filter movies based on search query
  const filteredMovies = movies.filter(
    (movie) =>
      movie.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.original_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.overview?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("Movies in MovieList:", movies);

  return (
    <div className="px-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl text-white">{title}</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-600 w-64"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="flex overflow-x-scroll hide-scrollbar">
        <div className="flex">
          {filteredMovies.map((movie) => (
            <Link to={`/watchpage/${movie.id}`} key={movie.id}>
              <MovieCard movie={movie} key={movie.id} />
            </Link>
          ))}
          {filteredMovies.length === 0 && searchQuery && (
            <div className="text-white text-center w-full py-4">
              No movies found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
