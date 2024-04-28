import React, { createContext, useState, useEffect } from 'react';

export const TimerContextTasks = createContext();

export const TimerProviderTasks = ({ children }) => {
    const [timers, setTimers] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            updateTimers();
        }, 1000); // update every second

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [timers]);

    const updateTimers = () => {
        const updatedTimers = Object.entries(timers).reduce((acc, [taskId, timer]) => {
            if (timer.isRunning) {
                const now = Date.now();
                const updatedDuration = now - timer.startTime;
                acc[taskId] = { ...timer, totalTime: updatedDuration };
            } else {
                acc[taskId] = timer;
            }
            return acc;
        }, {});

        setTimers(updatedTimers);
    };

    const startTimer = (taskId) => {
        const startTime = Date.now();
        setTimers(prevTimers => ({
            ...prevTimers,
            [taskId]: { ...prevTimers[taskId], startTime, isRunning: true }
        }));
    };

    const stopTimer = (taskId) => {
        const now = Date.now();
        const updatedTimer = timers[taskId];
        const duration = updatedTimer.startTime ? (now - updatedTimer.startTime) : 0;
        setTimers(prevTimers => ({
            ...prevTimers,
            [taskId]: { ...updatedTimer, totalTime: duration, startTime: null, isRunning: false }
        }));
    };

    return (
        <TimerContextTasks.Provider value={{ timers, startTimer, stopTimer }}>
            {children}
        </TimerContextTasks.Provider>
    );
};
