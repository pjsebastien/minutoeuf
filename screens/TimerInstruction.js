import {
    Alert,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Timer } from 'react-native-stopwatch-timer';
import { FontAwesome5 } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const cookInstruction = {
    typeOfEgg: 'oeuf dur',
    sizes: [
        {
            id: 0,
            size: 'small',
            sizeIcon: 40,
            time: 4800,
        },
        {
            id: 1,
            size: 'small',
            sizeIcon: 50,
            time: 5400,
        },
        {
            id: 2,
            size: 'small',
            sizeIcon: 60,
            time: 6000,
        },
    ],
};

const TimerInstruction = props => {
    const [cookTimer, setCookTimer] = useState(0);
    const [isTimerStart, setIsTimerStart] = useState(false);
    const [resetTimer, setResetTimer] = useState(true);
    const [sound, setSound] = useState();

    async function playSound() {
        await Audio.setAudioModeAsync({
            staysActiveInBackground: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: true,
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
        });
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/temp/sf_coq_01.mp3'),
            { isLooping: true, staysActiveInBackground: true },
        );

        setSound(sound);
        await sound.playAsync();
    }

    useEffect(() => {
        return sound
            ? () => {
                  sound.unloadAsync();
              }
            : undefined;
    }, [sound]);
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.mainContainer}>
                        <View>
                            <Text
                                style={{
                                    ...styles.topText,
                                    marginTop: Platform.OS === 'android' ? 50 : 30,
                                }}
                            >
                                Choisissez la taille de l'oeuf
                            </Text>
                            <View style={styles.eggButtonsContainer}>
                                {cookInstruction.sizes.map(size => {
                                    return (
                                        <TouchableOpacity
                                            key={size.id}
                                            activeOpacity={0.7}
                                            style={styles.eggButton}
                                            onPress={() =>
                                                isTimerStart
                                                    ? null
                                                    : setCookTimer(size.time)
                                            }
                                        >
                                            <Ionicons
                                                name="egg"
                                                size={size.sizeIcon}
                                                color={Colors.secondaryYellow}
                                            />
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                        <View>
                            <Text style={{ ...styles.topText }}>Suivez ces étapes :</Text>
                            <View style={styles.instructionTextContainer}>
                                <Text style={styles.instructionText}>
                                    1. Faire bouillire de l'eau.
                                </Text>
                                <Text style={styles.instructionText}>
                                    2. Ajouter une cuillère a soupe de vinaigre.
                                </Text>
                                <Text style={styles.instructionText}>
                                    3. Baisser le feu et créer un tourbillon a l'aide d'un
                                    spatule.
                                </Text>
                                <Text style={styles.instructionText}>
                                    3. Plonger l'oeuf et démarrer le timer !
                                </Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.timerContainer}>
                                <TouchableHighlight
                                    onPress={() => {
                                        setIsTimerStart(!isTimerStart);
                                        setResetTimer(false);
                                    }}
                                >
                                    <Text style={styles.buttonText}>
                                        {!isTimerStart ? (
                                            <FontAwesome5
                                                name="play"
                                                size={30}
                                                color={Colors.secondaryYellow}
                                            />
                                        ) : (
                                            <FontAwesome5
                                                name="pause"
                                                size={30}
                                                color={Colors.secondaryYellow}
                                            />
                                        )}
                                    </Text>
                                </TouchableHighlight>
                                <Timer
                                    totalDuration={cookTimer}
                                    start={isTimerStart}
                                    reset={resetTimer}
                                    options={options}
                                    handleFinish={() => {
                                        Alert.alert(
                                            'Fin de la cuisson !',
                                            `Cliquez sur l'un des boutons ci dessous pour stopper l'alarme `,
                                            [
                                                {
                                                    text: 'Retour',
                                                    onPress: () => setSound(),
                                                    style: 'cancel',
                                                },
                                                {
                                                    text: 'Découvrir les recettes',
                                                    onPress: () => {
                                                        setSound(),
                                                            props.navigation.navigate(
                                                                'TabRecipes',
                                                            );
                                                        props;
                                                    },
                                                },
                                            ],
                                        );

                                        setIsTimerStart(false);
                                        setResetTimer(true);
                                        playSound();
                                    }}
                                />
                                <TouchableHighlight
                                    onPress={() => {
                                        setIsTimerStart(false);
                                        setResetTimer(true);
                                    }}
                                >
                                    <Ionicons
                                        name="ios-reload-circle-sharp"
                                        size={40}
                                        color={Colors.secondaryYellow}
                                    />
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default TimerInstruction;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backGroundColorMain,
    },
    mainContainer: {
        marginHorizontal: 20,
        flexDirection: 'column',
        height: Dimensions.get('window').height,
        justifyContent: 'space-between',
    },
    topText: {
        fontFamily: 'Source-serif-bold',
        fontSize: 24,
        marginBottom: 16,
        color: Colors.textPrimary,
    },
    eggButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    eggButton: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.secondaryGrayLight,
        borderRadius: 20,
    },
    instructionTextContainer: {
        backgroundColor: Colors.secondaryYellow,
        borderRadius: 25,
        paddingHorizontal: 12,
        paddingVertical: 16,
    },
    instructionText: {
        color: Colors.textPrimaryLight,
        fontFamily: 'Orkney-bold',
        fontSize: 18,
    },
    timerContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.secondaryGrayLight,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 25,
    },
});

const options = {
    container: {
        backgroundColor: Colors.secondaryGrayLight,
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        color: Colors.secondaryYellow,
        marginLeft: 7,
    },
};
