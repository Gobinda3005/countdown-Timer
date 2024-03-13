import React from 'react';
import './CountdownTimer.css';

class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 0,
      userInput: '',
      intervalId: null,
      timerRunning: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { minutes, seconds, timerRunning } = this.state;
    if (!timerRunning) {
      const totalSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
      if (!isNaN(totalSeconds) && totalSeconds > 0) {
        const intervalId = setInterval(this.tick, 1000);
        this.setState({
          intervalId,
          timerRunning: true,
        });
        document.body.classList.add('running'); // Add the running class to the body
      }
    }
  };

  tick = () => {
    const { seconds, minutes } = this.state;
    if (seconds === 0 && minutes === 0) {
      clearInterval(this.state.intervalId);
      this.setState({ timerRunning: false });
      document.body.classList.remove('running'); // Remove the running class from the body
      return;
    }
    const updatedSeconds = seconds === 0 ? 59 : seconds - 1;
    const updatedMinutes = updatedSeconds === 59 ? minutes - 1 : minutes;
    this.setState({
      minutes: updatedMinutes,
      seconds: updatedSeconds,
    });
  };

  handleStop = () => {
    clearInterval(this.state.intervalId);
    this.setState({
      timerRunning: false,
    });
    document.body.classList.add('stopped');
    document.body.classList.remove('running');
  };

  render() {
    const { minutes, seconds, timerRunning } = this.state;

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
}

export default CountdownTimer;
