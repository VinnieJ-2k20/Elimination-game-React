import React from 'react';
import PropTypes from 'prop-types';
import './GameParamForm.scss'

export class GameParamForm extends React.Component {
  static propTypes = {
    minBoxes: PropTypes.number.isRequired,
    maxBoxes: PropTypes.number.isRequired,
    minTurn: PropTypes.number.isRequired,
    maxTurn: PropTypes.number.isRequired,
    onStart: PropTypes.func.isRequired,
  }

  state = {
    boxes: 25,
    turn: 4,
    playerStarts: true,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: +value, 
    });
  }

  handleRadio = (event) => {
    const { value } = event.target;

    this.setState({
      playerStarts: value === 'true',
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { onStart } = this.props;
    const { boxes, turn, playerStarts } = this.state;

    onStart(boxes, turn, playerStarts);
  }

  getTurnArray = (minTurn, maxTurn) => {
    const turnArray = []

    for (let i = minTurn; i <= maxTurn; i++) {
      turnArray.push(i);
    }

    return turnArray;
  }

  render() {
    const { boxes, turn, playerStarts } = this.state;
    const { minBoxes, maxBoxes, minTurn, maxTurn } = this.props;

    return (
      <form
        className="GameParamForm"
        action="#"
        method="POST"
        onSubmit={this.handleSubmit}
      >
        {this.getTurnArray()}
        <h2>Please, select new game parameters</h2>
        <label htmlFor="boxes">
          Number of boxes:&nbsp;
          <input
            type="range"
            name="boxes"
            id="boxes"
            min={minBoxes}
            max={maxBoxes}
            value={boxes}
            onChange={this.handleChange}
          />
          &nbsp;{boxes}
        </label>
        <br />

        <label htmlFor="turn">
          Max boxes per turn:&nbsp;
          <select
            name="turn"
            id="turn"
            value={turn}
            onChange={this.handleChange}
          >
            {this.getTurnArray(minTurn, maxTurn).map(option => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label htmlFor="playerStarts">
          Player starts
          <input
            type="radio"
            name="playerStarts"
            id="playerStarts"
            value="true"
            checked={playerStarts}
            onChange={this.handleRadio}
          />
        </label>
        <label htmlFor="computerStarts">
          Computer starts
          <input
            type="radio"
            name="playerStarts"
            id="computerStarts"
            value="false"
            checked={!playerStarts}
            onChange={this.handleRadio}
          />
        </label>
        <br />

        <button
          className="GameParamForm__start-button"
          type="submit"
        >
          Start game
        </button>
      </form>
    );
  }
}
