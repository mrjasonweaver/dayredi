import { useState } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import AddTask from './components/AddTask';
import { List, Task } from './data-models/interfaces';

const initialListId: string = 'list1';
const initialTaskId: string = 'task1';

const initialTasks: Task[] = [
  {
    id: initialTaskId,
    name: 'My fist task.',
    completed: false,
  },
];

const initialList: List[] = [
  {
    id: initialListId,
    name: 'My fist List.',
    tasks: initialTasks,
  },
];

function App() {
  const [lists, setLists] = useState<List[]>(initialList);
  const [currentList, setCurrentList] = useState<string>(initialListId);
  const title = 'List Timer';
  const description = 'A productivity app for time blocking tasks';


  return (
    <>
      <h1>{title}</h1>
      <div className="card">
        <AddTask setLists={setLists} currentList={currentList} />
        <TaskList lists={lists} setLists={setLists} currentList={currentList} />
        <p>
          {description}
        </p>
      </div>
    </>
  )
}

export default App
