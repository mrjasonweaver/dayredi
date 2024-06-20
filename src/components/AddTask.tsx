import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { List } from '../data-models/interfaces';

interface AddTaskProps {
    setLists: React.Dispatch<React.SetStateAction<List[]>>;
    currentList: string;
}

const AddTask: React.FC<AddTaskProps> = ({ setLists, currentList }) => {
    const [name, setName] = useState('');

    const onAdd = (title: string) => {
        const newTaskId = uuidv4();
        setLists((prevLists: List[]) => {
            return prevLists.map((list: List) => {
                if (list.id === currentList) {
                    return {
                        ...list,
                        tasks: [
                            ...list.tasks,
                            {
                                id: newTaskId,
                                name: title,
                                completed: false,
                            },
                        ],
                    };
                }
                return list;
            });
        });
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleAddSubmit = () => {
        if (name.trim() !== '') {
            onAdd(name);
            setName('');
        }
    };

    return (
        <div>
            <input type="text" id="task-title" value={name} onChange={handleInputChange} />
            <button onClick={handleAddSubmit}>Add Task</button>
        </div>
    );
};

export default AddTask;