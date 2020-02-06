import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';


class TimerWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            timeoutIndex: null,
            seconds: '00',
            minutes: '00'
        };
    }

    startTimer () {
        clearTimeout(this.state.timeoutIndex);
        this.setState({
            // eslint-disable-next-line react/no-direct-mutation-state
            count: --this.state.count,
            seconds: this.state.count % 60,
            minutes: Math.floor(this.state.count / 60),
        });
        if (this.state.count === 0) {
            return;
        }
        this.setState({
            timeoutIndex: setTimeout(this.startTimer.bind(this), 1000)
        })
    }

    setTime () {
        let startBtn = document.getElementById('start');
        let input = document.getElementById('setTime'); // к числу привест value
        if (!isNaN(input.value)) {
            this.setState({
                count: input.value,
                seconds: input.value % 60,
                minutes: Math.floor(input.value / 60),
            });
            startBtn.disabled = false;
        } else {
            alert("Введите адекватное значение");
            startBtn.disabled = true;
        }
    }

    clearTime () {
        this.setState({
            count: 0,
            seconds: '00',
            minutes: '00'
        })
    }

    stopTime () {
      clearTimeout(this.state.timeoutIndex)
    }


    render() {
        return (
            <div className="wrapper">
                <h2>Timer</h2>
                <div className="fields">
                    <div className="input-field">
                        <label>Введите значение</label>
                        <input id="setTime" type="text"/>
                    </div>
                    <div className="count-field">
                        <div className="count-field-minutes">
                            <span>{this.state.minutes}</span>
                        </div> :
                        <div className="count-field-seconds">
                            <span>{this.state.seconds}</span>
                        </div>
                    </div>
                    <div>
                    <button onClick={this.clearTime.bind(this)} id="clear">Clear</button>
                    <button onClick={this.startTimer.bind(this)} id="start">Start</button>
                    <button onClick={this.setTime.bind(this)} id="set">Set</button>
                    <button onClick={this.stopTime.bind(this)} id="stop">Stop</button>
                    </div>
                </div>
            </div>
        )
    }
}




ReactDOM.render(<TimerWrapper/>, document.getElementById('root'));
