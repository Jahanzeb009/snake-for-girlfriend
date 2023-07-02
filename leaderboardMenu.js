import React, { useState, useContext, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import CustomText from './CustomText';
import LeftArrow from './assets/left-arrow.svg';
import RightArrow from './assets/right-arrow.svg';
import { SettingsContext } from './settings/SettingsContext';
import * as Haptics from 'expo-haptics';


export const LeaderboardMenu = ({setMenu}) => {
    const settingsContext = useContext(SettingsContext);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState(
        [
            {header: "Dzisiaj twoje urodziny", body: "Z tej okazji życzę Ci wszystkiego dobrego! ❤️❤️❤️❤️"}, 
            {header: "Dzisiaj są twoje urodziny", body: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure"}, 
            {header: "Dzisiaj urodziny", body: "Z tej okazji życzę Ci wszystkiego dobrego! ❤️❤️❤️❤️"}, 
        ]
    );

    return(
        <View style={[styles.container, {backgroundColor: settingsContext.theme.primary}]}>
            
                <View style={styles.buttonBackMenu}>
                    <TouchableOpacity onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                        setMenu();
                    }}>
                        <CustomText style={styles.backTxt}>
                            Powrót
                        </CustomText>
                    </TouchableOpacity>
                </View>
                <ScrollView contentInsetAdjustmentBehavior="always">
                <CustomText style={styles.titleTxt}>{slides[currentSlide].header}</CustomText>
                <CustomText style={styles.subtitleTxt}>{slides[currentSlide].body}</CustomText>
                {/* <Image style={{width: '100%', height: '100%'}} source={{uri:'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'}} /> */}
            </ScrollView>
                
            <View style={[styles.navigation, {backgroundColor: settingsContext.theme.primary}]}>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        setCurrentSlide(currentSlide == 0 ? slides.length-1 : Math.abs((currentSlide-1)%slides.length))
                    }} style={[styles.icon, {
                        opacity: 1,
                    }]}>
                        <LeftArrow width={'100%'} height={'100%'} fill={settingsContext.theme.complementary} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        setCurrentSlide((currentSlide+1)%slides.length)
                    }} style={[styles.icon, {
                        opacity: 1,
                    }]}>
                        <RightArrow width={'100%'} height={'100%'} fill={settingsContext.theme.complementary} />
                    </TouchableOpacity> 
                </View>
                <CustomText style={styles.counter}>
                    { currentSlide+1 }/{slides.length}
                </CustomText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: "black"
    },
    titleTxt: {
        fontSize: 40,
        fontFamily: 'Billy-Bold',
        textAlign: 'center',
        paddingVertical: 60,
    },
    subtitleTxt: {
        fontSize: 38,
        fontFamily: 'Billy',
        textAlign: 'center',
    },
    iconsContainer: {
        width: '30%',
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-around',
    },
    icon: {
        width: 40,
        height: 40,
    },
    buttonBackMenu: {
        marginTop: 100,
        justifyContent: 'center',
    },
    backTxt: {
        fontSize:30,
        fontFamily: 'Billy-Light',
    },
    navigation: {
        position: 'absolute',
        bottom: 0,
        width: '100%', 
        alignItems: 'center',
        borderColor: 'red',
        height: 100
    }, 
    counter: {
        fontSize:30,
        marginBottom: 30,
        fontFamily: 'Billy-Light',
    }
});
