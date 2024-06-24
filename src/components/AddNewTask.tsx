import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { List } from '../data-models/interfaces';
import { addTaskToList } from '../utilities/state';
import AddTask from '@material-design-icons/svg/two-tone/add_task.svg?react';

interface AddTaskProps {
    setLists: React.Dispatch<React.SetStateAction<List[]>>;
    currentList: string;
}

/**
 * AddNewTask component to add a new task to the current list.
 * @param setLists The setLists function to update the lists state.
 * @param currentList The current list id.
 * @returns The AddNewTask component.
 * @return {JSX.Element}
 */
const AddNewTask: React.FC<AddTaskProps> = ({ setLists, currentList }) => {
    const [name, setName] = useState('');
    const [timer, setTimer] = useState(0);

    // Add ref to the input element of the task title.
    const taskNameRef = React.createRef<HTMLInputElement>();

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
        // We need to strip out anything that is not a letter or number. 
        // Exclamation mark and period is allowed.
        const regex = /[^a-zA-Z0-9! .]/g;
        const newName = event.target.value.replace(regex, '');
        setName(newName);
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
        if (name.trim() !== '' && timer !== 0) {
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
            if (event.currentTarget.id === 'task-name' && timer === 0) {
                taskTimerRef.current?.focus(); // Move the focus to the timer input.
                return;
            } else if (event.currentTarget.id === 'task-timer' && name.trim() === '') {
                taskNameRef.current?.focus(); // Move the focus to the name input.
                return;
            }
            handleAddSubmit();
        }
    };

    return (
        <div className="add-task">
            <div className="add-task-inputs">
                <input
                    ref={taskNameRef}
                    type="text"
                    id="task-name"
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
            </div>
            <button className="w-icon" onClick={handleAddSubmit} disabled={(timer === 0) || name === ''}><AddTask /></button>
        </div>
    );
};

export default AddNewTask;