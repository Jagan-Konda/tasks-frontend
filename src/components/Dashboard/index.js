import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import TaskForm from "../TaskForm";
import EditTaskForm from "../EditTaskForm";
import Navbar from "../Navbar";
import "./index.css";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const navigate = useNavigate();
    const token = Cookies.get("jwt_token");

    const fetchTasks = useCallback(async () => {
        try {
            const response = await fetch("https://tasks-backend-ujte.onrender.com/tasks", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setTasks(data);
            } else {
                console.error("Failed to fetch tasks.");
            }
        } catch (error) {
            console.error("Error fetching tasks.");
        }
    }, [token]);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        fetchTasks();
    }, [token, fetchTasks, navigate]);

    const handleEditClick = (task) => {
        setEditingTask(task);
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
    };

    const handleDeleteTask = async (taskId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`https://tasks-backend-ujte.onrender.com/tasks/${taskId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                alert("Task deleted successfully!");
                fetchTasks();
            } else {
                alert("Failed to delete task.");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("An error occurred while deleting the task.");
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "Completed":
                return "status-completed";
            case "In Progress":
                return "status-inprogress";
            default:
                return "status-pending";
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">

                <h2>Your Tasks</h2>
                {editingTask ? (
                    <EditTaskForm task={editingTask} onUpdate={fetchTasks} onCancel={handleCancelEdit} />
                ) : (
                    <>
                        <TaskForm onTaskAdded={fetchTasks} />
                        <ul className="task-list">
                            {tasks.map((task) => (
                                <li key={task.id} className="task-card">
                                    <h3 className="task-title">{task.title}</h3>
                                    <p className="task-description">{task.description}</p>
                                    <p className={`task-status ${getStatusClass(task.status)}`}>
                                        {task.status}
                                    </p>
                                    <p className="task-due-date">Due Date: {task.due_date}</p>
                                    <div className="task-actions">
                                        <button onClick={() => handleEditClick(task)} className="edit-button">Edit</button>
                                        <button onClick={() => handleDeleteTask(task.id)} className="delete-button">Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </>
    );
};

export default Dashboard;
