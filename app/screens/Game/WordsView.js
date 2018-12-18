import React, { Component } from 'react';
import { View, Text, ViewPagerAndroid } from 'react-native';

import styles from './styles';

class WordsView extends Component {
    componentDidUpdate({ currentWordIndex }) {
        if (this.props.currentWordIndex !== currentWordIndex && this._pagerRef) {
            this._pagerRef.setPage(this.props.currentWordIndex);
        }
    }

    render() {
        const {
            currentWordIndex,
            words,
            setCurrentWordIndex,
        } = this.props;

        return (
            <View nativeID="words" style={{
                flex: 1,
                height: 100
            }}>
                {words.length > 0 && <ViewPagerAndroid 
                    style={styles.container}
                    initialPage={currentWordIndex}
                    removeClippedSubviews={true}
                    onPageSelected={(event) => {
                        setCurrentWordIndex(event.nativeEvent.position);
                    }}
                    ref={ref => this._pagerRef = ref}
                >
                    {words.map((item, idx) => (
                        <View key={idx} style={item.guessed ? styles.guessed : styles.notGuessed}>
                            <Text>{item.word}</Text>
                            <Text>{item.translation}</Text>
                            <Text>{item.guessed}</Text>
                        </View>
                    ))}
                </ViewPagerAndroid>}
            </View>  
        );   
    }
}

export default WordsView;