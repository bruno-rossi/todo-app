import React from "react";
import { useState } from "react";
import { NewTaskFormProps } from "../types/types";

function NewTaskForm({tasks, setTasks}: NewTaskFormProps ) {

    const [ newTaskTitle, setNewTaskTitle ] = useState<string>("");
    const [ newTaskDescription, setNewTaskDescription ] = useState<string>("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "title": newTaskTitle,
                "description": newTaskDescription,
                "status": "Open"
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Failed to create user');
            }
        })
        .then(newTask => {
            setTasks([...tasks, newTask]);
            setNewTaskTitle("");
            setNewTaskDescription("");
            console.log("New task has been added successfully!");
        })
        .catch(error => console.log(error))
    }

    return (
        <div>
            <form onSubmit={event => handleSubmit(event)}>
                <input type="text" placeholder="Task title" value={newTaskTitle} onChange={event => setNewTaskTitle(event.target.value)}></input>
                <input type="text" placeholder="Task description" value={newTaskDescription} onChange={event => setNewTaskDescription(event.target.value)}></input>
                <button type="submit">Add new task</button>
            </form>
        </div>
    )
}

export default NewTaskForm