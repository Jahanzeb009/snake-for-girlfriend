import { SettingsContext } from './settings/SettingsContext';
import Lindor1 from './assets/1.svg';
import Lindor2 from './assets/2.svg';
import Lindor3 from './assets/3.svg';
import Lindor4 from './assets/4.svg';
import Lindor5 from './assets/5.svg';
import Lindor6 from './assets/6.svg';
import Lindor7 from './assets/7.svg';
import Lindor8 from './assets/8.svg';
import Lindor9 from './assets/9.svg';
import Lindor10 from './assets/10.svg';
import Lindor11 from './assets/11.svg';
import Lindor12 from './assets/12.svg';
import Lindor13 from './assets/13.svg';
import Lindor14 from './assets/14.svg';
import Lindor15 from './assets/15.svg';
import Lindor16 from './assets/16.svg';
import Lindor17 from './assets/17.svg';
import Lindor18 from './assets/18.svg';

import React from 'react';
import { View, StyleSheet } from 'react-native';

const Food = ({ position, size, rotate }) => {

    const options = [
        <Lindor1 width={'100%'} height={'100%'}/>, 
        <Lindor2 width={'100%'} height={'100%'}/>, 
        <Lindor3 width={'100%'} height={'100%'}/>, 
        <Lindor4 width={'100%'} height={'100%'}/>, 
        <Lindor5 width={'100%'} height={'100%'}/>, 
        <Lindor6 width={'100%'} height={'100%'}/>, 
        <Lindor7 width={'100%'} height={'100%'}/>, 
        <Lindor8 width={'100%'} height={'100%'}/>, 
        <Lindor9 width={'100%'} height={'100%'}/>, 
        <Lindor10 width={'100%'} height={'100%'}/>, 
        <Lindor11 width={'100%'} height={'100%'}/>, 
        <Lindor12 width={'100%'} height={'100%'}/>, 
        <Lindor13 width={'100%'} height={'100%'}/>, 
        <Lindor14 width={'100%'} height={'100%'}/>, 
        <Lindor15 width={'100%'} height={'100%'}/>, 
        <Lindor16 width={'100%'} height={'100%'}/>, 
        <Lindor17 width={'100%'} height={'100%'}/>, 
        <Lindor18 width={'100%'} height={'100%'}/>
    ];

    const x = position[0];
    const y = position[1];

    return (
        <View
            style={[
                styles.food,
                {
                    width: size*2,
                    height: size*2,
                    left: x * size,
                    top: y * size,
                    backgroundColor: "none",
                    borderColor: "white",
                    borderRadius: 3000,
                    transform: [{ rotate: rotate + 'deg'}]
                },
            ]}
        >
            {options[ Math.abs(rotate) % options.length]}
        </View>
    );
}

const styles = StyleSheet.create({
    food: {
        position: 'absolute',
        borderWidth: 0,
    },
});

export { Food };
