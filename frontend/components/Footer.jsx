
"use client";

import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function footer() {
  const showSuccess = () => toast.success("Acción realizada!");
  const showError = () => toast.error("Ocurrió un error");

  return (
    <footer >
        <div  className="contenedorimfo">
         <img src="/Logodefi22.png" alt="Logo" />
        </div>
    </footer>
  );
}
