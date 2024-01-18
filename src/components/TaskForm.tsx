import React, { useState, FormEvent } from 'react';
import { API } from 'aws-amplify';
import { createTask } from '../graphql/mutations';

// Add a prop type for the onTaskCreated callback
interface TaskFormProps {
    onTaskCreated: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await API.graphql({
                query: createTask,
                variables: {
                    input: {
                        title: taskTitle,
                        description: taskDescription,
                        status: 'PENDING' // Assuming 'PENDING' is a valid status
                    }
                }
            });
            setTaskTitle('');
            setTaskDescription('');
            onTaskCreated(); // Trigger the task list refresh
        } catch (error) {
            console.error('Error creating task', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Task Title"
            />
            <textarea 
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Task Description"
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
