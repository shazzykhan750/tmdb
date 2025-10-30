import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removerUser } from "../utils/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toggeleGptSearch } from "../utils/gptSlice";
import { SUPPORTDE_LANGUAGES } from "../utils/constatns";
import { changeLanguage } from "../utils/confgSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(removerUser());
        try {
          localStorage.removeItem("session");
        } catch (e) {
          console.warn("[auth] error removing session from localStorage:", e);
        }
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = auth.currentUser || {};
        const payload = {
          uid: uid || user.uid,
          email: email || user.email || "",
          displayName: displayName || user.displayName || "",
          photoURL: photoURL || user.photoURL || "",
          provider: user.providerData?.[0]?.providerId || "unknown",
        };

        dispatch(addUser(payload));
        try {
          localStorage.setItem("session", JSON.stringify(payload));
        } catch (e) {
          console.warn(
            "[auth] onAuthStateChanged - could not save session:",
            e
          );
        }

        if (window.location.pathname !== "/browser") {
          navigate("/browser");
        }
      } else {
        dispatch(removerUser());
        try {
          localStorage.removeItem("session");
        } catch (e) {
          console.warn(
            "[auth] onAuthStateChanged - could not remove session:",
            e
          );
        }

        if (window.location.pathname !== "/") {
          navigate("/");
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch, navigate]);

  const handleGptSearchClick = () => {
    dispatch(toggeleGptSearch());
  };

  const openFavorites = () => {
    navigate("/favorites");
  };

  const changeLanguages = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(changeLanguage(selectedLanguage));
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black  z-10 flex justify-between   flex-col md:flex-row items-center">
      <img
        className="w-60 ml-20"
        src="https://cdn.cookielaw.org/logos/fe65a9cb-9e2b-4d74-a8ff-1443aee49ffb/53433444-4f4a-4301-9ad8-c0515ad1e9cf/74077dc2-f2a9-4666-9f02-be7d89b542d9/tmdb_logo.png"
        alt="logo"
      />
      {user && (
        <div className="flex mr-10 items-center">
          <p className="text-2xl px-5 font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-fadeIn">
            {user.displayName}
          </p>
          <button
            onClick={openFavorites}
            className="px-3 py-2 mr-2 bg-yellow-600 text-black rounded font-semibold"
            title="Favorites"
          >
            ★ Favorites
          </button>
          {showGptSearch && (
            <select
              name=""
              id=""
              className="p-2 m-2 bg-gray-800 text-white rounded-lg"
              onChange={changeLanguages}
            >
              {SUPPORTDE_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="px-4 py-2 mx-4 bg-purple-800  my-2 text-white rounded-lg cursor-pointer"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "HomePage" : "GPT Search"}
          </button>
          <img
            className="w-12 h-12  mr-4"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="user_logo"
          />

          <button
            onClick={handleLogout}
            className="px-2 py-1 cursor-pointer bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
