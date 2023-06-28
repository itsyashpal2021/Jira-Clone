import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postToNodeServer } from "../../utils";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import * as colors from "@mui/material/colors";

export default function Home() {
  const [sessionActive, setSessionActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("token");
      if (!token) navigate("/login");

      const res = await postToNodeServer("/user/checkSession", { token });
      if (res.error) navigate("/login");
      else setSessionActive(true);
    };

    checkSession();
  }, [navigate]);
  return (
    <Box>
      {sessionActive ? (
        <h2>welcome to Home</h2>
      ) : (
        <Backdrop
          sx={{
            bgcolor: "#d2d0d0",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={true}
        >
          <CircularProgress color="info" />
        </Backdrop>
      )}
    </Box>
  );
}
