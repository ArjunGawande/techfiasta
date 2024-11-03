import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./navbar";
import Signup from "./signup";
import Login from "./login";
import LandingPage from "./landing";
import Dashboard from "./dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />, // No Navbar for the landing page
    },
    {
      path: "/signup",
      element: <><Navbar /><Signup /></>, // Navbar will show on signup
    },
    {
      path: "/login",
      element: <><Navbar /><Login /></>, // Navbar will show on login
    },
    {
        path: "/dashboard",
        element: <><Navbar/><Dashboard /></>, // Ensure you have a Dashboard component
    },
    // Add more routes as needed
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
