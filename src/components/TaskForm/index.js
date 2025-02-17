import { useState } from "react";
import Cookies from "js-cookie"
import "./index.css"

const TaskForm = ({ onTaskAdded }) => {
    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "Pending", // Default status
        due_date: "",
    });

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = Cookies.get("jwt_token");

        if (!token) {
            alert("User is not logged in!");
            return;
        }

        try {
            const response = await fetch("https://tasks-backend-ujte.onrender.com/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(task),
            });

            if (response.ok) {
                alert("Task added successfully!");
                setTask({ title: "", description: "", status: "Pending", due_date: "" });
                onTaskAdded(); // Refresh task list
            } else {
                const errorData = await response.text();
                alert(`Failed to add task: ${errorData}`);
            }
        } catch (error) {
            console.error("Error adding task:", error);
            alert("An error occurred while adding the task.");
        }
    };

    return (
        <div className="task-form-container">
            <h2>Add a New Task</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" value={task.title} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={task.description} onChange={handleChange} required />
                <select name="status" value={task.status} onChange={handleChange}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <input type="date" name="due_date" value={task.due_date} onChange={handleChange} required />
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default TaskForm;
