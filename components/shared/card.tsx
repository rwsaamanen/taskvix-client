"use client";

import React, { useState } from 'react';
import './card.scss';
import { Task } from '@/types';
import { CheckCircle2, FilePenIcon, XCircle } from 'lucide-react';
import { deleteRequest, putRequest } from '@/service/task-service';

interface CardProps {
    task: Task;
}

const Card: React.FC<CardProps> = ({ task }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.taskTitle);
    const [editedContent, setEditedContent] = useState(task.taskContent);

    const handleDelete = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleMarkComplete = async () => {
        const updatedTask = { ...task, taskStatus: true };

        try {
            await putRequest(`/tasks/${task.taskId}`, updatedTask);
            console.log('Task marked as complete:', updatedTask);
        } catch (error) {
            console.error('Error marking task as complete:', error);
        }
    };

    const handleEdit = () => {
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    const handleUpdate = async () => {
        const updatedTask = { ...task, taskTitle: editedTitle, taskContent: editedContent };

        try {
            await putRequest(`/tasks/${task.taskId}`, updatedTask);
            console.log('Task updated successfully:', updatedTask);
            setEditModalOpen(false);
            // Optionally, you may also update the state or trigger a refresh of the task list
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteRequest(`/tasks/${task.taskId}`);
            console.log('Task deleted successfully:', task);
            setModalOpen(false);
            // Optionally, you may also update the state or trigger a refresh of the task list
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="card">
            <div className='top-section'>
                <div className='title-section'>
                    <h4><b>{task.taskTitle}</b></h4>
                    <div className='status' style={{ backgroundColor: task.taskStatus ? 'green' : 'red' }}>
                        <p>{task.taskStatus ? 'Completed' : 'Pending'}</p>
                    </div>
                </div>
                <div className='btn-delete' onClick={handleDelete}>
                    <XCircle size={24} />
                </div>
            </div>
            <div className='separator' />
            <div className='mid-section'>
                <p>{task.taskContent}</p>
            </div>
            <div className='bottom-section'>
                <div className='btn-edit' onClick={handleEdit}>
                    <FilePenIcon size={24} />
                </div>
                {task.taskStatus ? null : (
                    <div className='btn-mark-complete' onClick={handleMarkComplete}>
                        <CheckCircle2 size={24} />
                    </div>
                )}
            </div>

            {isEditModalOpen && (
                <div id={`editModalId-${task.taskId}`} className="edit-modal">
                    <div className="edit-modal-content">
                        <p>Edit Task</p>
                        <h2>Title</h2>
                        <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                        <h2>Content</h2>
                        <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                        <div className="edit-modal-buttons">
                            <button onClick={handleUpdate} className='edit-modal-btn-one'>Update</button>
                            <button onClick={handleCloseEditModal} className='edit-modal-btn-two'>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div id={`modalId-${task.taskId}`} className="modal">
                    <div className="modal-content">
                        <h2>Are you sure you want to delete?</h2>
                        <p>{task.taskTitle}</p>
                        <div className="modal-buttons">
                            <button onClick={handleConfirmDelete} className='modal-btn-one'>Yes</button>
                            <button onClick={handleCloseModal} className='modal-btn-two'>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;
