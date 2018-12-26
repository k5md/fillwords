import React, { Component } from 'react';
import { BackHandler, Alert, View, Text, FlatList, StyleSheet, Dimensions, PanResponder, ScrollView, ViewPagerAndroid} from 'react-native';
import _ from 'lodash';

import Field from 'app/lib/field';

import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(false);
SQLite.enablePromise(true);

import styles from './styles';
import WordsContainer from './WordsContainer';
import FieldContainer from './FieldContainer';
import ConnectionsContainer from './ConnectionsContainer';
import WordsPreviewContainer from './WordsPreviewContainer';
import metrics from 'app/config/metrics';

import { handleAndroidBackButton, removeAndroidBackButtonHandler } from 'app/utils/androidBackButton';

class GameView extends Component {
    componentWillUnmount() {
        removeAndroidBackButtonHandler();
    }

    async componentDidMount() {
        handleAndroidBackButton(() => {
            this.props.navigation.navigate('Home');
            this.props.clearGame();
        });

        const {
            setupGame
        } = this.props;


        const en_ru = require('app/dictionaries/en_ru.js');
        const db = await SQLite.openDatabase({
            name: 'dictionaries.db',
        });
        console.log('db opened');
        let count = await db.executeSql('SELECT COUNT(*) FROM en_ru', []);
        console.log('number of entries in gameView before sqlbatchinsert', count[0].rows.item(0));
        for (let i = 0; i < en_ru.default.length; i += 500) {
            await db.sqlBatch(en_ru.default.slice(i, i + 500))
        }
        console.log('db populated')
        count = await db.executeSql('SELECT COUNT(*) FROM en_ru', []);
        console.log('number of entries in gameView after sqlbatchinsert', count[0].rows.item(0));
        const { rows, cols } = this.props;
        const test = new Field(cols, rows);
        test.initializeFast();
        //NOTE THIS IS A TEMPORARY WORKAROUND! REMOVE LATER AND FIX
        while (Object.values(test.connections).some(item => item.length >= 14)) {
            test.initializeFast();
        }

        const height = metrics.screenHeight;   
        const width = metrics.screenWidth;  

        const size = Math.floor(Math.min(width / cols, height / rows));

        const marginX = Math.floor((width - (size * cols)) / (2 * cols));
        const marginY = Math.floor((height - (size * rows)) / (2 * rows));

        let cells = [];
        for (let row = 0; row < rows; row += 1) {
            for (let col = 0; col < cols; col += 1) {
                //const height = metrics.screenHeight / rows - 2 * rows;
                const x = col * size + marginX;
                const y = row * size + marginY;
                const width = size;
                const height = size;
                const value = test.cells[row][col];
                cells.push({ x, y, width, height, value, row, col, selected: false, flipped: false });
            }
        }

        console.log('started retrieving words');
        let words = [];
        //TODO: add where wordIsComposite
        for (let key in test.connections) {
            const chain = test.connections[key];            
            const results = await db.executeSql(`SELECT * FROM en_ru WHERE wordLength = ${chain.length} ORDER BY RANDOM() LIMIT 1`, []);
            const { word, wordLength, translation, translationLength } = results[0].rows.item(0);
            for (let i = 0; i < chain.length; i += 1) {
                const targetRow = chain[i][0];
                const targetCol = chain[i][1];
                const letter = word[i];
                cells = cells.map(cell => cell.row === targetRow && cell.col === targetCol ? ({...cell, value: letter}) : cell );
            }
            words.push({key, wordLength, word, translation, translationLength, guessed: false});

        }
        console.log('done retrieving words');  

        
        setupGame({
            cells,
            connections: test.connections,
            currentWordIndex: 0,
            selectedCells: [],
            words,
        })
    }



    render() {
        return (

            <View style={styles.container}>

                <FieldContainer   />
                <ConnectionsContainer />
                <WordsContainer />
                {this.props.gameState === 'learning' && <WordsPreviewContainer />}
            </View>
        );
    }
}

export default GameView;
