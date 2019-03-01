import React, { Component } from 'react';
import {
  View,
  PanResponder,
} from 'react-native';
import CellContainer from './CellContainer';
import styles from './styles';

/*
const isAbove = (cell, other) => cell.row - 1 === other.row && cell.col === other.col;
const isBelow = (cell, other) => cell.row + 1 === other.row && cell.col === other.col;
const isLeft = (cell, other) => cell.row === other.row && cell.col - 1 === other.col;
const isRight = (cell, other) => cell.row === other.row && cell.col + 1 === other.col;
const isNeighboursFunc = (cell, other) =>
isAbove(cell, other) || isBelow(cell, other) || isLeft(cell, other) || isRight(cell, other);
*/

const isNeighbours = (cell, other) => {
  const isAbove = cell.row - 1 === other.row && cell.col === other.col;
  const isBelow = cell.row + 1 === other.row && cell.col === other.col;
  const isLeft = cell.row === other.row && cell.col - 1 === other.col;
  const isRight = cell.row === other.row && cell.col + 1 === other.col;

  return isAbove || isBelow || isLeft || isRight;
};

class FieldView extends Component {
  constructor(props) {
    super(props);

    this.panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started.
        // Checking that gesture happens inside a cell
        const {
          cells,
          selectCell,
        } = this.props;

        const { x0, y0 } = gestureState;
        const cellIndex = cells.findIndex((cell) => {
          const {
            x,
            y,
            width,
            height,
            selected,
            flipped,
          } = cell;
          return (
            !selected
            && !flipped
            && x0 >= x
            && y0 >= y
            && x0 <= x + width
            && y0 <= y + height
          );
        });
        if (cellIndex !== -1) {
          selectCell(cellIndex);
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is gestureState.d{x,y}
        // Checking that every newly selected cell is a neighbour of the previous one
        const {
          cells,
          selectedCells,
          selectCell,
        } = this.props;

        const [x0, y0] = [gestureState.moveX, gestureState.moveY];
        const cellIndex = cells.findIndex((cell) => {
          const {
            x,
            y,
            width,
            height,
            selected,
            flipped,
          } = cell;
          return (
            !selected
            && !flipped
            && x0 >= x
            && y0 >= y
            && x0 <= x + width
            && y0 <= y + height
          );
        });
        const lastSelectedCell = selectedCells[selectedCells.length - 1];
        if (
          cellIndex !== -1
          && lastSelectedCell !== -1
          && lastSelectedCell !== undefined
          && cellIndex !== lastSelectedCell
          && isNeighbours(cells[cellIndex], cells[lastSelectedCell])
        ) {
          selectCell(cellIndex);
        }
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        const {
          cells,
          selectedCells,
          connections,
          currentWordIndex,
          words,
          deselectCells,
          guessWord,
          selectCell,
        } = this.props;
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        // console.log('chain is', selectedCells, evt);
        // console.log('currentWordIdx', currentWordIndex);
        // Checking whether the current selected cells chain matches any connections entry
        const [x0, y0] = [gestureState.moveX, gestureState.moveY];
        const cellIndex = cells.findIndex((cell) => {
          const {
            x,
            y,
            width,
            height,
            selected,
            flipped,
          } = cell;
          return (
            !selected
            && !flipped
            && x0 >= x
            && y0 >= y
            && x0 <= x + width
            && y0 <= y + height
          );
        });
        const lastSelectedCell = selectedCells[selectedCells.length - 1];

        if (
          cellIndex !== -1
          && lastSelectedCell !== -1
          && lastSelectedCell !== undefined
          && cellIndex !== lastSelectedCell
          && isNeighbours(cells[cellIndex], cells[lastSelectedCell])
        ) {
          selectCell(cellIndex);
        }

        const currentWord = words[currentWordIndex];
        const currentWordConnections = connections[currentWord.key];

        if (selectedCells.length === currentWordConnections.length) {
          if (selectedCells.every((selectedCell, idx) => (
            cells[selectedCell].row === currentWordConnections[idx][0]
            && cells[selectedCell].col === currentWordConnections[idx][1]
          ))) {
            guessWord();
          }
        }
        deselectCells();
      },
      onPanResponderTerminate: () => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        const { deselectCells } = this.props;
        deselectCells();
      },
      onShouldBlockNativeResponder: () => true,
    });
  }

  render() {
    const { cells } = this.props;

    return (
      <View style={styles.field} {...this.panResponder.panHandlers}>
        {cells.map((item, index) => <CellContainer key={`${item.row}${item.col}`} cellIndex={index} />)}
      </View>
    );
  }
}

export default FieldView;
