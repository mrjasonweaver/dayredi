import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { List } from '../data-models/interfaces';

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

    const onAdd = (name: string, timer: number) => {
        const newTaskId = uuidv4();
        setLists((prevLists: List[]) => {
            const newLists = prevLists.map((list: List) => {
                if (list.id === currentList) {
                    return {
                        ...list,
                        tasks: [
                            ...list.tasks,
                            {
                                id: newTaskId,
                                name,
                                completed: false,
                                timer,
                                timestamp: new Date().getTime(),
                            },
                        ],
                    };
                }
                return list;
            });

            // Save the new lists to local storage.
            localStorage.setItem('list-timer-app', JSON.stringify(newLists));

            return newLists;
        });
    }

    /**
     * Handle the input change event.
     * @param event The input change event.
     * @return {void}
     */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    /**
     * Handle the set timer event.
     * @param event The input change event.
     * @return {void}
     * @description Set the timer state.
     */
    const handleSetTimer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTimer(parseInt(event.target.value));
    };

    /**
     * Handle the add submit event.
     * @return {void}
     */
    const handleAddSubmit = () => {
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
    const handleAddOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && name !== '' && timer > 0) {
            handleAddSubmit();
        }
    };

    return (
        <div>
            <input type="text" id="task-title" value={name} onChange={handleInputChange} onKeyDownCapture={handleAddOnEnter} />
            <input type="number" id="task-timer" value={timer} onChange={handleSetTimer} onKeyDownCapture={handleAddOnEnter} />
            <button onClick={handleAddSubmit}>Add Task</button>
        </div>
    );
};

export default AddTask;