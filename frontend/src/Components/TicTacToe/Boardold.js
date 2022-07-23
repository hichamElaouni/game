import React, { Component } from "react";
import Square from "./Square";

export default class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        classCell={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const currentClass = this.props.status ? "x" : "circle";
    return (
      <div>
        <div className={`board ${currentClass} `}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}

          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}

          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
