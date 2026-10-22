"use client";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export default function Home() {
  const { login, isAuthenticated, user } = useAuth();  
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") router.push("/tasks");
      else router.push("/tasks");
    }
  }, [isAuthenticated, user]); 


const iniciar = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    toast.error("Completa todos los campos");
    return;
  }

  try {
    await login(email, password);
  } catch (err) {
    toast.error("Email o Contraseña incorrectas");
  }
};

  return (
    <main>
      <div id="Loginform">
        <div className="divlog">
          <h2>Iniciar Sesión</h2>

          <form onSubmit={iniciar}>
            <div className="divlo1">
              <p>Email</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="divlo2">
              <p>Contraseña</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="sub1" type="submit">Ingresar</button>
          </form>
        <h3>O</h3>
         <button
  className="sub1"
  onClick={() => router.push("/register")}

>
  Crear Cuenta
</button>

     

        </div>
      </div>
    </main>
  );
}
