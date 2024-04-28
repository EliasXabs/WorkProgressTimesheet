import React, { createContext, useState, useEffect, useCallback } from 'react';

const TimerContext = createContext({
  timer: 0,
  isActive: true,
  isOnBreak: false,
  setIsActive: () => {},
  setIsOnBreak: () => {},
  setTimer: () => {}
});

// TimerContext.js
export const TimerProvider = ({ children }) => {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isOnBreak, setIsOnBreak] = useState(false);

  const incrementTimer = useCallback(() => {
    setTimer(t => t + 1);
  }, []);

  useEffect(() => {
    let interval;
    if (isActive && !isOnBreak) {
      interval = setInterval(incrementTimer, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, isOnBreak, incrementTimer]);

  const resetTimerContext = () => {
    setTimer(0);
    setIsActive(false);
    setIsOnBreak(false);
  };

  return (
    <TimerContext.Provider value={{ timer, isActive, isOnBreak, setIsActive, setIsOnBreak, setTimer, resetTimerContext }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
