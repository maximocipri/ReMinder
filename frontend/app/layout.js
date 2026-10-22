
import "./globals.css";
import AuthProvider from "../context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "react-toastify/dist/ReactToastify.css";

export const metadata = { title: "Re-Minder" };

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar/>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Footer/>
      </body>
    </html>
  );
}
