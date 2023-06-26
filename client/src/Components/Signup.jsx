import React, { useState } from "react";
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
  Link,
  FormHelperText,
} from "@mui/material";
import * as colors from "@mui/material/colors";
import {
  VisibilityOff,
  Visibility,
  ArrowBackRounded,
} from "@mui/icons-material";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const formValues = Object.fromEntries(new FormData(e.target));
    if (formValues.password !== formValues.confirmPassword) {
      setPasswordError(true);
      setFormError("Passwords do not match");
      return;
    }
    if (passwordError) setPasswordError(false);
    setFormError("");

    delete formValues.confirmPassword;
    window.alert(JSON.stringify(formValues));
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
        className="rounded ms-3 mt-3"
        bgcolor={colors.blue[50]}
      >
        <img
          src={require("../Images/signup.jpg")}
          alt="login"
          style={{
            mixBlendMode: "multiply",
            maxHeight: "300px",
          }}
          className="mx-auto d-block"
        />
        <Typography
          variant="h4"
          className="text-decoration-underline text-center mb-4"
        >
          Sign Up
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
          <TextField
            label="Username"
            id="username"
            name="username"
            type="text"
            margin="dense"
            inputProps={{ className: "fw-bold bg-light" }}
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
          <FormControl variant="outlined" margin="normal" required>
            <InputLabel htmlFor="password">Confirm Password</InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              className="fw-bold bg-light"
              error={passwordError}
              required
            />
            <FormHelperText error className="fw-bold">
              {formError}
            </FormHelperText>
          </FormControl>
          <Button
            variant="contained"
            type="submit"
            size="large"
            className="mt-2"
            color="secondary"
          >
            Sign Up
          </Button>
          <Link
            href="/login"
            underline="hover"
            variant="body1"
            className="ms-auto mt-2 fw-bold"
          >
            <ArrowBackRounded fontSize="small" />
            Login with existing account.
          </Link>
        </form>
      </Grid>
    </Grid>
  );
}
