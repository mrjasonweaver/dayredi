import { useState } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import AddTask from './components/AddTask';
import { List, Task } from './data-models/interfaces';

const initialTask: Task[] = [
  {
    id: '0',
    name: 'My fist task.',
    completed: false,
  },
];

const initialList: List[] = [
  {
    id: '0',
    name: 'My fist List.',
    tasks: initialTask,
  },
];

function App() {
  const [lists, setLists] = useState<List[]>(initialList);
  const [currentList, setCurrentList] = useState<string>('0');
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
