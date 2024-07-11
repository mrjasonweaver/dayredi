import { useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import AddNewTask from './components/AddNewTask';
import { List, Task } from './data-models/interfaces';

const initialListId: string = 'list1';
const initialTaskId: string = 'task1';

const initialTasks: Task[] = [
    {
        id: initialTaskId,
        name: 'My first task.',
        completed: false,
        displayTime: '00:10:00',
        timestamp: new Date().getTime(),
        timer: 10 * 60, // 10 minutes.
    },
];

const initialList: List[] = [
    {
        id: initialListId,
        name: 'My fist List.',
        tasks: initialTasks,
    },
];

// Get the inital List from local storage if it exists.
const localList: List[] = JSON.parse(localStorage.getItem('list-timer-app') || '[]');

function App() {
    const [lists, setLists] = useState<List[]>(localList.length ? localList : initialList);
    const [currentList] = useState<string>(initialListId);
    const title = 'Dayredi';
    const description = 'A time blocking task manager.';

    return (
        <>
            <header className="site-header">
                <AddNewTask
                    setLists={setLists}
                    currentList={currentList}
                    title={title}
                />
            </header>
            <div className="card">
                <TaskList
                    lists={lists}
                    setLists={setLists}
                    currentList={currentList}
                />
                <footer className="site-footer">
                    <span className="logo">{title}</span>
                    <p>{description}</p>
                    <p>© {new Date().getFullYear()}</p>
                </footer>
            </div>
        </>
    );
}

export default App;
