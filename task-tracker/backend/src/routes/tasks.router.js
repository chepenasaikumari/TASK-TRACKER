import express from "express";
import Task from "../models/task.model.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { title, description, priority, due_date, status } = req.body;
    if (!title || !due_date) return res.status(400).json({ error: "Title and due_date are required" });

    const task = await Task.create({ title, description, priority, due_date, status });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const { status, priority, sort } = req.query;
    const where = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;

    const order = sort === "asc" ? [["due_date", "ASC"]] : [["due_date", "DESC"]];
    const tasks = await Task.findAll({ where, order });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, priority } = req.body;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    if (status) task.status = status;
    if (priority) task.priority = priority;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
