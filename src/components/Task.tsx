import React, { useState } from 'react';

interface Task {
    id: string;
    title: string;
    completed: boolean;
}

interface ListWithIndexSignature {
    [key: string]: {
        tasks: {
            [key: string]: Task;
        };
        completed: boolean;
        title: string;
    };
}

interface TaskProps {
    lists: ListWithIndexSignature;
    setLists: React.Dispatch<React.SetStateAction<ListWithIndexSignature>>;
    currentList: string;
    task: Task;
}

const Task: React.FC<TaskProps> = ({ setLists, currentList, task }) => {
    const [currentTitle, setCurrentTitle] = useState('');

    const taskId: string = task.id;
    const completed: boolean = task.completed;
    const title: string = task.title;

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(event.target.value);
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
    const updateLists = (prevLists: ListWithIndexSignature, title: string) => {
        // Update the current task's completed status.
        const updatedTask: Task = updateTaskCompletedStatus(task);

        // Update the currentList's tasks with the updated task.
        const updatedTasks = {
            ...prevLists[currentList].tasks,
            [taskId]: updatedTask,
        };

        // Update the currentList's tasks with the sorted tasks.
        return {
            ...prevLists,
            [currentList]: {
                ...prevLists[currentList],
                tasks: updatedTasks,
            },
        };

    }


    const handleCheckboxChange = (title: string) => {
        setLists((prevLists: ListWithIndexSignature) => {
            return updateLists(prevLists, title);
        });
    };

    const handleTitleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setLists((prevLists: ListWithIndexSignature) => {
            return {
                ...prevLists,
                [taskId]: {
                    ...prevLists[taskId],
                    title,
                },
            };
        });
    };

    return (
        <div>
            <input type="text" value={currentTitle || title} placeholder="Enter a task description." id={taskId} onChange={handleTitleChange} onSubmit={handleTitleSubmit} />
            <label>
                <input type="checkbox" name={taskId} checked={completed} onChange={() => handleCheckboxChange(task.title)} />
                Completed
            </label>
        </div>
    );
};

export default Task;