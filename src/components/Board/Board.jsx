import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Board.scss';

export class Board extends React.Component {
  static propTypes = {
    board: PropTypes.arrayOf(PropTypes.number).isRequired,
    maxTurnSize: PropTypes.number.isRequired,
    onTurn: PropTypes.func.isRequired,
    onGameEnd: PropTypes.func.isRequired,
    playerStarts: PropTypes.bool.isRequired,
  }

  state = {
    firstAvailable: 1,
    playerTurn: true,
    activeBoxes: [],
  }

  componentDidMount = () => {
    const { playerStarts } = this.props;
    console.log(playerStarts);

    this.setState({
      playerTurn: playerStarts,
    });

    if (!playerStarts) {
      setTimeout(() => {
        this.makeTurn();
      }, 2000);
    }
  }

  handleClick = (box) => {
    const { board, maxTurnSize, onTurn, onGameEnd } = this.props;
    const { firstAvailable, playerTurn } = this.state;

    if (!playerTurn) {
      return;
    }

    const turnValue = box - firstAvailable + 2;
    console.log(turnValue);

    if (turnValue > maxTurnSize) {
      return;
    }

    this.setState(state => ({
      firstAvailable: state.firstAvailable + turnValue,
      playerTurn: false,
    }));

    if (box + 1 === board.length) {
      console.log('You Won!');
      onTurn('You won! Congratulations!');
      onGameEnd();
      return;
    }

    const turn = `Player crossed ${turnValue} box(es)`;
    const toValue = ` to total of ${firstAvailable + turnValue - 1}`;

    onTurn(turn + toValue);

    setTimeout(() => {
      this.makeTurn();
    }, 2000);
  }

  makeTurn = () => {
    const { board, maxTurnSize, onTurn, onGameEnd } = this.props;
    const { firstAvailable } = this.state;

    const boxesLeft = board.length - firstAvailable + 1;
    let turnValue;
    console.log('boxes left: ', boxesLeft);
    const perfectTurn = boxesLeft % (maxTurnSize + 1);
    
    if (boxesLeft <= maxTurnSize) {
      turnValue = boxesLeft;
    } else if (perfectTurn) {
      turnValue = perfectTurn;
    } else {
      turnValue = Math.floor(Math.random() * (maxTurnSize + 1))
    }

    const turn = `Computer crossed ${turnValue} box(es)`;
    const toValue = ` to total of ${firstAvailable + turnValue - 1}`;
    const sorry = ' and won the game. Better luck next time!';

    if (boxesLeft <= maxTurnSize) {
      onTurn(turn + sorry);
      this.setState(state => ({
        firstAvailable: state.firstAvailable + turnValue + 1,
      }));
      onGameEnd();
      return;
    } else {
      onTurn(turn + toValue);
    }

    this.setState(state => ({
      firstAvailable: state.firstAvailable + turnValue,
      playerTurn: true,
    }))
  }

  handleHoverEnter = (event, box) => {
    const { firstAvailable } = this.state;
    const { maxTurnSize } = this.props;
    const boxNum = box + 1;
    const maxNum = firstAvailable + maxTurnSize - 1;
    console.log('box: ', boxNum);
    console.log('max: ', maxNum);

    if (boxNum >= firstAvailable && boxNum <= maxNum) {
      this.setState({
        activeBoxes: [firstAvailable, boxNum],
      })
    }
  }

  handleHoverLeave = () => {
    this.setState({ activeBoxes: [] })
  }

  render() {
    const { board, maxTurnSize } = this.props;
    const { firstAvailable, activeBoxes } = this.state;
    const minAvailable = firstAvailable - 1;
    const maxAvailable = firstAvailable - 1 + maxTurnSize;

    return (
      <section className="Board">
        {board.map(box => (
          <div
            className={classNames('Board__box', {
              'Board__box--crossed': box < minAvailable,
              'Board__box--available': (
                box >= minAvailable && box < maxAvailable
              ),
              'Board__box--available-big': (box + 1 >= activeBoxes[0]
                && box + 1 <= activeBoxes[1]),
              'Board__box--unavailable': box >= maxAvailable,
              'Board__box--final': box === board.length - 1,
            })}
            key={box}
            onClick={() => {
              this.handleClick(box);
            }}
            onMouseEnter={(event) => {
              this.handleHoverEnter(event, box);
            }}
            onMouseLeave={(event) => {
              this.handleHoverLeave();
            }}
          >
            {box + 1}
          </div>
        ))}
      </section>
    );
  }
}