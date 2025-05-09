import { useState, useEffect } from "react";
import "./App.css";




function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleComplete = (index) => {
    const updated = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

  const saveEdit = (index) => {
    const updated = tasks.map((t, i) =>
      i === index ? { ...t, text: editingText } : t
    );
    setTasks(updated);
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", marginBottom: "1rem" }}>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
      />
      </div>
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((t, i) => (
          <li key={i} className="task-item">
          {editingIndex === i ? (
            <>
              <input
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
              <div className="task-buttons">
                <button onClick={() => saveEdit(i)}>Save</button>
              </div>
            </>
          ) : (
            <>
              <span
                style={{
                  textDecoration: t.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
                onClick={() => toggleComplete(i)}
              >
                {t.text}
              </span>
              <div className="task-buttons">
                <button onClick={() => startEditing(i)}>Edit</button>
                <button onClick={() => deleteTask(i)}>Delete</button>
              </div>
            </>
          )}
        </li>
        
        ))}
      </ul>
    </div>
  );
}

export default App;
