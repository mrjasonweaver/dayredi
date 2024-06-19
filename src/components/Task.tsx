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

const Task: React.FC<TaskProps> = ({ lists, setLists, currentList, task }) => {
    const [title, setTitle] = useState(task.title);

    const taskId = task.id;
    const completed = task.completed;

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleCheckboxChange = () => {
        setLists((prevLists: ListWithIndexSignature) => {
            // Update the current task's completed status for the currentList.
            return {
                ...prevLists,
                [currentList]: {
                    ...prevLists[currentList],
                    tasks: {
                        ...prevLists[currentList].tasks,
                        [taskId]: {
                            ...prevLists[currentList].tasks[taskId],
                            completed: !completed,
                        },
                    },
                },
            };
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
            <input type="text" value={title} placeholder="Enter a task description." onChange={handleTitleChange} onSubmit={handleTitleSubmit} />
            <label>
                <input type="checkbox" checked={completed} onChange={handleCheckboxChange} />
                Completed
            </label>
        </div>
    );
};

export default Task;