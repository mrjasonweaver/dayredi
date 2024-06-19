import React from 'react';
import Task from './Task';

interface ListWithIndexSignature extends Array<string> {}

interface TaskListProps {
    lists: ListWithIndexSignature;
    setLists: React.Dispatch<React.SetStateAction<ListWithIndexSignature>>;
    currentList: string;
}

const TaskList: React.FC<TaskListProps> = ({ lists, setLists, currentList }) => {

    const tasks = Object.values(lists[currentList]['tasks']);

    const incompleteTasks = tasks.filter((task) => {
        return task.completed === false
    });

    const completedTasks = tasks.filter((task) => {
        return task.completed === true
    });

    return (
        <>
            <h2>Incomplete Tasks</h2>
            <div className="list-wrap">
                {incompleteTasks?.map((task, index) => {
                    return (
                        <Task
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
                        <Task
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