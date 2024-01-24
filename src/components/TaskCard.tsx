import React, { useState } from 'react';
import { Task } from '../API';

type TaskCardProps = {
    task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
    const [status, setStatus] = useState(task.status);
    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value as any);
    }

    return (
        <div key={task.id}>
            <h4>{task.title}</h4>
            <p>{task.summary}</p>
            <select value={status} onChange={handleStatusChange}>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
            </select>
        </div>
    );
};

export default TaskCard;