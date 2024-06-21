import React, { useState, useEffect } from 'react';

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
    const minutes = Math.floor(countdown / 60);
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
        <div>
            <h1>Countdown: {displayTime}</h1>
            <button onClick={handleStart}>Start</button>
            <button onClick={handlePause}>Pause</button>
        </div>
    );
};

export default Timer;