import express from "express";
import { getTasksByUser, createTask, updateTask, deleteTask } from "../controllers/task.controller.js";
const router = express.Router();

router.get("/:userId", getTasksByUser);
router.post("/", createTask);
router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

export default router;
