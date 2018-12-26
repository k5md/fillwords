import React, { Component } from 'react';
import { View, Text, PanResponder, FlatList } from 'react-native';
import CellContainer from './CellContainer';
import _ from 'lodash';
import styles from './styles';
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



        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            onPanResponderGrant: (evt, gestureState) => {
                // The gesture has started. Show visual feedback so the user knows
                // what is happening!
                const {
                    cells,
                    selectCell,
                    selectCellByIndex,
                } = this.props;

                const {x0, y0} = gestureState;
                const cellIndex = cells.findIndex((cell) => {
                    const { x, y, width, height, selected, flipped } = cell;
                    return (x0 >= x && y0 >= y && x0 <= x + width && y0 <= y + height && !selected && !flipped);
                });
                if (cellIndex !== -1) {
                    selectCellByIndex(cellIndex);
                }
            },
            onPanResponderMove: (evt, gestureState) => {
                const {
                    cells,
                    selectedCells,
                    selectCell,
                    selectCellByIndex,
                } = this.props;                
                // The most recent move distance is gestureState.move{X,Y}

                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}
                const [x0, y0] = [gestureState.moveX, gestureState.moveY];
                const cellIndex = cells.findIndex((cell) => {
                    const { x, y, width, height, selected, flipped } = cell;
                    return (x0 >= x && y0 >= y && x0 <= x + width && y0 <= y + height && !selected && !flipped);
                });
                const lastSelectedCell = selectedCells[selectedCells.length - 1];

                 if (cellIndex !== -1 && lastSelectedCell !== -1 && lastSelectedCell !== undefined && cellIndex !== lastSelectedCell && isNeighbours(cells[cellIndex], cells[lastSelectedCell])) {
                    selectCellByIndex(cellIndex);
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
                    selectCellByIndex,
                } = this.props;                
              // The user has released all touches while this view is the
              // responder. This typically means a gesture has succeeded
                //console.log('chain is', selectedCells, evt);
                //console.log('currentWordIdx', currentWordIndex);
                const [x0, y0] = [gestureState.moveX, gestureState.moveY];
                const cellIndex = cells.findIndex((cell) => {
                    const { x, y, width, height, selected, flipped } = cell;
                    return (x0 >= x && y0 >= y && x0 <= x + width && y0 <= y + height && !selected && !flipped);
                });
                const lastSelectedCell = selectedCells[selectedCells.length - 1];

                if (cellIndex !== -1 && lastSelectedCell !== -1 && lastSelectedCell !== undefined && cellIndex !== lastSelectedCell && isNeighbours(cells[cellIndex], cells[lastSelectedCell])) {
                    selectCellByIndex(cellIndex);
                }           

                const currentWord = words[currentWordIndex];
                const currentWordConnections = connections[currentWord.key];
                //console.log('currentWord', currentWord, 'currentWordConnections', currentWordConnections);
                if (selectedCells.length === currentWordConnections.length) {
                    if (selectedCells.every((selectedCell, idx) => {
                        return (
                            cells[selectedCell].row === currentWordConnections[idx][0] &&
                            cells[selectedCell].col === currentWordConnections[idx][1]
                        );
                    })) {
                        guessWord();
                    }
                }
                deselectCells();
            },
            onPanResponderTerminate: (evt, gestureState) => {
                const {
                    deselectCells,
                } = this.props;                
              // Another component has become the responder, so this gesture
              // should be cancelled
              deselectCells();
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
              // Returns whether this component should block native components from becoming the JS
              // responder. Returns true by default. Is currently only supported on android.
              return true;
            },
        });  
    }

    render() {
        const {
            cells,
        } = this.props;

        return (
            <View style={styles.field} {...this._panResponder.panHandlers} >
                {cells.map((item, index) => <CellContainer key={item.row+''+item.col} cellIndex={index} />)}
            </View>           
        );   
    }
}

export default FieldView;