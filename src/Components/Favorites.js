import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite, clearFavorites } from "../utils/favoritesSlice";
import { IMG_CDN_URL } from "../utils/constatns";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector((s) => s.favorites?.favorites || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bgUrl =
    "https://assets.nflxext.com/ffe/siteui/vlv3/98df3030-1c2b-4bd1-a2f5-13c611857edb/web/IN-en-20250331-TRIFECTA-perspective_247b6f06-c36d-4dff-a8eb-4013325c3f8e_large.jpg";

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl text-white mb-4">Favorites</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/browser")}
                className="px-3 py-2 bg-gray-200 text-black rounded"
              >
                Back to Browser
              </button>
              <button
                onClick={() => dispatch(clearFavorites())}
                className="px-3 py-2 bg-red-600 text-white rounded"
              >
                Clear all
              </button>
            </div>
          </div>

          {!favorites || favorites.length === 0 ? (
            <div className="p-8 text-white">No favorites yet.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {favorites.map((m) => (
                <div
                  key={m.id}
                  className="bg-gray-900 bg-opacity-80 p-2 rounded"
                >
                  <img
                    src={
                      m.poster_path
                        ? `${IMG_CDN_URL}${m.poster_path}`
                        : "https://via.placeholder.com/200x300?text=No+Image"
                    }
                    alt={m.title || m.original_title}
                    className="w-full rounded"
                  />
                  <h3 className="text-white mt-2">
                    {m.title || m.original_title}
                  </h3>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => navigate(`/watchpage/${m.id}`)}
                      className="px-2 py-1 bg-blue-600 text-white rounded"
                    >
                      Watch
                    </button>
                    <button
                      onClick={() => dispatch(removeFavorite(m.id))}
                      className="px-2 py-1 bg-red-600 text-white rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
