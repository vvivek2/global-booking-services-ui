"use client";

import { useEffect } from "react";

export default function GoogleLoginButton() {
  const handleGoogleResponse = async (response: any) => {
    const idToken = response.credential;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/googleSignIn`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    const data = await res.json();
    console.log("Logged in:", data);
    localStorage.setItem("user", JSON.stringify(data));
    window.location.href = "/dashboard";
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: handleGoogleResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleBtn")!,    
      { theme: "outline", size: "large" }
    );
  }, []);

  return <div id="googleBtn"></div>;
}
