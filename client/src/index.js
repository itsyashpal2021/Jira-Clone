import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { Container, Typography } from "@mui/material";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import Home from "./Components/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/home"} />,
    errorElement: <ErrorBoundry />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

function ErrorBoundry() {
  let error = useRouteError();
  console.error(error.data);
  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      sx={{
        minHeight: "100vh",
      }}
    >
      <img
        src={require("./Images/404-error.jpg")}
        alt="404-error"
        title="404 error"
        style={{ maxWidth: "500px", mixBlendMode: "multiply" }}
      />
      <Typography variant="h3" textAlign={"center"} color={"error.main"}>
        Page not found.
      </Typography>
    </Container>
  );
}

const root = document.getElementById("root");
root.style.minHeight = window.innerHeight + "px";
window.onresize = () => {
  root.style.minHeight = window.innerHeight + "px";
};

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
