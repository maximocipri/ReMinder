import { users, tasks } from "../models/data.js";

const generateId = () => "t" + Date.now().toString();


// Permisos de vista de usuario
export const getTasksByUser = (req, res) => {
  const { userId } = req.params;

  const requester = users.find((u) => u.id === userId);
  if (!requester) return res.status(404).json({ error: "Usuario no encontrado" });

  let result = requester.role === "admin"
    ? tasks
    : tasks.filter((t) => t.userId === userId);


  result = result.map(t => ({
    ...t,
    userName: users.find(u => u.id === t.userId)?.name || "Desconocido"
  }));

  res.json(result);
};


// Crear Tarea
export const createTask = (req, res) => {
  const { title, userId, fechalimite, descripcion } = req.body;

  if (!title || !userId)
    return res.status(400).json({ error: "title y userId son requeridos" });

  const newTask = {
    id: generateId(),
    title,
    userId,
    fechalimite: fechalimite || null,
    descripcion: descripcion || "",
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};


//Actualizar tarea
export const updateTask = (req, res) => {
  const { taskId } = req.params;
  const { title, completed } = req.body;

  const idx = tasks.findIndex((t) => t.id === taskId);
  if (idx === -1)
    return res.status(404).json({ error: "Tarea no encontrada" });

  if (title !== undefined) tasks[idx].title = title;
  if (completed !== undefined) tasks[idx].completed = completed;

  res.json(tasks[idx]);
};

//Eliminar Tarea
export const deleteTask = (req, res) => {
  const { taskId } = req.params;

  const idx = tasks.findIndex((t) => t.id === taskId);
  if (idx === -1)
    return res.status(404).json({ error: "Tarea no encontrada" });

  const removed = tasks.splice(idx, 1)[0];
  res.json({ ok: true, removed });
};
