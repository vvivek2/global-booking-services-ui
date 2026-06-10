"use client";

import { useEffect } from "react";

export default function GoogleLoginButton() {
  const handleGoogleResponse = async (response: any) => {
    const idToken = response.credential;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/googleSignIn`, {
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
    const interval = setInterval(() => {
      const google = window.google;
      const parent = document.getElementById("googleBtn");

      if (google && parent) {
        google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback: handleGoogleResponse,
          auto_select: true,
        });

        google.accounts.id.renderButton(parent, {
          type: "standard",
          theme: "outline",
          size: "large",
        });

        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return <div id="googleBtn"></div>;
}
