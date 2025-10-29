import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[15%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>

      <p className="text-lg font-bold w-[40%] mt-4 line-clamp-4 overflow-hidden">
        {overview}
      </p>

      <div className="mt-6 flex gap-4">
        <button className="cursor-pointer px-10 py-2 text-lg text-black bg-white font-bold rounded-lg hover:bg-gray-200">
          ▶ Play
        </button>
        <button className="cursor-pointer px-10 py-2 text-lg text-white bg-gray-500 bg-opacity-50 hover:bg-opacity-90 rounded-lg">
          ℹ More Info
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;
