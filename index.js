import React, { useState, useContext, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import { GameEngine, dispatch } from 'react-native-game-engine';
import * as Haptics from 'expo-haptics';
import { GameLoop } from './systems';
import { SettingsContext } from './settings/SettingsContext';
import config from './config';
import { Head } from './head';
import { Tail } from './tail';
import { Food } from './food';
import { Menu } from './menu';
import CustomText from './CustomText';

const SnakeApp = () => {
    const randomBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const settings = useContext(SettingsContext);
    const [state, setState] = useState({
        running: false,
        showFullMenu: true,
        score: 0,
        restartsCurrent: 0,
        restartsAd: settings.gameMode.gamesBetweenAds,
        first: true,
    });

    const engine = useRef(null);
    
    const head = useRef({
        position: [2, 2],
        xSpeed: 1,
        ySpeed: 0,
        nextMove: 0,
        size: 0,
        speed: settings.gameMode.speed,
        borders: settings.gameMode.borders,
        moving: false,
        renderer: <Head />,
    });

    const food = useRef({
        position: [
            randomBetween(0, config.GAME_WIDTH - 2),
            randomBetween(0, config.GAME_HEIGHT - 2),
        ],
        rotate: randomBetween(-90, 90),
        size: 0,
        renderer: <Food />,
    });

    const tail = useRef({
        number: 3,
        size: config.CELL_SIZE,
        elements: [],
        renderer: <Tail />,
    });


    const onEvent = (e) => {
        switch (e.type) {
            case 'game-over':
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                setState(prevState => ({
                    ...prevState,
                    running: false,
                    first: false,
                }));

                const highScores = settings.highScores;
                if (state.score > parseInt(highScores[settings.gameMode.id])) {
                    highScores[settings.gameMode.id] = state.score.toString();
                    settings.changeHighScores(highScores);
                }

                setTimeout(() => {
                    setState(prevState => {
                        if (prevState.restartsCurrent >= prevState.restartsAd) {
                            return {
                                ...prevState,
                                restartsCurrent: 0,
                                showFullMenu: true,
                            };
                        } else {
                            return {
                                ...prevState,
                                restartsCurrent: prevState.restartsCurrent + 1,
                                showFullMenu: true,
                            };
                        }
                    });
                }, 1000);
                break;

            case 'eating':
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setState(prevState => ({
                    ...prevState,
                    score: prevState.score + 1,
                }));
                break;
        }
    };

    const restart = async () => {
        if (state.showFullMenu) {
            engine.current.swap({
                head: {
                    ...head.current,
                    position: [2, 2],
                    xSpeed: 1,
                    ySpeed: 0,
                    speed: settings.gameMode.speed,
                    borders: settings.gameMode.borders,
                    nextMove: 0,
                    size: config.CELL_SIZE,
                    moving: false,
                },
                food: {
                    ...food.current,
                    position: [
                        randomBetween(0, config.GAME_WIDTH - 2),
                        randomBetween(1, config.GAME_HEIGHT - 2),
                    ],
                    rotate: randomBetween(-180, 180),
                    size: config.CELL_SIZE,
                },
                tail: { ...tail.current, elements: [], number: 3 },
            });

            setState(prevState => ({
                ...prevState,
                running: true,
                showFullMenu: false,
                score: 0,
                restartsAd: settings.gameMode.gamesBetweenAds,
            }));
        }
    };

    return (
        <View style={styles.container}>
            <GameEngine
                ref={engine}
                style={[
                    {
                        width: config.MAX_WIDTH,
                        height: config.MAX_HEIGHT,
                        flex: null,
                    },
                ]}
                systems={[GameLoop]}
                entities={{
                    head: head.current,
                    food: food.current,
                    tail: tail.current,
                }}
                running={state.running}
                onEvent={onEvent}
            />
            {state.running ? (
                <View style={[styles.backgroundScore]}>
                    <CustomText style={[styles.backgroundScoreTxt, {
                        color: settings.theme.primaryDark,
                    }]}>
                        {state.score}
                    </CustomText>
                </View>
            ) : (
                <Menu
                    showFullMenu={state.showFullMenu}
                    restart={restart}
                    score={state.score}
                    first={state.first}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundScore: {
        position: 'absolute',
        zIndex: -10,
    },
    backgroundScoreTxt: {
        fontSize: 300,
    },
});

export default SnakeApp;
