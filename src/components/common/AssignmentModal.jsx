import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const AssignmentModal = ({ isOpen, onClose, onAssign, title, items = [], currentItemId }) => {
    const [selectedId, setSelectedId] = useState('')

    useEffect(() => {
        if (isOpen && currentItemId) {
            setSelectedId(currentItemId)
        } else {
            setSelectedId('')
        }
    }, [isOpen, currentItemId])

    if(!isOpen) return null

    const handleAssign = () => {
        if(selectedId){
            onAssign(selectedId)
        }
    }

    return (
        <div>
            
        </div>
    )
}