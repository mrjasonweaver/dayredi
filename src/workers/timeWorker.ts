/**
 * This worker is responsible for sending the elapsed time to the main thread.
 * This worker will listen for messages from the main thread.
 * When it receives a message, it will start a timer and send the elapsed time to the main thread.
 */
import createWorkerScript from './createWorkerScript';

const timeWorker = () => {

    self.onmessage = function () {
        const oneSecond = 1000; // 1000 milliseconds = 1 second.
        const start = Date.now();
        const updateCountdown = () => {
            const elapsed = Date.now() - start;
            const elapsedTime = Math.floor(elapsed / oneSecond);
            self.postMessage(elapsedTime);
        };

        setInterval(updateCountdown, oneSecond);
    }
};

const timeWorkerScript: string | undefined = createWorkerScript(timeWorker.toString());

export default timeWorkerScript;