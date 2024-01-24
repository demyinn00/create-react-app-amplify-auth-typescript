import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import {
    CreateTaskInput,
    UpdateTaskInput, 
    Task, 
    ListTasksQuery, 
    DeleteTaskInput
} from '../API';
import { listTasks } from '../graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { createTask, updateTask, deleteTask } from '../graphql/mutations'

const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [triggerFetch, setTriggerFetch] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
            const taskData = await API.graphql(graphqlOperation(listTasks)) as GraphQLResult<ListTasksQuery>;
            console.log(taskData)
            if (taskData.data && taskData.data.listTasks && taskData.data.listTasks.items) {
                const fetchedTasks = taskData.data.listTasks.items as Task[];
                setTasks(fetchedTasks);
                setTriggerFetch(false);
            }
            } catch (error) {
            console.error('Error fetching tasks', error);
            }
        };

        fetchTasks();
    }, [triggerFetch]);

    const addTask = async (taskDetails: CreateTaskInput) => {
        try {
            const newTask = await API.graphql({
                query: createTask,
                variables: { input: taskDetails }
            });
            setTriggerFetch(true);
            console.log('New task created:', newTask)
        } catch (error) {
            console.error('Error creating task', error)
        }
    };

    const editTask = async (taskId: string, updateDetails: UpdateTaskInput) => {
        try {
            const updatedTask = await API.graphql({
                query: updateTask,
                variables: { input: updateDetails }
            });
            setTriggerFetch(true);
            console.log('Task updated', updatedTask)
        } catch (error) {
            console.error('Error updating task', error);
        }
    };

    const removeTask = async (taskId: string, deleteDetails: DeleteTaskInput) => {
        try {
            const deletedTask = await API.graphql({
                query: deleteTask,
                variables: { input: deleteDetails }
            });
            setTriggerFetch(true);
            console.log('Task removed', deletedTask)
        } catch (error) {
            console.error('Error editing deleting task', error)
        }
    };

    return {
        tasks, 
        addTask,
        editTask,
        removeTask
    }
};

export default useTasks;