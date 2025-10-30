import React, { useRef, useState, useEffect } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { saveSession } from "../utils/sessionManager";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      localStorage.setItem("test", "test");
      const test = localStorage.getItem("test");
      if (test === "test") {
        localStorage.removeItem("test");
      } else {
        console.error("[Login] localStorage test failed - value mismatch");
      }
    } catch (e) {
      console.error("[Login] localStorage is not available:", e);
    }
  }, []);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const provider = new GoogleAuthProvider();

  const handleSignUp = () => {
    setIsSignInForm((prev) => !prev);
  };

  const saveSessionAndNavigate = (payload) => {
    try {
      dispatch(addUser(payload));

      window.localStorage.setItem(
        "user",
        JSON.stringify({
          ...payload,
          timestamp: new Date().getTime(),
        })
      );

      navigate("/browser");
    } catch (error) {
      console.error("Error saving session:", error);
      setErrorMessage("Failed to save session");
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const payload = {
        uid: user.uid,
        email: user.email || "",
        displayName:
          user.displayName || (user.email ? user.email.split("@")[0] : ""),
        photoURL: user.photoURL || "",
        provider: user.providerData?.[0]?.providerId || "google",
      };

      saveSessionAndNavigate(payload);
    } catch (error) {
      console.error("Google sign in error:", error);
      setErrorMessage(error.code + " - " + error.message);
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();

    const message = checkValidData(
      email.current?.value || "",
      password.current?.value || ""
    );
    if (message) {
      setErrorMessage(message);
      return;
    } else {
      setErrorMessage(null);
    }

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current?.value || "",
            photoURL: "",
          })
            .then(() => {
              const current = auth.currentUser;
              const payload = {
                uid: current.uid,
                email: current.email || "",
                displayName: current.displayName || name.current?.value || "",
                photoURL: current.photoURL || "",
                provider: "password",
              };

              saveSessionAndNavigate(payload);
            })
            .catch((error) => {
              console.error("updateProfile error:", error);
              setErrorMessage(error.code + " - " + error.message);
            });
        })
        .catch((error) => {
          console.error("createUser error:", error);
          setErrorMessage(error.code + " - " + error.message);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const u = userCredential.user;
          const payload = {
            uid: u.uid,
            email: u.email || "",
            displayName: u.displayName || "",
            photoURL: u.photoURL || "",
            provider: "password",
          };
          saveSessionAndNavigate(payload);
        })
        .catch((error) => {
          console.error("signIn error:", error);
          setErrorMessage(error.code + " - " + error.message);
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

        <div className="absolute inset-0 flex justify-center items-center">
          <form className="bg-black/60 p-10 rounded text-white w-[400px]">
            <h1 className="text-3xl font-bold px-2 mb-4">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>

            {!isSignInForm && (
              <input
                ref={name}
                type="text"
                placeholder="Name"
                className="py-3 px-2 m-2 w-full rounded text-white bg-black/60 border border-white transition-all duration-300"
              />
            )}

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

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="py-3 m-2 w-full bg-white text-black rounded cursor-pointer hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="google"
                className="w-5 h-5"
              />
              Sign in with Google
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
