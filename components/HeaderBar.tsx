"use client";

import AccountMenu from "@/app/src/components/signIn-signUp/AccountMenu";



export default function HeaderBar({ showBusiness = false, showAvatar = false }) {
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

        {showBusiness && (
          <nav className="flex items-center gap-4 font-sans">
            <a href="#" className="text-white hover:text-gray-300 transition">
              <u>Business</u>
            </a>
          </nav>
        )}

        {showAvatar && <AccountMenu />}
      </div>
    </header>
  );
}
