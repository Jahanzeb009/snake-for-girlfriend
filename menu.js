import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Linking
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { SettingsContext } from './settings/SettingsContext';
import Constants from 'expo-constants'
import CustomText from './CustomText';
import { DefaultMenu } from './defaultMenu';
import { SettingsMenu } from './settingsMenu';
import { GameModeMenu } from './gameModeMenu';
import { LeaderboardMenu } from './leaderboardMenu';
import { ButtonText } from './buttonText';
import * as Haptics from 'expo-haptics';


export const Menu = (props) => {
    const settingsContext = useContext(SettingsContext);
    const [menu, setMenu] = useState();
    const handleOpenInstagram = () => {
        return Linking.openURL('instagram://user?username=wielgus16')
    }

    const MenuSwitch = () => {
        switch (menu) {
            default:
                return(
                    <DefaultMenu
                        restart={props.restart}
                        showFullMenu={props.showFullMenu}
                        first={props.first}
                        score={props.score}
                        setMenu={setMenu}
                    />
                );
            case 'gameMode':
                return(
                    <GameModeMenu setMenu={setMenu} />
                );
            case 'leaderboard':
                return(
                    <LeaderboardMenu setMenu={setMenu} />
                );
            case 'settings':
                return(
                    <SettingsMenu setMenu={setMenu} />
                );
        };
    }

    const returnMenu = () => {
        setMenu();
    }

    return(
        <View style={[styles.container, {
            backgroundColor: settingsContext.theme.opacity,
        }]}>
        {menu == 'leaderboard' ? (<LeaderboardMenu setMenu={setMenu} />) : (
        <>
            <View style={styles.buttonBackMenu}>
                <TouchableOpacity onPress={() => {
                    returnMenu()
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                }}>
                    <CustomText hide={!menu} style={styles.backTxt}>
                        Powrót
                    </CustomText>
                </TouchableOpacity>
            </View>
            <View style={styles.menuContainer} >
                <MenuSwitch/>
            </View>
            <TouchableOpacity onPress={() => handleOpenInstagram()} style={styles.privacy}>
                <CustomText style={styles.privacyTxt}>made by Krzys</CustomText>
            </TouchableOpacity>
        </>
        )}        
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight + 10,
        paddingBottom: Constants.statusBarHeight,
    },
    menuContainer: {
        flex: 3,
        width: '100%',
    },
    privacy: {
        textAlign: 'center',
    },
    privacyTxt: {
        fontSize: 20,
        fontFamily: 'Billy-Light',
        padding: 5,
        marginBottom: 40
    },
    buttonBackMenu: {
        flex: 1,
        justifyContent: 'center',
    },
    backTxt: {
        fontSize:30,
        fontFamily: 'Billy-Light',
    },
});
