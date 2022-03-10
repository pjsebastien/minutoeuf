import {
    Dimensions,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import TimerComponent from '../components/timer/TimerComponent';

const cookInstruction = {
    typeOfEgg: 'oeuf dur',
    sizes: [
        {
            id: 0,
            size: 'small',
            sizeIcon: 40,
            time: 8,
        },
        {
            id: 1,
            size: 'small',
            sizeIcon: 50,
            time: 9,
        },
        {
            id: 2,
            size: 'small',
            sizeIcon: 60,
            time: 10,
        },
    ],
};

const Timer = () => {
    const [cookTimer, setCookTimer] = useState(0);
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
                                            onPress={() => setCookTimer(size.time)}
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
                        <View style={{ backgroundColor: 'yellow', height: 100 }}>
                            <TimerComponent />
                            <Text>{cookTimer}</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default Timer;

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
});
