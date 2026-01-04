import React, { useState, useEffect } from 'react';
import './App.css';
import nycity from './nycity.jpg';

function GraffitiTimer() {
  const [targetTime, setTargetTime] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    }
    else if (timeRemaining === 0 && isRunning) {
      setIsRunning(false);
      alert('⏰ Zeit ist abgelaufen!');
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeRemaining]);

  // Funktion: Startet den Timer
  const startTimer = () => {
    if (!targetTime) {
      alert('Bitte gib eine Zielzeit ein!');
      return;
    }

    const target = new Date(targetTime);
    const now = new Date();
    const difference = Math.floor((target - now) / 1000);

    if (difference <= 0) {
      alert('Die Zielzeit muss in der Zukunft liegen!');
      return;
    }

    setTimeRemaining(difference);
    setIsRunning(true);
  };

  // NEU: Schnellauswahl-Funktion
  const quickStart = (minutes) => {
    const seconds = minutes * 60;
    setTimeRemaining(seconds);
    setIsRunning(true);

    // Setze auch die Zielzeit für die Anzeige
    const now = new Date();
    const target = new Date(now.getTime() + seconds * 1000);
    setTargetTime(target.toISOString().slice(0, 16));
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(0);
    setTargetTime('');
  };

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(secs).padStart(2, '0')
    };
  };

  const time = formatTime(timeRemaining);

  return (
    <div className="timer-container" style={{ backgroundImage: `url(${nycity})` }}>
      <h1 className="graffiti-title">FREEZY TIMER</h1>

      {/* NEU: Schnellauswahl-Buttons */}
      <div className="quick-select">
        <button
          onClick={() => quickStart(5)}
          className="quick-btn"
          disabled={isRunning}
        >
          5 MIN
        </button>
        <button
          onClick={() => quickStart(10)}
          className="quick-btn"
          disabled={isRunning}
        >
          10 MIN
        </button>
        <button
          onClick={() => quickStart(15)}
          className="quick-btn"
          disabled={isRunning}
        >
          15 MIN
        </button>
        <button
          onClick={() => quickStart(30)}
          className="quick-btn"
          disabled={isRunning}
        >
          30 MIN
        </button>
        <button
          onClick={() => quickStart(60)}
          className="quick-btn"
          disabled={isRunning}
        >
          60 MIN
        </button>
      </div>

      <div className="input-section">
        <label className="input-label">Oder Zielzeit eingeben:</label>
        <input
          type="datetime-local"
          value={targetTime}
          onChange={(e) => setTargetTime(e.target.value)}
          className="time-input"
          disabled={isRunning}
        />
      </div>

      <div className="countdown-display">
        <div className="time-block">
          <div className="time-number">{time.days}</div>
          <div className="time-label">TAGE</div>
        </div>
        <div className="separator">:</div>
        <div className="time-block">
          <div className="time-number">{time.hours}</div>
          <div className="time-label">STD</div>
        </div>
        <div className="separator">:</div>
        <div className="time-block">
          <div className="time-number">{time.minutes}</div>
          <div className="time-label">MIN</div>
        </div>
        <div className="separator">:</div>
        <div className="time-block">
          <div className="time-number">{time.seconds}</div>
          <div className="time-label">SEK</div>
        </div>
      </div>

      <div className="button-section">
        {!isRunning ? (
          <button onClick={startTimer} className="btn btn-start">
            START
          </button>
        ) : (
          <button onClick={stopTimer} className="btn btn-stop">
            STOP
          </button>
        )}
        <button onClick={resetTimer} className="btn btn-reset">
          RESET
        </button>
      </div>
    </div>
  );
}

export default GraffitiTimer;