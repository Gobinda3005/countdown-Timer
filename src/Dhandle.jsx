import React from 'react'
import './CountdownTimer.css';


export const Dhandle = () => {
    
    return (
        <div>
          <h1>Countdown Timer</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="number"
              name="minutes"
              value={minutes}
              min="0"
              placeholder="Minutes"
              onChange={this.handleChange}
              disabled={timerRunning}
            />
            <span>:</span>
            <input
              type="number"
              name="seconds"
              value={seconds}
              min="0"
              max="59"
              placeholder="Seconds"
              onChange={this.handleChange}
              disabled={timerRunning}
            />
            <button type="submit" disabled={timerRunning} class="btn btn-outline-success">
              Start
            </button>
            <button type="button" onClick={this.handleStop} disabled={!timerRunning} class="btn btn-outline-danger">
              Stop
            </button>
          </form>
          <div>
            Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </div>
        </div>
      );
}
