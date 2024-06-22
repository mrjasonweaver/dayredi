import React, { useState, useEffect } from 'react';
/// <reference types="vite-plugin-svgr/client" />
import Play from '@material-design-icons/svg/two-tone/play_arrow.svg?react';
import Pause from '@material-design-icons/svg/two-tone/pause.svg?react';

interface TimerProps {
  timerStartValue: number;
}

const Timer: React.FC<TimerProps> = ({ timerStartValue }) => {
    // We need the timerStartValue converted from minutes to seconds.
    const convertedTimerStartValue = timerStartValue * 60;
    const [countdown, setCountdown] = useState(convertedTimerStartValue);
    const [isRunning, setIsRunning] = useState(false);


    // We need to convert the countdown for display in hours, minutes and seconds.
    const hours = Math.floor(countdown / 3600);
    const minutes = Math.floor((countdown % 3600) / 60);
    const seconds = countdown % 60;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displayHours = hours < 10 ? `0${hours}` : hours;
    const displayTime = `${displayHours}:${displayMinutes}:${displaySeconds}`;

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isRunning) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
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
            <p className="timer-display">{displayTime}</p>
            {!isRunning && <button onClick={handleStart}><Play /></button>}
            {isRunning && <button onClick={handlePause}><Pause /></button>}
        </div>
    );
};

export default Timer;