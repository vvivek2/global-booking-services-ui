'use client';

import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { RegisterPayload, registerUser } from './utils.ts/registerApi';
import CircularProgress from '@mui/material/CircularProgress';

interface RegisterSideSheetProps {
    open: boolean;
    onClose: () => void;
}

export default function RegisterSideSheet({
    open,
    onClose,
}: RegisterSideSheetProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");


    const handleRegistration = async () => {
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }
        try {
            const payload: RegisterPayload = {
                firstName,
                lastName,
                emailId,
                password,
                mobileNumber: phoneNumber,
            };

            await registerUser(payload);
            setSuccessMessage("Registration successful. Taking you to login page...");
            setTimeout(() => {
                resetForm();
                onClose(); // closes side sheet
                setSuccessMessage("");
            }, 3000);
        } catch (err: any) {
        } finally {
            setLoading(false);
        }
    };

    const validateEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isFormValid =
        firstName.trim() !== "" &&
        lastName.trim() !== "" &&
        validateEmail(emailId) &&
        phoneNumber.length === 10 &&
        password.length >= 6 &&
        password === confirmPassword &&
        password !== "" &&
        confirmPassword !== "" &&
        !emailError &&
        !phoneError &&
        !passwordError;

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setEmailId("");
        setPassword("");
        setConfirmPassword("");
        setPhoneNumber("");

        // also clear errors if you have them
        setEmailError("");
        setPhoneError("");
        setPasswordError("");
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box
                sx={{
                    width: 420,
                    p: 4,
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Create Account
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Register a new account.
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <TextField
                        label="First Name"
                        size="small"
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <TextField
                        label="Last Name"
                        size="small"
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <TextField
                        label="Email Address"
                        type="emailId"
                        size="small"
                        fullWidth
                        value={emailId}
                        onChange={(e) => {
                            const value = e.target.value;
                            setEmailId(value);

                            if (!validateEmail(value)) {
                                setEmailError("Enter a valid email address");
                            } else {
                                setEmailError("");
                            }
                        }}
                        error={emailError !== ""}
                        helperText={emailError}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        size="small"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={password.length > 0 && password.length < 6}
                        helperText={
                            password.length > 0 && password.length < 6
                                ? "Password must be at least 6 characters"
                                : ""
                        }
                    />

                    <TextField
                        label="Confirm Password"
                        type="password"
                        size="small"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => {
                            const value = e.target.value;
                            setConfirmPassword(value);

                            if (password && value !== password) {
                                setPasswordError("Passwords do not match");
                            } else {
                                setPasswordError("");
                            }
                        }}
                        error={passwordError !== ""}
                        helperText={passwordError}
                    />

                    <TextField
                        label="Phone Number"
                        type="tel"
                        size="small"
                        fullWidth
                        value={phoneNumber}
                        onChange={(e) => {
                            const value = e.target.value;

                            // Allow only digits
                            if (/^\d*$/.test(value)) {
                                setPhoneNumber(value);

                                // Clear error if valid
                                if (value.length <= 10) {
                                    setPhoneError("");
                                }
                            }

                            // Set error if > 10 digits
                            if (value.length > 10) {
                                setPhoneError("Phone number must be 10 digits");
                            }
                        }}
                        error={phoneError !== ""}
                        helperText={phoneError}
                    />

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            mt: 2,
                        }}
                    >
                        <Button variant="contained" fullWidth disabled={!isFormValid} onClick={handleRegistration}>
                            {loading ? <CircularProgress size={22} color="inherit" /> : "Register"}
                        </Button>

                        <Button
                            variant="outlined"
                            fullWidth
                            
                            onClick={() => {
                                resetForm();
                                onClose();
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                    {successMessage && (
                        <Typography
                            color="success.main"
                            sx={{ mt: 2, textAlign: "center" }}
                        >
                            {successMessage}
                        </Typography>
                    )}

                </Box>
            </Box>
        </Drawer>
    );
}