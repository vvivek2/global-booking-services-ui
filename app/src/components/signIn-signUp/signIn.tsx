'use client';
import { useState } from 'react';
import { requestOtp, verifyOtp } from './otpApi';
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
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const verificationIsValid = verificationCode.length === 6;

  const handleRequestOtp = async () => {
    setErrorMessage('');
    setOtpVerified(false);
    setLoadingOtp(true);
    try {
      // Call API client — do not use OTP from response even if returned
      await requestOtp({ countryCode: code.label, mobileNumber: phone });
      setOtpRequested(true);
      setShowVerification(true);
    } catch (err: any) {
      setOtpRequested(false);
      setErrorMessage(err?.message || 'Unable to request OTP');
    } finally {
      setLoadingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    setErrorMessage('');
    setVerifying(true);
    try {
      const data = await verifyOtp({ countryCode: code.label, mobileNumber: phone, otp: verificationCode });
      // success — proceed with app flow; do not expose OTP
      console.log('Sign-in successful for', `${code.label}${phone}`, data);
      setOtpVerified(true);
      setErrorMessage('');
      // TODO: store token / redirect
    } catch (err: any) {
      setOtpVerified(false);
      setErrorMessage(err?.message || 'Enter correct OTP');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center px-4 py-8">
      <div>
        <Card style={{ width: '100%', maxWidth: 475, minHeight: 340, backgroundColor: 'transparent', color: 'gray', boxShadow: 'none' }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Login / Sign Up
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Enter your phone number with country code to login.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                alignItems: 'stretch',
              }}
            >
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
                      setOtpVerified(false);
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
                {otpVerified ? (
                  <Typography variant="body2" sx={{ mt: 1, color: 'success.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>✓</span> OTP verified
                  </Typography>
                ) : errorMessage ? (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {errorMessage}
                  </Typography>
                ) : null}
              </Box>
            )}
          </CardContent>
          <CardActions>
            {showVerification ? (
              <Button
                size="small"
                style={{ backgroundColor: '#1e1e1e', color: 'white' }}
                disabled={!verificationIsValid || verifying || otpVerified}
                onClick={() => handleVerifyOtp()}
              >
                {otpVerified ? 'Verified' : verifying ? 'Verifying...' : 'Sign In'}
              </Button>
            ) : (
              <Button
                size="small"
                style={{ backgroundColor: '#1e1e1e', color: 'white' }}
                disabled={!phoneIsValid || otpRequested || loadingOtp}
                onClick={() => handleRequestOtp()}
              >
                {loadingOtp ? 'Requesting...' : 'Get OTP'}
              </Button>
            )}
          </CardActions>
        </Card>
      </div>
    </div>
  )
}
