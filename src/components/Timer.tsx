/// <reference types="vite-plugin-svgr/client" />
import React, { useState, useEffect } from 'react';
import Play from '@material-design-icons/svg/two-tone/play_arrow.svg?react';
import Pause from '@material-design-icons/svg/two-tone/pause.svg?react';
import Replay from '@material-design-icons/svg/two-tone/replay.svg?react';
import { List, Task } from '../data-models/types';
import { updateTaskTimerInList } from '../utilities/state';
import timeWorkerScript from '../workers/timeWorker';
import { notification } from '../utilities/notification';

interface TimerProps {
    currentList: string;
    setLists: React.Dispatch<React.SetStateAction<List[]>>;
    task: Task;
    isRunning: boolean;
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

const Timer: React.FC<TimerProps> = ({ currentList, setLists, task, isRunning, setIsRunning }) => {
    const fiveMinutesInSeconds = 300;
    const [countdown, setCountdown] = useState(task.timer);
    const [elapsedTime, setElapsedTime] = useState(0);

    /**
     * When countdown reaches 0, we need to stop the timer.
     * Else we need to update the Lists state.
     * @todo: We need to add an end timer sound.
     */
    useEffect(() => {
        if (countdown === 0) {
            setIsRunning(prev => prev && false);
            // TODO: Add a sound.
            // Add a notification using the Notification API.
            notification(task);
        }

        setLists((prevLists: List[]) => {
            return updateTaskTimerInList(
                currentList,
                prevLists,
                task.id,
                countdown,
            );
        });
    }, [countdown]);

    /**
     * When elapsedTime changes, we need to update the countdown.
     */
    useEffect(() => {
        if (isRunning) {
            setCountdown(prevCount => prevCount - 1);
        }
    }, [elapsedTime, isRunning]);

    useEffect(() => {
        if (typeof Worker !== 'undefined') {
            const timeWorker = new Worker(timeWorkerScript);
            if (isRunning) {
                timeWorker.onmessage = m => {
                    setElapsedTime(m.data);
                };
                timeWorker.postMessage('start');
            } else {
                timeWorker.terminate();
            }

            return () => {
                timeWorker.terminate();
            };
        }
    }, [isRunning]);

    return (
        <div className="timer-controls">
            <p
                className={`timer-display${isRunning ? ' active' : ''}${countdown === 0 ? ' countdown-zero' : ''
                    }`}
            >
                {task.displayTime}
            </p>
            <div className="timer-display-controls">
                {!isRunning && (
                    <button
                        title="Start timer"
                        className="w-icon"
                        disabled={countdown === 0}
                        onClick={() => setIsRunning(true)}
                    >
                        <Play />
                    </button>
                )}
                {isRunning && (
                    <button
                        title="Pause timer"
                        className="w-icon"
                        disabled={countdown === 0}
                        onClick={() => setIsRunning(false)}
                    >
                        <Pause />
                    </button>
                )}
                <button
                    title="Add five minutes"
                    className="text-icon-button"
                    onClick={() =>
                        setCountdown(countdown + fiveMinutesInSeconds)
                    }
                >
                    +5
                </button>
                <button
                    title="Replay timer"
                    className="w-icon replay-icon"
                    onClick={() => setCountdown(task.timerStart)}
                >
                    <Replay />
                </button>
            </div>
        </div>
    );
};

export default Timer;
