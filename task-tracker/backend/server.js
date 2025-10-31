import express from "express";
import cors from "cors";
import sequelize from "./src/config/db.js";
import tasksRouter from "./src/routes/tasks.router.js";
import insightsRouter from "./src/routes/insights.router.js";
import Task from "./src/models/task.model.js"; 

const app = express();
app.use(cors());
app.use(express.json());


app.use("/tasks", tasksRouter);
app.use("/insights", insightsRouter);


const PORT = process.env.PORT || 3000;

sequelize
  .sync({ alter: true }) 
  .then(() => {
    console.log("✅ Database synced");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ Sync error:", err));
