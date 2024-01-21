import React from 'react';
import { Task } from '../API';

type TaskListProps = {
    tasks: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
    return (
        <div>
            <h3>Tasks</h3>
            {tasks.map(task => (
                <div key={task.id}>
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                </div>
            ))}
        </div>
    );
}

export default TaskList;
