import React from 'react';
import SingleTask from './SingleTask';
import { List, Task } from '../data-models/interfaces';
import { deleteCompletedTasks } from '../utilities/state';
import DeleteSweep from '@material-design-icons/svg/two-tone/delete_sweep.svg?react';
import Snooze from '@material-design-icons/svg/round/snooze.svg?react';

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
            <div className="list-wrap">
                {incompleteTasks?.length !== 0 ?
                    <>
                    <div className="heading-wrap">
                        <h2>{incompleteTasks?.length} Task{incompleteTasks?.length !== 1 ? 's' : ''}</h2>
                    </div>
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
                    </>
                    :
                    <div className="no-tasks">
                        <div><Snooze /></div>
                        <p>No tasks yet. Let's get to work!</p>
                    </div>
                }
            </div>
            <div className="list-wrap">
                <div className="heading-wrap">
                    {completedTasks?.length > 0 && 
                        <>
                            <h2>{completedTasks?.length} Completed Task{completedTasks?.length !== 1 ? 's' : ''}</h2>
                            <button className="w-icon icon-w-text" onClick={deleteAllCompleted}><DeleteSweep />Delete All Completed</button>
                        </>
                    }
                </div>
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