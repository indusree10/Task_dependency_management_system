import { useState } from "react";
import axios from "axios";

function AddTask() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        axios.post("http://127.0.0.1:8000/api/tasks/", {
            title: title,
            description: description,
            status: "pending"
        })
        .then(() => {
            alert("Task Added Successfully!");
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (

        <form onSubmit={handleSubmit}>

            <h2>Add New Task</h2>

            <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <br /><br />

            <button type="submit">
                Add Task
            </button>

        </form>
    );
}

export default AddTask;