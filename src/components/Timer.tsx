/// <reference types="vite-plugin-svgr/client" />
import React, { useState, useEffect } from 'react';
import Play from '@material-design-icons/svg/two-tone/play_arrow.svg?react';
import Pause from '@material-design-icons/svg/two-tone/pause.svg?react';
import Replay from '@material-design-icons/svg/two-tone/replay.svg?react';
import { List, Task } from '../data-models/interfaces';
import { updateTaskTimerInList } from '../utilities/state';
import worker_script from '../timeWorker';

interface TimerProps {
    currentList: string;
    setLists: React.Dispatch<React.SetStateAction<List[]>>;
    task: Task;
}

const Timer: React.FC<TimerProps> = ({ currentList, setLists, task }) => {
    const fiveMinutesInSeconds = 300;
    const [timerStart] = useState(task.timer);
    const [countdown, setCountdown] = useState(task.timer);
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    /**
     * Let's use the notification API to notify the user when the timer reaches 0.
     */
    const notification = () => {
        // Check if the browser supports notifications.
        if ('Notification' in window) {
            // Check if the user has granted permission to show notifications.
            if (Notification.permission === 'granted') {
                // If it's okay let's create a notification.
                new Notification('Timer is up!');
                console.log('Notification sent!');
            } else {
                // Otherwise, we need to ask the user for permission.
                Notification.requestPermission().then(function (permission) {
                    // If the user accepts, let's create a notification.
                    if (permission === 'granted') {
                        new Notification('Timer is up!');
                    }
                });
            }
        }
    };

    /**
     * When countdown reaches 0, we need to stop the timer.
     * Else we need to update the Lists state.
     * @todo: We need to add a end timer sound.
     * @todo: We need to add a notification.
     */
    useEffect(() => {
        if (countdown === 0) {
            setIsRunning((prev) => prev && false);
            // TODO: Add a sound.
            // Add a notification using the Notification API.
            notification();
        } else {
            setLists((prevLists: List[]) => {
                return updateTaskTimerInList(currentList, prevLists, task.id, countdown);
            });
        }
    }, [countdown]);

    /**
     * When elapsedTime changes, we need to update the countdown.
     */
    useEffect(() => {
        if (isRunning) {
            setCountdown((prevCount) => prevCount - 1);
        }
    }, [elapsedTime, isRunning]);

    useEffect(() => {
        const timeWorker = new Worker(worker_script);
        if (isRunning) {
            timeWorker.onmessage = (m) => {
                setElapsedTime(m.data);
            };
            timeWorker.postMessage('start');
        } else {
            timeWorker.terminate();
        }

        return () => {
            timeWorker.terminate();
        };
    }, [isRunning]);

    return (
        <div className="timer-controls">
            <p className={`timer-display${isRunning ? ' active' : ''}${countdown === 0 ? ' countdown-zero' : ''}`}>
                {task.displayTime}
            </p>
            <div className="timer-display-controls">
                {!isRunning && (
                    <button
                        title="Start timer"
                        className="w-icon"
                        onClick={() => setIsRunning(true)}
                    >
                        <Play />
                    </button>
                )}
                {isRunning && (
                    <button
                        title="Pause timer"
                        className="w-icon"
                        onClick={() => setIsRunning(false)}
                    >
                        <Pause />
                    </button>
                )}
                <button
                    title="Add five minutes"
                    className="text-icon-button"
                    onClick={() => setCountdown(countdown + fiveMinutesInSeconds)}
                >
                    +5
                </button>
                <button
                    title="Replay timer"
                    className="w-icon replay-icon"
                    onClick={() => setCountdown(timerStart)}
                >
                    <Replay />
                </button>
            </div>
        </div>
    );
};

export default Timer;
