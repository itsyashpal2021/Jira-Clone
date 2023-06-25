import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { Container, Typography } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h2>This is /</h2>,
    errorElement: <ErrorBoundry />,
  },
]);

function ErrorBoundry() {
  let error = useRouteError();
  console.error(error);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
