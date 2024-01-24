import React from 'react';
import { Task } from '../API';
import TaskCard from './TaskCard';

type TaskListProps = {
    tasks: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
    return (
        <div>
            <h3>Tasks</h3>
            {tasks.map(task => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
}

export default TaskList;
