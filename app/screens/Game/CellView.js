import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, PanResponder, Animated, Easing } from 'react-native';
import styles from './styles';

class CellView extends React.PureComponent {
    state = {
        animatedValue: new Animated.Value(0),
        value: 0,
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.cell.flipped !== nextProps.cell.flipped) {
            Animated.timing(this.state.animatedValue, {
                toValue: 180,
                duration: 300,
                easing: Easing.bounce,
                useNativeDriver: true,
            }).start();
        }
    }

    render() {
        const { selected, flipped, value, y, x, width, height } = this.props.cell;

        const frontInterpolate = this.state.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })

        const backInterpolate = this.state.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
        const frontOpacity = this.state.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
        })
        const backOpacity = this.state.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
        })         
        
        const frontAnimatedStyle = {
            transform: [
                { rotateY: frontInterpolate }
            ],
            opacity: frontOpacity,
        }

        const backAnimatedStyle = {
            transform: [
                { rotateY: backInterpolate }
            ],
            opacity: backOpacity,
        }

        return (
            <View>
                <Animated.View style={[
                    frontAnimatedStyle,
                    styles.cell_outer_container,
                    selected && styles.cell_selected, 
                    {
                        top: y,
                        left: x,
                        width,
                        height,
                    },
                ]}>
                    <View style={styles.cell_container}>
                    <View style={styles.cell}>
                        <Text style={styles.cell_text}>{value}</Text>
                    </View>
                    </View>
                </Animated.View>
                <Animated.View style={[
                    backAnimatedStyle,
                    styles.cell_outer_container,
                    styles.cell_backface,
                    {
                        top: y,
                        left: x,
                        width,
                        height,
                    },
                ]}>
                </Animated.View>                
            </View>
       );
    }
}

export default CellView;

