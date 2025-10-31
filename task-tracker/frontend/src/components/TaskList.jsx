import { useEffect, useState } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("due_date");

  async function fetchTasks() {
    let url = `http://localhost:3000/tasks?sort=${sort}`;
    if (filter) url += `&status=${filter}`;
    const res = await fetch(url);
    const data = await res.json();
    setTasks(data);
  }

  useEffect(() => {
    fetchTasks();
  }, [filter, sort]);

  async function updateTask(id, field, value) {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
    fetchTasks();
  }

  return (
    <div className="task-list">
      <h2>Tasks</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="due_date">Sort by Due Date</option>
          <option value="created_at">Sort by Created Date</option>
        </select>
      </div>

      {tasks.length === 0 && <p>No tasks found.</p>}

      {tasks.map((task) => (
        <div className="task-card" key={task.id}>
          <div className="task-info">
            <div className="task-title">{task.title}</div>
            <div className="task-desc">{task.description}</div>
            <div className="task-meta">
              Priority: <strong>{task.priority}</strong> | Status:{" "}
              <strong>{task.status}</strong> | Due:{" "}
              <strong>{task.due_date}</strong>
            </div>
          </div>

          <div className="task-actions">
            <button
              className="btn-status"
              onClick={() =>
                updateTask(
                  task.id,
                  "status",
                  task.status === "Done" ? "Open" : "Done"
                )
              }
            >
              {task.status === "Done" ? "Reopen" : "Mark Done"}
            </button>
            <button
              className="btn-priority"
              onClick={() =>
                updateTask(
                  task.id,
                  "priority",
                  task.priority === "High" ? "Low" : "High"
                )
              }
            >
              Toggle Priority
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
