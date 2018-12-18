import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, PanResponder, Animated, Easing } from 'react-native';
import styles from './styles';
import classnames from 'classnames';

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
          ]
        }

        const backAnimatedStyle = {
          transform: [
            { rotateY: backInterpolate }
          ]
        }

        const measuresStyle = StyleSheet.create({
            cell: {
                top: y,
                left: x,
                width,
                height
            },

 
        });

        return (
            <View style={{
            }}>
                <Animated.View style={[frontAnimatedStyle, {
                    ...styles.cell,
                    ...measuresStyle.cell,
                    backgroundColor: selected ? 'rgba(125,75,255,1)' : 'rgba(11,125,125,0.5)',
                    opacity: frontOpacity,
                }]} >
                    <Text style={styles.itemText}>{value}</Text>
                </Animated.View>
                <Animated.View style={[backAnimatedStyle, {
                    ...styles.cell,
                    ...measuresStyle.cell,
                    backgroundColor: '#FFFFFF',
                    opacity: backOpacity,
                }]} >
                </Animated.View>                
            </View>
       );
    }
}

export default CellView;