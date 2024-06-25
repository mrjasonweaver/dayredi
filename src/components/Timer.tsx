/// <reference types="vite-plugin-svgr/client" />
import React, { useState, useEffect } from 'react';
import Play from '@material-design-icons/svg/two-tone/play_arrow.svg?react';
import Pause from '@material-design-icons/svg/two-tone/pause.svg?react';
import Replay from '@material-design-icons/svg/two-tone/replay.svg?react';
import { List } from '../data-models/interfaces';
import { updateTaskTimerInList } from '../utilities/state';

interface TimerProps {
    currentList: string;
    setLists: React.Dispatch<React.SetStateAction<List[]>>;
    taskId: string;
    timerStartValue: number;
}

const Timer: React.FC<TimerProps> = ({ currentList, setLists, taskId, timerStartValue }) => {
    const oneSecond = 1000; // 1000 milliseconds = 1 second.
    const oneMinuteInSeconds = 60;
    const oneHourInSeconds = 3600;
    const doubleDigit = 10;

    const [timerStart] = useState(timerStartValue);
    const [countdown, setCountdown] = useState(timerStart);
    const [isRunning, setIsRunning] = useState(false);


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

    // When the countdown reaches zero, we need to stop the timer.
    useEffect(() => {
        if (countdown === 0) {
            setIsRunning(false);
            // TODO: Add a sound.
        } else {
            // Update the task's timer
            setLists((prevLists: List[]) => {
                return updateTaskTimerInList(currentList, prevLists, taskId, countdown);
            });
        }
    }, [countdown]);

    useEffect(() => {
    
        if (isRunning) {

            // We need to update the countdown every second.
            // Let's use requestAnimationFrame for better performance.
            const start = Date.now();
            const updateCountdown = () => {
                const elapsed = Date.now() - start;
                setCountdown(timerStart - Math.floor(elapsed / oneSecond));
                requestAnimationFrame(updateCountdown);
            };
            requestAnimationFrame(updateCountdown);


        }
    }, [isRunning, timerStart]);

    const handleStart = () => {
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    return (
        <div className="timer-controls">
            <p className={`timer-display${isRunning ? ' active' : ''}`}>{displayTime}</p>
            <div className="timer-display-controls">
                {!isRunning && <button className="w-icon" onClick={handleStart}><Play /></button>}
                {isRunning && <button className="w-icon" onClick={handlePause}><Pause /></button>}
                <button className="text-icon-button" onClick={handleAddFiveMinutes}>+5</button>
                <button className="w-icon replay-icon" onClick={() => setCountdown(timerStart)}><Replay /></button>
            </div>
        </div>
    );
};

export default Timer;