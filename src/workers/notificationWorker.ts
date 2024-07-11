// Notification worker.
// This worker is responsible for sending notifications to the user when a timer reaches zero.

// Listen for messages from the main thread.
const startNotificationWorker = () => {
    self.onmessage = function (e) {
        if (e.data === 'notification') {
            // Send a notification to the user.
            const notification = new Notification('Timer is up!', {
                body: 'This is a notification message.',
                icon: 'path/to/icon.png', // Optional icon
            });
            console.log('Notification sent.');
        }
    };
}

let code = startNotificationWorker.toString();
code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));

const blob = new Blob([code], {type: "application/javascript"});
const notificationWorkerScript = URL.createObjectURL(blob);

export default notificationWorkerScript;