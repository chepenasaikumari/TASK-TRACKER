import express from "express";
import Task from "../models/task.model.js";
import { differenceInDays, parseISO } from "date-fns";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll();

    const openTasks = tasks.filter(t => t.status === "Open").length;
    const highPriority = tasks.filter(t => t.priority === "High").length;
    const dueSoon = tasks.filter(t => {
      const daysLeft = differenceInDays(new Date(t.due_date), new Date());
      return daysLeft >= 0 && daysLeft <= 3;
    }).length;

    const summary = `You have ${openTasks} open tasks, ${highPriority} high-priority ones, and ${dueSoon} due within 3 days. Stay on track!`;

    res.json({ summary, stats: { openTasks, highPriority, dueSoon } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
