import React, { Component } from "react";

import StudentLogin from "./Student-Login.js";
import QuestionPage from "./QuestionPage.js";

import { get, post } from "../../utilities.js";

class StudentPages extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      game: "", // this is a game object
      teamName: "",
      studentName: "",
      onQuestion: 0,
    };
  }

  onSubmit = (code, teamName) => {
    console.log(code);
    get("/api/game-for-students", { gameCode: code }).then((results) => {
      console.log("got the game");
      this.setState({ game: results[0], teamName: teamName });
    });
  };

  setTeamName = (teamName) => {
    this.setState({ teamName: teamName });
  };

  nextQuestion = () => {
    this.setState({ onQuestion: this.state.onQuestion + 1 });
  };

  render() {
    if (this.state.game === "") {
      return (
        <>
          <StudentLogin onSubmit={this.onSubmit} />
        </>
      );
    }
    let i = this.state.onQuestion;
    return (
      <QuestionPage
        gameCode={this.state.game.gameCode}
        questionNumber={1 + i}
        parts={this.state.game.parts[i]}
        questions={this.state.game.questions[i]}
        time={this.state.game.times[i]}
        points={this.state.game.points[i]}
        password={this.state.game.questionPasswords[i]}
        nextQuestion={this.nextQuestion}
      />
    );
  }
}

export default StudentPages;
