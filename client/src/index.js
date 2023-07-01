import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { Container, Typography } from "@mui/material";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import Home from "./Components/Home/Home";
import CreateProject from "./Components/Home/CreateProject";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "170407840822-ptrb3fhk38v1h2srijp30a8mga17lku3.apps.googleusercontent.com";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorBoundry />,
    children: [
      {
        path: "/home",
        element: <h2>welcome to home</h2>,
      },
      {
        path: "/myProjects",
        element: <h2>welcome to myProjects</h2>,
      },
      {
        path: "/newProject",
        element: <CreateProject />,
      },
    ],
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
  <GoogleOAuthProvider clientId={clientId}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
