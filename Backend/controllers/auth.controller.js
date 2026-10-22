import { users } from "../models/data.js";

const generateId = () => Date.now().toString();

export const register = (req, res) => {
  const { name, email, password, role = "user" } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "Faltan Datos" });

 
  const exists = users.find(u => u.email === email);
  if (exists) return res.status(409).json({ error: "El Email ya esta en uso" });

  const newUser = { id: generateId(), name, email, password, role };
  users.push(newUser);

  const { password:_, ...userSafe } = newUser;
  res.status(201).json(userSafe);
};

export const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Faltan datos" });

  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: "Usuario/Password no válidos" });

  if (user.password !== password) return res.status(401).json({ error: "Usuario/Password no válidos" });

  const { password:_, ...userSafe } = user;
  res.json(userSafe);
};
export const getUsers = (req, res) => {
  res.json(users);
};