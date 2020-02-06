import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Dimensions } from 'react-native';

const screenView = Dimensions.get('window');

const getRemainingTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return { minutes, seconds};
}

export default function App() {
    const [ remainingSeconds, setRemainingSeconds ] = useState(0);
    const [ isActive, setIsActive ] = useState(false);
    const { minutes, seconds } = getRemainingTime(remainingSeconds);

    toggle = () => {
        setIsActive(!isActive);
    }

    useEffect(() => {
        let interval = null;
        if (isActive){
            interval = setInterval(() => {
                setRemainingSeconds(remainingSeconds => remainingSeconds + 1);
            }, 1000);
        } else if (!isActive && remainingSeconds !== 0){
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, remainingSeconds]);

    reset = () => {
        setRemainingSeconds(0);
        setIsActive(false);
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="default" />
            <Text style={ styles.timerText }>{`${ minutes }:${ seconds }`}</Text>

            <TouchableOpacity onPress={ this.toggle } style={ styles.button }>
                <Text style={ styles.buttonMainText }>{ isActive ? 'Pause' : "Start!" }</Text>
                <Text style={ styles.buttonParagraph }>Stopwatch.co</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={ this.reset } style={ styles.button, styles.buttonReset }>
                <Text style={[ styles.buttonParagraph, styles.buttonTextReset ]}>Reset</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#07121B',
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    button: {
        borderWidth: 10,
        borderColor: '#B9AAFF',
        width: screenView.width / 2,
        height: screenView.width / 3,
        borderRadius: screenView.width / 2,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonMainText: {
        fontSize: 32,
        color: '#B9AAFF'        
    },
    buttonParagraph: {
        color: 'white'
    },
    buttonReset: {
        marginTop: 20,
        borderColor: '#FF851B'
    },
    buttonTextReset: {
        color: '#FF851B'
    },
    timerText: {
        color: '#fff',
        fontSize: 90,
        marginBottom: 20
    }
});
