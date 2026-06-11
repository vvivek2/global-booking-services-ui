"use client";

import registerBusiness from "@/app/business/register/page";
import AccountMenu from "@/app/src/components/signIn-signUp/AccountMenu";
import { useEffect, useState } from "react";



export default function HeaderBar({ showBusiness = false, showAvatar = false }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(logged === "true");
  }, []);

  return (
    <header
      style={{
        width: "100%",
        height: "60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        backgroundColor: "#000",
        color: "white",
        borderBottom: "1px solid #333",
      }}
    >
      <h1 className="text-xl font-semibold">MK TotalCare</h1>

      {/* Right side content */}
      <div className="flex items-center gap-6">

        {showBusiness && !isLoggedIn &&(
          <nav className="flex items-center gap-4 font-sans">
            <a href="business/register" className="text-white hover:text-gray-300 transition">
              <u>Register as a Business</u>
            </a>
          </nav>
        )}

        {isLoggedIn && <AccountMenu />}
      </div>
    </header>
  );
}
