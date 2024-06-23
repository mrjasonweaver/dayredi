import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { List } from '../data-models/interfaces';
import { addTaskToList } from '../utilities/state';

interface AddTaskProps {
    setLists: React.Dispatch<React.SetStateAction<List[]>>;
    currentList: string;
}

/**
 * AddTask component to add a new task to the current list.
 * @param setLists The setLists function to update the lists state.
 * @param currentList The current list id.
 * @returns The AddTask component.
 * @return {JSX.Element}
 */
const AddTask: React.FC<AddTaskProps> = ({ setLists, currentList }) => {
    const [name, setName] = useState('');
    const [timer, setTimer] = useState(0);

    // Add ref to the input element of the task title.
    const taskTitleRef = React.createRef<HTMLInputElement>();

    // Add ref to the input element of the task timer.
    const taskTimerRef = React.createRef<HTMLInputElement>();

    const onAdd = (name: string, timer: number) => {
        const newTaskId = uuidv4();

        // Create a new task object.
        const newTask = {
            id: newTaskId,
            name: name,
            completed: false,
            timer: timer,
            timestamp: new Date().getTime(),
        };

        // Update Lists state and local storage.
        setLists((prevLists: List[]) => {
            return addTaskToList(currentList, prevLists, newTask);
        });
    }

    /**
     * Handle the input change event.
     * @param event The input change event.
     * @return {void}
     */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    };

    /**
     * Handle the set timer event.
     * @param event The input change event.
     * @return {void}
     * @description Set the timer state.
     */
    const handleSetTimer = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTimer(parseInt(event.target.value));
    };

    /**
     * Handle the add submit event.
     * @return {void}
     */
    const handleAddSubmit = (): void => {
        if (name.trim() !== '') {
            onAdd(name, timer);
            setName('');
            setTimer(0);
        }
    };

    /**
     * Handle the add on enter event.
     * @param event The key down event.
     * @return {void}
     */
    const handleAddOnEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            // Move the focus to the timer input.
            if (event.currentTarget.id === 'task-title' && timer === 0) {
                taskTimerRef.current?.focus();
            } else if (event.currentTarget.id === 'task-timer' && name.trim() === '') {
                taskTitleRef.current?.focus();
            } else {
                handleAddSubmit();
            }

        }
    };

    return (
        <div className="add-task">
            <input
                ref={taskTitleRef}
                type="text"
                id="task-title"
                placeholder="Enter task name"
                value={name}
                onChange={handleInputChange}
                onKeyDownCapture={handleAddOnEnter} />
            <input
                ref={taskTimerRef}
                type="number"
                id="task-timer"
                placeholder="Enter time in minutes"
                value={timer > 0 ? timer : ''}
                onChange={handleSetTimer}
                onKeyDownCapture={handleAddOnEnter} />
            <button onClick={handleAddSubmit}>Add Task</button>
        </div>
    );
};

export default AddTask;