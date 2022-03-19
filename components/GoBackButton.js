import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';

const GoBackButton = ({
    title,
    customContainerStyle,
    customButtonStyle,
    rightButton,
}) => {
    const navigation = useNavigation();
    return (
        <View
            style={{
                ...customContainerStyle,
                ...styles.containerBackButton,
            }}
        >
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.goBack()}
                style={styles.buttonBack}
            >
                <Ionicons name={'arrow-back'} size={23} color={Colors.secondaryYellow} />
            </TouchableOpacity>
            <Text style={styles.textBackButton}>{title}</Text>
            <View style={{ ...customButtonStyle, ...styles.invisible }}>
                {rightButton}
            </View>
        </View>
    );
};

export default GoBackButton;

const styles = StyleSheet.create({
    containerBackButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonBack: {
        backgroundColor: Colors.backGroundColorSecondary,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 40,
    },
    textBackButton: {
        fontSize: 22,
        fontFamily: 'Source-serif-bold',
        color: Colors.secondaryYellow,
    },
    invisible: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
});
