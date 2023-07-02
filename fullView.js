import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SettingsContext } from './settings/SettingsContext';
import SnakeApp from './index.js';
import * as Font from 'expo-font';

import { useState, useEffect, useContext } from 'react';

export default function FullView(props) {
    const settings = useContext(SettingsContext);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                "Billy": require('./assets/fonts/Billy/Billy-Regular.ttf'),
                'Billy-Bold': require('./assets/fonts/Billy/Billy-Bold.ttf'),
                'Billy-Light': require('./assets/fonts/Billy/Billy-Light.ttf'),
            });
            setIsReady(true);
        };
        loadFonts();
    }, []);

    console.log('====================================');
    console.log(settings.theme, 'settings.theme....');
    console.log('====================================');

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