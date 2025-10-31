import "./index.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import InsightsPanel from "./components/InsightsPanel";

function App() {
  return (
    <div className="app-container">
      <h1>Task Tracker with Smart Insights</h1>

      <div className="card">
        <TaskForm />
      </div>

      <div className="card">
        <TaskList />
      </div>

      <div className="card">
        <InsightsPanel />
      </div>
    </div>
  );
}

export default App;
