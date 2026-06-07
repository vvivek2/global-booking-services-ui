export type SignInPayload = {
  emailId: string;
  password: string;
  mobileNumber: string;
};

export type SignInResponse = {
  message: string;
  userId: string;
};

export async function signInUser(payload: SignInPayload): Promise<any> {
  const resp = await fetch('http://localhost:8080/user/signIn', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || 'Failed to sign in user');
  }

  const data = await resp.json().catch(() => ({}));
  return data as SignInResponse;
}