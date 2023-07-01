import { AddSharp } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import * as colors from "@mui/material/colors";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeLink = location.pathname.split("/")[1];

  useEffect(() => {
    if (activeLink === "") navigate("/home");
  }, [activeLink, navigate]);

  return (
    <Stack bgcolor={colors.blueGrey[50]} px={1}>
      <Button
        sx={{
          whiteSpace: "nowrap",
          color: "black",
          bgcolor: activeLink === "home" ? colors.blue[400] : "transparent",
          "&:hover": {
            bgcolor:
              activeLink === "home" ? colors.blue[400] : colors.blue[200],
          },
        }}
        size="small"
        onClick={() => {
          navigate("/home");
        }}
      >
        Home
      </Button>
      <Button
        sx={{
          whiteSpace: "nowrap",
          mt: 1,
          color: "black",
          "&:hover": {
            bgcolor:
              activeLink === "myProjects" ? colors.blue[400] : colors.blue[200],
          },
          bgcolor:
            activeLink === "myProjects" ? colors.blue[400] : "transparent",
        }}
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
        sx={{ whiteSpace: "nowrap", mt: 3 }}
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
