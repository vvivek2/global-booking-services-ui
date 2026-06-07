"use client";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import RegisterSideSheet from './RegisterSidesheet';
import { SignInPayload, signInUser } from './utils.ts/signIn';

export default function SignInEmailSheet() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginValue, setLoginValue] = useState("");
  const [loginError, setLoginError] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const isEmail = (value: string) => value.includes("@");
  const isPhone = (value: string) => /^\d+$/.test(value);
  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSignIn = async () => {
    try {
      setErrorMessage("");

      const payload: SignInPayload = {
        emailId: isEmail(loginValue) ? loginValue : "",
        mobileNumber: isPhone(loginValue) ? loginValue : "",
        password,
      };

      setIsSigningIn(true);

      const res = await signInUser(payload);

      if (res?.status === 200) {
        if (typeof window !== "undefined") {
          window.location.assign("/dashboard");
        }
      } else {
        setErrorMessage("Sign in failed. Please try again.");
        setIsSigningIn(false);
      }
    } catch (err: any) {
      setIsSigningIn(false);

      console.log("FULL ERROR:", err);

      let backendMessage = "";

      if (typeof err?.response?.data === "string") {
        backendMessage = err.response.data;
      } else {
        backendMessage =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.response?.data?.details ||
          err?.message;
      }

      setErrorMessage(backendMessage || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center px-4 py-8">
      <Card
        sx={{
          width: '100%',
          maxWidth: 475,
          minHeight: 340,
          backgroundColor: 'transparent',
          color: 'gray',
          boxShadow: 'none',
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Login / Sign Up
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Enter your email or mobile number to login.
          </Typography>

          {/* GRID START */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              alignItems: 'center',
              columnGap: 2,
              rowGap: 2,
              mt: 4,
            }}
          >
            <Typography>Email / Mobile</Typography>
            <TextField
              placeholder="Enter your email or mobile number"
              variant="outlined"
              size="small"
              fullWidth
              value={loginValue}
              onChange={(e) => {
                const value = e.target.value;
                setLoginValue(value);
                setLoginError("");

                if (value === "") {
                  setLoginError("This field is required");
                  return;
                }

                if (isPhone(value)) {
                  if (value.length !== 10) {
                    setLoginError("Phone number must be exactly 10 digits");
                  }
                  return;
                }

                if (isEmail(value)) {
                  if (!isValidEmail(value)) {
                    setLoginError("Invalid email format");
                  }
                  return;
                }

                setLoginError("Enter a valid email or phone number");
              }}
              error={loginError !== ""}
              helperText={loginError}
              sx={{
                backgroundColor: "#f3f4f6",
                borderRadius: 1,
              }}
            />

            <Typography>Password</Typography>
            <TextField
              type="password"
              placeholder="Enter your password"
              variant="outlined"
              size="small"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                backgroundColor: '#f3f4f6',
                borderRadius: 1,
              }}
            />

            <Box />

            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Button
                variant="contained"
                disabled={isSigningIn}
                onClick={handleSignIn}
                sx={{
                  backgroundColor: isSigningIn ? "#1976d2" : undefined,
                  color: "white",
                  opacity: isSigningIn ? 1 : undefined,
                  "&.Mui-disabled": {
                    backgroundColor: "#1976d2",
                    color: "white",
                    opacity: 1,
                  },
                }}
              >
                {isSigningIn ? (
                  <span className="loading-dots">Logging In</span>
                ) : (
                  "Sign In"
                )}
              </Button>

              <Button variant="outlined" onClick={() => setRegisterOpen(true)}>
                Register
              </Button>
            </Box>
          </Box>
          {/* GRID END */}

          {/* ERROR MESSAGE OUTSIDE GRID, ALIGNED WITH BUTTON */}
          {errorMessage && (
            <Box sx={{ mt: 1, ml: "120px" }}>
              <Typography color="error">{errorMessage}</Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <RegisterSideSheet
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />
    </div>
  );
}
