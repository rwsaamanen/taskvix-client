"use client";

import React, { useState } from 'react';
import './card.scss';
import { Task } from '@/types';
import { CheckCircle2, FilePenIcon, XCircle } from 'lucide-react';
import { deleteRequest } from '@/service/task-service';

interface CardProps {
    task: Task;
  }

const Card: React.FC<CardProps> = ({ task }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleDelete = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
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
                    <p>{task.taskStatus ? 'Completed' : 'Pending'}</p>
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
                <div className='btn-edit'>
                    <FilePenIcon size={24} />
                </div>
                <div className='btn-mark-complete'>
                    <CheckCircle2 size={24} />
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div id={`modalId-${task.taskId}`} className="modal">
                    <div className="modal-content">
                        asd
                        <p>Are you sure you want to delete?</p>
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
