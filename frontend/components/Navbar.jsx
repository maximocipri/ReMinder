
"use client";

import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {


  return (
    <nav >
        <div className="contenedorim">
        <img src="/Logodefi22.png" alt="Logo" />
        </div>
      <ToastContainer position="top-right" autoClose={2500} />
    </nav>
  );
}
