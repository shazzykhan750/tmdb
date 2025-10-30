import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useSelector, useDispatch } from "react-redux";
import { addGptMovie } from "../utils/gptSlice";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constatns";

const GptSearchBar = () => {
  const searchText = useRef();
  const selectedLanguage = useSelector((store) => store.confg.lang);
  const dispatch = useDispatch();

  const fetchTmdbByFilters = async ({
    genre,
    language,
    release_year,
    sort_by,
  }) => {
    let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=${
      language || "en-US"
    }&sort_by=${sort_by || "popularity.desc"}`;

    if (release_year === "latest") {
      url += `&sort_by=release_date.desc`;
    }
    if (genre) {
      const genreMap = {
        action: 28,
        adventure: 12,
        animation: 16,
        comedy: 35,
        crime: 80,
        documentary: 99,
        drama: 18,
        family: 10751,
        fantasy: 14,
        history: 36,
        horror: 27,
        music: 10402,
        mystery: 9648,
        romance: 10749,
        sciencefiction: 878,
        thriller: 53,
        war: 10752,
        western: 37,
      };
      const genreId = genreMap[genre.toLowerCase().replace(/\s/g, "")];
      if (genreId) url += `&with_genres=${genreId}`;
    }

    const response = await fetch(url, API_OPTIONS);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return data.results;
  };

  const fetchTmdbMovies = async (movie) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return data.results;
  };

  const handleClickGptSerach = async () => {
    const userInput = searchText.current.value.trim();
    if (!userInput) return alert("Please enter a movie topic.");

    const gptResult = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a movie search assistant. Extract search filters from user input for querying a movie API.`,
        },
        {
          role: "user",
          content: `User query: "${userInput}". 

Return a JSON with:
{
  "genre": "...",
  "language": "...",
  "release_year": "...",
  "sort_by": "..."
}`,
        },
      ],
      model: "openai/gpt-oss-20b",
    });

    const gptText = gptResult.choices[0]?.message?.content;

    let filters;
    try {
      filters = JSON.parse(gptText);
    } catch (error) {
      console.warn(
        "GPT didn't return valid JSON. Falling back to keyword search."
      );
    }

    let tmdbResults;
    let gptMovies = [];

    if (filters && typeof filters === "object") {
      tmdbResults = await fetchTmdbByFilters(filters);
    } else {
      const backupGpt = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Give me a list of movies related to "${userInput}". Only return names in a bullet list.`,
          },
        ],
        model: "openai/gpt-oss-20b",
      });

      const text = backupGpt.choices[0]?.message?.content;
      gptMovies = text.split("\n").filter((m) => m.trim() !== "");
      const promiseArray = gptMovies.map((movie) => fetchTmdbMovies(movie));
      const resultsArray = await Promise.all(promiseArray);
      tmdbResults = resultsArray.flat();
    }

    dispatch(
      addGptMovie({
        tmdbMovieResults: tmdbResults || [],
        moviesName: gptMovies,
      })
    );
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-1/2 bg-black grid grid-cols-12"
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[selectedLanguage].gptSearchPlaceHolder}
          className="p-4 m-4 col-span-9 bg-white rounded-lg text-black placeholder:text-gray-500 border-none focus:outline-none"
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 rounded-lg text-white hover:bg-red-800 transition duration-300 cursor-pointer"
          onClick={handleClickGptSerach}
        >
          {lang[selectedLanguage].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
