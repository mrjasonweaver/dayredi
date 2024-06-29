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

let code = timeWorker.toString();
code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));

const blob = new Blob([code], {type: "application/javascript"});
const worker_script = URL.createObjectURL(blob);

export default worker_script;