import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_OPTIONS } from "../utils/constatns";

const WatchPage = () => {
  const [videokey, setVideoKey] = useState(null);
  const { resId } = useParams();

  const videoFetchUrl = async (id) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        API_OPTIONS
      );
      if (!response.ok) {
        console.error("Video fetch failed", response.status);
        return;
      }
      const data = await response.json();

      // data.results is an array — pick the YouTube trailer if available
      const trailer =
        (data.results &&
          data.results.find(
            (r) => r.type === "Trailer" && r.site === "YouTube"
          )) ||
        (data.results && data.results[0]);

      const key = trailer?.key || null;
      setVideoKey(key);
      // Log the fetched key directly (state updates are async — don't rely on state immediately after set)
      console.log(key, "fetched video key");
    } catch (err) {
      console.error("Error fetching video:", err);
    }
  };

  useEffect(() => {
    if (!resId) return;
    videoFetchUrl(resId);
  }, [resId]);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      {/* Close button */}
      <button
        aria-label="Close"
        onClick={() => navigate("/browser")}
        className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-black bg-opacity-60 text-white text-2xl flex items-center justify-center hover:bg-opacity-80 cursor-pointer"
      >
        ×
      </button>

      {videokey ? (
        <iframe
          width="960"
          height="540"
          src={`https://www.youtube.com/embed/${videokey}?autoplay=1&rel=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="rounded-lg shadow-xl"
        />
      ) : (
        <div className="text-white">Loading video...</div>
      )}
    </div>
  );
};

export default WatchPage;
