import React, { Component } from "react";

export default class ElapsedTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secondsElapsed: props.seconds,
      timeStr: "00:00:00",
      stop: props.stop,
    };
  }

  tick() {
    this.setState((currentState) => {
      const SECONDS = currentState.secondsElapsed + 1;
      const timeStr = new Date(SECONDS * 1000).toISOString().substr(11, 8);

      return { secondsElapsed: SECONDS, timeStr };
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.stop && this.state.secondsElapsed !== this.props.seconds) {
      clearInterval(this.interval);
      return false;
    }
    return true;
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <>{this.state.timeStr}</>;
  }
}
