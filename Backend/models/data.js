export const users = [
  { id: "1", name: "Admin", email: "admin@admin.com", password: "admin123", role: "admin" },
  { id: "2", name: "Maxi", email: "user@user.com", password: "user123", role: "user" },
  { id: "1", name: "Liones", email: "user2@user.com", password: "user2123", role: "admin" }

];

export const tasks = [
  { id: "1", title: "Tarea ejemplo 1", userId: "1", fechalimite: null, descripcion: "ejemplo", completed: false, createdAt: new Date().toISOString() },
  { id: "2", title: "Tarea ejemplo 2", userId: "2", fechalimite: null, descripcion: "ejemplo", completed: true, createdAt: new Date().toISOString() }
];
