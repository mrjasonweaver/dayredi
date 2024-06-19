import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface AddTaskProps {
    onAdd: (title: string) => void;
}

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

interface AddTaskProps {
    lists: ListWithIndexSignature;
    setLists: React.Dispatch<React.SetStateAction<ListWithIndexSignature>>;
    currentList: string;
}

const AddTask: React.FC<AddTaskProps> = ({ setLists, currentList }) => {
    const [title, setTitle] = useState('');

    const onAdd = (title: string) => {
        const newTaskId = uuidv4();
        setLists((prevLists: ListWithIndexSignature) => {
            return {
                ...prevLists,
                [currentList]: {
                    ...prevLists[currentList],
                    tasks: {
                        ...prevLists[currentList].tasks,
                        [newTaskId]: {
                            id: newTaskId,
                            title,
                            completed: false,
                        },
                    },
                },
            };
        });
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleAddSubmit = () => {
        if (title.trim() !== '') {
            onAdd(title);
            setTitle('');
        }
    };

    return (
        <div>
            <input type="text" value={title} onChange={handleInputChange} />
            <button onClick={handleAddSubmit}>Add Task</button>
        </div>
    );
};

export default AddTask;