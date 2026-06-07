export type RequestOtpResponse = {
  message?: string;
  requestId?: string;
  [key: string]: any;
};

export type RequestOtpPayload = {
  countryCode: string;
  mobileNumber: string;
};

export type VerifyOtpPayload = RequestOtpPayload & { otp: string };

export async function requestOtp(payload: RequestOtpPayload): Promise<RequestOtpResponse> {
  const resp = await fetch('http://localhost:8080/otp/get', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || 'Failed to request OTP');
  }

  // parse JSON when available but do NOT surface any OTP in the UI or logs
  const data = await resp.json().catch(() => ({}));
  return data as RequestOtpResponse;
}

export async function verifyOtp(payload: VerifyOtpPayload): Promise<any> {
  const resp = await fetch('http://localhost:8080/otp/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (resp.status === 200 || resp.status === 201) {
    return resp.json().catch(() => ({}));
  }

  const text = await resp.text();
  if (resp.status === 401) {
    throw new Error(text || 'Invalid OTP');
  }

  if (resp.status === 410) {
    throw new Error(text || 'OTP expired');
  }

  throw new Error(text || 'OTP verification failed');
}