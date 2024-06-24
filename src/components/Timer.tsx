/// <reference types="vite-plugin-svgr/client" />
import React, { useState, useEffect } from 'react';
import Play from '@material-design-icons/svg/two-tone/play_arrow.svg?react';
import Pause from '@material-design-icons/svg/two-tone/pause.svg?react';
import Replay from '@material-design-icons/svg/two-tone/replay.svg?react';

interface TimerProps {
  timerStartValue: number;
}

const Timer: React.FC<TimerProps> = ({ timerStartValue }) => {
    const oneSecond = 1000; // 1000 milliseconds = 1 second.
    const oneMinuteInSeconds = 60;
    const oneHourInSeconds = 3600;
    const doubleDigit = 10;

    // We need the timerStartValue converted from minutes to seconds.
    const convertedTimerStartValue = timerStartValue * oneMinuteInSeconds;

    // We need to keep track of the countdown and whether the timer is running.
    const [countdown, setCountdown] = useState(convertedTimerStartValue);
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

    // When the countdown reaches zero, we need to stop the timer and add a sound.
    useEffect(() => {
        if (countdown === 0) {
            setIsRunning(false);
            // TODO: Add a sound.
        }
    }, [countdown]);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isRunning) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, oneSecond);
        }

        return () => {
            clearInterval(timer);
        };
    }, [isRunning]);

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
                <button className="w-icon replay-icon" onClick={() => setCountdown(convertedTimerStartValue)}><Replay /></button>
            </div>
        </div>
    );
};

export default Timer;