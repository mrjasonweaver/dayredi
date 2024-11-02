import { List, Task } from '../data-models/types';
import { describe, it, expect } from 'vitest';
import { updateTaskInList } from '../utilities/state';

const currentList: string = '1';
const currentTask: Task = {
  id: '1',
  name: 'Task 1',
  completed: false,
  displayTime: '00:00:00',
  timer: 0,
  timerStart: 0,
  timestamp: 0,
};
const prevLists: List[] = [
  {
    id: '1',
    name: 'List 1',
    tasks: [currentTask],
  },
];
const updatedTask: Task = {
  id: '1',
  name: 'Task 1',
  completed: false,
  displayTime: '00:00:01',
  timer: 0,
  timerStart: 0,
  timestamp: 0,
};

describe('state', () => {
  it('should update the prevLists object with the new updated task then return the new Lists state', () => {
    const result = updateTaskInList(currentList, prevLists, updatedTask);

    expect(result).toEqual([
      {
        id: '1',
        name: 'List 1',
        tasks: [
          {
            id: '1',
            name: 'Task 1',
            completed: false,
            displayTime: '00:00:01',
            timer: 0,
            timerStart: 0,
            timestamp: 0,
          },
        ],
      },
    ]);
  });
});
