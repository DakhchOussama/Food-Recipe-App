import React, { useEffect } from "react";
import { View, Text, StatusBar, StyleSheet, Image } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen(){

    const ring1padding = useSharedValue(0);
    const ring2padding = useSharedValue(0);

    const navigation = useNavigation();

    useEffect(() => {
        ring1padding.value = 0;
        ring2padding.value = 0;

        setTimeout(() => {
            ring1padding.value = withSpring(ring1padding.value + hp(4))
        }, 100);
        setTimeout(() => {
            ring2padding.value = withSpring(ring2padding.value + hp(2));
        }, 300);
        setTimeout(() => {
            navigation.navigate('Home')
        }, 2500);
    }, []);
    return (
        <View style={styles.parent}>
            <StatusBar style="light"></StatusBar>

            {/* logo */}
            <Animated.View style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 9999, padding: ring1padding}}>
                <Animated.View style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 9999, padding: ring2padding}}>
                    <Image source={require('../../img/pngwing.com.png')}
                    style={{width: hp(25), height: hp(25)}} />
                </Animated.View>
            </Animated.View>
            {/* title */}

            <View style={styles.parenttext}>
                <Text style={styles.text1}>Foody</Text>
                <Text style={styles.text2}>Food is always right</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFC107'
    },
    parenttext: {
        alignItems: 'center',
        marginTop: hp(0.6)
    },
    text1: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: hp(8),
        letterSpacing: hp(0.3),
        marginBottom: hp(0.4)
    },
    text2: {
        color: 'white',
        letterSpacing: hp(0.2),
        fontSize: hp(2),
        fontWeight: '500'
    }
})