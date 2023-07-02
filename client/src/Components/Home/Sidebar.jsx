import { AddSharp } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import * as colors from "@mui/material/colors";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeLink = location.pathname.split("/")[1];

  const sideBarButtonStyle = (id) => {
    return {
      whiteSpace: "nowrap",
      color: "black",
      mt: 1,
      bgcolor: activeLink === id ? colors.blue[400] : "transparent",
      "&:hover": {
        bgcolor: activeLink === id ? colors.blue[400] : colors.blue[200],
      },
    };
  };

  useEffect(() => {
    if (activeLink === "") navigate("/home");
  }, [activeLink, navigate]);

  return (
    <Stack bgcolor={colors.blueGrey[50]} px={1}>
      <Button
        sx={sideBarButtonStyle("home")}
        size="small"
        onClick={() => {
          navigate("/home");
        }}
      >
        Home
      </Button>
      <Button
        sx={sideBarButtonStyle("myProjects")}
        size="small"
        onClick={() => {
          navigate("/myProjects");
        }}
      >
        My Projects
      </Button>
      <Button
        color="primary"
        variant="contained"
        sx={{ whiteSpace: "nowrap", mt: 5 }}
        size="large"
        onClick={() => {
          navigate("/newProject");
        }}
      >
        <AddSharp /> Create Project
      </Button>
    </Stack>
  );
}
