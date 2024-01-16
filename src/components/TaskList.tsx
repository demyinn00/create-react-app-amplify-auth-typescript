import React, {useEffect, useState} from 'react';
import {API} from 'aws-amplify';
import {listTasks} from '../graphql/queries';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const taskData = await API.graphql({query: listTasks});
            console.log(taskData);
            // const tasks = taskData.data.listTasks.items;
            // setTasks(tasks)
        } catch(error) {
            console.error('Error fetching tasks', error);
        }
    };

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