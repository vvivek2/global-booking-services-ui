import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { idToken } = await req.json();

  const backendRes = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/google",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    }
  );

  const data = await backendRes.json();
  return NextResponse.json(data);
}
