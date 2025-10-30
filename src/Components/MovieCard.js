import React from "react";
import { IMG_CDN_URL } from "../utils/constatns";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../utils/favoritesSlice";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((s) => s.favorites?.favorites || []);

  if (!movie) return null;

  const {
    poster_path,
    title,
    original_title,
    overview,
    popularity,
    release_date,
  } = movie || {};
  console.log("Movie in MovieCard:", movie);
  const isFav = favorites.some((m) => m.id === movie.id);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isFav) dispatch(removeFavorite(movie.id));
    else dispatch(addFavorite(movie));
  };

  return (
    <div className="w-48 pr-2">
      <div className="relative group">
        <button
          onClick={toggleFavorite}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          className="absolute top-2 right-2 z-20 bg-black bg-opacity-50 rounded-full p-1 text-xl text-white hover:bg-opacity-80"
        >
          {isFav ? "❤️" : "🤍"}
        </button>
        <img
          className="rounded-lg w-full"
          alt={title || original_title}
          src={
            poster_path
              ? `${IMG_CDN_URL}${poster_path}`
              : "https://via.placeholder.com/200x300?text=No+Image"
          }
        />

        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 rounded-b-lg">
          <h3 className="text-sm font-semibold">
            {title || original_title || "Untitled"}
          </h3>
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-90 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg overflow-y-auto">
          <h3 className="font-bold text-sm mb-2">{original_title}</h3>
          <p className="text-xs text-gray-300 mb-2">{release_date}</p>
          <p className="text-xs text-gray-300 mb-2">
            Popularity: {popularity ? popularity.toFixed(1) : "N/A"}
          </p>
          <p className="text-xs line-clamp-6 text-gray-200">{overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
