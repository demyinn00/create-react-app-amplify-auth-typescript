import React from 'react';
import { Task } from '../API';
import TaskCard from './TaskCard';
import './styles/TaskCard.css'

type TaskListProps = {
    tasks: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
    return (
        <div>
            <h3>Tasks</h3>
            <div className="taskListContainer">
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
}

export default TaskList;
