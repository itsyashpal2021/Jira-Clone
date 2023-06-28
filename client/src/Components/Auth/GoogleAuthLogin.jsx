import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Typography,
  TextField,
  Stack,
  FormHelperText,
  Modal,
} from "@mui/material";
import * as colors from "@mui/material/colors";
import { Google } from "@mui/icons-material";

import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

import { postToNodeServer } from "../../utils.js";
import { useNavigate } from "react-router-dom";

export default function GoogleAuthLogin() {
  const clientId =
    "170407840822-ptrb3fhk38v1h2srijp30a8mga17lku3.apps.googleusercontent.com";

  const [googleAuth, setGoogleAuth] = useState(undefined);
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const onGoogleLoginSuccess = async (response) => {
    const requestBody = {
      email: response.profileObj.email,
    };
    const res = await postToNodeServer("/user/googleAuth", requestBody);

    if (res.error) {
      if (res.error.statusCode !== 500) {
        setGoogleAuth(requestBody);
      }
      return;
    }
    localStorage.setItem("token", res.token);
    navigate("/home");
  };

  const onGoogleLoginFailure = (res) => {
    console.error(res);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      ...Object.fromEntries(new FormData(e.target)),
      ...googleAuth,
    };
    const res = await postToNodeServer("/user/setUsername", requestBody);

    if (res.error) {
      if (res.error.statusCode !== 500) {
        setFormError(res.error.message);
      }
      return;
    }
    localStorage.setItem("token", res.token);
    navigate("/home");
  };

  return (
    <>
      <GoogleLogin
        cookiePolicy="single_host_origin"
        clientId={clientId}
        onSuccess={onGoogleLoginSuccess}
        onFailure={onGoogleLoginFailure}
        render={(renderProps) => (
          <Button
            variant="contained"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            size="large"
            className="w-100 mb-3"
            color="success"
          >
            <Google className="me-2" />
            Sign in with Google
          </Button>
        )}
      />

      {/* prompt modal for username when signing in using google */}
      {googleAuth ? (
        <Modal
          open={googleAuth !== undefined}
          onClose={() => setGoogleAuth(undefined)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Grid
            item
            lg={4}
            md={6}
            sm={8}
            xs={11}
            p={2}
            className="rounded"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-51%, -50%)",
              width: "-webkit-fill-available",
              bgcolor: colors.cyan[200],
              border: "2px solid black",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="text-decoration-underline fw-bold"
              >
                Enter a username
              </Typography>
              <Button
                className="btn btn-close"
                onClick={() => {
                  setGoogleAuth(undefined);
                }}
              />
            </Stack>
            <form
              id="modal-modal-description"
              sx={{ mt: 2 }}
              className="d-flex flex-column"
              onSubmit={onSubmit}
            >
              <TextField
                label="Username"
                id="username"
                name="username"
                type="text"
                margin="dense"
                inputProps={{ className: "fw-bold bg-light" }}
                autoFocus
                error={formError !== ""}
                required
              />
              <FormHelperText error className="fw-bold">
                {formError}
              </FormHelperText>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Grid>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}
