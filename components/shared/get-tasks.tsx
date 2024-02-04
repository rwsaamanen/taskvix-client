"use client";

import React, { useEffect, useState } from 'react';
import Card from './card';
import { getRequest } from '@/service/task-service';
import { Task } from '@/types';

interface GetTasksProps {}

const GetTasks: React.FC<GetTasksProps> = () => {
    const [taskList, setTaskList] = useState<Task[]>([]);

    useEffect(() => {
        getAllTasks();
    }, []);

    async function getAllTasks() {
        try {
            const allTasks: Task[] = await getRequest('/tasks');
            setTaskList(allTasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }

    return (
        <>
            {taskList.map((task) => (
                <Card key={task.taskId} task={task} />
            ))}
        </>
    );
};

export default GetTasks;
