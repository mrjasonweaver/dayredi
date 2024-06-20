import React from 'react';
import SingleTask from './SingleTask';
import { List, Task } from '../data-models/interfaces';
import AddTask from './AddTask';

interface TaskListProps {
    lists: List[];
    setLists: React.Dispatch<React.SetStateAction<List[]>>;
    currentList: string;
}

const TaskList: React.FC<TaskListProps> = ({ lists, setLists, currentList }) => {

    // Get the current list's tasks.
    const tasks = lists.find((list: List) => list.id === currentList)?.tasks || [];

    // Get the incomplete tasks.
    const incompleteTasks = tasks.filter((task: Task) => {
        return task.completed === false;
    });

    // Get the completed tasks.
    const completedTasks = tasks.filter((task: Task) => {
        return task.completed === true;
    });

    /**
     * Delete the completed tasks from the current list.
     * @returns void
     */
    const deleteCompletedTasks = () => {
        setLists((prevLists: List[]) => {
            const newLists = prevLists.map((list: List) => {
                if (list.id === currentList) {
                    return {
                        ...list,
                        tasks: list.tasks.filter((task: Task) => {
                            return task.completed === false;
                        }),
                    };
                }
                return list;
            });

            // Save the new lists to local storage.
            localStorage.setItem('list-timer-app', JSON.stringify(newLists));

            return newLists;
        });
    }

    return (
        <>
            <h2>Tasks ({incompleteTasks?.length})</h2>
            <AddTask
                setLists={setLists}
                currentList={currentList}
            />
            <div className="list-wrap">
                {incompleteTasks?.map((task, index) => {
                    return (
                        <SingleTask
                            key={index}
                            lists={lists}
                            setLists={setLists}
                            currentList={currentList}
                            task={task}
                        />
                    );
                })}
            </div>
                
            <h2>Completed Tasks ({completedTasks?.length})</h2>
            {completedTasks?.length > 0 && <button onClick={deleteCompletedTasks}>Delete All Completed</button>}
            <div className="list-wrap">
                {completedTasks?.map((task, index) => {
                    return (
                        <SingleTask
                            key={index}
                            lists={lists}
                            setLists={setLists}
                            currentList={currentList}
                            task={task}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default TaskList;