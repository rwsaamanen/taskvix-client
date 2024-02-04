"use client";

import React, { useEffect, useState } from 'react'
import './create-task.scss'
import { postRequest } from '@/service/task-service';

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const createNewTask = async () => {
        const timestamp = new Date().getTime();
        const uniqueId = `TASK_${timestamp}`;
    
        const newTask = {
            taskId: uniqueId,
            taskTitle: title,
            taskContent: description,
            taskStatus: false,
            taskCreatedAt: new Date().toISOString(),
        };
    
        console.log('New Task Payload:', newTask);
    
        try {
            const response = await postRequest('/tasks', newTask);
            console.log('New task created:', response);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };
    

    const handleCreateClick = () => {
        createNewTask();
    };

    return (
        <div className='create-task-container'>
            <div className='headers'>
                <h1 className="header">tasks</h1>
                <h1 className="sub-header">Create a new note</h1>
            </div>
            <div className="tasks">
                <div className='container'>
                    <label className='label'>Title</label>
                    <input className="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <label className='label'>Description</label>
                    <textarea className="editor" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button className='button' onClick={handleCreateClick}>
                    Create
                </button>
            </div>
        </div>
    )
}

export default CreateTask;
