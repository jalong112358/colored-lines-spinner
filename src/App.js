import React, { Component } from "react";
import ReactDOM from "react-dom";
import Slider, { Range } from "rc-slider";
import { SketchPicker } from "react-color";
import "rc-slider/assets/index.css";

import "./App.css";

class App extends Component {
  state = {
    linesArray: [],
    numberOfLines: 0,
    degreeIncrement: 0,
    spacingSpeed: 0.0001,
    spacingToggled: false,
    spacingPlayBtnClasses: "play open",
    spacingPauseBtnClasses: "pause",
    colorEffect: 1
  };

  setLineNumber = value => {
    this.setState({
      linesArray: Array.apply(null, Array(value * 10)),
      numberOfLines: value
    });
  };

  setDegreeIncrement = value => {
    this.setState({
      degreeIncrement: value
    });
  };

  setSpacingSpeed = value => {
    this.setState({
      spacingSpeed: value
    });
  };

  toggleSpacingAnimation = () => {
    this.setState({
      spacingToggled: !this.state.spacingToggled
    });
  };

  spacingAutoIncrement = () => {
    this.setState({
      degreeIncrement: this.state.degreeIncrement + this.state.spacingSpeed
    });
  };

  colorEffectChange = value => {
    this.setState({
      colorEffect: value
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.spacingToggled !== prevState.spacingToggled) {
      if (this.state.spacingToggled) {
        this.interval = setInterval(this.spacingAutoIncrement, 1);
        this.setState({
          spacingPlayBtnClasses: "play",
          spacingPauseBtnClasses: "pause open"
        });
      } else {
        clearInterval(this.interval);
        this.setState({
          spacingPlayBtnClasses: "play open",
          spacingPauseBtnClasses: "pause"
        });
      }
    }
    if (this.state.degreeIncrement > 100) {
      this.setState({
        degreeIncrement: 0
      });
    }
  }

  render() {
    const lines = this.state.linesArray.map((item, index) => {
      let setColor;
      let setDirection = "";
      if (this.state.colorEffect === 1) {
        if (index <= 71) {
          setColor = "red";
        } else if (index <= 142) {
          setColor = "orange";
        } else if (index <= 213) {
          setColor = "yellow";
        } else if (index <= 284) {
          setColor = "green";
        } else if (index <= 355) {
          setColor = "blue";
        } else if (index <= 426) {
          setColor = "indigo";
        } else if (index <= 500) {
          setColor = "violet";
        }
      } else if (this.state.colorEffect === 2) {
        if (index <= this.state.linesArray.length / 7) {
          setColor = "red";
          setDirection = "-";
        } else if (index <= this.state.linesArray.length / 6) {
          setColor = "orange";
        } else if (index <= this.state.linesArray.length / 5) {
          setColor = "yellow";
          setDirection = "-";
        } else if (index <= this.state.linesArray.length / 4) {
          setColor = "green";
        } else if (index <= this.state.linesArray.length / 3) {
          setColor = "blue";
          setDirection = "-";
        } else if (index <= this.state.linesArray.length / 2) {
          setColor = "indigo";
        }
      } else if (this.state.colorEffect === 3) {
        if (index <= this.state.linesArray.length / 2) {
          setColor = "red";
        } else {
          setColor = "blue";
        }
      }

      return (
        <div
          key={index}
          style={{
            transform:
              "rotate(" +
              setDirection +
              index * this.state.degreeIncrement +
              "deg)",
            borderColor: setColor
          }}
        />
      );
    });

    return (
      <div className="App">
        <div className="wrapper">
          <div className="circle">{lines}</div>
        </div>
        <div className="controls-wrapper">
          <div className="control">
            <h3>Line Spacing:</h3>
            <Slider
              min={0}
              max={100}
              defaultValue={5}
              step={this.state.spacingSpeed}
              value={this.state.degreeIncrement}
              onChange={this.setDegreeIncrement}
            />
          </div>

          <div className="control">
            <h3>Complexity:</h3>
            <Slider
              min={0}
              max={100}
              step={0.1}
              defaultValue={5}
              value={this.state.numberOfLines}
              onChange={this.setLineNumber}
            />
          </div>
          <div className="control">
            <h3>Animation Speed:</h3>
            <div className="auto-slide">
              <Slider
                min={0.000001}
                max={0.01}
                step={0.000001}
                value={this.state.spacingSpeed}
                onChange={this.setSpacingSpeed}
              />
              <div
                onClick={this.toggleSpacingAnimation}
                className={this.state.spacingPlayBtnClasses}
              />
              <div
                onClick={this.toggleSpacingAnimation}
                className={this.state.spacingPauseBtnClasses}
              >
                <div className="pause-block" />
                <div className="pause-block" />
              </div>
            </div>

            <div className="effects" />
            <div className="effect">
              <p>Effect 1:</p>
              <input
                type="radio"
                checked={this.state.colorEffect === 1}
                onChange={() => this.colorEffectChange(1)}
              />
            </div>

            <div className="effect">
              <p>Effect 2:</p>
              <input
                type="radio"
                checked={this.state.colorEffect === 2}
                onChange={() => this.colorEffectChange(2)}
              />
            </div>

            <div className="effect">
              <p>Effect 3:</p>
              <input
                type="radio"
                checked={this.state.colorEffect === 3}
                onChange={() => this.colorEffectChange(3)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
