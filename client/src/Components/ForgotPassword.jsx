import {
  Button,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as colors from "@mui/material/colors";
import React, { useRef, useState } from "react";

export default function ForgotPassword() {
  const [otp, setOtp] = useState(undefined);
  const [otpMatched, setOtpMatched] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const inputRefs = useRef([]);

  const handleChange = (index, input) => {
    var value = input.value;
    if (value.length > 1) {
      // If multiple characters are pasted, extract only the first character
      value = value.charAt(0);
    }

    if (value !== "") {
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus(); // Focus on the next input field
      } else {
        inputRefs.current[index].blur(); // Whole otp entered
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && index > 0 && event.target.value === "") {
      // If Backspace is pressed and the current input field is empty, focus on the previous field
      inputRefs.current[index - 1].focus();
      return;
    }
    if (event.key !== "Backspace" && event.target.value.length === 1) {
      // change input value by latest one
      inputRefs.current[index].value = toString(event.key);
    }
  };

  const getInputValues = () => {
    return inputRefs.current.map((input) => input.value).join("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    if (!otp) {
      const sentOtp = "1234";
      setEmail(document.getElementById("email").value);
      setOtp(sentOtp);
    } else if (!otpMatched) {
      const otpMatch = getInputValues() === otp;
      if (!otpMatch) setFormError("Incorrect OTP");
      setOtpMatched(otpMatch);
    } else {
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      if (password !== confirmPassword) setFormError("Passwords do not match.");
      else {
        alert(`new password is ${password}`);
      }
    }
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
          src={require("../Images/forgotPassword.jpg")}
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
          Forgot Password
        </Typography>

        <form className="d-flex flex-column" onSubmit={onSubmit}>
          {otp ? (
            <>
              {otpMatched ? (
                // Reset Password.
                <FormControl>
                  <FormControl variant="outlined" margin="normal" required>
                    <InputLabel htmlFor="password">New Password</InputLabel>
                    <OutlinedInput
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="New Password"
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
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="fw-bold bg-light"
                      error={formError !== ""}
                      required
                    />
                    <FormHelperText error className="fw-bold">
                      {formError}
                    </FormHelperText>
                  </FormControl>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    Reset Password
                  </Button>
                </FormControl>
              ) : (
                // OTP sent to registered email.
                <FormControl>
                  <Typography variant="subtitle1" className="fw-bold">
                    we have sent an otp to {email}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={4}
                    p={2}
                    justifyContent={"center"}
                  >
                    {otp.split("").map((_, index) => {
                      return (
                        <TextField
                          type="number"
                          sx={{
                            input: {
                              textAlign: "center",
                              width: "45px",
                            },
                          }}
                          InputProps={{
                            className: "fw-bold fs-4",
                          }}
                          key={`OTPInput${index}`}
                          color="info"
                          autoComplete="off"
                          inputRef={(ref) => (inputRefs.current[index] = ref)}
                          onChange={(e) => handleChange(index, e.target)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          autoFocus={index === 0}
                          error={formError !== ""}
                        />
                      );
                    })}
                  </Stack>
                  <FormHelperText error className="fw-bold">
                    {formError}
                  </FormHelperText>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    size="large"
                  >
                    Verify
                  </Button>
                </FormControl>
              )}
              <Typography variant="body2" className="fw-medium mt-2">
                ** Do not close or refresh this page.
              </Typography>
            </>
          ) : (
            // Email to send otp.
            <FormControl>
              <TextField
                type="email"
                id="email"
                name="email"
                label="Email"
                margin="dense"
                inputProps={{ className: "fw-bold bg-light" }}
                autoFocus
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="info"
                size="large"
              >
                Send OTP
              </Button>
            </FormControl>
          )}
          <Link href="/login" variant="body1" className="fw-bold ms-auto mt-2">
            Back to Login
          </Link>
        </form>
      </Grid>
    </Grid>
  );
}
