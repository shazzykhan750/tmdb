import React, { useEffect } from "react";
import Login from "./Login";
import Browser from "./Browser";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { loadSession } from "../utils/sessionManager";
import WatchPage from "./WatchPage";
import Favorites from "./Favorites";

const Body = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const savedUser = window.localStorage.getItem("user");
      if (savedUser) {
        const userData = JSON.parse(savedUser);

        const now = new Date().getTime();
        const timestamp = userData.timestamp || 0;
        const isValid = now - timestamp < 24 * 60 * 60 * 1000;

        if (isValid) {
          dispatch(addUser(userData));
        } else {
          window.localStorage.removeItem("user");
        }
      }
    } catch (error) {
      console.error("Error restoring session:", error);
    }
  }, [dispatch]);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browser",
      element: <Browser />,
    },
    {
      path: "/watchpage/:resId",
      element: <WatchPage />,
    },
    {
      path: "/favorites",
      element: <Favorites />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
