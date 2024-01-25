<<<<<<< HEAD
import React from 'react';
import { Task } from '../API';
=======
import React, { useState } from 'react';
import { 
    Task,
    UpdateTaskInput,
    DeleteTaskInput
} from '../API';
>>>>>>> 5e878c3 (Completed all CRUD operations;)
import TaskCard from './TaskCard';
import './styles/TaskCard.css'

type TaskListProps = {
    tasks: Task[];
<<<<<<< HEAD
}

const TaskList = ({ tasks }: TaskListProps) => {
=======
    onEditTask: (updateDetails: UpdateTaskInput) => Promise<void>;
    onRemoveTask: (deleteDetails: DeleteTaskInput) => Promise<void>;
}

const TaskList = ({ tasks, onEditTask, onRemoveTask }: TaskListProps) => {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleTaskSelected = (task: Task) => {
        setIsFormVisible(!isFormVisible)
        setSelectedTask(task)
    }

    const releaseSelectedTask = () => {
        setIsFormVisible(!isFormVisible)
        setSelectedTask(null);
    }

>>>>>>> 5e878c3 (Completed all CRUD operations;)
    return (
        <div>
            <h3>Tasks</h3>
            <div className="taskListContainer">
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
<<<<<<< HEAD
=======

                {/* { selectedTask && <TaskDetails task={selectedTask} /> } */}
                {selectedTask && <TaskDetails 
                                    task={selectedTask} 
                                    onSubmitEdit={onEditTask} 
                                    onSubmitDelete={onRemoveTask}
                                    onClose={releaseSelectedTask} 
                                    isVisible={isFormVisible}
                                    />}
>>>>>>> 5e878c3 (Completed all CRUD operations;)
            </div>
        </div>
    );
}

export default TaskList;
