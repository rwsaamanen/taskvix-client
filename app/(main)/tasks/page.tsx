"use client";

import CreateTask from '@/components/shared/create-task';
import GetTasks from '@/components/shared/get-tasks';
import './tasks.scss'

const Tasks = () => {

    return (
        <div className='task-container'>
            <CreateTask />
            <GetTasks />
        </div>
    )
}

export default Tasks;
