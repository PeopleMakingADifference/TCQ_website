import React, { Component } from "react";
import PartInput from "./PartInput.js";
import ImageUpload from "./ImageUpload.js";
import "../../utilities.css";
import "../pages/New-Game.css";

// @param id: Number
// @param handleChangePoints
// @param handleChangeQuestion
// @param handleChangeTime
// @param gameCode
class QuestionInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numParts: this.props.numParts,
      questions: this.props.questions,
      points: this.props.points,
    };
    // Initialize Default State
  }

  handleChangeNumParts = (event) => {
    let numParts = parseInt(event.target.value);
    if (isNaN(numParts)) {
      numParts = 1;
    }
    let numToAdd = numParts - this.state.questions.length;
    if (numToAdd > 0) {
      this.setState({
        numParts: numParts,
        questions: this.state.questions.concat(new Array(numToAdd).fill("")),
        points: this.state.points.concat(new Array(numParts).fill(0)),
      });
    } else if (numToAdd < 0) {
      this.setState({
        numParts: numParts,
        questions: this.state.questions.slice(0, numParts),
        points: this.state.points.slice(0, numParts),
      });
    }
  };

  handleChangeQuestion = (partNum, newQuestion) => {
    let toReturn = this.state.questions;
    toReturn[partNum - 1] = newQuestion;
    this.setState({
      questions: toReturn,
    });
    this.props.changeQuestion(this.props.id, toReturn);
  };

  handleChangeTime = (event) => {
    this.props.changeTime(this.props.id, event.target.value);
  };

  handleChangePoints = (partNum, newPoints) => {
    let toReturn = this.state.points;
    toReturn[partNum - 1] = newPoints;
    this.setState({
      points: toReturn,
    });
    this.props.changePoints(this.props.id, toReturn);
  };

  render() {
    const numPartsArray = Array.from({ length: this.state.numParts }, (x, i) => i);
    // console.log(numPartsArray);
    let PartInputs = numPartsArray.map((iterator, i) => (
      <PartInput
        key={`part-input-${i}`}
        id={i + 1}
        question={this.state.questions[i]}
        points={this.state.points[i]}
        changeQuestion={this.handleChangeQuestion}
        changePoints={this.handleChangePoints}
      />
    ));
    const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue);
    return (
      <>
        <div>
          <span className="standard-text">
            <span className="u-flex-space-between">
              <h2 className="header-text">
                {" "}
                Question {String.fromCharCode(this.props.id - 1 + "A".charCodeAt(0))}:{" "}
              </h2>
              <span className="New-Game-numQ">
                <span className="standard-text">Number of Parts:</span>
                <span className="New-Game-numQ-span">
                  <input
                    className="small-text-box"
                    type="number"
                    value={this.state.numParts}
                    onChange={this.handleChangeNumParts}
                  />
                </span>
              </span>
            </span>
            Time (in seconds):
            <input
              className="small-text-box"
              type="number"
              value={this.props.time}
              onChange={this.handleChangeTime}
            />
            <p>Total points for this question: {this.state.points.reduce(reducer)} </p>
            <ImageUpload gameCode={this.props.gameCode} questionNum={this.props.id} />
            {/* IMAGE UPLOAD{" "}
            <span className="u-flex u-flex-alignCenter">
              <h5 className="u-rightMargin"> Upload an Image </h5>
              <input
                type="file"
                name="image"
                onChange={(event) => this.props.enteredImage(event.target.value, this.props.id)}
              />
            </span> */}
            {PartInputs}
          </span>
        </div>
      </>
    );
  }
}

export default QuestionInput;
