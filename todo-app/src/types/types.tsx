export interface Task {
    id: number,
    title: string,
    isCompleted: boolean
}

export interface TaskItemProps {
    task: Task,
    onDelete: (taskId: number) => void;
    onCheckboxClick: (taskId: number, isCompleted: boolean) => void;
}

export interface NewTaskFormProps {
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}