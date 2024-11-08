import { List, Task } from '../data-models/types';
import { convertSecondsToDisplayTime } from './timeUtils';

/**
 * @description Update the prevLists object with the new updated task then return the new Lists state.
 * @param currentList The current list id.
 * @param prevLists The previous Lists state.
 * @param updatedTask The updated task.
 * @returns The updated Lists state.
 */
export function updateTaskInList(
  currentList: string,
  prevLists: List[],
  updatedTask: Task
): List[] {

  // Update the currentList's tasks with the updated task.
  const newList = prevLists.map((list: List) => {
    if (list.id === currentList) {
      return {
        ...list,
        tasks: list.tasks.map((t: Task) => {
          if (t.id === updatedTask.id) {
            return updatedTask;
          }
          return t;
        }),
      };
    }
    return list;
  });

  // Update the local storage.
  localStorage.setItem('list-timer-app', JSON.stringify(newList));

  return newList;
}

/**
 * @description Adds a new task to Lists state.
 * @param currentList The current list id.
 * @param prevLists The previous Lists state.
 * @param newTask The new task.
 * @returns The updated Lists state.
 */
export function addTaskToList(
  currentList: string,
  prevLists: List[],
  newTask: Task
): List[] {
  const newLists = prevLists.map((list: List) => {
    if (list.id === currentList) {
      return {
        ...list,
        tasks: [
          ...list.tasks,
          newTask,
        ],
      };
    }
    return list;
  });

  // Update the local storage.
  localStorage.setItem('list-timer-app', JSON.stringify(newLists));

  return newLists;
}

/**
 * @description Update the prevLists object with the new updated task then returns the new Lists state.
 * @param currentList The current list id.
 * @param prevLists The previous Lists state.
 * @param taskId The task id.
 * @returns The updated Lists state.
 */
export function deleteTaskFromList(
  currentList: string,
  prevLists: List[],
  taskId: string
): List[] {
  const newLists = prevLists.map((list: List) => {
    if (list.id === currentList) {
      return {
        ...list,
        tasks: list.tasks.filter((task: Task) => {
          return task.id !== taskId;
        }),
      };
    }
    return list;
  });

  // Update the local storage.
  localStorage.setItem('list-timer-app', JSON.stringify(newLists));

  return newLists;
}

/**
 * @description Deletes all completed tasks from the current list.
 * @param currentList The current list id.
 * @param prevLists The previous Lists state.
 * @returns The updated Lists state.
 */
export function deleteCompletedTasks(
  currentList: string,
  prevLists: List[]
): List[] {
  const newLists = prevLists.map((list: List) => {
    if (list.id === currentList) {
      return {
        ...list,
        tasks: list.tasks.filter((task: Task) => {
          return task.completed === false;
        }),
      };
    }
    return list;
  });

  // Update the local storage.
  localStorage.setItem('list-timer-app', JSON.stringify(newLists));

  return newLists;
}

/**
 * @description Update the timer for the task in the current list.
 * @param currentList The current list id.
 * @param prevLists The previous Lists state.
 * @param taskId The task id.
 * @param time The time to update.
 * @returns The updated Lists state.
 */
export function updateTaskTimerInList(
  currentList: string,
  prevLists: List[],
  taskId: string,
  time: number
): List[] {
  const newLists = prevLists.map((list: List) => {
    if (list.id === currentList) {
      return {
        ...list,
        tasks: list.tasks.map((task: Task) => {
          if (task.id === taskId) {
            return {
              ...task,
              timer: time,
              displayTime: convertSecondsToDisplayTime(time),
            };
          }
          return task;
        }),
      };
    }
    return list;
  });

  // Update the local storage.
  localStorage.setItem('list-timer-app', JSON.stringify(newLists));

  return newLists;
}
