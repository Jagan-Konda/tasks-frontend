import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

const EditTaskForm = ({ task, onUpdate, onCancel }) => {
    const [updatedTask, setUpdatedTask] = useState(task);

    useEffect(() => {
        setUpdatedTask(task); // Ensure form updates if the task changes
    }, [task]);

    const handleChange = (e) => {
        setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = Cookies.get("jwt_token");

        try {
            const response = await fetch(`https://tasks-backend-ujte.onrender.com/tasks/${task.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(updatedTask),
            });

            if (response.ok) {
                alert("Task updated successfully!");
                onUpdate();
                onCancel(); // Close the edit form
            } else {
                alert("Failed to update task.");
            }
        } catch (error) {
            console.error("Error updating task:", error);
            alert("An error occurred while updating the task.");
        }
    };

    return (
        <div className="task-form-container">
            <h2>Edit Task</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={updatedTask.title} onChange={handleChange} required />
                <textarea name="description" value={updatedTask.description} onChange={handleChange} required />
                <select name="status" value={updatedTask.status} onChange={handleChange}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <input type="date" name="due_date" value={updatedTask.due_date} onChange={handleChange} required />
                <button type="submit">Update Task</button>
                <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
            </form>
        </div>
    );
};

export default EditTaskForm;
