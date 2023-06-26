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
} from "@mui/material";
import * as colors from "@mui/material/colors";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import React, { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    window.alert("form submitted");
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
        <Typography
          variant="h4"
          className="text-decoration-underline text-center mb-4"
        >
          Sign In
        </Typography>
        <form className="d-flex flex-column" onSubmit={onSubmit}>
          <TextField
            label="Username"
            id="username"
            name="username"
            type="text"
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
          >
            Forgot Password?
          </Link>
          <Link
            href="/register"
            underline="hover"
            variant="body1"
            color={colors.indigo.A700}
          >
            Sign Up
          </Link>
        </Stack>
      </Grid>
    </Grid>
  );
}
