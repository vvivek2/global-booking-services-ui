'use client';
import { useState } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";

const countryCodes = [
  { label: '+91', country: 'IN' },
  { label: '+61', country: 'AU' },
  { label: '+81', country: 'JP' },
];

export default function SignInSheet() {
  const [code, setCode] = useState(countryCodes[0]);
  const [phone, setPhone] = useState('');
  const phoneIsValid = phone.length === 10;
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [otpRequested, setOtpRequested] = useState(false);
  const verificationIsValid = verificationCode.length === 6;

  return (
    <div className="flex h-full w-full items-center justify-center px-4 py-8">
      <div>
        <Card style={{ minWidth: 475, minHeight: 340, backgroundColor: 'transparent', color: 'gray', boxShadow: 'none' }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Login / Sign Up
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Enter your phone number with country code to login.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', mt: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: 130 }}>
                <Typography variant="subtitle2" sx={{ color: 'white' }}>
                  Country
                </Typography>
                <Autocomplete
                  options={countryCodes}
                  getOptionLabel={(option) => option ? `${option.label} (${option.country})` : ''}
                  isOptionEqualToValue={(option, value) => option.label === value.label}
                  value={code}
                  onChange={(_, value) => value && setCode(value)}
                  fullWidth
                  renderOption={(props, option) => {
                    const { key, ...rest } = props as any;
                    return (
                      <li key={key} {...rest}>
                        {option.label} {option.country}
                      </li>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{ bgcolor: 'hsl(0, 0%, 100%)', borderRadius: 1 }}
                    />
                  )}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
                <Typography variant="subtitle2" sx={{ color: 'white' }}>
                  Phone number
                </Typography>
                <TextField
                  type="tel"
                  inputMode="numeric"
                  variant="outlined"
                  size="small"
                  value={phone}
                  onChange={(event) => {
                    const cleaned = event.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                    setPhone(cleaned);
                    // If user changes phone after requesting OTP, hide verification and re-enable Get OTP
                    if (otpRequested) {
                      setShowVerification(false);
                      setOtpRequested(false);
                      setVerificationCode('');
                    }
                  }}
                  error={phone.length > 0 && !phoneIsValid}
                  helperText={phone.length > 0 && !phoneIsValid ? 'Phone number must be exactly 10 digits' : ''}
                  fullWidth
                  sx={{ bgcolor: 'rgb(247, 242, 242)', borderRadius: 1 }}
                />
              </Box>
            </Box>
            {showVerification && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'white' }}>
                  Verification code
                </Typography>
                <TextField
                  type="tel"
                  inputMode="numeric"
                  variant="outlined"
                  size="small"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                  fullWidth
                  sx={{ bgcolor: 'rgb(247, 242, 242)', borderRadius: 1, mt: 1 }}
                />
              </Box>
            )}
          </CardContent>
          <CardActions>
            {showVerification ? (
              <Button
                size="small"
                style={{ backgroundColor: '#1e1e1e', color: 'white' }}
                disabled={!verificationIsValid}
                onClick={() => {
                  // Placeholder sign-in action
                  console.log('Sign in with', code.label, phone, verificationCode);
                }}
              >
                Sign In
              </Button>
            ) : (
              <Button
                size="small"
                style={{ backgroundColor: '#1e1e1e', color: 'white' }}
                disabled={!phoneIsValid || otpRequested}
                onClick={() => {
                  setShowVerification(true);
                  setOtpRequested(true);
                }}
              >
                Get OTP
              </Button>
            )}
          </CardActions>
        </Card>
      </div>
    </div>
  )
}
