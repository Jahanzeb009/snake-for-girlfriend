import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SettingsContext } from './settings/SettingsContext';
import SnakeApp from './snakeApp.js';

import { useState, useEffect, useContext } from 'react';
import { useFonts } from 'expo-font';

export default function FullView(props) {
    const settings = useContext(SettingsContext);
    const [isReady, setIsReady] = useState(false);

    console.log('====================================');
    console.log(settings.theme, 'settings.theme....');
    console.log('====================================');

    const [fontsLoaded] = useFonts({
        "Billy": require('./assets/fonts/Billy/Billy-Regular.ttf'),
        'Billy-Bold': require('./assets/fonts/Billy/Billy-Bold.ttf'),
        'Billy-Light': require('./assets/fonts/Billy/Billy-Light.ttf')
    })


    useEffect(() => {
        setIsReady(true)
    }, [fontsLoaded])


    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>Fonts's loading...</Text>
            </View>
        )
    }

    return (
        <View
            style={[styles.container, {
                backgroundColor: settings.theme.primary
            },
            ]}
        >
            {
                isReady ?
                    <>
                        <SnakeApp />
                        <StatusBar hidden />
                    </>
                    :
                    null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});