import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { Task } from "../types/types";
import NewTaskForm from "./NewTaskForm";

function TaskList() {

    const [ tasks, setTasks ] = useState<Task[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/tasks")
        .then(res => res.json())
        .then(tasks => setTasks(tasks) )
        .catch(error => console.error("Error fetching tasks:", error));
    }, [])

    function handleCheckbox(taskId: number, isCompleted: boolean) {

        fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                isCompleted: isCompleted,
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                console.error("Failed to update task.");
            }
        })
        .then(updatedTask => {
            setTasks(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task))
        })
        .catch(error => console.error("Error:", error))
    }

    function deleteTask(taskId: number) {

        fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
        }})
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                console.error("Failed to delete task.");
            }
        })
        .then(() => {
            setTasks(tasks.filter(task => task.id !== taskId))
        })
        .catch(error => console.error("Error:", error))
    }
    

    return (
    <div className="task-list"> 
        <NewTaskForm tasks={tasks} setTasks={setTasks}></NewTaskForm>
        <ul>
            {tasks && tasks.map(task => (
                <TaskItem key={task.id} task={task} onDelete={deleteTask} onCheckboxClick={handleCheckbox}></TaskItem>
            ))}
        </ul>
    </div>
    );
}

export default TaskList;
