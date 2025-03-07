import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBell, FaRedo, FaCalendarAlt, FaStar, FaRegStar, FaTrash, FaTasks, FaList, FaUser, FaPlus } from "react-icons/fa";
import { PieChart, Pie, Cell, Legend } from "recharts";

const URL = "https://jsonplaceholder.typicode.com/todos?_limit=7";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 

  // Function to fetch tasks from API with async/await and error handling
  const fetchTodos = async () => {
    setLoading(true);
    setError(""); 
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks. Please try again later.");
      }
      const data = await response.json();

      const updatedTodos = data.map((todo, index) => ({
        ...todo,
        completed: index % 3 === 0, 
        starred: false,
      }));
      setTodos(updatedTodos);

      // Save tasks to localStorage
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false);
    }
  };

  // Load tasks from localStorage when the app is first loaded
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    } else {
      fetchTodos(); 
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = () => {
    if (!newTask.trim()) return;
    const newTodo = {
      id: Date.now(),
      title: newTask,
      completed: false,
      starred: false,
    };
    setTodos([...todos, newTodo]);
    setNewTask("");
    setIsEditing(false);
  };

  const pendingTasks = todos.filter((todo) => !todo.completed);
  const completedTasks = todos.filter((todo) => todo.completed);

  const data = [
    { name: "Pending", value: pendingTasks.length, color: "#4CAF50" },
    { name: "Done", value: completedTasks.length, color: "#1B5E20" },
  ];

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/*Left Section*/}
        <aside className="col-12 col-md-3 bg-light p-3 shadow-sm rounded mb-4 mb-md-0">
          <div className="text-center">
            {/* Profile Image */}
            <img
              src="https://media.istockphoto.com/id/1413766112/photo/successful-mature-businessman-looking-at-camera-with-confidence.jpg?s=612x612&w=0&k=20&c=NJSugBzNuZqb7DJ8ZgLfYKb3qPr2EJMvKZ21Sj5Sfq4="
              alt="Profile"
              className="rounded-circle mb-2"
              style={{ width: "100px", height: "100px" }}/>
            <h5 className="text-success">Hey, ABCD</h5>
          </div>

          {/* Task Menu */}
          <ul className="list-unstyled mt-3">
            <li className="p-2 d-flex align-items-center text-success fw-bold">
              <FaTasks className="me-2" /> All Tasks
            </li>
            <li className="p-2 d-flex align-items-center bg-success text-white rounded">
              <FaCalendarAlt className="me-2" /> Today
            </li>
            <li className="p-2 d-flex align-items-center text-success">
              <FaStar className="me-2" /> Important
            </li>
            <li className="p-2 d-flex align-items-center text-success">
              <FaList className="me-2" /> Planned
            </li>
            <li className="p-2 d-flex align-items-center text-success">
              <FaUser className="me-2" /> Assigned to me
            </li>
          </ul>

          {/* Add List Button */}
          <div
            className="p-3 mt-3 border rounded text-success fw-bold d-flex align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => setIsEditing(true)}>
            <FaPlus className="me-2" /> Add list
          </div>

          {/* Today Tasks Chart */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h5>
                Today Tasks <span className="text-muted">( {todos.length} )</span>
              </h5>
              <PieChart width={200} height={200}>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={70}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </div>
          </div>
        </aside>

        {/* Main Content (Tasks Section) */}
        <main className="col-12 col-md-9">
          {/* Add Task Section */}
          <div className="card shadow-sm border-0">
            <div className="card-body bg-success bg-opacity-10 position-relative" style={{ minHeight: "180px" }}>
              <div className="text-muted fw-bold" style={{ cursor: "pointer", paddingLeft: "20px", paddingTop: "10px" }}>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-control border-0 bg-transparent fw-bold"
                    autoFocus
                    placeholder="Type a new task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onBlur={() => setIsEditing(false)}
                    style={{ width: "200px" }}
                  />
                ) : (
                  <h5 style={{ marginBottom: "0px" }}>Add A Task</h5>
                )}
              </div>

              {/* Icons Bottom Left */}
              <div className="position-absolute" style={{ left: "20px", bottom: "15px" }}>
                <FaBell size={20} className="text-secondary me-3" />
                <FaRedo size={20} className="text-secondary me-3" />
                <FaCalendarAlt size={20} className="text-secondary" />
              </div>

              {/* Right-bottom */}
              <button
                className="btn bg-success bg-opacity-10 px-4 text-success fw-bold"
                onClick={addTask}
                style={{ position: "absolute", right: "20px", bottom: "10px" }}
              >
                ADD TASK
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Loading Spinner */}
          {loading && <div className="text-center">Loading tasks...</div>}

          {/* Pending Tasks */}
          <h4 className="mt-4">Pending Tasks</h4>
          <ul className="list-group">
            {pendingTasks.length > 0 ? (
              pendingTasks.map((todo) => (
                <li
                  key={todo.id}
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  style={{ padding: "10px", borderRadius: "8px" }}
                >
                  <div className="d-flex align-items-center w-100">
                    <input
                      type="checkbox"
                      className="me-2"
                      checked={todo.completed}
                      onChange={() =>
                        setTodos(
                          todos.map((t) =>
                            t.id === todo.id ? { ...t, completed: !t.completed } : t
                          )
                        )
                      }
                    />
                    <span className="flex-grow-1">{todo.title}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-end w-100">
                    <button
                      className="btn text-success me-2"
                      onClick={() =>
                        setTodos(
                          todos.map((t) =>
                            t.id === todo.id ? { ...t, starred: !t.starred } : t
                          )
                        )
                      }
                    >
                      {todo.starred ? <FaStar color="success" /> : <FaRegStar />}
                    </button>
                    <button
                      className="btn text-danger"
                      onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-muted">No pending tasks.</p>
            )}
          </ul>

          {/* Completed Tasks */}
          <h4 className="mt-4">Completed Tasks</h4>
          <ul className="list-group">
            {completedTasks.length > 0 ? (
              completedTasks.map((todo) => (
                <li
                  key={todo.id}
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap bg-light"
                  style={{ padding: "10px", borderRadius: "8px" }}
                >
                  <div className="d-flex align-items-center w-100">
                    <input
                      type="checkbox"
                      className="me-2"
                      checked={todo.completed}
                      onChange={() =>
                        setTodos(
                          todos.map((t) =>
                            t.id === todo.id ? { ...t, completed: !t.completed } : t
                          )
                        )
                      }
                    />
                    <span style={{ textDecoration: "line-through" }} className="flex-grow-1">
                      {todo.title}
                    </span>
                  </div>
                  <div className="d-flex align-items-center justify-content-end w-100">
                    <button
                      className="btn text-success me-2"
                      onClick={() =>
                        setTodos(
                          todos.map((t) =>
                            t.id === todo.id ? { ...t, starred: !t.starred } : t
                          )
                        )
                      }
                    >
                      {todo.starred ? <FaStar color="success" /> : <FaRegStar />}
                    </button>
                    <button
                      className="btn text-danger"
                      onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-muted">No completed tasks.</p>
            )}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default TodoApp;
