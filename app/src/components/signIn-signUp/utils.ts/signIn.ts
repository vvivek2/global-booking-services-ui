export type SignInPayload = {
  emailId: string;
  password: string;
  mobileNumber: string;
};

export type SignInResponse = {
  message: string;
  userId: string;
};

export type SignInResult = {
  status: number;
  data: SignInResponse;
};

export async function signInUser(payload: SignInPayload): Promise<SignInResult> {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/signIn`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || 'Failed to sign in user');
  }

  const data = await resp.json().catch(() => ({}));
  return { status: resp.status, data: data as SignInResponse };
}