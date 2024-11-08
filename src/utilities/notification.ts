import notificationWorkerScript from '../workers/notificationWorker';
import { Task } from '../data-models/types';

/**
 * Let's use the notification API to notify the user when the timer reaches 0.
 * @param task - The task that the timer is running for.
 */
export const notification = (task: Task) => {
  // Check if the browser supports notifications.
  if ('Notification' in window) {
    // If it's okay let's send a message to the notification worker.
    const notificationWorker = new Worker(notificationWorkerScript);
    // Check if the user has granted permission to show notifications.
    if (Notification.permission === 'granted') {
      // If it's okay let's send a message to the notification worker.
      const data = {
        type: 'notification',
        title: 'Timer is up!',
        body: `Your timer for "${task.name}" is up!`,
      };
      notificationWorker.postMessage(data);
    } else {
      // Otherwise, we need to ask the user for permission.
      Notification.requestPermission().then(function(permission) {
        // If the user accepts, let's send a notification.
        if (permission === 'granted') {
          notificationWorker.postMessage('notification');
        }
      });
    }
  }
};
