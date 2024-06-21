import React, { useState, useEffect } from 'react';

interface TimerProps {
  timerStartValue: number;
}

const Timer: React.FC<TimerProps> = ({timerStartValue}) => {
    const [countdown, setCountdown] = useState(timerStartValue);
    const [isRunning, setIsRunning] = useState(false);

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
            <h1>Countdown: {countdown}</h1>
            <button onClick={handleStart}>Start</button>
            <button onClick={handlePause}>Pause</button>
        </div>
    );
};

export default Timer;