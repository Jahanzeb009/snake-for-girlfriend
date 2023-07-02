import { SettingsContext } from './settings/SettingsContext';
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import Lindor18 from './assets/18.svg';


const Head = ({ position, size }) => {
    const context = useContext(SettingsContext);

    const x = position[0];
    const y = position[1];

    return (
        <View
            style={[
                styles.head,
                {
                    width: size,
                    height: size,
                    left: x * size,
                    top: y * size,
                    backgroundColor: context.theme.complementary,
                    borderColor: context.theme.primary,
                },
            ]}
        >
        </View>
    );
}

const styles = StyleSheet.create({
    head: {
        position: 'absolute',
        borderWidth: 1,
    },
});

export { Head };
