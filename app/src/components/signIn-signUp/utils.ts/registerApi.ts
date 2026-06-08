

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  emailId: string;
  password: string;
  mobileNumber: string;
};

export type RegisterResponse = {
  message: string;
};

export async function registerUser(payload: RegisterPayload): Promise<any> {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || 'Failed to register user');
  }

  const data = await resp.json().catch(() => ({}));
  return data as RegisterResponse;
}