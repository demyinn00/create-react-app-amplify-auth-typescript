import React, { useState, FormEvent } from 'react';
import { 
    Task, 
    UpdateTaskInput, 
    TaskStatus, 
    DeleteTaskInput
} from '../API';
import './styles/TaskDetails.css'

// Add a prop type for the onTaskCreated callback
type TaskDetailsProps = {
    task: Task;
    onSubmitEdit: (updateDetails: UpdateTaskInput) => Promise<void>;
    onSubmitDelete: (deleteDetails: DeleteTaskInput) => Promise<void>;
    onClose: () => void;
    isVisible: boolean
}

const TaskDetails = ({ task, onSubmitEdit, onSubmitDelete, onClose, isVisible }: TaskDetailsProps) => {
    
    const [taskTitle, setTaskTitle] = useState(task.title ? task.title : '');
    const [taskSummary, setTaskSummary] = useState(task.summary ? task.summary : '');
    const [taskDescription, setTaskDescription] = useState(task.description ? task.description : '');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const updateDetails: UpdateTaskInput = {
            id: task.id,
            title: taskTitle,
            summary: taskSummary,
            description: taskDescription,
            status: TaskStatus.PENDING
        };
        try {
            await onSubmitEdit(updateDetails);
            onClose();
        } catch (error) {
            console.error('Error creating task', error)
        }
    };

    const handleDeleteClick = async () => {
        const deleteDetails: DeleteTaskInput = {
            id: task.id
        };
        try {
            await onSubmitDelete(deleteDetails);
            onClose();
        } catch (error) {
            console.log('Error deleting task', error);
        }
    };

    if (!isVisible) {
        console.log('inside if statement!')
        return null;
    }

    return (
        <div className="modal-overlay-edit" onClick={onClose}>
            <div className="modal-content-edit" onClick={e => e.stopPropagation()}>
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
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleDeleteClick}>Delete</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default TaskDetails;
