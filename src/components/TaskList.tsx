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

    return (
        <div>
        {tasks?.map((task, index) => {
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
    );
};

export default TaskList;