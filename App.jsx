import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import AddDependency from "./components/AddDependency";
import DependencyGraph from "./components/DependencyGraph";

function App() {
  return (
    <div>
      <h1>Task Dependency Management System</h1>

      <AddTask />

      <AddDependency />

      <TaskList />

      <DependencyGraph />
      
    </div>
  );
}

export default App;