import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { postToNodeServer } from "../../utils";
import { Backdrop, Box, CircularProgress, Stack } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

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
    <>
      {userDetails ? (
        <Box className="d-flex flex-column flex-fill">
          <Navbar userDetails={userDetails} />
          <Stack direction="row" flexGrow={1}>
            <Sidebar />
            <Box className="w-100 d-flex">
              <Outlet />
            </Box>
          </Stack>
        </Box>
      ) : (
        <Backdrop
          sx={{
            bgcolor: "#d2d0d0",
          }}
          open={true}
        >
          <CircularProgress color="info" />
        </Backdrop>
      )}
    </>
  );
}
