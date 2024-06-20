import { useState } from 'react';
import { List, Task } from '../data-models/interfaces';


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
        }
    }

    /**
     * Update the prevLists object with the current tasks list updated task's completed status.
     * @returns The updated prevLists object.
     */
    const updateLists = (prevLists: List[]) => {
        // Update the current task's completed status.
        const updatedTask: Task = updateTaskCompletedStatus(task);

        // Update the currentList's tasks with the updated task.
        return prevLists.map((list: List) => {
            if (list.id === currentList) {
                return {
                    ...list,
                    tasks: list.tasks.map((task: Task) => {
                        if (task.name === name) {
                            return updatedTask;
                        }
                        return task;
                    }),
                };
            }
            return list;
        });

    }


    const handleCheckboxChange = () => {
        setLists((prevLists: List[]) => {
            return updateLists(prevLists);
        });
    };

    const handleNameSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setLists((prevLists: List[]) => {
            // Update the current task's name with the currentName.
            const updatedTask: Task = {
                ...task,
                name: currentName,
            };

            // Update the currentList's tasks with the updated task.
            return prevLists.map((list: List) => {
                if (list.id === currentList) {
                    return {
                        ...list,
                        tasks: list.tasks.map((task: Task) => {
                            if (task.name === name) {
                                return updatedTask;
                            }
                            return task;
                        }),
                    };
                }
                return list;
            });
        });
    };

    return (
        <div>
            <input type="text" value={currentName || name} placeholder="Enter a task description." id={taskId} onChange={handleTitleChange} onSubmit={handleNameSubmit} />
            <label>
                <input type="checkbox" name={taskId} checked={completed} onChange={handleCheckboxChange} />
                Completed
            </label>
        </div>
    );
};

export default SingleTask;