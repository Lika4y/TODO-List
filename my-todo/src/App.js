import { useState, useEffect } from 'react';
import './App.css';
import Task from './components/Task/Task';
import TaskForm from './components/TaskForm/TaskForm';


function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const tasksList = JSON.parse(localStorage.getItem("tasks"));
    setTasks(tasksList || []);
  }, []);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(name) {
    setTasks(prev => {
      return [...prev, { name: name, done: false }];
    });
  }

  function renameTask(idx, newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[idx].name = newName;
      return newTasks;
    })
  }

  function updateTaskDone(taskIdx, newDone) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[taskIdx].done = newDone;
      return newTasks;
    });
  }

  function removeTask(taskIdx) {
    setTasks(prev => {
      return prev.filter((item, idx) => idx !== taskIdx)
    })
  }

  const numberComplete = tasks.filter(item => item.done).length;
  const numberTotal = tasks.length;

  function getMessage() {
    const percentage = numberComplete / numberTotal * 100;
    if (percentage === 0) {
      return "Try to do at least one! 🙏"
    } else if (percentage === 100) {
      return "Nice job for today!👍"
    } else {
      return "Keep it going 💪";
    }
  }

  return (
    <main>
      <h1>{numberComplete}/{numberTotal} Complete</h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTask} />
      {tasks.map((task, idx) => (
        <Task key={idx}
          {...task}
          onToggle={done => updateTaskDone(idx, done)}
          onTrash={() => removeTask(idx)}
          onRename={newName => renameTask(idx, newName)} />
      ))}
    </main>
  );
}

export default App;
