import { useEffect, useState } from "react";
import axios from "axios";

function DependencyGraph() {

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
    const getTaskY = (title) => {

    const index = tasks.findIndex(
        (task) => task.title === title
    );

    return 80 + index * 100;

    };

    return (

        <div>

            <h2>Dependency Graph</h2>


            <svg width="900" height="600">

                {tasks.map((task, index) => (

                   <g key={task.id}>

                      {(task.dependency_titles || []).map((dependency, i) => (

                        <line
                           key={task.id + "-" + i}
                           x1="280"
                           y1={105 + index * 100}
                           x2="100"
                           y2={getTaskY(dependency) + 25}
                           stroke="white"
                           strokeWidth="2"
                        />

                ))}

                <rect
                    x="100"
                    y={80 + index * 100}
                    width="180"
                    height="50"
                    fill={
                
                        task.status === "pending"
                            ? "gray"
                            : task.status === "in_progress"
                            ? "blue"
                            : task.status === "completed"
                            ? "green"
                            : "red"
                    }
                    stroke="white"
                />

                <text
                    x="120"
                    y={110 + index * 100}
                    fill="white"
                >
                    {task.title}
                  </text>

                 </g>

                ))}

             </svg>

        </div>

    );

}

export default DependencyGraph;