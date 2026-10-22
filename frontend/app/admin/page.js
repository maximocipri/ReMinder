"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AdminUsers() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/");
    }
  }, [user]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("user");

  const CrearUser = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password: pass,
        role,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      toast.error(err.error || "Error al crear usuario");
      return;
    }

    toast.success("Usuario creado");
    window.location.href = "/tasks";

    setName("");
    setEmail("");
    setPass("");
    setRole("user");
  };

  return (
    <main>
        <hr/>
        <h1 className="desplegable">Administrador</h1>
      

      <div className="Ingresotarea">
        <form className="nuevatarea" onSubmit={CrearUser}>
                <h2>Crear Usuario</h2>
          <div className="divlo1">
            <p>Nombre</p>
            <input
        
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
            />
          </div>

          <div className="divlo2">
            <p>Email</p>
            <br/>
            <input
              className="nuevaTareaInput"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>

          <div className="divlo2">
            <p>Contraseña</p>
            <input
              className="nuevaTareaInput"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Password"
            />
          </div>

          <div className="divlo2">
            <p>Tipo de usuario</p>
            <select
              className="nuevaTareaInput"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option  value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button className="sub1" type="submit">
            Crear
          </button>
        </form>
          <button
         className="sub1"
            onClick={() => router.push("/tasks")}
                
                >
                Volver
                </button>
      </div>
    </main>
  );
}
