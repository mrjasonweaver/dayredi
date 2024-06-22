import { useState } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import { List, Task } from './data-models/interfaces';

const initialListId: string = 'list1';
const initialTaskId: string = 'task1';

const initialTasks: Task[] = [
  {
    id: initialTaskId,
    name: 'My fist task.',
    completed: false,
    timestamp: new Date().getTime(),
    timer: 0,
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
  const [currentList, setCurrentList] = useState<string>(initialListId);
  const title = 'Dayredi';
  const description = 'A time blocking productivity app.';


  return (
    <>
      <h1>{title}</h1>
      <div className="card">
        <TaskList
          lists={lists}
          setLists={setLists}
          currentList={currentList}
        />
        <p>
          {description}
        </p>
      </div>
    </>
  )
}

export default App;
