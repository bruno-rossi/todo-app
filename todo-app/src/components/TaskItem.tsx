import { TaskItemProps } from "../types/types";

function TaskItem({task, onDelete, onCheckboxClick}: TaskItemProps) {

    function handleCheckbox(event: React.ChangeEvent<HTMLInputElement>) {
        console.log('Checkbox changed:', event.target.checked);
        onCheckboxClick(task.id, !task.isCompleted);
    }

    function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
        onDelete(task.id);
    }

    return (
        <li key={task.id}>
            <input 
                type="checkbox"
                onChange={handleCheckbox}
                checked={task.isCompleted}
            ></input>
            {/* <input 
                type="text"
                value={task.title}
                onChange={handleTaskTitleChange}
                className={task.isCompleted ? "completed" : ""}
            ></input> */}
            <p className={task.isCompleted ? "completed" : ""}>{task.title}</p>
            {/* <button onClick={handleTaskTitleChange}>Save</button> */}
            <button onClick={event => handleDelete(event)}>Delete</button>
        </li>
    )
}

export default TaskItem