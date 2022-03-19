import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    Platform,
    Linking,
} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

const Settings = () => {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={styles.cards}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.card}
                        onPress={() => {
                            Linking.openURL(
                                `mailto:pj.sebastien@gmail.com?subject=Contact via l'application minut'oeuf &body=Votre message ici...`,
                            );
                        }}
                    >
                        <Entypo name="mail" size={40} color={Colors.textPrimaryLight} />
                        <Text style={styles.cardText}>Contacter le développeur</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.card}
                        onPress={() => {
                            Linking.openURL(
                                `https://www.privacypolicygenerator.info/live.php?token=G9BaovVZuhTSce8S0XeBjgl98PzVZlkn`,
                            );
                        }}
                    >
                        <MaterialIcons
                            name="privacy-tip"
                            size={40}
                            color={Colors.textPrimaryLight}
                        />
                        <Text style={styles.cardText}>Politique de confidentialité</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.card}>
                        <Entypo
                            name="google-play"
                            size={40}
                            color={Colors.textPrimaryLight}
                        />
                        <Text style={styles.cardText}>Mes autres applications</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.card}>
                        <MaterialIcons
                            name="watch-later"
                            size={40}
                            color={Colors.textPrimaryLight}
                        />
                        <Text style={styles.cardText}>Version Pro à venir</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backGroundColorMain,
    },
    cards: {
        flex: 1,
        marginHorizontal: 15,
        marginTop: Platform.OS === 'android' ? 50 : 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    card: {
        backgroundColor: Colors.secondaryYellow,
        width: (Dimensions.get('window').width - 50) * 0.5,
        height: (Dimensions.get('window').width - 60) * 0.5,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardText: {
        fontFamily: 'Orkney-bold',
        fontSize: 18,
        color: Colors.textPrimary,
        marginHorizontal: 5,
        marginTop: 5,
        textAlign: 'center',
    },
});
