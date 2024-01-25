import React, { useState, FormEvent } from 'react';
import { CreateTaskInput, TaskStatus } from '../API';
import './styles/TaskForm.css'

// Add a prop type for the onTaskCreated callback
type TaskFormProps = {
    onTaskCreated: (taskDetails: CreateTaskInput) => Promise<void>;
    onClose: () => void;
    isVisible: boolean
}

const TaskForm = ({ onTaskCreated, onClose, isVisible }: TaskFormProps) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [taskSummary, setTaskSummary] = useState('')
    const [taskDescription, setTaskDescription] = useState('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const taskDetails: CreateTaskInput = {
            title: taskTitle,
            summary: taskSummary,
            description: taskDescription,
            status: TaskStatus.PENDING
        };
        try {
            await onTaskCreated(taskDetails);
            setTaskTitle('');
            setTaskSummary('');
            setTaskDescription('');
            onClose();
        } catch (error) {
            console.error('Error creating task', error)
        }
    };

    if (!isVisible) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        value={taskTitle}
                        onChange={e => setTaskTitle(e.target.value)}
                        placeholder="Task Title"
                    />
                    <textarea 
                        value={taskSummary}
                        onChange={e => setTaskSummary(e.target.value)}
                        placeholder="Task Summary"
                    />
                    <textarea 
                        value={taskDescription}
                        onChange={e => setTaskDescription(e.target.value)}
                        placeholder="Task Description"
                    />
                    <button type="submit">Add Task</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
