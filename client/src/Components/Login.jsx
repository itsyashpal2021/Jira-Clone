import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Grid,
  Button,
  Typography,
  TextField,
  Stack,
  Link,
  Divider,
  FormHelperText,
} from "@mui/material";
import * as colors from "@mui/material/colors";
import { VisibilityOff, Visibility } from "@mui/icons-material";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { postToNodeServer } from "../utils";
import GoogleAuthLogin from "./GoogleAuthLogin";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formValues = Object.fromEntries(new FormData(e.target));
    const res = await postToNodeServer("/user/login", formValues);
    if (res.error) {
      setFormError(
        res.error.statusCode !== 500
          ? res.error.message
          : "something went wrong"
      );
      return;
    }
    localStorage.setItem("token", res.token);
    navigate("/home");
  };

  return (
    <Grid
      container
      spacing={2}
      className="justify-content-center align-items-center flex-fill"
      bgcolor={colors.grey[300]}
    >
      <Grid
        item
        lg={4}
        md={6}
        sm={8}
        xs={11}
        p={2}
        border="2px solid black"
        className="rounded ms-3"
        bgcolor={colors.blue[50]}
      >
        <img
          src={require("../Images/login.jpg")}
          alt="login"
          style={{
            mixBlendMode: "multiply",
            maxHeight: "300px",
          }}
          className="mx-auto d-block"
        />

        {/* Login with google */}
        <GoogleAuthLogin />

        <Divider className="fw-medium">OR</Divider>

        <Typography
          variant="body1"
          className="text-decoration-underline text-center my-3 fw-bold"
        >
          Sign In with Email
        </Typography>

        <form className="d-flex flex-column" onSubmit={onSubmit}>
          <TextField
            label="Email"
            id="email"
            name="email"
            type="email"
            margin="dense"
            inputProps={{ className: "fw-bold bg-light" }}
            autoFocus
            required
          />
          <FormControl variant="outlined" margin="normal" required>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              id="password"
              name="password"
              className="fw-bold bg-light"
              required
            />
          </FormControl>
          <FormHelperText error className="fw-bold">
            {formError}
          </FormHelperText>
          <Button
            variant="contained"
            type="submit"
            size="large"
            className="mt-2"
          >
            Login
          </Button>
        </form>
        <Stack direction="row" justifyContent="space-between" my={2}>
          <Link
            href="/forgotPassword"
            underline="hover"
            variant="body1"
            color={colors.red[700]}
            className="fw-medium"
          >
            Forgot Password?
          </Link>
          <Link
            href="/signup"
            underline="hover"
            variant="body1"
            color={colors.indigo.A700}
            className="fw-medium"
          >
            Sign Up
          </Link>
        </Stack>
      </Grid>
    </Grid>
  );
}
