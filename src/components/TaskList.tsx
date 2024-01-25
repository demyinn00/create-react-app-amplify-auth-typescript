import React, { useState } from 'react';
import { 
    Task,
    UpdateTaskInput,
    DeleteTaskInput
} from '../API';
import TaskCard from './TaskCard';
import './styles/TaskDetails.css'
import TaskDetails from './TaskDetails';

type TaskListProps = {
    tasks: Task[];
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

    return (
        <div>
            <h3>Tasks</h3>
            <div className="taskListContainer">
                {tasks.map(task => (
                    <TaskCard 
                        key={task.id} 
                        task={task} 
                        onTaskSelected={handleTaskSelected}
                    />
                ))}

                {/* { selectedTask && <TaskDetails task={selectedTask} /> } */}
                {selectedTask && <TaskDetails 
                                    task={selectedTask} 
                                    onSubmitEdit={onEditTask} 
                                    onSubmitDelete={onRemoveTask}
                                    onClose={releaseSelectedTask} 
                                    isVisible={isFormVisible}
                                    />}
            </div>
        </div>
    );
}

export default TaskList;
