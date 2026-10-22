"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const router = useRouter();
  const register = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.error);

    alert("Cuenta creada, ahora podés iniciar sesión.");
    window.location.href = "/";
  };
  const handleRegister = async (e) => {
  e.preventDefault();

  if (!name || !email || !password) {
    toast.error("Todos los campos son obligatorios");
    return;
  }

  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    toast.error(err.error || "Error al crear la cuenta");
    return;
  }

  toast.success("Cuenta creada con éxito");
  router.push("/");
};

  return (
    <main>
      <div >
             <hr/>
    <h1 className="desplegable">Registrarse</h1>
        <div className="Ingresotarea">
          <h2>Ingresa tus datos</h2>
          <form onSubmit={register}>
            <div className="divlo1">
              <p>Nombre</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="divlo2">
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

            <button className="sub1" type="submit">Crear cuenta</button>
          </form>
            
         <button
         className="sub1"
            onClick={() => router.push("/")}
                
                >
                Volver
                </button>
        </div>
      </div>
    </main>
  );
}
