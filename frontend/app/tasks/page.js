"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const API = "http://localhost:5000/api";

export default function Tasks() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState({
    title: "",
    fechalimite: "",
    descripcion: ""
  });


  useEffect(() => {
    if (!isAuthenticated) router.push("/");
  }, [isAuthenticated]);


  useEffect(() => {
    if (user) CargarTasks();
  }, [user]);

  const CargarTasks = async () => {
    try {
      const res = await fetch(`${API}/tasks/${user.id}`);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      toast.error("Error al cargar tareas");
    }
  };

  const addTask = async (e) => {
    e.preventDefault();

    if (!newTask.title.trim()) {
      toast.warn("El título es obligatorio");
      return;
    }

    try {
      const res = await fetch(`${API}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTask.title,
          fechalimite: newTask.fechalimite,
          descripcion: newTask.descripcion,
          userId: user.id
        }),
      });

      if (!res.ok) {
        toast.error("Error al crear tarea");
        return;
      }

      const task = await res.json();
      setTasks([task, ...tasks]);

      toast.success("Tarea creada ✔️");

      setNewTask({
        title: "",
        fechalimite: "",
        descripcion: ""
      });
    } catch (error) {
      toast.error("Error al crear tarea");
    }
  };

  const toggle = async (t) => {
    try {
      const res = await fetch(`${API}/tasks/${t.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !t.completed }),
      });

      const updated = await res.json();

      toast.info(
        updated.completed ? "Tarea marcada como completada" : "Tarea marcada como pendiente"
      );

      setTasks(tasks.map((x) => (x.id === updated.id ? updated : x)));
    } catch (error) {
      toast.error("Error al actualizar tarea");
    }
  };

  const Borrar = async (id) => {
    if (!confirm("¿Eliminar tarea?")) return;

    try {
      await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((x) => x.id !== id));

      toast.success("Tarea eliminada 🗑️");
    } catch (error) {
      toast.error("Error al eliminar tarea");
    }
  };

  return (
    <main>

      <hr/>
      <h1 className="desplegable">Gestiona tus tareas aca</h1>

      
      <div className="Ingresotarea">
        <h2 className="h3tareas">Crear Tarea</h2>

        <form className="nuevaTarea" onSubmit={addTask}>
          
          <div className="divinta">
            <label>Titulo</label><br/>
            <input
              className="nuevaTareaInput"
              placeholder="Título"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
          </div>

          <div className="divinta">
            <label>Fecha Limite</label><br/>
            <input
              className="nuevaTareaInput"
              type="date"
              value={newTask.fechalimite}
              onChange={(e) =>
                setNewTask({ ...newTask, fechalimite: e.target.value })
              }
            />
          </div>

          <div className="divinta">
            <label>Descripcion</label><br/>
            <input
              className="nuevaTareaInput"
              placeholder="Descripción"
              value={newTask.descripcion}
              onChange={(e) =>
                setNewTask({ ...newTask, descripcion: e.target.value })
              }
            />
          </div>

          <br />
          <button className="agregar" type="submit">Agregar</button>
        </form>
      </div>

    
      <div id="listaTareas">
        {tasks.map((t) => (
          <div className="container" key={t.id}>
            <div className={`tarea-item ${t.completed ? "completada" : ""}`}>
              <div className="card">
                <div className="face face1">
                  <div className="content">
                    <h3>{t.title}</h3>
                  </div>
                </div>

                <div className="face face2">
                  <div className="content">
                    <h4 className="fecha">Fecha limite: {t.fechalimite}</h4>
                    <p className="fecha">{t.descripcion}</p>
                    <p className="fecha">
                      {t.completed ? "Completada" : "Pendiente"}
                    </p>

                    <button
                      className={`bcompletar ${t.completed ? "bpendiente" : "bcompleta"}`}
                      onClick={() => toggle(t)}
                    >
                      {t.completed ? (
                        <img src="/cerrar.png" alt="Cerrar" />
                      ) : (
                        <img src="/cheque.png" alt="Completar" />
                      )}
                    </button>

                    <button
                      className="beliminar btnEliminar"
                      onClick={() => Borrar(t.id)}
                    >
                      <img src="/basura.png" alt="Eliminar"/>
                    </button>

                    {user?.role === "admin" && (
                      <p className="fecha">Creado por: {t.userName}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      {user?.role === "admin" && (
        <button
          className="crearusu"
          onClick={() => router.push("/admin")}
        >
          Crear usuario
        </button>
      )}

      <button className="cerrar" onClick={logout}>
        Cerrar sesión
      </button>
    </main>
  );
}
