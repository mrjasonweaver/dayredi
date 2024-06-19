import { useState } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import AddTask from './components/AddTask';

// Interface for our lists object
export interface List {
  id: string;
  title: string;
  tasks: {
    [key: string]: {
      id: string;
      title: string;
      completed: boolean;
    }
  }
}

type ListWithIndexSignature = {
  [key: string]: List;
};

const initialList: ListWithIndexSignature = {
  '0': {
    id: '0',
    title: 'My fist List.',
    tasks: {
      '0': {
        id: '0',
        title: 'My fist task.',
        completed: false,
      },
    },
  },
};

function App() {
  const [lists, setLists] = useState<ListWithIndexSignature>(initialList);
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
