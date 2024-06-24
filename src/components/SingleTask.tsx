/// <reference types="vite-plugin-svgr/client" />
import { useState } from 'react';
import { List, Task } from '../data-models/interfaces';
import { formatDistance } from "date-fns";
import Delete from '@material-design-icons/svg/two-tone/delete.svg?react';
import Check from '@material-design-icons/svg/two-tone/check.svg?react';
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
    const name: string = task.name;

    /**
     * Handle the title change event.
     * @param event The title change event.
     * @returns void
     * @description Update the current task's name.
     */
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // We need to strip out anything that is not a letter or number. 
        // Exclamation mark and period is allowed.
        const regex = /[^a-zA-Z0-9! .]/g;
        const newName = event.target.value.replace(regex, '');
        setCurrentName(newName);
    };

    /**
     * Update the current task's completed status for the currentList.
     * @returns void
     * @description Update the current task's completed status.
     */
    const handleCompleteChange = () => {
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
    }

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
        <div className={`task${task.completed ? ' completed' : ''}`}>
            {!task.completed && 
                <>
                    <input type="text" value={currentName || name} placeholder="Enter a task description." id={taskId} onChange={handleNameChange} onKeyDownCapture={handleNameSubmit} />
                    <Timer timerStartValue={task.timer} />
                    <button className={`w-icon${task.completed ? ' completed' : ''}`} onClick={handleCompleteChange}>
                        <Check />
                    </button>
                </>
            }
            {task.completed && 
                <>
                    <div className="task-completed-wrap">
                        <button className={`w-icon${task.completed ? ' completed' : ''}`} onClick={handleCompleteChange}>
                            <Check />
                        </button> 
                        <p><strong>{name}</strong></p> 
                        <span>{formatDistance(task.timestamp, new Date(), { addSuffix: true, includeSeconds: true })}</span>
                    </div>
                    <button className="w-icon delete-icon" onClick={handleDeleteTask}>
                        <Delete />
                    </button>
                </>
            }
        </div>
    );
};

export default SingleTask;