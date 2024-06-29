/// <reference types="vite-plugin-svgr/client" />
import React, { useState, useEffect } from 'react';
import Play from '@material-design-icons/svg/two-tone/play_arrow.svg?react';
import Pause from '@material-design-icons/svg/two-tone/pause.svg?react';
import Replay from '@material-design-icons/svg/two-tone/replay.svg?react';
import { List } from '../data-models/interfaces';
import { updateTaskTimerInList } from '../utilities/state';
import worker_script from '../timeWorker';

interface TimerProps {
    currentList: string;
    setLists: React.Dispatch<React.SetStateAction<List[]>>;
    taskId: string;
    timerStartValue: number;
}

const Timer: React.FC<TimerProps> = ({ currentList, setLists, taskId, timerStartValue }) => {
    const oneMinuteInSeconds = 60;
    const oneHourInSeconds = 3600;
    const doubleDigit = 10;

    const [timerStart] = useState(timerStartValue);
    const [countdown, setCountdown] = useState(timerStart);
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);


    // We need to convert the countdown for display in hours, minutes and seconds.
    const hours = Math.floor(countdown / oneHourInSeconds);
    const minutes = Math.floor((countdown % oneHourInSeconds) / oneMinuteInSeconds);
    const seconds = countdown % oneMinuteInSeconds;
    const displaySeconds = seconds < doubleDigit ? `0${seconds}` : seconds;
    const displayMinutes = minutes < doubleDigit ? `0${minutes}` : minutes;
    const displayHours = hours < doubleDigit ? `0${hours}` : hours;
    const displayTime = `${displayHours}:${displayMinutes}:${displaySeconds}`;

    // We need to add 5 minutes to the countdown.
    const handleAddFiveMinutes = () => {
        const fiveMinutesInSeconds = 300;
        setCountdown(countdown + fiveMinutesInSeconds);
    }

    // We need to reset the countdown to the timerStart value.
    const handleReplay = () => {
        setCountdown(timerStart);
    };

    // We need to start the timer.
    const handleStart = () => {
        setIsRunning(true);
    };

    // We need to pause the timer.
    const handlePause = () => {
        setIsRunning(false);
    };

    /**
     * When countdown reaches 0, we need to stop the timer.
     * Else we need to update the Lists state.
     * @todo: We need to add a end timer sound.
     * @todo: We need to add a notification.
     */
    useEffect(() => {
        if (countdown === 0) {
            setIsRunning(prev => prev && false);
            // TODO: Add a sound.
        } else {
            setLists((prevLists: List[]) => {
                return updateTaskTimerInList(currentList, prevLists, taskId, countdown);
            });
        }
    }, [countdown, currentList, setLists, taskId]);

    /**
     * When elapsedTime changes, we need to update the countdown.
     */
    useEffect(() => {
        if (isRunning) {
            setCountdown(prevCount => prevCount - 1);
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
        }
    }, [isRunning]);

    return (
        <div className="timer-controls">
            <p className={`timer-display${isRunning ? ' active' : ''}${countdown === 0 ? ' countdown-zero' : ''}`}>{displayTime}</p>
            <div className="timer-display-controls">
                {!isRunning && <button className="w-icon" onClick={handleStart}><Play /></button>}
                {isRunning && <button className="w-icon" onClick={handlePause}><Pause /></button>}
                <button className="text-icon-button" onClick={handleAddFiveMinutes}>+5</button>
                <button className="w-icon replay-icon" onClick={handleReplay}><Replay /></button>
            </div>
        </div>
    );
};

export default Timer;