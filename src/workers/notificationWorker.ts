/**
 * Notification worker.
 * This worker is responsible for sending notifications to the user when a timer reaches zero.
 * This worker will listen for messages from the main thread.
 * When it receives a message, it will create a new Notification object and display it to the user.
 */
import createWorkerScript from './createWorkerScript';

// Listen for messages from the main thread.
const startNotificationWorker = () => {
  self.onmessage = function(e) {
    if (e.data.type === 'notification') {
      // Send a notification to the user.
      new Notification(e.data.title, {
        body: e.data.body,
      });
    }
  };
}

const notificationWorkerScript = createWorkerScript(startNotificationWorker.toString());

export default notificationWorkerScript;
