/// <reference types="vite-plugin-svgr/client" />
import { useState } from 'react';
import { List, Task } from '../data-models/interfaces';
import { formatDistance } from "date-fns";
import Delete from '@material-design-icons/svg/two-tone/delete.svg?react';
import Timer from './Timer';
import { updateTaskInList, deleteTaskFromList } from '../utilities/state';

interface TaskProps {
    lists: List[];
    setLists: React.Dispatch<React.SetStateAction<List[]>>;
    currentList: string;
    task: Task;
}

const SingleTask: React.FC<TaskProps> = ({ setLists, currentList, task }) => {
    const [currentName, setCurrentName] = useState('');

    const taskId: string = task.id;
    const completed: boolean = task.completed;
    const name: string = task.name;

    /**
     * Handle the title change event.
     * @param event The title change event.
     * @returns void
     * @description Update the current task's name.
     */
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentName(event.target.value);
    };

    /**
     * Handle the checkbox change event.
     * @returns void
     * @description Update the current task's completed status.
     */
    const handleCheckboxChange = () => {

        // Update the task's completed
        const updatedTask = {
            ...task,
            completed: !task.completed,
            timestamp: new Date().getTime(),
        };

        // Update Lists state and local storage.
        setLists((prevLists: List[]) => {
            return updateTaskInList(currentList, prevLists, updatedTask);
        });
    };

    /**
     * Update the current task's name for the currentList.
     */
    const updateTaskName = () => {

        // Update the task's name
        const updatedTask = {
            ...task,
            name: currentName,
        };

        // Update Lists state and local storage.
        setLists((prevLists: List[]) => {
            return updateTaskInList(currentList, prevLists, updatedTask);
        });
    }

    /**
     * Handle the name keypress event.
     * @param event The keyboard event.
     * @returns void
     * @description Update the task name if the keypress is Enter.
     */
    const handleNameSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {

        // Update if keypress is Enter.
        if (event.key === 'Enter') {
            updateTaskName();
        }
    };

    /**
     * Handle the delete task event.
     * @returns void
     */
    const handleDeleteTask = () => {
        // Update Lists state and local storage.
        setLists((prevLists: List[]) => {
            return deleteTaskFromList(currentList, prevLists, taskId);
        });
    };

    return (
        <div>
            <input type="text" value={currentName || name} placeholder="Enter a task description." id={taskId} onChange={handleTitleChange} onKeyDownCapture={handleNameSubmit} />
            <Timer timerStartValue={task.timer} />
            <button className="w-icon" onClick={handleDeleteTask}>
                <Delete />
            </button>
            <label>
                <input type="checkbox" name={taskId} checked={completed} onChange={handleCheckboxChange} />
                Completed
            </label>
            <span>{formatDistance(task.timestamp, new Date(), { addSuffix: true, includeSeconds: true })}</span>
        </div>
    );
};

export default SingleTask;