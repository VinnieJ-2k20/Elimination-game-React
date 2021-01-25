import React from 'react';
import { Rules } from './components/Rules';
import { GameParamForm } from './components/GameParamForm';
import { Board } from './components/Board';
import './App.scss';

const settings = {
  minBoxes: 20,
  maxBoxes: 50,
  minTurn: 3,
  maxTurn: 6,
}

export class App extends React.Component {
  state = {
    areRulesVisible: true,
    areSettingsVisible: true,
    gameStarted: false,
    gameEnded: false,
    playerStarts: true,
    boxes: 0,
    turn: 0,
    gameLog: ['Game started!'],
  }

  toggleRules = () => {
    this.setState(state => ({
      areRulesVisible: !state.areRulesVisible,
    }));
  }

  getGameParams = (boxes, turn, playerStarts) => {
    this.setState({
      boxes,
      turn,
      playerStarts,
      areSettingsVisible: false,
      gameStarted: true,
    })
  }

  writeInLog = (entry) => {
    this.setState(state => ({
      gameLog: [
        entry,
        ...state.gameLog,
      ],
    }))
  }

  endGame = () => {
    this.setState({
      gameEnded: true,
    })
  }

  restart = () => {
    this.setState({
      areSettingsVisible: true,
      gameStarted: false,
      gameEnded: false,
      playerStarts: true,
      boxes: 30,
      turn: 4,
      gameLog: ['Game started!'],
    });
  }

  render() {
    const {
      areRulesVisible,
      areSettingsVisible,
      boxes,
      turn,
      gameStarted,
      gameLog,
      playerStarts,
      gameEnded,
    } = this.state;

    return (
      <main className="App">
        <h1>Welcome to Elimination Game</h1>

        <section className="App__rules">
          <button
            className="App__button"
            type="button"
            onClick={this.toggleRules}
          >
            Hide/show rules
          </button>
          {areRulesVisible && (<Rules />)}
        </section>

        {areSettingsVisible && (
          <GameParamForm
            {...settings}
            onStart={this.getGameParams}
          />
        )}

        {gameStarted && (
          <section className="App__message">
            {gameLog[0]}
          </section>
        )}

        {gameEnded && (
          <button
            className="App__button"
            type="button"
            onClick={this.restart}
          >
            Choose different settings and restart
          </button>
        )}

        {gameStarted && (
          <Board
            board={Array.from(Array(boxes).keys())}
            maxTurnSize={turn}
            onTurn={this.writeInLog}
            playerStarts={playerStarts}
            onGameEnd={this.endGame}
          />
        )}

        {gameStarted && (
          <section className="App__game-log">
            {gameLog.map(entry => (
              <p key={entry}>{entry}</p>
            ))}
          </section>
        )}
      </main>
    );
  }
}
