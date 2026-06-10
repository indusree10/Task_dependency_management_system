import { useEffect, useState } from "react";
import axios from "axios";

function TaskList() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        axios.get("http://127.0.0.1:8000/api/tasks/")
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    const getStatusColor = (status) => {

    if (status === "pending") {
        return "orange";
    }

    if (status === "in_progress") {
        return "blue";
    }

    if (status === "completed") {
        return "green";
    }

    if (status === "blocked") {
        return "red";
    }

    return "black";
};
const updateStatus = (taskId, status) => {

    axios.patch(`http://127.0.0.1:8000/api/tasks/${taskId}/`, {
        status: status
    })
    .then(() => {
        window.location.reload();
    })
    .catch((error) => {
        console.log(error);
    });

};
const deleteTask = (taskId) => {

    const confirmDelete = window.confirm(
        "Warning! Other tasks may depend on this task. Are you sure you want to delete it?"
    );

    if (!confirmDelete) {
        return;
    }

    axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}/`)
        .then(() => {
            alert("Task Deleted Successfully!");
            window.location.reload();
        })
        .catch((error) => {
            alert("Something went wrong. Please try again.");
        });
};
if (tasks.length === 0) {
    return <h2>No tasks available.</h2>;
}

    return (
        <div>
            <h2>Task List</h2>

            {tasks.map((task) => (
                <div key={task.id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    {task.dependency_titles.length > 0 && (
                        <div>
                            <strong>Depends On:</strong>
                            <ul>
                                {task.dependency_titles.map((dependency, index) => (
                                    <li key={index}>
                                        {dependency}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <select
                       value = {task.status}
                       onChange={(e) => updateStatus(task.id, e.target.value)}
                       style={{
                        color: getStatusColor(task.status),
                        fontWeight: "bold"
                       }}
                    >
                        <option value="pending">pending</option>
                         <option value="in_progress">in_progress</option>
                         <option value="completed">completed</option>
                         <option value="blocked">blocked</option>
                    </select>
                    <br /><br />
                    <button
                        onClick={() => deleteTask(task.id)}
                    >
                        Delete
                    </button>
                    
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default TaskList;