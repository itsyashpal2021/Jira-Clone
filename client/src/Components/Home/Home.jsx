import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postToNodeServer } from "../../utils";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import Navbar from "./Navbar";

export default function Home() {
  const [userDetails, setUserDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("token");
      if (!token) navigate("/login");

      const res = await postToNodeServer("/user/checkSession", { token });
      if (res.error) navigate("/login");
      else setUserDetails({ ...res.userDetails });
    };

    checkSession();
  }, [navigate]);
  return (
    <Box>
      {userDetails ? (
        <Box>
          <Navbar userDetails={userDetails} />
        </Box>
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
