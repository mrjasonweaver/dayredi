/// <reference types="vite-plugin-svgr/client" />
import { useState } from 'react';
import { List, Task } from '../data-models/interfaces';
import { formatDistance } from "date-fns";
import Delete from '@material-design-icons/svg/two-tone/delete.svg?react';
import Timer from './Timer';

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
     * Utility to update the current task's completed status for the currentList.
     * @param task The task to update.
     * @returns The updated task.
     */
    const updateTaskCompletedStatus = (task: Task) => {
        return {
            ...task,
            completed: !task.completed,
            timestamp: new Date().getTime(),
        }
    }

    /**
     * Update the prevLists object with the current tasks list updated task's completed status.
     * @param prevLists The previous lists object.
     * @returns The updated prevLists object.
     */
    const updateLists = (prevLists: List[]): List[] => {
        // Update the current task's completed status.
        const updatedTask: Task = updateTaskCompletedStatus(task);
    
        // Update the currentList's tasks with the updated task.
        const newList = prevLists.map((list: List) => {
            if (list.id === currentList) {
                return {
                    ...list,
                    tasks: list.tasks.map((task: Task) => {
                        if (task.id === taskId) {
                            return updatedTask;
                        }
                        return task;
                    }),
                };
            }
            return list;
        });

        // Update the local storage.
        localStorage.setItem('list-timer-app', JSON.stringify(newList));

        return newList;
    
    }


    /**
     * Handle the checkbox change event.
     * @returns void
     * @description Update the current task's completed status.
     */
    const handleCheckboxChange = () => {
        setLists((prevLists: List[]) => {
            return updateLists(prevLists);
        });
    };

    /**
     * Update the current task's name for the currentList.
     */
    const updateTaskName = () => {
        setLists((prevLists: List[]) => {
            const newLists = prevLists.map((list: List) => {
                if (list.id === currentList) {
                    return {
                        ...list,
                        tasks: list.tasks.map((task: Task) => {
                            if (task.id === taskId) {
                                return {
                                    ...task,
                                    name: currentName,
                                };
                            }
                            return task;
                        }),
                    };
                }
                return list;
            });

            // Update the local storage.
            localStorage.setItem('list-timer-app', JSON.stringify(newLists));

            return newLists;
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
     * Delete the current task from the currentList.
     * @returns void
     */
    const deleteTask = () => {
        setLists((prevLists: List[]) => {
            const newLists = prevLists.map((list: List) => {
                if (list.id === currentList) {
                    return {
                        ...list,
                        tasks: list.tasks.filter((task: Task) => {
                            return task.id !== taskId;
                        }),
                    };
                }
                return list;
            });

            // Update the local storage.
            localStorage.setItem('list-timer-app', JSON.stringify(newLists));

            return newLists;
        });
    };

    /**
     * Handle the delete task event.
     * @returns void
     */
    const handleDeleteTask = () => {
        deleteTask();
    };

    return (
        <div>
            <input type="text" value={currentName || name} placeholder="Enter a task description." id={taskId} onChange={handleTitleChange} onKeyDownCapture={handleNameSubmit} />
            <Timer timerStartValue={task.timer} />
            <button onClick={handleDeleteTask}>
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