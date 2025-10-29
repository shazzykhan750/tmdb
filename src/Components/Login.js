import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase"; // Import the auth object from firebase.js
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Import useDispatch from react-redux

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null); // Ref for the name input field

  const handleSignUp = () => {
    setIsSignInForm((prev) => !prev);
  };
  const handleButtonClick = (e) => {
    e.preventDefault(); // Prevent form submission

    const message = checkValidData(email.current.value, password.current.value);
    if (message) {
      setErrorMessage(message);
      return;
    } else {
      setErrorMessage(null);
    } // Clear error message if validation passes
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;

              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
                // Navigate to the browser page
              );
              navigate("/browser");
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
          // Navigate to the browser page
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " -" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          navigate("/browser"); // Navigate to the browser page
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " -" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="relative">
        <img
          className="w-full h-screen object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/98df3030-1c2b-4bd1-a2f5-13c611857edb/web/IN-en-20250331-TRIFECTA-perspective_247b6f06-c36d-4dff-a8eb-4013325c3f8e_large.jpg"
          alt="background-img"
        />

        {/* Centered form using flexbox */}
        <div className="absolute inset-0 flex justify-center items-center">
          <form className="bg-black/60 p-10 rounded text-white w-[400px]">
            <h1 className="text-3xl font-bold px-2 mb-4">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>

            {/* Name field (only shown for Sign Up) */}
            {!isSignInForm && (
              <input
                ref={name}
                type="text"
                placeholder="Name"
                className={`py-3 px-2 m-2 w-full rounded text-white bg-black/60 border border-white transition-all duration-300 `}
              />
            )}

            {/* Common Fields */}
            <input
              ref={email}
              type="email"
              placeholder="Email"
              className="py-3 px-2 m-2 w-full rounded text-white bg-black/60 border border-white"
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="py-3 px-2 m-2 w-full rounded text-white bg-black/60 border border-white"
            />
            <p className="px-2 font-bold text-red-500">{errorMessage}</p>

            <button
              className="py-3 m-2 w-full bg-red-600 text-white rounded cursor-pointer hover:bg-red-700 transition-all duration-300"
              onClick={handleButtonClick}
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>

            <p className="py-3 m-2 text-center">
              {isSignInForm ? "New to Netflix?" : "Already registered?"}{" "}
              <span
                onClick={handleSignUp}
                className={`font-bold cursor-pointer ${
                  isSignInForm ? "text-white" : "text-red-600"
                }`}
              >
                {isSignInForm ? "Sign Up Now" : "Sign In Now"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
