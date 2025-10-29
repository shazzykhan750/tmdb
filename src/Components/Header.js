import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase"; // Import the auth object from firebase.js
import { useDispatch } from "react-redux";
import { addUser, removerUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { toggeleGptSearch } from "../utils/gptSlice";
import { SUPPORTDE_LANGUAGES } from "../utils/constatns";
import { changeLanguage } from "../utils/confgSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        dispatch(removerUser()); // Remove user from the store

        // Navigate to the login page
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out: ", error);
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = auth.currentUser;

        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          }),
          // Navigate to the browser page
          navigate("/browser")
        );

        // Remove user from the store
        // Navigate to the login page
      } else {
        dispatch(removerUser());
        navigate("/");
      }
    });
    return () => {
      unsubscribe(); // Unsubscribe from the auth state listener when the component unmounts
    };
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggeleGptSearch());
  };
  const changeLanguages = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(changeLanguage(selectedLanguage));
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black  z-10 flex justify-between   flex-col md:flex-row items-center">
      <img
        className="w-60 ml-20"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
      {user && (
        <div className="flex mr-10 items-center">
          <p className="text-2xl px-5 font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-fadeIn">
            {user.displayName}
          </p>
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
