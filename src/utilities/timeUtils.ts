
/**
 * Converts the time in seconds to a display time in hours, minutes and seconds.
 * @param timeInSeconds The time in seconds.
 * @returns string The time in hours, minutes and seconds.
 */
const convertSecondsToDisplayTime = (timeInSeconds: number): string => {
    const oneMinuteInSeconds = 60;
    const oneHourInSeconds = 3600;
    const doubleDigit = 10;

    // We need to convert the countdown for display in hours, minutes and seconds.
    const hours = Math.floor(timeInSeconds / oneHourInSeconds);
    const minutes = Math.floor((timeInSeconds % oneHourInSeconds) / oneMinuteInSeconds);
    const seconds = timeInSeconds % oneMinuteInSeconds;
    const displaySeconds = seconds < doubleDigit ? `0${seconds}` : seconds;
    const displayMinutes = minutes < doubleDigit ? `0${minutes}` : minutes;
    const displayHours = hours < doubleDigit ? `0${hours}` : hours;
    const displayTime = `${displayHours}:${displayMinutes}:${displaySeconds}`;

    return displayTime;
};

export { convertSecondsToDisplayTime };