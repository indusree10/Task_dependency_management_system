import { useState, useEffect } from "react";
import axios from "axios";

function AddDependency() {

    const [tasks, setTasks] = useState([]);
    const [taskId, setTaskId] = useState("");
    const [dependsOn, setDependsOn] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/tasks/")
            .then((response) => {
                setTasks(response.data);
            });
    }, []);

    const handleSubmit = (e) => {

        e.preventDefault();
        if (taskId === dependsOn) {
            alert("A task cannot depend on itself!");
            return;
        }
        setLoading(true);

        axios.post(
            `http://127.0.0.1:8000/api/tasks/${taskId}/dependencies/`,
            {
                depends_on: dependsOn,
            }
        )
        .then(() => {
            alert("Dependency Added Successfully!");
            setLoading(false);
        })
        .catch((error) => {
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert("Something went wrong!");
            }
            setLoading(false);


        });
    };

    return (
        <form onSubmit={handleSubmit}>

            <h2>Add Dependency</h2>

            <select
                value={taskId}
                onChange={(e) => setTaskId(e.target.value)}
            >
                <option value="">Select Task</option>

                {tasks.map((task) => (
                    <option key={task.id} value={task.id}>
                        {task.title}
                    </option>
                ))}

            </select>

            <br /><br />

            <select
                value={dependsOn}
                onChange={(e) => setDependsOn(e.target.value)}
            >
                <option value="">Depends On</option>

                {tasks.map((task) => (
                    <option key={task.id} value={task.id}>
                        {task.title}
                    </option>
                ))}

            </select>

            <br /><br />

            <button 
                type="submit"
                disabled={loading}
            >
                {loading ? "Checking..." : "Add Dependency"}

               
            </button>

        </form>
    );
}

export default AddDependency;