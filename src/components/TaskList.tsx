import React from 'react';
import SingleTask from './SingleTask';
import { List, Task } from '../data-models/interfaces';
import AddNewTask from './AddNewTask';
import { deleteCompletedTasks } from '../utilities/state';

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
    const deleteAllCompleted = () => {
        setLists((prevLists: List[]) => {
            return deleteCompletedTasks(currentList, prevLists);
        });
    }

    return (
        <>
            <AddNewTask
                setLists={setLists}
                currentList={currentList}
            />
            <div className="heading-wrap">
                <h2>{incompleteTasks?.length} Tasks</h2>
            </div>
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
            
            <div className="heading-wrap">
                <h2>{completedTasks?.length} Completed Tasks</h2>
                {completedTasks?.length > 0 && <button onClick={deleteAllCompleted}>Delete All Completed</button>}
            </div>
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