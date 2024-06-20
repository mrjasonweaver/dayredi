import React from 'react';
import SingleTask from './SingleTask';
import { List, Task } from '../data-models/interfaces';

interface TaskListProps {
    lists: List[];
    setLists: React.Dispatch<React.SetStateAction<List[]>>;
    currentList: string;
}

const TaskList: React.FC<TaskListProps> = ({ lists, setLists, currentList }) => {

    const tasks = lists.find((list: List) => list.id === currentList)?.tasks || [];

    const incompleteTasks = tasks.filter((task: Task) => {
        return task.completed === false
    });

    const completedTasks = tasks.filter((task: Task) => {
        return task.completed === true
    });

    return (
        <>
            <h2>Incomplete Tasks</h2>
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
                
            <h2>Completed Tasks</h2>
            <div className="list-wrap">
                {completedTasks?.reverse().map((task, index) => {
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